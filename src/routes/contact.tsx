import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import contactMeeting from "@/assets/contact-meeting.jpg";
import {
  Building2,
  MapPin,
  Mail,
  Layers,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "聯絡我們｜宏鼎集成股份有限公司" },
      { name: "description", content: "聯絡宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. — 台中市西區台灣大道二段2號20樓。預約工程集成、AI 系統整合與 Aegis Business Apps 企業管理系統的初步諮詢。" },
      { name: "keywords", content: "宏鼎集成 聯絡, 台中工程公司, 系統整合 諮詢, Aegis 聯絡我們" },
      { property: "og:title", content: "聯絡我們｜宏鼎集成" },
      { property: "og:description", content: "預約工程集成、AI 系統整合與企業管理系統諮詢。台中市西區台灣大道二段2號20樓。" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});


const infoCards = [
  {
    icon: Building2,
    label: "公司名稱",
    primary: "宏鼎集成股份有限公司",
    secondary: "Aegis Power Integrations Co., Ltd.",
  },
  {
    icon: MapPin,
    label: "公司地址",
    primary: "台中市西區台灣大道二段2號20樓",
    secondary: "鄰近台中市中心商務區",
  },
  {
    icon: Mail,
    label: "General & Partnerships",
    primary: "johnny@aegispowerapi.com",
    secondary: "1 個工作日內回覆",
    href: "mailto:johnny@aegispowerapi.com",
  },
  {
    icon: Mail,
    label: "Sales & RFQ",
    primary: "sales@aegispowerapi.com",
    secondary: "業務洽詢與報價需求",
    href: "mailto:sales@aegispowerapi.com",
  },
  {
    icon: Layers,
    label: "服務範圍",
    primary: "工程集成｜AI 系統整合",
    secondary: "Aegis Business Apps｜企業管理系統導入",
  },
  {
    icon: Users,
    label: "服務對象",
    primary: "工程公司、製造業、科技廠供應鏈",
    secondary: "資料中心、弱電工程團隊、中小企業、會計師與顧問通路",
  },
];

const services = [
  "工程集成服務",
  "AI 系統整合",
  "Aegis CostFlow",
  "Aegis SalesOps",
  "Aegis AI Launch",
  "企業管理系統導入",
  "其他合作洽談",
];

function Contact() {
  const [submitted, setSubmitted] = useState(false);

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
              <span className="eyebrow"><span className="dot" /> 聯絡我們</span>
              <h1 className="mt-6 text-4xl md:text-5xl">聯絡宏鼎集成</h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                無論您是想評估工程整合、導入 AI 系統，或希望以模組化方式建立企業管理系統，歡迎與宏鼎集成聯繫。
                我們將依照您的產業、流程與導入需求，安排初步諮詢。
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift">
                <img
                  src={contactMeeting}
                  alt="企業諮詢與系統導入會議視覺"
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
                <div key={label} className="panel p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">{label}</div>
                  {href ? (
                    <a href={href} className="mt-1 block text-base font-semibold hover:text-foreground break-all">
                      {primary}
                    </a>
                  ) : (
                    <div className="mt-1 text-base font-semibold leading-snug">{primary}</div>
                  )}
                  <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{secondary}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 公司位置</span>
              <h2 className="mt-4 text-3xl md:text-4xl">公司位置</h2>
            </div>
            <div className="mt-8 panel overflow-hidden">
              <iframe
                title="宏鼎集成公司位置 — 台中市西區台灣大道二段2號20樓"
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
              宏鼎集成位於台中市西區台灣大道二段，鄰近台中市中心商務區，
              可作為企業諮詢、系統導入討論與合作洽談據點。
            </p>
          </div>
        </section>

        {/* Inquiry form */}
        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-8 md:p-12">
              <div className="max-w-2xl">
                <span className="eyebrow"><span className="dot" /> 預約諮詢</span>
                <h2 className="mt-4 text-3xl md:text-4xl">預約諮詢</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  填寫以下資訊，宏鼎集成顧問將於 1 個工作日內與您聯繫，提供初步建議與後續規劃。
                </p>
              </div>

              {submitted ? (
                <div className="mt-10 panel p-8 flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">已收到您的諮詢需求</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      感謝您的填寫，宏鼎集成將盡快與您聯繫。
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 grid gap-5 md:grid-cols-2">
                  <Field label="姓名" name="name" required />
                  <Field label="公司名稱" name="company" required />
                  <Field label="職稱" name="title" />
                  <Field label="電話" name="phone" type="tel" />
                  <Field label="Email" name="email" type="email" required className="md:col-span-2" />

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">想了解的服務</label>
                    <select
                      name="service"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      <option value="" disabled>請選擇服務項目</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">需求說明</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="請簡述目前的流程現況、痛點，或希望了解的服務範圍。"
                      className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-y"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                    <button type="submit" className="btn btn-primary">
                      送出諮詢需求 <ArrowRight className="h-4 w-4" />
                    </button>
                    <a href="mailto:johnny@aegispowerapi.com" className="btn btn-ghost">
                      改用 Email 聯繫
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
