import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Contact-form submission.
 *
 * Runs entirely on the server: validates the payload again (the client-side
 * Zod check is only for UX), stores the inquiry, and queues two emails —
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

const SITE_NAME = "AEGIS POWER INTEGRATIONS";
const FROM_DOMAIN = "aegispowerapi.com";
const SENDER_DOMAIN = "notify.aegispowerapi.com";
const INTERNAL_RECIPIENT = "jtian@aegispowerapi.com";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function internalHtml(d: InquiryInput) {
  const rows: [string, string][] = [
    ["詢問類型 Type", d.inquiryType],
    ["姓名 Name", d.name],
    ["公司 Company", d.company || "-"],
    ["職稱 Role", d.role || "-"],
    ["Email", d.email],
    ["電話 Phone", d.phone || "-"],
    ["語言 Locale", d.locale],
    ["來源頁 Source", d.sourcePath || "-"],
    ...Object.entries(d.details ?? {}).map(
      ([k, v]) => [k, v] as [string, string],
    ),
  ];
  return `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#111827">
<h2 style="font-size:18px">網站詢問 New website inquiry</h2>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="color:#4B5563">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`,
  )
  .join("")}
</table>
<h3 style="font-size:15px">需求描述 Message</h3>
<p style="white-space:pre-wrap;line-height:1.6">${esc(d.message)}</p>
</div>`;
}

function ackHtml(d: InquiryInput) {
  return d.locale === "en"
    ? `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#111827;line-height:1.7">
<p>Dear ${esc(d.name)},</p>
<p>Thank you for contacting ${SITE_NAME} (Aegis Power Integrations Co., Ltd.). We have received your enquiry and a member of our team will reply to this address shortly.</p>
<p style="white-space:pre-wrap;border-left:3px solid #E5E7EB;padding-left:12px;color:#4B5563">${esc(d.message)}</p>
<p>Best regards,<br/>${SITE_NAME}</p>
</div>`
    : `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#111827;line-height:1.8">
<p>${esc(d.name)} 您好，</p>
<p>感謝您與宏鼎集成股份有限公司聯繫，我們已收到您的詢問，將盡快由專人回覆此信箱。</p>
<p style="white-space:pre-wrap;border-left:3px solid #E5E7EB;padding-left:12px;color:#4B5563">${esc(d.message)}</p>
<p>宏鼎集成股份有限公司 敬上</p>
</div>`;
}

const stripHtml = (h: string) =>
  h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
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

    const from = `${SITE_NAME} <noreply@${FROM_DOMAIN}>`;
    const queue = async (
      to: string,
      subject: string,
      html: string,
      label: string,
    ) => {
      const messageId = crypto.randomUUID();
      // Transactional sends require an unsubscribe token per recipient.
      const unsubscribeToken = crypto.randomUUID().replace(/-/g, "");
      await supabase
        .from("email_unsubscribe_tokens")
        .insert({ email: to, token: unsubscribeToken });
      await supabase.from("email_send_log").insert({
        message_id: messageId,
        template_name: label,
        recipient_email: to,
        status: "pending",
      });
      const { error: qErr } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          to,
          from,
          sender_domain: SENDER_DOMAIN,
          subject,
          html,
          text: stripHtml(html),
          purpose: "transactional",
          label,
          idempotency_key: messageId,
          unsubscribe_token: unsubscribeToken,
          queued_at: new Date().toISOString(),
        },
      });
      if (qErr) {
        console.error("submitInquiry: enqueue failed", { label, qErr });
        await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: label,
          recipient_email: to,
          status: "failed",
          error_message: "Failed to enqueue email",
        });
        return false;
      }
      return true;
    };

    const notified = await queue(
      INTERNAL_RECIPIENT,
      `[網站詢問] ${data.inquiryType}｜${data.name}${data.company ? `／${data.company}` : ""}`,
      internalHtml(data),
      "contact_inquiry_internal",
    );
    await queue(
      data.email,
      data.locale === "en"
        ? `We received your enquiry — ${SITE_NAME}`
        : `我們已收到您的詢問｜宏鼎集成股份有限公司`,
      ackHtml(data),
      "contact_inquiry_ack",
    );

    return { id: row.id as string, notified };
  });
