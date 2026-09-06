import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Contact-form submission.
 *
 * Runs entirely on the server:
 *   1. re-validates the payload (the client-side Zod check is UX only),
 *   2. applies IP + email rate limits and near-duplicate suppression,
 *   3. stores the inquiry with the service-role key (the table is server-only:
 *      RLS is on and no privileges are granted to anon/authenticated),
 *   4. sends two fixed-recipient emails and records the outcome of each on
 *      the inquiry row so failures stay traceable and retryable.
 *
 * Header-injection safety: the visitor never controls `to`, `cc` or `bcc`;
 * all free text is stripped of CR/LF before it can reach a header (subject or
 * reply-to), and bodies are rendered by React Email (escaped by default).
 */

/** Remove CR/LF and other control characters that could break email headers. */
const clean = (s: string, max = 500) =>
  s.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);

const inquirySchema = z.object({
  inquiryType: z
    .string()
    .trim()
    .min(1)
    .max(40)
    .regex(/^[a-zA-Z]+$/, "invalid inquiry type"),
  name: z.string().trim().min(1).max(80).transform((v) => clean(v, 80)),
  company: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? clean(v, 120) : "")),
  role: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? clean(v, 80) : "")),
  email: z
    .string()
    .trim()
    .email()
    .max(160)
    .transform((v) => v.toLowerCase()),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? clean(v, 40) : "")),
  message: z.string().trim().min(5).max(4000),
  details: z.record(z.string(), z.string()).optional(),
  locale: z.enum(["zh-TW", "en"]).default("zh-TW"),
  sourcePath: z
    .string()
    .max(300)
    .regex(/^\/[\w\-/.?=&%]*$/, "invalid source path")
    .optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

/** Fixed internal recipient — never taken from the request. */
const INTERNAL_RECIPIENT = "jtian@aegispowerapi.com";

/** Rate limits (sliding windows). Tuned so a shared office IP is not blocked. */
const LIMITS = {
  perEmail: { windowMinutes: 10, max: 3 },
  perIp: { windowMinutes: 10, max: 12 },
  duplicateMinutes: 3,
};

async function hashIp(ip: string) {
  const salt = process.env["INQUIRY_IP_SALT"] ?? "aegis-inquiry";
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const { getRequestHeader, getRequestIP } = await import(
      "@tanstack/react-start/server"
    );
    const { sendTemplateEmail } = await import(
      "@/lib/email-templates/send-email"
    );

    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
    const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!url || !serviceKey) {
      console.error("submitInquiry: missing Supabase server credentials");
      throw new Error("inquiry_unavailable");
    }
    const supabase = createClient(url, serviceKey);

    // ── Rate limiting ────────────────────────────────────────────────
    const rawIp =
      getRequestHeader("cf-connecting-ip") ??
      getRequestIP({ xForwardedFor: true }) ??
      "unknown";
    const ipHash = await hashIp(rawIp);
    const since = (minutes: number) =>
      new Date(Date.now() - minutes * 60_000).toISOString();

    const [byEmail, byIp, duplicate] = await Promise.all([
      supabase
        .from("contact_inquiries")
        .select("id", { count: "exact", head: true })
        .eq("email", data.email)
        .gte("created_at", since(LIMITS.perEmail.windowMinutes)),
      supabase
        .from("contact_inquiries")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since(LIMITS.perIp.windowMinutes)),
      supabase
        .from("contact_inquiries")
        .select("id")
        .eq("email", data.email)
        .eq("message", data.message)
        .gte("created_at", since(LIMITS.duplicateMinutes))
        .limit(1)
        .maybeSingle(),
    ]);

    // A repeat of the exact same message counts as an accidental double
    // submit: acknowledge it without creating a second record or resending.
    if (duplicate.data?.id) {
      return {
        id: duplicate.data.id as string,
        notified: true,
        duplicate: true,
        rateLimited: false as const,
      };
    }
    if (
      (byEmail.count ?? 0) >= LIMITS.perEmail.max ||
      (byIp.count ?? 0) >= LIMITS.perIp.max
    ) {
      // Returned (not thrown) so the client can show a friendly notice
      // instead of an unhandled server-function error / blank screen.
      return {
        id: null,
        notified: false,
        duplicate: false,
        rateLimited: true as const,
      };
    }

    // ── Persist first: the inquiry survives any email failure ────────
    const { data: row, error } = await supabase
      .from("contact_inquiries")
      .insert({
        inquiry_type: data.inquiryType,
        name: data.name,
        company: data.company || null,
        role: data.role || null,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        details: data.details ?? {},
        locale: data.locale,
        source_path: data.sourcePath ?? null,
        ip_hash: ipHash,
      })
      .select("id")
      .single();

    if (error) {
      console.error("submitInquiry: insert failed", error.code ?? error.message);
      throw new Error("inquiry_failed");
    }

    const inquiryId = row.id as string;

    const logSend = async (
      label: string,
      to: string,
      status: "sent" | "suppressed" | "failed",
      errorMessage?: string,
    ) => {
      const { error: logError } = await supabase.from("email_send_log").insert({
        template_name: label,
        recipient_email: to,
        status,
        error_message: errorMessage?.slice(0, 1000) ?? null,
      });
      if (logError) {
        console.error("submitInquiry: email log write failed", label);
      }
    };

    const send = async (
      templateName: string,
      to: string,
      templateData: Record<string, unknown>,
      replyTo: string,
    ) => {
      try {
        const result = await sendTemplateEmail(templateName, to, {
          templateData,
          idempotencyKey: `${templateName}-${inquiryId}`,
          replyTo,
        });
        const status = result.sent ? "sent" : "suppressed";
        await logSend(templateName, to, status);
        return { status } as const;
      } catch (sendError) {
        const errorMsg =
          sendError instanceof Error ? sendError.message : String(sendError);
        console.error("submitInquiry: send failed", templateName);
        await logSend(templateName, to, "failed", errorMsg);
        return { status: "failed" as const, error: errorMsg };
      }
    };

    const notify = await send(
      "contact-inquiry-internal",
      INTERNAL_RECIPIENT,
      {
        inquiryType: data.inquiryType,
        name: data.name,
        company: data.company || "",
        role: data.role || "",
        email: data.email,
        phone: data.phone || "",
        locale: data.locale,
        sourcePath: data.sourcePath ?? "",
        message: data.message,
        details: data.details ?? {},
      },
      // Reply-To is the validated submitter address, never raw input.
      data.email,
    );

    const ack = await send(
      "contact-inquiry-ack",
      data.email,
      { name: data.name, locale: data.locale },
      INTERNAL_RECIPIENT,
    );

    await supabase
      .from("contact_inquiries")
      .update({
        notify_status: notify.status,
        notify_error: notify.status === "failed" ? notify.error ?? null : null,
        ack_status: ack.status,
        ack_error: ack.status === "failed" ? ack.error ?? null : null,
        email_attempts: 1,
        last_email_attempt_at: new Date().toISOString(),
      })
      .eq("id", inquiryId);

    // The inquiry is stored either way; `notified` only reflects the notice.
    return {
      id: inquiryId,
      notified: notify.status === "sent",
      duplicate: false,
      rateLimited: false as const,
    };
  });
