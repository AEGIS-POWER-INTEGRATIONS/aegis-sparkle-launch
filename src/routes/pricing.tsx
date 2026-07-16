import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Check, Sparkles } from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang } from "@/lib/i18n";

type Bi = { zh: string; en: string };

const FAQ_ITEMS: { q: Bi; a: Bi }[] = [
  {
    q: { zh: "訂閱費與導入費有什麼不同？", en: "What's the difference between subscription and rollout fees?" },
    a: { zh: "訂閱費為系統使用、維護與版本更新費用；導入費為一次性的流程訪談、欄位設定、資料整理、教育訓練與上線輔導費用。", en: "Subscription covers software use, maintenance and version updates. Rollout is a one-time fee covering process interviews, field configuration, data preparation, training and go-live support." },
  },
  {
    q: { zh: "可以只先導入單一流程嗎？", en: "Can we start with only one workflow?" },
    a: { zh: "可以。建議從報價、成本、CRM、業務週報或專案管理其中一個流程開始，再逐步擴充。", en: "Yes. We recommend starting with one workflow — quotation, cost, CRM, sales weekly reports or project management — and expanding from there." },
  },
  {
    q: { zh: "可以串接既有 ERP 或 Excel 嗎？", en: "Can you integrate with existing ERP or Excel?" },
    a: { zh: "可以依需求評估。常見方式包含 Excel / CSV 匯入、API、Webhook 或資料庫同步。", en: "Yes, evaluated per case. Common approaches include Excel/CSV import, APIs, webhooks or database sync." },
  },
  {
    q: { zh: "導入大約需要多久？", en: "How long does rollout take?" },
    a: { zh: "標準導入通常 2–4 週可上線第一階段功能；若涉及多部門、歷史資料搬遷或系統串接，時程將依需求另行評估。", en: "A standard rollout goes live in 2–4 weeks for phase one. Multi-department, historical migration or integrations are scoped separately." },
  },
  {
    q: { zh: "工程集成服務如何報價？", en: "How is engineering integration priced?" },
    a: { zh: "工程集成、能源與機電工程服務將依現場條件、施工範圍、設備規格、工期、人力與協力廠商需求另行評估。", en: "Engineering, energy and MEP services are quoted based on site conditions, scope, equipment specs, timeline, manpower and subcontractor requirements." },
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "價格方案｜AEGIS POWER INTEGRATIONS｜Pricing" },
      { name: "description", content: "AEGIS POWER INTEGRATIONS Aegis Business Apps 提供 Starter、Pro 與 Business 三種訂閱方案。Pricing for Aegis Business Apps: Starter, Pro and Business plans." },
      { property: "og:title", content: "Pricing | AEGIS POWER INTEGRATIONS" },
      { property: "og:description", content: "Starter / Pro / Business plans plus rollout services." },
      { property: "og:url", content: `${SITE_URL}/pricing` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/pricing` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q.zh,
            acceptedAnswer: { "@type": "Answer", text: item.a.zh },
          })),
        }),
      },
    ],
  }),
  component: Pricing,
});

const plans: {
  name: string;
  title: Bi;
  price: Bi;
  suffix: Bi;
  desc: Bi;
  features: Bi[];
  cta: Bi;
  variant: "ghost" | "primary";
  featured?: boolean;
}[] = [
  {
    name: "Starter",
    title: { zh: "單一流程導入", en: "Single Workflow" },
    price: { zh: "NT$5,000", en: "NT$5,000" },
    suffix: { zh: "/ 月起", en: "/ month, from" },
    desc: { zh: "適合單一流程數位化與初期試用，例如報價表單、客戶資料、簡易報表或單一部門流程。", en: "For single-workflow digitalization and initial trials — quotation forms, customer data, simple reports or one department." },
    features: [
      { zh: "單一產品 / 單一流程模組", en: "One product / one workflow module" },
      { zh: "標準欄位與範本", en: "Standard fields and templates" },
      { zh: "Excel / CSV 匯入", en: "Excel / CSV import" },
      { zh: "基本報表與權限設定", en: "Basic reports and permissions" },
      { zh: "Email 支援", en: "Email support" },
    ],
    cta: { zh: "申請試用", en: "Request Trial" },
    variant: "ghost",
  },
  {
    name: "Pro",
    title: { zh: "中小企業正式導入", en: "SMB Production Rollout" },
    price: { zh: "NT$15,000", en: "NT$15,000" },
    suffix: { zh: "/ 月起", en: "/ month, from" },
    desc: { zh: "適合中小企業正式導入 CRM、報價、成本、業務管理或 AI 週報系統。建議作為正式導入 Aegis CostFlow、SalesOps 或 AI 週報系統的起始方案。", en: "For SMBs deploying CRM, quotation, cost, sales management or AI weekly-report systems in production — the starting plan for Aegis CostFlow, SalesOps or AI reports." },
    features: [
      { zh: "多流程模組權限", en: "Multi-workflow modules & permissions" },
      { zh: "AI 提醒與自動週報", en: "AI alerts and auto weekly reports" },
      { zh: "主管儀表板", en: "Management dashboard" },
      { zh: "欄位與報表設定", en: "Field and report configuration" },
      { zh: "導入顧問支援", en: "Rollout consultant support" },
    ],
    cta: { zh: "預約諮詢", en: "Book Consultation" },
    variant: "primary",
    featured: true,
  },
  {
    name: "Business",
    title: { zh: "企業多部門導入", en: "Enterprise Multi-Department" },
    price: { zh: "專案報價", en: "Custom Quote" },
    suffix: { zh: "", en: "" },
    desc: { zh: "適合多部門、多據點、需要串接既有系統或客製流程的企業。", en: "For enterprises with multiple departments, sites, existing system integration or customized workflows." },
    features: [
      { zh: "客製流程設定", en: "Custom workflow configuration" },
      { zh: "LINE / CRM / BI 串接", en: "LINE / CRM / BI integrations" },
      { zh: "專屬導入顧問", en: "Dedicated rollout consultant" },
      { zh: "專案級支援與資安需求評估", en: "Project-grade support and security assessment" },
    ],
    cta: { zh: "預約諮詢", en: "Book Consultation" },
    variant: "ghost",
  },
];

const rolloutPackages: {
  name: Bi;
  price: Bi;
  suffix: Bi;
  desc: Bi;
  items: Bi[];
  featured?: boolean;
}[] = [
  {
    name: { zh: "基礎導入", en: "Basic Rollout" },
    price: { zh: "NT$50,000", en: "NT$50,000" },
    suffix: { zh: "起", en: "from" },
    desc: { zh: "單一產品、單一部門上線。", en: "Single product, single department launch." },
    items: [
      { zh: "1 場啟動會議", en: "1 kick-off meeting" },
      { zh: "Excel 匯入與欄位對應", en: "Excel import and field mapping" },
      { zh: "標準範本套用", en: "Standard template application" },
      { zh: "上線教育訓練 1 場", en: "1 go-live training session" },
    ],
  },
  {
    name: { zh: "標準導入", en: "Standard Rollout" },
    price: { zh: "NT$120,000", en: "NT$120,000" },
    suffix: { zh: "起", en: "from" },
    desc: { zh: "跨部門流程，含主管儀表板設定。", en: "Cross-department workflows with management dashboards." },
    featured: true,
    items: [
      { zh: "2–3 場流程訪談", en: "2–3 process interviews" },
      { zh: "客製欄位與報表", en: "Custom fields and reports" },
      { zh: "主管儀表板設定", en: "Management dashboard setup" },
      { zh: "教育訓練 2 場 + 30 天輔導", en: "2 training sessions + 30 days of guidance" },
    ],
  },
  {
    name: { zh: "企業導入", en: "Enterprise Rollout" },
    price: { zh: "NT$300,000", en: "NT$300,000" },
    suffix: { zh: "起", en: "from" },
    desc: { zh: "多據點、多角色，含資料治理與權限規劃。", en: "Multi-site, multi-role with data governance and permission design." },
    items: [
      { zh: "完整流程診斷", en: "Full workflow diagnosis" },
      { zh: "權限與資安規範", en: "Permission and security policies" },
      { zh: "歷史資料搬遷", en: "Historical data migration" },
      { zh: "90 天導入顧問陪跑", en: "90 days of rollout consulting" },
    ],
  },
  {
    name: { zh: "系統串接", en: "System Integration" },
    price: { zh: "另行報價", en: "Custom Quote" },
    suffix: { zh: "", en: "" },
    desc: { zh: "依需求串接 LINE、CRM、ERP、BI 等。", en: "Integrations with LINE, CRM, ERP, BI, etc." },
    items: [
      { zh: "LINE 官方帳號 / Messaging API", en: "LINE Official Account / Messaging API" },
      { zh: "ERP 雙向同步", en: "Bi-directional ERP sync" },
      { zh: "BI 報表整合", en: "BI reporting integration" },
      { zh: "API / Webhook 客製", en: "Custom APIs / Webhooks" },
    ],
  },
];

function Pricing() {
  const { isEn } = useLang();
  const tr = (b: Bi) => (isEn ? b.en : b.zh);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> <L zh="價格方案" en="Pricing" /></span>
            <h1 className="mt-6 text-4xl md:text-5xl">
              <L zh="系統導入與訂閱方案" en="System Rollout & Subscription Plans" />
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              <L
                zh="以下方案主要適用於 Aegis Business Apps、AI 系統整合與企業流程數位化導入。工程集成與能源機電工程將依現場條件、施工範圍、設備規格與工期另行評估報價。"
                en="These plans apply to Aegis Business Apps, AI integration and enterprise workflow digitalization. Engineering, energy and MEP services are quoted separately based on site conditions, scope, equipment specs and timeline."
              />
            </p>
          </div>
        </section>


        <section className="pb-24">
          <div className="container-x grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`panel p-8 flex flex-col gap-5 ${p.featured ? "ring-2 ring-gold relative lg:-translate-y-2" : ""}`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 tag flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> <L zh="最受歡迎" en="Most Popular" />
                  </span>
                )}
                <div>
                  <div className="text-sm font-semibold text-gold uppercase tracking-wider">{p.name}</div>
                  <h3 className="mt-1 text-2xl">{tr(p.title)}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{tr(p.price)}</span>
                  <span className="text-sm text-muted-foreground">{tr(p.suffix)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{tr(p.desc)}</p>
                <ul className="space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f.en} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-gold flex-none" />{tr(f)}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Link to="/demo" className={`btn w-full ${p.variant === "primary" ? "btn-primary" : "btn-ghost"}`}>
                    {tr(p.cta)}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="container-x mt-14">
            <div className="panel p-8 grid gap-6 md:grid-cols-3 text-sm">
              {[
                { t: { zh: "導入時程", en: "Rollout Timeline" }, d: { zh: "標準導入 2–4 週可上線第一階段功能。", en: "Standard rollout: phase-one goes live in 2–4 weeks." } },
                { t: { zh: "資料搬遷", en: "Data Migration" }, d: { zh: "支援 Excel / CSV 匯入，常見欄位皆有對應範本。", en: "Excel / CSV import supported with templates for common fields." } },
                { t: { zh: "合約彈性", en: "Contract Flexibility" }, d: { zh: "月繳與年繳擇一，年繳享 2 個月優惠。", en: "Monthly or annual; annual plans include 2 months free." } },
              ].map((x) => (
                <div key={x.t.en}>
                  <div className="font-semibold">{tr(x.t)}</div>
                  <div className="text-muted-foreground mt-1">{tr(x.d)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rollout services */}
        <section className="py-20 bg-surface/40 border-y border-border/60">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="導入服務費" en="Rollout Services" /></span>
              <h2 className="mt-5 text-3xl md:text-4xl"><L zh="導入服務費" en="Rollout Service Fees" /></h2>
              <p className="mt-4 text-muted-foreground">
                <L
                  zh="從流程盤點到上線陪跑，協助系統真正落地。以下為一次性導入服務費，依公司流程複雜度、資料量與需要串接的系統選擇方案。"
                  en="From process discovery to go-live coaching, we ensure real adoption. The one-time rollout fees below are chosen based on complexity, data volume and integration needs."
                />
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {rolloutPackages.map((p) => (
                <div key={p.name.en} className={`panel p-6 flex flex-col gap-4 ${p.featured ? "ring-2 ring-gold" : ""}`}>
                  <div>
                    <div className="text-sm font-semibold">{tr(p.name)}</div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-bold tracking-tight">{tr(p.price)}</span>
                      {p.suffix.zh && <span className="text-sm text-muted-foreground">{tr(p.suffix)}</span>}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{tr(p.desc)}</p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {p.items.map((i) => (
                      <li key={i.en} className="flex gap-1.5"><Check className="h-3.5 w-3.5 mt-0.5 text-gold flex-none" />{tr(i)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted-foreground max-w-3xl leading-relaxed">
              <L
                zh="※ 導入服務費為一次性支付；訂閱方案另外計算。實際報價依公司規模、流程複雜度、資料量、所需串接系統與訓練場次調整。簽約前提供書面估價單。"
                en="※ Rollout fees are one-time; subscription is billed separately. Final pricing adjusts for company size, complexity, data volume, integrations and training sessions. A written quote is provided before signing."
              />
            </p>

            <div className="mt-8 panel-lift p-6 md:p-8 max-w-4xl">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <span className="tag shrink-0"><L zh="服務範圍說明" en="Scope Note" /></span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <L
                    zh={<>以上價格主要適用於 Aegis Business Apps 與 AI 系統整合導入。<strong className="text-foreground"> 工程集成服務</strong>將依現場條件、施工範圍、設備規格、工期與協力廠商需求另行報價。</>}
                    en={<>These prices apply to Aegis Business Apps and AI integration rollouts. <strong className="text-foreground">Engineering integration services</strong> are quoted separately based on site conditions, scope, equipment specs, timeline and subcontractor requirements.</>}
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container-x max-w-4xl">
            <span className="eyebrow"><span className="dot" /> <L zh="常見問題" en="FAQ" /></span>
            <h2 className="mt-5 text-3xl md:text-4xl">
              <L zh="價格與導入常見問題" en="Pricing & Rollout FAQ" />
            </h2>

            <div className="mt-10 grid gap-4">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="panel p-6">
                  <h3 className="text-base font-semibold">{tr(item.q)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tr(item.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
