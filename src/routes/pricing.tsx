import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Check, Compass, Users, FlaskConical, Layers } from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang } from "@/lib/i18n";

type Bi = { zh: string; en: string };

const FAQ_ITEMS: { q: Bi; a: Bi }[] = [
  {
    q: { zh: "為什麼沒有固定月費或訂閱價格？", en: "Why no fixed monthly subscription price?" },
    a: { zh: "宏鼎集成以顧問與導入服務為核心，實際費用會依企業規模、部門數、資料完整度、串接範圍與導入目標調整。我們選擇不以未訪談前的固定價格取代需求評估。", en: "We deliver advisory and implementation services. Actual cost depends on company size, departments, data readiness, integration scope and adoption goals — we choose not to replace real scoping with a price tag." },
  },
  {
    q: { zh: "可以只做初步診斷嗎？", en: "Can we start with just a diagnosis?" },
    a: { zh: "可以。多數企業會先從「初步需求診斷」開始，確認問題與導入方向後，再決定是否進入 PoC 或月度顧問。", en: "Yes. Many clients begin with the Initial Needs Diagnosis, then decide whether to proceed to a PoC or monthly advisory." },
  },
  {
    q: { zh: "宏鼎集成會全面取代我們既有的 ERP 或系統嗎？", en: "Will you replace our existing ERP or systems?" },
    a: { zh: "通常不會。我們主張先盤點問題，再判斷應採用既有工具、系統串接、流程調整或引入合作廠商，避免不必要的重建成本。", en: "Usually not. We audit the problem first, then decide whether to keep existing tools, integrate, adjust workflows or bring in a partner — avoiding unnecessary rebuilds." },
  },
  {
    q: { zh: "工程整合服務如何報價？", en: "How is engineering integration priced?" },
    a: { zh: "工程整合、資料中心、光纖與弱電工程依現場條件、施工範圍、設備規格、工期、人力與協力廠商需求另行評估報價。", en: "Engineering integration, data-center, fiber and ELV work is quoted based on site conditions, scope, specs, timeline, manpower and subcontractor needs." },
  },
  {
    q: { zh: "有沒有政府補助或導入計畫可以搭配？", en: "Any government grants that can be paired?" },
    a: { zh: "有。宏鼎集成可協助評估與申請中小企業數位轉型、AI 導入、產業智慧化等政府補助計畫，實際適用資格依主管機關公告為準。", en: "Yes — we can help assess and apply for SMB digital-transformation, AI-adoption and industry-upgrade grants. Eligibility depends on the issuing authority." },
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "合作方式｜宏鼎集成｜工程整合與企業 AI 顧問" },
      { name: "description", content: "宏鼎集成以顧問與導入服務為核心，提供初步需求診斷、月度 AI 顧問、PoC 導入專案與企業整合方案。實際費用依企業現況與導入目標評估報價。" },
      { property: "og:title", content: "合作方式｜宏鼎集成" },
      { property: "og:description", content: "初步需求診斷、月度 AI 顧問、PoC 導入專案與企業整合方案，依需求評估報價。" },
      { property: "og:url", content: `${SITE_URL}/pricing` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: "合作方式｜宏鼎集成" },
      { name: "twitter:description", content: "顧問、PoC 與企業整合方案，依需求評估報價。" },
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
  icon: React.ComponentType<{ className?: string }>;
  code: string;
  title: Bi;
  price: Bi;
  desc: Bi;
  suitable: Bi;
  features: Bi[];
  cta: Bi;
  featured?: boolean;
}[] = [
  {
    icon: Compass,
    code: "Plan 01",
    title: { zh: "初步需求診斷", en: "Initial Needs Diagnosis" },
    price: { zh: "依企業規模與訪談範圍報價", en: "Quoted by company size and interview scope" },
    desc: { zh: "適合尚不確定問題與導入方向的企業，先釐清現況再談導入。", en: "For companies still clarifying their problem and direction before committing to any rollout." },
    suitable: { zh: "適用對象：想導入 AI 但不確定從哪裡開始的企業。", en: "Suitable for: companies wanting AI but unsure where to start." },
    features: [
      { zh: "需求訪談（1–2 場）", en: "1–2 needs-discovery interviews" },
      { zh: "現有流程初步盤點", en: "Preliminary workflow audit" },
      { zh: "問題清單與可行導入方向", en: "Problem list and viable directions" },
      { zh: "書面診斷建議報告", en: "Written diagnostic recommendation report" },
    ],
    cta: { zh: "預約需求諮詢", en: "Book Needs Consultation" },
  },
  {
    icon: Users,
    code: "Plan 02",
    title: { zh: "月度 AI 顧問", en: "Monthly AI Advisory" },
    price: { zh: "依服務時數、部門數量與顧問範圍報價", en: "Quoted by hours, departments and advisory scope" },
    desc: { zh: "適合希望持續推動 AI 應用，但內部缺乏專責人員的企業。", en: "For companies committed to advancing AI adoption but lacking a dedicated internal lead." },
    suitable: { zh: "適用對象：需要長期陪跑、持續優化流程的企業。", en: "Suitable for: companies needing ongoing coaching and process refinement." },
    features: [
      { zh: "每月固定顧問會議", en: "Fixed monthly advisory meetings" },
      { zh: "工具選型與流程優化建議", en: "Tool selection and workflow-optimization advice" },
      { zh: "員工 AI 教育訓練場次", en: "Employee AI training sessions" },
      { zh: "導入進度追蹤與月度摘要", en: "Adoption tracking and monthly summary" },
    ],
    cta: { zh: "預約 AI 流程健檢", en: "Book AI Workflow Check-up" },
    featured: true,
  },
  {
    icon: FlaskConical,
    code: "Plan 03",
    title: { zh: "PoC 導入專案", en: "PoC Implementation Project" },
    price: { zh: "專案報價", en: "Project-based quote" },
    desc: { zh: "適合已有明確問題，希望先進行小規模驗證後再擴大導入的企業。", en: "For companies with a defined problem who want a small-scale validation before scaling." },
    suitable: { zh: "適用對象：問題明確、希望以最小成本驗證成效的企業。", en: "Suitable for: teams with a clear problem seeking minimum-viable validation." },
    features: [
      { zh: "需求定義與資料盤點", en: "Requirement definition and data audit" },
      { zh: "原型建置與可行性驗證", en: "Prototype build and feasibility validation" },
      { zh: "使用者測試與回饋整理", en: "User testing and feedback consolidation" },
      { zh: "成效評估與下一階段建議", en: "Outcome review and next-phase recommendation" },
    ],
    cta: { zh: "申請 PoC 評估", en: "Request PoC Assessment" },
  },
  {
    icon: Layers,
    code: "Plan 04",
    title: { zh: "企業整合方案", en: "Enterprise Integration" },
    price: { zh: "預約顧問評估", en: "Book advisory assessment" },
    desc: { zh: "適合需要跨部門、跨系統或工程與營運整合的企業。", en: "For enterprises needing cross-department, cross-system or engineering-and-operations integration." },
    suitable: { zh: "適用對象：多部門、多據點、須整合工程現場與資訊系統的企業。", en: "Suitable for: multi-department, multi-site organizations integrating field and IT." },
    features: [
      { zh: "專案管理與流程設計", en: "Project management and workflow design" },
      { zh: "系統商協調與資料整合", en: "Vendor coordination and data integration" },
      { zh: "教育訓練與跨部門推廣", en: "Training and cross-team rollout" },
      { zh: "後續維運與擴充支援", en: "Ongoing operations and expansion support" },
    ],
    cta: { zh: "預約顧問評估", en: "Book Advisory Assessment" },
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
            <span className="eyebrow"><span className="dot" /> <L zh="合作方式" en="How We Work" /></span>
            <h1 className="mt-6 text-4xl md:text-5xl">
              <L zh="以顧問與導入服務為核心的合作方式" en="Advisory-first, implementation-anchored engagement" />
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              <L
                zh="宏鼎集成以工程整合為核心，結合企業 AI 顧問、流程改善、教育訓練、工具選型與導入陪跑，協助企業從現場工程到日常營運逐步完成數位化與 AI 導入。實際費用將依企業現況、資料完整度、使用人數、串接範圍與導入目標評估報價。"
                en="Aegis Power Integrations is engineering-led, layered with AI advisory, process improvement, training, tool selection and adoption coaching. Final quotes reflect your current state, data readiness, user count, integration scope and adoption goals."
              />
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <L
                zh="我們不以未訪談前的固定價格取代需求評估；每份正式報價均以書面提供。"
                en="We do not replace real scoping with pre-interview list prices. Every formal quote is issued in writing."
              />
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-6 lg:grid-cols-2">
            {plans.map(({ icon: Icon, code, title, price, desc, suitable, features, cta, featured }) => (
              <div
                key={code}
                className={`panel p-8 flex flex-col gap-5 ${featured ? "ring-2 ring-gold relative" : ""}`}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 tag">
                    <L zh="最常被選擇" en="Most Chosen" />
                  </span>
                )}
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground tracking-widest">{code}</span>
                </div>
                <div>
                  <h3 className="text-2xl">{tr(title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tr(desc)}</p>
                </div>
                <div className="rounded-md border border-border bg-surface/40 p-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground"><L zh="報價方式" en="Pricing" /></div>
                  <div className="mt-1 text-base font-semibold text-foreground">{tr(price)}</div>
                </div>
                <div className="text-xs text-muted-foreground">{tr(suitable)}</div>
                <ul className="space-y-2.5 text-sm">
                  {features.map((f) => (
                    <li key={f.en} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-gold flex-none" />{tr(f)}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Link to="/contact" className={`btn w-full ${featured ? "btn-primary" : "btn-ghost"}`}>
                    {tr(cta)}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="container-x mt-12">
            <div className="panel-lift p-8 md:p-10 max-w-4xl">
              <span className="tag"><L zh="關於報價的說明" en="Note on Pricing" /></span>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                <L
                  zh="宏鼎集成將依企業現況、資料完整度、使用人數、串接範圍及導入目標提供正式報價，不以未訪談前的固定價格取代需求評估。工程整合、資料中心、光纖與弱電工程另依現場條件、施工範圍、設備規格、工期與協力廠商需求評估報價。"
                  en="Formal quotes are issued after reviewing your context, data readiness, user count, integration scope and adoption goals — we do not substitute list prices for real scoping. Engineering, data-center, fiber and ELV work is quoted separately based on site conditions, scope, specs, timeline and subcontractor needs."
                />
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-surface/40 border-y border-border/60">
          <div className="container-x max-w-4xl">
            <span className="eyebrow"><span className="dot" /> <L zh="常見問題" en="FAQ" /></span>
            <h2 className="mt-5 text-3xl md:text-4xl">
              <L zh="合作方式常見問題" en="Engagement FAQ" />
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
