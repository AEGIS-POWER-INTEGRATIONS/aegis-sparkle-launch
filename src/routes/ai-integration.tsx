import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import {
  ArrowRight,
  BrainCircuit,
  ClipboardList,
  Compass,
  FlaskConical,
  GraduationCap,
  Search,
  Settings2,
  Workflow,
  Database,
  FileBarChart,
  MessagesSquare,
} from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/ai-integration")({
  head: () => ({
    meta: [
      { title: "企業 AI 顧問與導入服務｜宏鼎集成｜Enterprise AI Advisory" },
      { name: "description", content: "宏鼎集成企業 AI 顧問與導入服務：初步訪談、流程健檢、導入建議、小規模驗證與導入陪跑五個階段。協助企業從單一部門開始，把 AI 真正放進日常工作。" },
      { property: "og:title", content: "Enterprise AI Advisory | AEGIS POWER INTEGRATIONS" },
      { property: "og:description", content: "Five-step AI advisory: interview, diagnostic, recommendation, PoC and adoption coaching — bringing AI into everyday work." },
      { property: "og:url", content: `${SITE_URL}/ai-integration` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ai-integration` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Enterprise AI Advisory",
          provider: {
            "@type": "Organization",
            name: "AEGIS POWER INTEGRATIONS",
            alternateName: "宏鼎集成股份有限公司",
            url: `${SITE_URL}/`,
          },
          areaServed: "TW",
          description: "Interview, process diagnostic, recommendation, small-scale PoC and adoption coaching — enterprise AI advisory and rollout services.",
        }),
      },
    ],
  }),
  component: AiIntegration,
});

type Bi = { zh: string; en: string };

const services: { icon: React.ComponentType<{ className?: string }>; t: Bi; d: Bi }[] = [
  { icon: Settings2, t: { zh: "企業流程訪談與盤點", en: "Process Interview & Discovery" }, d: { zh: "由顧問訪談現場與管理層，盤點報價、成本、客戶、專案等關鍵流程。", en: "Consultants interview field and management to map quotation, cost, customer and project workflows." } },
  { icon: Workflow, t: { zh: "流程數位化建議", en: "Workflow Digitalization" }, d: { zh: "將報價、成本、CRM、庫存、專案流程逐步系統化與標準化。", en: "Progressively systematize and standardize quotation, cost, CRM, inventory and project workflows." } },
  { icon: BrainCircuit, t: { zh: "AI 助理與知識庫", en: "AI Assistants & Knowledge Base" }, d: { zh: "建置內部 AI 助理與企業知識庫，讓員工可快速查詢與決策。", en: "Deploy internal AI assistants and knowledge bases so staff can query and decide faster." } },
  { icon: MessagesSquare, t: { zh: "自動化串接", en: "Automation Integration" }, d: { zh: "LINE、Google Workspace、API、n8n 等工具串接與工作流自動化。", en: "LINE, Google Workspace, APIs, n8n and workflow automation integrations." } },
  { icon: FileBarChart, t: { zh: "管理儀表板與週報", en: "Dashboards & Weekly Reports" }, d: { zh: "依角色設計儀表板與自動週報，主管可即時掌握營運狀態。", en: "Role-based dashboards and automated weekly reports for real-time management visibility." } },
  { icon: Database, t: { zh: "既有系統與流程改善", en: "Existing System & Workflow Improvement" }, d: { zh: "盤點 ERP、CRM、Excel 等既有工具，判斷應調整流程、加做串接，或引入合作廠商，避免不必要的重建。", en: "Audit ERP, CRM, Excel and other tools, then decide whether to adjust workflows, add integrations or bring in partners — instead of unnecessary rebuilds." } },
];

const scenarios: Bi[] = [
  { zh: "員工大量重複整理 Excel", en: "Staff spend hours re-formatting Excel every week" },
  { zh: "報價資料分散在多個檔案與人員手中", en: "Estimating data scattered across files and people" },
  { zh: "工程日報依賴 LINE 人工彙整", en: "Daily engineering reports still hand-collated from LINE" },
  { zh: "客戶資料沒有統一管理", en: "No single customer record of truth" },
  { zh: "管理者無法即時掌握專案與成本", en: "Managers cannot see project and cost status in real time" },
  { zh: "公司已經有 ERP，但資料仍無法有效運用", en: "ERP is deployed but data isn't actionable" },
  { zh: "想使用 AI，卻不知道先從哪個部門開始", en: "Want to adopt AI but unsure which department to start with" },
];

const process = [
  { n: "01", icon: MessagesSquare, t: { zh: "初步訪談", en: "Initial Interview" }, d: { zh: "了解公司、部門與目前的痛點，釐清期望的成果與範圍。", en: "Understand the company, departments and current pain points; align on expected outcomes and scope." } },
  { n: "02", icon: Search, t: { zh: "流程健檢", en: "Process Diagnostic" }, d: { zh: "盤點資料、工作流程與既有工具，找出可改善與可自動化的環節。", en: "Audit data, workflows and existing tools; identify improvement and automation candidates." } },
  { n: "03", icon: Compass, t: { zh: "導入建議", en: "Recommendation" }, d: { zh: "確認優先順序、工具選型與預算，並提出可分階段執行的導入藍圖。", en: "Set priorities, tool selection and budget; deliver a phased adoption blueprint." } },
  { n: "04", icon: FlaskConical, t: { zh: "小規模驗證", en: "Small-Scale PoC" }, d: { zh: "先用 PoC 於單一部門驗證可行性，取得量化與定性回饋。", en: "Validate feasibility with a single-department PoC; gather quantitative and qualitative feedback." } },
  { n: "05", icon: GraduationCap, t: { zh: "導入陪跑", en: "Adoption Coaching" }, d: { zh: "教育訓練、流程調整與持續改善，讓工具真正被員工使用。", en: "Training, workflow tuning and continuous improvement so tools are actually used." } },
];

function AiIntegration() {
  const { isEn } = useLang();
  const tr = (b: Bi) => (isEn ? b.en : b.zh);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20">
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow"><span className="dot" /> <L zh="企業 AI 顧問" en="Enterprise AI Advisory" /></span>
              <h1 className="mt-6 text-4xl md:text-5xl"><L zh="企業 AI 顧問與導入服務" en="Enterprise AI Advisory & Implementation" /></h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                <L
                  zh="宏鼎集成提供企業 AI 顧問與導入陪跑服務。我們協助企業盤點問題、選擇工具、串接既有系統與 AI 模型，並以教育訓練與導入陪跑，讓 AI 真正落到日常工作。我們不會要求客戶全面更換既有系統，而是依現況判斷應採用既有工具、系統串接、流程調整或合作廠商導入。"
                  en="We provide enterprise AI advisory and adoption coaching. We help you audit problems, select tools, integrate with existing systems and AI models, and land AI into daily work through training and hands-on coaching. We do not push wholesale system replacement — we choose between keeping existing tools, integrating, adjusting workflows or bringing in partners."
                />
              </p>
              <p className="mt-4 text-base text-foreground font-medium leading-relaxed">
                <L
                  zh="顧問先行、導入陪跑；不做沒人用的系統，只把有用的 AI 放進企業流程。"
                  en="Advisory first, adoption coaching alongside — we embed useful AI, not shelfware."
                />
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" search={{ inquiry: "aiHealth" }} className="btn btn-primary">
                  <L zh="預約 AI 流程健檢" en="Book AI process diagnostic" /> <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" search={{ inquiry: "poc" }} className="btn btn-ghost">
                  <L zh="申請 PoC 評估" en="Apply for PoC assessment" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift bg-ink text-ink-foreground p-8">
                <div className="text-xs uppercase tracking-widest text-ink-foreground/60">
                  <L zh="介面概念示意" en="Interface concept" />
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    { k: "01", zh: "流程盤點與資料治理", en: "Workflow audit & data governance" },
                    { k: "02", zh: "工具整合與 AI 助理設計", en: "Tool integration & AI assistants" },
                    { k: "03", zh: "教育訓練與導入陪跑", en: "Training & adoption coaching" },
                  ].map((it) => (
                    <div key={it.k} className="rounded-lg bg-ink-foreground/10 p-4 flex gap-3">
                      <span className="text-xs font-mono text-gold">{it.k}</span>
                      <span className="text-sm"><L zh={it.zh} en={it.en} /></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common scenarios */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> <L zh="常見適合導入的情境" en="When AI Advisory Fits" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="這些是我們最常協助改善的情境" en="Scenarios we most commonly help with" /></h2>
              <p className="mt-3 text-muted-foreground">
                <L
                  zh="如果您的公司出現以下情況，通常代表流程與資料層有明確可改善的空間。"
                  en="If your company sees any of these, there is usually clear room to improve at the workflow and data layer."
                />
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scenarios.map((s) => (
                <div key={s.en} className="panel p-5 flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 mt-2" />
                  <span className="text-[15px] font-medium leading-relaxed">{tr(s)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="pb-24">
          <div className="container-x">
            <div className="max-w-2xl mb-10">
              <span className="eyebrow"><span className="dot" /> <L zh="服務範圍" en="Service Scope" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="AI 顧問與導入服務範圍" en="AI Advisory & Implementation Scope" /></h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, t: ttl, d }) => (
                <div key={ttl.en} className="panel p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg">{tr(ttl)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tr(d)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5-step process */}
        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-8 md:p-10">
              <div className="max-w-2xl">
                <span className="eyebrow"><span className="dot" /> <L zh="AI 顧問合作流程" en="AI Advisory Engagement Process" /></span>
                <h2 className="mt-4 text-2xl md:text-3xl">
                  <L zh="五個階段，一步步把 AI 放進企業流程" en="Five stages — bringing AI into daily work, step by step" />
                </h2>
                <p className="mt-3 text-muted-foreground">
                  <L
                    zh="每個階段皆可獨立委任，也可整段合作。我們建議先由「初步訪談」與「流程健檢」開始，避免一次投入過大。"
                    en="Each stage can stand alone or run as one engagement. We recommend starting with the interview and diagnostic to avoid over-committing up front."
                  />
                </p>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-5">
                {process.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.n} className="rounded-xl border border-border bg-surface/60 p-5">
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <span>STEP {s.n}</span>
                      </div>
                      <div className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3 text-base font-semibold">{tr(s.t)}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tr(s.d)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-surface/40 p-4">
                <ClipboardList className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <L
                    zh="每個階段結束後皆會提供書面重點紀錄，作為下一階段是否繼續合作的依據；不以未訪談前的固定價格取代需求評估。"
                    en="Each stage ends with a written recap that informs whether to continue — we never replace needs assessment with a fixed pre-interview price."
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">
                <L zh="想開始導入 AI 嗎？" en="Ready to start with AI?" />
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                <L
                  zh="從一個流程、一個部門開始，我們協助您盤點、驗證、導入，逐步建立企業自己的 AI 與自動化能力。"
                  en="Start with one workflow and one department — we help you diagnose, validate and deploy your own AI and automation capabilities."
                />
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/contact" search={{ inquiry: "aiHealth" }} className="btn btn-primary"><L zh="預約 AI 流程健檢" en="Book AI process diagnostic" /> <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/engineering" className="btn btn-ghost"><L zh="查看工程整合服務" en="View engineering services" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
