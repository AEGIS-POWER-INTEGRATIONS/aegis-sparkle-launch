import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Check, Send, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "預約諮詢｜AEGIS POWER INTEGRATIONS" },
      { name: "description", content: "預約 AEGIS POWER INTEGRATIONS 顧問，安排工程整合、AI 系統整合與企業應用（CostFlow / SalesOps / AI Launch）導入評估。原則上 1–2 個工作日內回覆。" },
      { name: "keywords", content: "預約諮詢, 產品 Demo, 企業系統導入, AI 顧問, Aegis Demo" },
      { property: "og:title", content: "預約諮詢｜AEGIS POWER INTEGRATIONS" },
      { property: "og:description", content: "顧問依照產業、團隊規模與目前使用的工具，提出最適合的導入方案。原則上 1–2 個工作日內回覆。" },
      { property: "og:url", content: `${SITE_URL}/demo` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/demo` }],
  }),
  component: Demo,
});

type Bi = { zh: string; en: string };

const productOptions: Bi[] = [
  { zh: "Aegis CostFlow｜工程成本分析平台", en: "Aegis CostFlow｜Engineering Cost Analytics" },
  { zh: "Aegis SalesOps｜業務管理系統", en: "Aegis SalesOps｜Sales Management" },
  { zh: "Aegis AI Launch｜企業 AI 導入", en: "Aegis AI Launch｜Enterprise AI Adoption" },
  { zh: "工程集成服務", en: "Engineering Integration" },
  { zh: "AI 系統整合", en: "AI System Integration" },
  { zh: "還不確定，想先請顧問建議", en: "Not sure yet — please advise" },
];

const industryOptions: Bi[] = [
  { zh: "機電工程", en: "MEP Engineering" },
  { zh: "弱電工程", en: "ELV Engineering" },
  { zh: "光纖工程", en: "Fiber Engineering" },
  { zh: "監控工程", en: "Surveillance & Security" },
  { zh: "系統整合", en: "System Integration" },
  { zh: "營造 / 室內裝修", en: "Construction / Interior" },
  { zh: "製造業", en: "Manufacturing" },
  { zh: "半導體 / 科技廠供應鏈", en: "Semiconductor / Tech Supply Chain" },
  { zh: "資料中心", en: "Data Center" },
  { zh: "批發 / 零售", en: "Wholesale / Retail" },
  { zh: "軟體 / 科技服務", en: "Software / Tech Services" },
  { zh: "其他", en: "Other" },
];

const companySizes: Bi[] = [
  { zh: "1–20 人", en: "1–20 employees" },
  { zh: "21–100 人", en: "21–100 employees" },
  { zh: "101–500 人", en: "101–500 employees" },
  { zh: "500+ 人", en: "500+ employees" },
];

const timelines: Bi[] = [
  { zh: "1 個月內", en: "Within 1 month" },
  { zh: "1–3 個月", en: "1–3 months" },
  { zh: "3–6 個月", en: "3–6 months" },
  { zh: "6 個月以上或評估中", en: "6+ months or evaluating" },
];

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(200),
  job_title: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  industry: z.string().trim().max(100).optional().or(z.literal("")),
  product_interest: z.string().trim().min(1).max(200),
  company_size: z.string().trim().max(100).optional().or(z.literal("")),
  timeline: z.string().trim().max(100).optional().or(z.literal("")),
  problem: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true),
});

type FormState = {
  name: string;
  company: string;
  job_title: string;
  email: string;
  phone: string;
  industry: string;
  product_interest: string;
  company_size: string;
  timeline: string;
  problem: string;
  consent: boolean;
};

const initial: FormState = {
  name: "",
  company: "",
  job_title: "",
  email: "",
  phone: "",
  industry: "",
  product_interest: "Aegis CostFlow｜工程成本分析平台",
  company_size: "",
  timeline: "",
  problem: "",
  consent: false,
};

function Demo() {
  const { isEn } = useLang();
  const t = useT();
  const tr = (b: Bi) => (isEn ? b.en : b.zh);

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const msg = (key: keyof FormState) => {
    const m: Record<string, Bi> = {
      name: { zh: "請輸入姓名", en: "Please enter your name" },
      company: { zh: "請輸入公司名稱", en: "Please enter your company" },
      email: { zh: "Email 格式不正確", en: "Invalid email address" },
      product_interest: { zh: "請選擇有興趣的服務", en: "Please select a service" },
      consent: { zh: "請勾選同意提供資料", en: "Please provide consent" },
    };
    return m[key as string] ? tr(m[key as string]) : t({ zh: "欄位有誤", en: "Invalid field" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = msg(k);
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("demo_requests").insert({
      name: result.data.name,
      company: result.data.company,
      job_title: result.data.job_title || null,
      email: result.data.email,
      phone: result.data.phone || null,
      industry: result.data.industry || null,
      product_interest: result.data.product_interest,
      problem: [
        result.data.company_size ? `[${t({ zh: "公司規模", en: "Company size" })}] ${result.data.company_size}` : "",
        result.data.timeline ? `[${t({ zh: "預計導入時間", en: "Timeline" })}] ${result.data.timeline}` : "",
        result.data.problem || "",
      ].filter(Boolean).join("\n") || null,
      source: typeof window !== "undefined" ? window.location.href : null,
    });
    setSubmitting(false);
    if (error) {
      setServerError(
        t({
          zh: "送出失敗，請稍後再試，或來信至 sales@aegispowerapi.com",
          en: "Submission failed. Please try again later or email sales@aegispowerapi.com",
        })
      );
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow">
              <span className="dot" /> <L zh="預約諮詢" en="Book a Consultation" />
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl">
              <L
                zh={<>預約諮詢，<br className="hidden md:block" />讓顧問建議最適合先導入的方案。</>}
                en={<>Book a consultation and let our team recommend the best first step.</>}
              />
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              <L
                zh={<>填寫下方表單後，顧問將於 <span className="font-semibold text-foreground">1–2 個工作日內</span> 與您聯繫，安排線上 Demo 與導入評估。</>}
                en={<>After you submit the form, our team will contact you within <span className="font-semibold text-foreground">1–2 business days</span> to arrange an online demo and adoption assessment.</>}
              />
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5 h-fit">
              <div className="panel p-7">
                <h3 className="text-xl">
                  <L zh="Demo 會議會討論什麼？" en="What we'll cover in the meeting" />
                </h3>
                <ul className="mt-5 space-y-3">
                  {[
                    { zh: "貴公司目前流程與資料痛點", en: "Your current workflow and data pain points" },
                    { zh: "適合先導入 CostFlow、SalesOps 或 AI Launch", en: "Which product fits your first phase — CostFlow, SalesOps or AI Launch" },
                    { zh: "Excel 匯入、LINE 串接、報表儀表板等整合需求", en: "Integration needs — Excel imports, LINE, reporting dashboards" },
                    { zh: "導入時程、費用估算與第一階段驗收方式", en: "Timeline, cost estimation and first-phase acceptance approach" },
                  ].map((b) => (
                    <li key={b.en} className="flex gap-3 text-sm">
                      <Check className="h-5 w-5 mt-0.5 text-gold flex-none" />
                      <span>{tr(b)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel p-6 flex gap-3">
                <ShieldCheck className="h-5 w-5 mt-0.5 text-gold flex-none" />
                <div className="text-sm">
                  <div className="font-semibold">
                    <L zh="資料安全" en="Data Privacy" />
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <L
                      zh="您提供的資訊僅供 AEGIS POWER INTEGRATIONS 顧問團隊聯繫使用，不會分享給第三方。"
                      en="Your information is used only by our consulting team to contact you, and is not shared with third parties."
                    />
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <L zh="也可以直接來信：" en="Prefer email? Reach us at " />
                <a href="mailto:sales@aegispowerapi.com" className="text-foreground font-medium underline underline-offset-4">
                  sales@aegispowerapi.com
                </a>
              </div>
            </div>

            <div className="panel-lift p-8">
              {submitted ? (
                <div className="flex items-start gap-4 py-6">
                  <CheckCircle2 className="h-7 w-7 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-semibold">
                      <L zh="已收到您的諮詢需求" en="We've received your inquiry" />
                    </h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      <L
                        zh="感謝您的來信，我們已收到您的需求，將由相關人員於 1–2 個工作日內與您聯繫。"
                        en="Thank you. Your inquiry has been received, and a member of our team will contact you within 1–2 business days."
                      />
                    </p>
                  </div>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={onSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t({ zh: "姓名", en: "Name" })} required error={errors.name}>
                      <input
                        className={cx(errors.name)}
                        value={form.name}
                        maxLength={100}
                        onChange={(e) => update("name", e.target.value)}
                      />
                    </Field>
                    <Field label={t({ zh: "職稱", en: "Job title" })} error={errors.job_title}>
                      <input
                        className={cx(errors.job_title)}
                        value={form.job_title}
                        maxLength={100}
                        onChange={(e) => update("job_title", e.target.value)}
                      />
                    </Field>
                  </div>

                  <Field label={t({ zh: "公司名稱", en: "Company" })} required error={errors.company}>
                    <input
                      className={cx(errors.company)}
                      value={form.company}
                      maxLength={200}
                      onChange={(e) => update("company", e.target.value)}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" required error={errors.email}>
                      <input
                        type="email"
                        className={cx(errors.email)}
                        value={form.email}
                        maxLength={255}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@company.com"
                      />
                    </Field>
                    <Field label={t({ zh: "電話", en: "Phone" })} error={errors.phone}>
                      <input
                        type="tel"
                        className={cx(errors.phone)}
                        value={form.phone}
                        maxLength={50}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="02-1234-5678 / 09xx-xxx-xxx"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t({ zh: "產業", en: "Industry" })} error={errors.industry}>
                      <select
                        className={cx(errors.industry)}
                        value={form.industry}
                        onChange={(e) => update("industry", e.target.value)}
                      >
                        <option value="">{t({ zh: "請選擇", en: "Please select" })}</option>
                        {industryOptions.map((o) => (
                          <option key={o.en} value={tr(o)}>{tr(o)}</option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label={t({ zh: "有興趣的服務", en: "Service of interest" })}
                      required
                      error={errors.product_interest}
                    >
                      <select
                        className={cx(errors.product_interest)}
                        value={form.product_interest}
                        onChange={(e) => update("product_interest", e.target.value)}
                      >
                        {productOptions.map((o) => (
                          <option key={o.en} value={tr(o)}>{tr(o)}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t({ zh: "公司規模", en: "Company size" })} error={errors.company_size}>
                      <select
                        className={cx(errors.company_size)}
                        value={form.company_size}
                        onChange={(e) => update("company_size", e.target.value)}
                      >
                        <option value="">{t({ zh: "請選擇公司規模", en: "Select company size" })}</option>
                        {companySizes.map((o) => (
                          <option key={o.en} value={tr(o)}>{tr(o)}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={t({ zh: "預計導入時間", en: "Expected timeline" })} error={errors.timeline}>
                      <select
                        className={cx(errors.timeline)}
                        value={form.timeline}
                        onChange={(e) => update("timeline", e.target.value)}
                      >
                        <option value="">{t({ zh: "請選擇時間", en: "Select a timeline" })}</option>
                        {timelines.map((o) => (
                          <option key={o.en} value={tr(o)}>{tr(o)}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field
                    label={t({ zh: "希望改善的問題 / 補充說明", en: "Pain points or notes" })}
                    error={errors.problem}
                  >
                    <textarea
                      className={`${cx(errors.problem)} min-h-[120px] resize-y`}
                      value={form.problem}
                      maxLength={2000}
                      onChange={(e) => update("problem", e.target.value)}
                      placeholder={t({
                        zh: "請簡述目前的流程現況、痛點，或希望了解的服務範圍。",
                        en: "Briefly describe your current workflow, pain points, or the services you'd like to learn about.",
                      })}
                    />
                  </Field>

                  <div className="flex items-start gap-3 rounded-lg border border-border bg-surface/40 p-4">
                    <input
                      id="demo-consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <label htmlFor="demo-consent" className="text-sm text-muted-foreground leading-relaxed">
                      <L
                        zh={<>我同意依<a href="/privacy" className="underline underline-offset-4 hover:text-foreground">隱私權政策</a>提供上述資料，供本公司聯絡與需求評估使用。</>}
                        en={<>I consent to AEGIS POWER INTEGRATIONS using the information above to contact me, in accordance with the <a href="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>.</>}
                      />
                    </label>
                  </div>
                  {errors.consent && (
                    <div className="text-xs text-destructive">{errors.consent}</div>
                  )}

                  {serverError && (
                    <div className="flex gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-none" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <L zh="送出中..." en="Submitting..." />
                    ) : (
                      <>
                        <L zh="送出諮詢需求" en="Submit inquiry" /> <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

const baseInput =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring/30";

const cx = (error?: string) =>
  `${baseInput} ${error ? "border-destructive focus:border-destructive" : "border-input focus:border-ring"}`;

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
