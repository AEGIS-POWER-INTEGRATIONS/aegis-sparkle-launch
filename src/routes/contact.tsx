import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import contactMeeting from "@/assets/contact-meeting.jpg";
import { ImageCaption } from "@/components/image-caption";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { SITE, INQUIRY_TYPES, type InquiryType } from "@/lib/site-config";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang, useT } from "@/lib/i18n";

type SearchShape = { inquiry?: InquiryType };

export const Route = createFileRoute("/contact")({
  validateSearch: (raw: Record<string, unknown>): SearchShape => {
    const v = raw?.inquiry;
    if (typeof v === "string" && v in INQUIRY_TYPES) {
      return { inquiry: v as InquiryType };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "聯絡宏鼎集成｜工程合作與 AI 顧問諮詢" },
      { name: "description", content: "宏鼎集成股份有限公司統一諮詢窗口：工程合作、資料中心與弱電光纖、AI 流程健檢、企業教育訓練、PoC 導入、月度顧問、政府補助輔導、合作夥伴洽詢。" },
      { property: "og:title", content: "聯絡宏鼎集成｜工程合作與 AI 顧問諮詢" },
      { property: "og:description", content: "宏鼎集成統一諮詢表單 — 工程合作、資料中心、AI 流程健檢、PoC、月度顧問、教育訓練、政府補助輔導與合作夥伴洽詢。" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: "聯絡宏鼎集成｜工程合作與 AI 顧問諮詢" },
      { name: "twitter:description", content: "工程合作、AI 流程健檢與企業導入的統一諮詢窗口。" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "宏鼎集成股份有限公司",
          alternateName: "Aegis Power Integrations Co., Ltd.",
          url: `${SITE_URL}/`,
          email: SITE.emails.general,
          telephone: SITE.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "台灣大道二段2號20樓",
            addressLocality: "西區",
            addressRegion: "台中市",
            addressCountry: "TW",
          },
          areaServed: "TW",
        }),
      },
    ],
  }),
  component: Contact,
});

type Bi = { zh: string; en: string };

const infoCards: {
  icon: React.ComponentType<{ className?: string }>;
  label: Bi;
  primary: Bi;
  secondary: Bi;
  href?: string;
}[] = [
  {
    icon: Building2,
    label: { zh: "公司名稱", en: "Company" },
    primary: { zh: "宏鼎集成股份有限公司", en: "Aegis Power Integrations Co., Ltd." },
    secondary: { zh: "AEGIS POWER INTEGRATIONS", en: "AEGIS POWER INTEGRATIONS" },
  },
  {
    icon: MapPin,
    label: { zh: "公司地址", en: "Address" },
    primary: { zh: SITE.address.zh, en: SITE.address.en },
    secondary: { zh: "鄰近台中市中心商務區", en: "Near Taichung central business district" },
  },
  {
    icon: Phone,
    label: { zh: "聯絡電話", en: "Phone" },
    primary: { zh: SITE.phoneDisplay, en: SITE.phoneDisplay },
    secondary: { zh: "週一至週五 09:00–18:00", en: "Mon–Fri, 09:00–18:00 (Taipei time)" },
    href: `tel:${SITE.phone}`,
  },
  {
    icon: Mail,
    label: { zh: "一般洽詢與合作", en: "General & Partnerships" },
    primary: { zh: SITE.emails.general, en: SITE.emails.general },
    secondary: { zh: "原則上 1–2 個工作日內回覆", en: "Reply within 1–2 business days" },
    href: `mailto:${SITE.emails.general}`,
  },
  {
    icon: Mail,
    label: { zh: "業務與報價", en: "Sales & RFQ" },
    primary: { zh: SITE.emails.sales, en: SITE.emails.sales },
    secondary: { zh: "業務洽詢與報價需求", en: "Sales inquiries and RFQs" },
    href: `mailto:${SITE.emails.sales}`,
  },
];

const engineeringTypes: Bi[] = [
  { zh: "資料中心／機房", en: "Data center / server room" },
  { zh: "光纖佈設與汰換", en: "Fiber deployment / replacement" },
  { zh: "弱電與結構化佈線", en: "ELV & structured cabling" },
  { zh: "監控／門禁／安防", en: "Surveillance / access control" },
  { zh: "機電整合", en: "Mechanical & electrical" },
  { zh: "其他工程需求", en: "Other engineering" },
];

const timelines: Bi[] = [
  { zh: "1 個月內", en: "Within 1 month" },
  { zh: "1–3 個月", en: "1–3 months" },
  { zh: "3–6 個月", en: "3–6 months" },
  { zh: "6 個月以上或評估中", en: "6+ months or evaluating" },
];

const budgets: Bi[] = [
  { zh: "尚未確定", en: "Not yet decided" },
  { zh: "低於 NT$ 50 萬", en: "Under NT$ 500K" },
  { zh: "NT$ 50–200 萬", en: "NT$ 500K – 2M" },
  { zh: "NT$ 200–1000 萬", en: "NT$ 2M – 10M" },
  { zh: "NT$ 1000 萬以上", en: "NT$ 10M+" },
];

const companySizes: Bi[] = [
  { zh: "1–20 人", en: "1–20 employees" },
  { zh: "21–100 人", en: "21–100 employees" },
  { zh: "101–500 人", en: "101–500 employees" },
  { zh: "500+ 人", en: "500+ employees" },
];

const industries: Bi[] = [
  { zh: "製造業", en: "Manufacturing" },
  { zh: "工程／EPC", en: "Engineering / EPC" },
  { zh: "資料中心／科技產業", en: "Data center / tech" },
  { zh: "能源與環保", en: "Energy & ESG" },
  { zh: "商業建築", en: "Commercial buildings" },
  { zh: "中小企業／其他", en: "SME / other" },
];

/* Base schema shared by every inquiry type. */
const baseSchema = z.object({
  inquiryType: z.enum(
    Object.keys(INQUIRY_TYPES) as [InquiryType, ...InquiryType[]],
  ),
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(200),
  title: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  email: z.string().trim().email().max(255),
  consent: z.literal("on"),
  hp: z.literal("").optional(), // honeypot
});

function Contact() {
  const { inquiry } = useSearch({ from: "/contact" });
  const { isEn } = useLang();
  const t = useT();
  const tr = (b: Bi) => (isEn ? b.en : b.zh);

  const [inquiryType, setInquiryType] = useState<InquiryType>(inquiry ?? "engineering");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startTime = useMemo(() => Date.now(), []);

  const showEngineering = inquiryType === "engineering" || inquiryType === "dataCenter";
  const showAi = inquiryType === "aiHealth" || inquiryType === "poc" || inquiryType === "aiMonthly" || inquiryType === "training" || inquiryType === "grant";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || submitted) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Anti-spam: honeypot + minimum time-on-form
    if ((data.hp as string) || Date.now() - startTime < 1500) {
      toast.error(t({ zh: "送出失敗，請稍後再試。", en: "Submission failed, please try again." }));
      return;
    }

    const parsed = baseSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error(t({ zh: "請確認必填欄位是否完成。", en: "Please review required fields." }));
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Frontend-only submission for now — backend wiring is Phase-4 work.
    // We simulate to give the user immediate confirmation and to prevent
    // exposing any credentials on the client.
    await new Promise((r) => setTimeout(r, 500));

    setSubmitting(false);
    setSubmitted(true);
    toast.success(
      t({
        zh: "已收到您的諮詢需求，我們會盡快與您聯繫。",
        en: "Inquiry received — we will contact you shortly.",
      }),
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20">
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow"><span className="dot" /> <L zh="聯絡我們" en="Contact Us" /></span>
              <h1 className="mt-6 text-4xl md:text-5xl">
                <L zh="聯絡宏鼎集成股份有限公司" en="Contact AEGIS POWER INTEGRATIONS" />
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                <L
                  zh="請先選擇您的需求類型，系統會顯示相對應的欄位；表單提交後由宏鼎集成統一窗口與您聯繫，原則上於 1–2 個工作日內回覆。"
                  en="Choose an inquiry type first — the form shows the fields we need. After submission, our single point of contact will reply within 1–2 business days."
                />
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift">
                <img
                  src={contactMeeting}
                  alt={t({ zh: "企業諮詢與流程訪談會議情境", en: "Enterprise consultation and process interview scene" })}
                  width={1408}
                  height={912}
                  className="w-full h-auto object-cover aspect-[16/10]"
                />
                <div className="absolute left-3 bottom-3">
                  <ImageCaption source="scenario" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info cards */}
        <section className="pb-16">
          <div className="container-x">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {infoCards.map(({ icon: Icon, label, primary, secondary, href }) => (
                <div key={label.en} className="panel p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">{tr(label)}</div>
                  {href ? (
                    <a href={href} className="mt-1 block text-base font-semibold hover:text-foreground break-all">
                      {tr(primary)}
                    </a>
                  ) : (
                    <div className="mt-1 text-base font-semibold leading-snug">{tr(primary)}</div>
                  )}
                  <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{tr(secondary)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="pb-24">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div className="panel-lift p-8 md:p-12">
                <div className="max-w-2xl">
                  <span className="eyebrow"><span className="dot" /> <L zh="統一諮詢表單" en="Unified Inquiry Form" /></span>
                  <h2 className="mt-4 text-3xl md:text-4xl"><L zh="需求諮詢表單" en="Inquiry Form" /></h2>
                </div>

                {submitted ? (
                  <div className="mt-10 panel p-8 flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-gold shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold">
                        <L zh="已收到您的諮詢需求" en="We've received your inquiry" />
                      </h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        <L
                          zh="感謝您的來信。宏鼎集成的相關窗口會依您選擇的需求類型與您聯絡。"
                          en="Thank you. The relevant AEGIS contact will reach out based on your selected inquiry type."
                        />
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-10 grid gap-5 md:grid-cols-2" noValidate>
                    {/* Honeypot — hidden from users */}
                    <input
                      type="text"
                      name="hp"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Inquiry type */}
                    <div className="md:col-span-2">
                      <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
                        <L zh="需求類型（必填）" en="Inquiry type (required)" />
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        required
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                        className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                      >
                        {(Object.keys(INQUIRY_TYPES) as InquiryType[]).map((k) => (
                          <option key={k} value={k}>
                            {tr(INQUIRY_TYPES[k])}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Field label={t({ zh: "姓名（必填）", en: "Name (required)" })} name="name" required error={errors.name} />
                    <Field label={t({ zh: "公司名稱（必填）", en: "Company (required)" })} name="company" required error={errors.company} />
                    <Field label={t({ zh: "職稱", en: "Job title" })} name="title" />
                    <Field label={t({ zh: "電話", en: "Phone" })} name="phone" type="tel" />
                    <Field label={t({ zh: "Email（必填）", en: "Email (required)" })} name="email" type="email" required error={errors.email} className="md:col-span-2" />

                    {/* Engineering-specific fields */}
                    {showEngineering && (
                      <div className="md:col-span-2 rounded-xl border border-border bg-surface/40 p-5 grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2 text-sm font-semibold text-foreground">
                          <L zh="工程需求資訊" en="Engineering details" />
                        </div>
                        <Field label={t({ zh: "工程地點", en: "Site location" })} name="site_location" />
                        <Select
                          id="engineering_type"
                          name="engineering_type"
                          label={t({ zh: "工程類型", en: "Engineering type" })}
                          placeholder={t({ zh: "請選擇", en: "Select" })}
                          options={engineeringTypes}
                          tr={tr}
                        />
                        <Select
                          id="engineering_timeline"
                          name="engineering_timeline"
                          label={t({ zh: "預計時程", en: "Expected timeline" })}
                          placeholder={t({ zh: "請選擇", en: "Select" })}
                          options={timelines}
                          tr={tr}
                        />
                        <Select
                          id="drawings_available"
                          name="drawings_available"
                          label={t({ zh: "是否已有圖面或規範", en: "Drawings / specs ready?" })}
                          placeholder={t({ zh: "請選擇", en: "Select" })}
                          options={[
                            { zh: "是，已有完整圖面", en: "Yes, complete drawings" },
                            { zh: "部分資料", en: "Partial documents" },
                            { zh: "尚無，需協助評估", en: "None yet, need assessment" },
                          ]}
                          tr={tr}
                        />
                        <Select
                          id="engineering_budget"
                          name="engineering_budget"
                          label={t({ zh: "預算範圍（選填）", en: "Budget range (optional)" })}
                          placeholder={t({ zh: "請選擇", en: "Select" })}
                          options={budgets}
                          tr={tr}
                          className="md:col-span-2"
                        />
                      </div>
                    )}

                    {/* AI-specific fields */}
                    {showAi && (
                      <div className="md:col-span-2 rounded-xl border border-border bg-surface/40 p-5 grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2 text-sm font-semibold text-foreground">
                          <L zh="AI 顧問需求資訊" en="AI advisory details" />
                        </div>
                        <Select
                          id="industry"
                          name="industry"
                          label={t({ zh: "公司產業", en: "Industry" })}
                          placeholder={t({ zh: "請選擇", en: "Select" })}
                          options={industries}
                          tr={tr}
                        />
                        <Select
                          id="company_size"
                          name="company_size"
                          label={t({ zh: "員工人數", en: "Employees" })}
                          placeholder={t({ zh: "請選擇", en: "Select" })}
                          options={companySizes}
                          tr={tr}
                        />
                        <Field
                          label={t({ zh: "希望改善的部門", en: "Department to improve" })}
                          name="target_department"
                          className="md:col-span-2"
                        />
                        <Field
                          label={t({ zh: "目前使用的系統", en: "Systems currently in use" })}
                          name="current_systems"
                          className="md:col-span-2"
                        />
                        <div className="md:col-span-2">
                          <label htmlFor="ai_problem" className="block text-sm font-medium mb-2">
                            <L zh="主要問題" en="Main problem" />
                          </label>
                          <textarea
                            id="ai_problem"
                            name="ai_problem"
                            rows={3}
                            placeholder={t({ zh: "簡述目前流程的主要痛點。", en: "Briefly describe the main pain points." })}
                            className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-y"
                          />
                        </div>
                        <Field
                          label={t({ zh: "希望完成的目標", en: "Desired outcome" })}
                          name="desired_outcome"
                        />
                        <Select
                          id="ai_timeline"
                          name="ai_timeline"
                          label={t({ zh: "預計導入時間", en: "Expected timeline" })}
                          placeholder={t({ zh: "請選擇", en: "Select" })}
                          options={timelines}
                          tr={tr}
                        />
                      </div>
                    )}

                    {/* General notes */}
                    <div className="md:col-span-2">
                      <label htmlFor="notes" className="block text-sm font-medium mb-2">
                        <L zh="補充說明（選填）" en="Additional notes (optional)" />
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        placeholder={t({ zh: "任何您希望我們事先了解的內容。", en: "Anything else you'd like us to know in advance." })}
                        className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-y"
                      />
                    </div>

                    {/* Consent */}
                    <div className="md:col-span-2 flex items-start gap-3 rounded-lg border border-border bg-surface/40 p-4">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 accent-primary"
                      />
                      <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                        <L
                          zh={<>本人已閱讀並同意<a href="/privacy" className="underline underline-offset-4 hover:text-foreground">隱私權政策</a>，同意宏鼎集成使用上述資料進行需求聯繫、服務評估與後續合作溝通。</>}
                          en={<>I have read and agree to the <a href="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>, and consent to AEGIS POWER INTEGRATIONS using this information for follow-up, needs assessment and cooperation.</>}
                        />
                      </label>
                    </div>

                    <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <L zh="送出中…" en="Submitting…" />
                        ) : (
                          <>
                            <L zh="送出諮詢需求" en="Submit inquiry" /> <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                      <a href={`mailto:${SITE.emails.sales}`} className="btn btn-ghost">
                        <L zh="改用 Email 聯繫" en="Email us instead" />
                      </a>
                    </div>
                  </form>
                )}
              </div>

              {/* Right column: privacy notice */}
              <aside className="space-y-5">
                <div className="panel p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">
                    <L zh="個資使用告知" en="Data Use Notice" />
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    <L
                      zh="您所提供的資料將用於需求聯繫、服務評估及後續合作溝通。送出前請閱讀隱私權政策。"
                      en="Your information is used for follow-up, needs assessment and cooperation discussions only. Please review the Privacy Policy before submitting."
                    />
                  </p>
                  <a
                    href="/privacy"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-foreground underline underline-offset-4"
                  >
                    <L zh="查看隱私權政策" en="View Privacy Policy" />
                  </a>
                </div>
                <div className="panel p-6">
                  <h3 className="text-base font-semibold">
                    <L zh="回覆時間" en="Reply Window" />
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    <L
                      zh="工作日收到需求後，原則上於 1–2 個工作日內回覆；跨週或連假期間可能延後。"
                      en="On business days we aim to reply within 1–2 business days. Replies may be delayed over weekends or holidays."
                    />
                  </p>
                </div>
                <div className="panel p-6">
                  <h3 className="text-base font-semibold">
                    <L zh="不會做的事" en="What we won't do" />
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <li>· <L zh="不將您的資料轉售或提供給第三方行銷用途。" en="No reselling or third-party marketing use." /></li>
                    <li>· <L zh="不在網頁前端儲存任何 API 金鑰或表單信箱密碼。" en="No API keys or mailbox credentials stored in the client." /></li>
                    <li>· <L zh="未經授權不公開客戶名稱、Logo 或現場照片。" en="No client names, logos or on-site photos without permission." /></li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="pb-24">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="公司位置" en="Our Location" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="公司位置" en="Our Location" /></h2>
            </div>
            <div className="mt-8 panel overflow-hidden">
              <iframe
                title={t({ zh: "宏鼎集成公司位置 — 台中市西區台灣大道二段2號20樓", en: "AEGIS POWER INTEGRATIONS office location — Taichung, Taiwan" })}
                src="https://www.google.com/maps?q=%E5%8F%B0%E4%B8%AD%E5%B8%82%E8%A5%BF%E5%8D%80%E5%8F%B0%E7%81%A3%E5%A4%A7%E9%81%93%E4%BA%8C%E6%AE%B52%E8%99%9F20%E6%A8%93&output=embed"
                width="100%"
                height="360"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  error?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${
          error ? "border-destructive" : "border-input"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  name,
  label,
  placeholder,
  options,
  tr,
  className = "",
  required,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: Bi[];
  tr: (b: Bi) => string;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.en} value={o.en}>
            {tr(o)}
          </option>
        ))}
      </select>
    </div>
  );
}
