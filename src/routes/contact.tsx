import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import contactMeeting from "@/assets/contact-meeting.jpg";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Layers,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SITE } from "@/lib/site-config";


import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "聯絡我們｜AEGIS POWER INTEGRATIONS" },
      { name: "description", content: "聯絡 AEGIS POWER INTEGRATIONS 宏鼎集成 — 台中市西區台灣大道二段2號20樓。預約工程集成、AI 系統整合與 Aegis Business Apps 企業管理系統的初步諮詢。Contact AEGIS POWER INTEGRATIONS for engineering integration and AI adoption." },
      { property: "og:title", content: "Contact | AEGIS POWER INTEGRATIONS" },
      { property: "og:description", content: "Book a consultation for engineering integration, AI system integration and enterprise applications." },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
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
    secondary: { zh: "Aegis Power Integrations Co., Ltd.", en: "宏鼎集成股份有限公司" },
  },
  {
    icon: MapPin,
    label: { zh: "公司地址", en: "Address" },
    primary: { zh: "台中市西區台灣大道二段2號20樓", en: "20F, No. 2, Sec. 2, Taiwan Blvd., West Dist., Taichung, Taiwan" },
    secondary: { zh: "鄰近台中市中心商務區", en: "Near Taichung central business district" },
  },
  {
    icon: Mail,
    label: { zh: "一般洽詢與合作", en: "General & Partnerships" },
    primary: { zh: "johnny@aegispowerapi.com", en: "johnny@aegispowerapi.com" },
    secondary: { zh: "原則上 1–2 個工作日內回覆", en: "Reply within 1–2 business days" },
    href: "mailto:johnny@aegispowerapi.com",
  },
  {
    icon: Mail,
    label: { zh: "業務與報價", en: "Sales & RFQ" },
    primary: { zh: "sales@aegispowerapi.com", en: "sales@aegispowerapi.com" },
    secondary: { zh: "業務洽詢與報價需求", en: "Sales inquiries and RFQs" },
    href: "mailto:sales@aegispowerapi.com",
  },
  {
    icon: Layers,
    label: { zh: "服務範圍", en: "Services" },
    primary: { zh: "工程集成｜AI 系統整合", en: "Engineering Integration｜AI Integration" },
    secondary: { zh: "Aegis Business Apps｜企業管理系統導入", en: "Aegis Business Apps｜Enterprise system rollout" },
  },
  {
    icon: Users,
    label: { zh: "服務對象", en: "Who We Serve" },
    primary: { zh: "工程公司、製造業、科技廠供應鏈", en: "Engineering firms, manufacturers, tech supply chains" },
    secondary: { zh: "資料中心、弱電工程團隊、中小企業、會計師與顧問通路", en: "Data centers, ELV teams, SMBs, accountants and consulting channels" },
  },
];

const services: Bi[] = [
  { zh: "工程服務", en: "Engineering Services" },
  { zh: "資料中心與光纖工程", en: "Data Center & Fiber Engineering" },
  { zh: "弱電與網路整合", en: "ELV & Network Integration" },
  { zh: "能源與機電工程", en: "Energy & MEP Engineering" },
  { zh: "AI 系統整合", en: "AI System Integration" },
  { zh: "企業流程顧問", en: "Enterprise Workflow Advisory" },
  { zh: "企業應用（CostFlow / SalesOps / AI Launch）", en: "Business Applications (CostFlow / SalesOps / AI Launch)" },
  { zh: "專案合作", en: "Project Partnership" },
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

const budgets: Bi[] = [
  { zh: "尚未確定", en: "Not yet decided" },
  { zh: "低於 NT$ 50 萬", en: "Under NT$ 500K" },
  { zh: "NT$ 50–200 萬", en: "NT$ 500K – 2M" },
  { zh: "NT$ 200–1000 萬", en: "NT$ 2M – 10M" },
  { zh: "NT$ 1000 萬以上", en: "NT$ 10M+" },
];

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { isEn } = useLang();
  const t = useT();
  const tr = (b: Bi) => (isEn ? b.en : b.zh);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
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
                <L zh="聯絡 AEGIS POWER INTEGRATIONS" en="Contact AEGIS POWER INTEGRATIONS" />
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                <L
                  zh="無論您是想評估工程整合、導入 AI 系統，或希望以模組化方式建立企業管理系統，歡迎與我們聯繫。我們將依照您的產業、流程與導入需求，安排初步諮詢。"
                  en="Whether you're evaluating engineering integration, adopting AI systems, or building a modular enterprise management system, we're glad to connect. We'll arrange an initial consultation based on your industry, workflow and adoption needs."
                />
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift">
                <img
                  src={contactMeeting}
                  alt={t({ zh: "企業諮詢與系統導入會議視覺", en: "Enterprise consultation and system rollout meeting" })}
                  width={1408}
                  height={912}
                  className="w-full h-auto object-cover aspect-[16/10]"
                />
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

        {/* Map */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="公司位置" en="Our Location" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="公司位置" en="Our Location" /></h2>
            </div>
            <div className="mt-8 panel overflow-hidden">
              <iframe
                title={t({ zh: "AEGIS POWER INTEGRATIONS 公司位置 — 台中市西區台灣大道二段2號20樓", en: "AEGIS POWER INTEGRATIONS office location — Taichung, Taiwan" })}
                src="https://www.google.com/maps?q=%E5%8F%B0%E4%B8%AD%E5%B8%82%E8%A5%BF%E5%8D%80%E5%8F%B0%E7%81%A3%E5%A4%A7%E9%81%93%E4%BA%8C%E6%AE%B52%E8%99%9F20%E6%A8%93&output=embed"
                width="100%"
                height="360"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
              <L
                zh="我們位於台中市西區台灣大道二段，鄰近台中市中心商務區，可作為企業諮詢、系統導入討論與合作洽談據點。"
                en="Our office in Taichung's central business district is available for consultation, system rollout discussions and partnership meetings."
              />
            </p>
          </div>
        </section>

        {/* Inquiry form */}
        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-8 md:p-12">
              <div className="max-w-2xl">
                <span className="eyebrow"><span className="dot" /> <L zh="預約諮詢" en="Book Consultation" /></span>
                <h2 className="mt-4 text-3xl md:text-4xl"><L zh="預約諮詢" en="Book a Consultation" /></h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  <L
                    zh="填寫以下資訊，我們將由相關人員與您聯繫，提供初步建議與後續規劃。原則上將於 1–2 個工作日內回覆。"
                    en="Fill in the form below and a member of our team will contact you with initial recommendations and next steps. We aim to reply within 1–2 business days."
                  />
                </p>
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
                        zh="感謝您的來信，我們已收到您的需求，將由相關人員進一步與您聯絡。"
                        en="Thank you. Your inquiry has been received, and a member of our team will contact you."
                      />
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 grid gap-5 md:grid-cols-2">
                  <Field label={t({ zh: "姓名", en: "Name" })} name="name" required />
                  <Field label={t({ zh: "公司名稱", en: "Company" })} name="company" required />
                  <Field label={t({ zh: "職稱", en: "Job title" })} name="title" />
                  <Field label={t({ zh: "電話", en: "Phone" })} name="phone" type="tel" />
                  <Field label={t({ zh: "Email", en: "Email" })} name="email" type="email" required className="md:col-span-2" />

                  <Select
                    id="service"
                    name="service"
                    required
                    label={t({ zh: "有興趣的服務", en: "Service of interest" })}
                    placeholder={t({ zh: "請選擇服務項目", en: "Please select a service" })}
                    options={services}
                    tr={tr}
                    className="md:col-span-2"
                  />

                  <Select
                    id="company_size"
                    name="company_size"
                    label={t({ zh: "公司規模", en: "Company size" })}
                    placeholder={t({ zh: "請選擇公司規模", en: "Select company size" })}
                    options={companySizes}
                    tr={tr}
                  />

                  <Select
                    id="timeline"
                    name="timeline"
                    label={t({ zh: "預計導入時間", en: "Expected timeline" })}
                    placeholder={t({ zh: "請選擇時間", en: "Select a timeline" })}
                    options={timelines}
                    tr={tr}
                  />

                  <Field
                    label={t({ zh: "目前使用的系統（選填）", en: "Systems currently in use (optional)" })}
                    name="current_systems"
                    className="md:col-span-2"
                  />

                  <Select
                    id="budget"
                    name="budget"
                    label={t({ zh: "預算區間（選填）", en: "Budget range (optional)" })}
                    placeholder={t({ zh: "請選擇預算區間", en: "Select a range" })}
                    options={budgets}
                    tr={tr}
                    className="md:col-span-2"
                  />

                  <div className="md:col-span-2">
                    <label htmlFor="problem" className="block text-sm font-medium mb-2">
                      <L zh="希望改善的問題 / 補充說明" en="Pain points or notes" />
                    </label>
                    <textarea
                      id="problem"
                      name="problem"
                      rows={5}
                      placeholder={t({ zh: "請簡述目前的流程現況、痛點，或希望了解的服務範圍。", en: "Briefly describe your current workflow, pain points, or the services you'd like to learn about." })}
                      className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-y"
                    />
                  </div>

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
                        zh={<>我同意依<a href="/privacy" className="underline underline-offset-4 hover:text-foreground">隱私權政策</a>提供上述資料，供本公司聯絡與需求評估使用。</>}
                        en={<>I consent to AEGIS POWER INTEGRATIONS using the information above to contact me, in accordance with the <a href="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>.</>}
                      />
                    </label>
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                    <button type="submit" className="btn btn-primary">
                      <L zh="送出諮詢需求" en="Submit inquiry" /> <ArrowRight className="h-4 w-4" />
                    </button>
                    <a href="mailto:sales@aegispowerapi.com" className="btn btn-ghost">
                      <L zh="改用 Email 聯繫" en="Email us instead" />
                    </a>
                  </div>
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

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}{required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
      />
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
  required,
  className = "",
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: Bi[];
  tr: (b: Bi) => string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}{required && <span className="text-gold ml-1">*</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o.en} value={o.en}>{tr(o)}</option>
        ))}
      </select>
    </div>
  );
}
