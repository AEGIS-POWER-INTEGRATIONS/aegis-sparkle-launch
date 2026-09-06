import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Contact-form submission.
 *
 * Runs entirely on the server: validates the payload again (the client-side
 * Zod check is only for UX), stores the inquiry, and sends two emails —
 * an internal notification and an acknowledgement to the sender.
 */
const inquirySchema = z.object({
  inquiryType: z.string().min(1).max(40),
  name: z.string().trim().min(1).max(80),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(4000),
  details: z.record(z.string(), z.string()).optional(),
  locale: z.enum(["zh-TW", "en"]).default("zh-TW"),
  sourcePath: z.string().max(300).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

const INTERNAL_RECIPIENT = "jtian@aegispowerapi.com";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
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
      })
      .select("id")
      .single();

    if (error) {
      console.error("submitInquiry: insert failed", error);
      throw new Error("inquiry_failed");
    }

    const inquiryId = row.id as string;

    const logSend = async (
      label: string,
      to: string,
      status: "sent" | "suppressed" | "failed",
      errorMessage?: string,
    ) => {
      const { error: logError } = await supabase
        .from("email_send_log")
        .insert({
          template_name: label,
          recipient_email: to,
          status,
          error_message: errorMessage?.slice(0, 1000) ?? null,
        });
      if (logError) {
        console.error("submitInquiry: email log write failed", {
          label,
          logError,
        });
      }
    };

    const send = async (
      templateName: string,
      to: string,
      templateData: Record<string, unknown>,
    ) => {
      try {
        const result = await sendTemplateEmail(templateName, to, {
          templateData,
          idempotencyKey: `${templateName}-${inquiryId}`,
        });
        if (!result.sent) {
          await logSend(templateName, to, "suppressed");
          return false;
        }
        await logSend(templateName, to, "sent");
        return true;
      } catch (sendError) {
        const errorMsg =
          sendError instanceof Error ? sendError.message : String(sendError);
        console.error("submitInquiry: send failed", { templateName, errorMsg });
        await logSend(templateName, to, "failed", errorMsg);
        return false;
      }
    };

    const notified = await send("contact-inquiry-internal", INTERNAL_RECIPIENT, {
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
    });

    await send("contact-inquiry-ack", data.email, {
      name: data.name,
      message: data.message,
      locale: data.locale,
    });

    return { id: inquiryId, notified };
  });
