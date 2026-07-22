import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, BrainCircuit, Database, FileBarChart, MessagesSquare, Settings2, Workflow } from "lucide-react";


import { OG_IMAGE, SITE_URL } from "@/lib/seo";
import { L, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/ai-integration")({
  head: () => ({
    meta: [
      { title: "企業 AI 顧問服務｜宏鼎集成｜Enterprise AI Advisory" },
      { name: "description", content: "宏鼎集成提供企業 AI 顧問服務：流程盤點、資料治理、工具整合、AI 助理與代理人設計、自動化串接、教育訓練與導入陪跑。我們不是軟體開發商，而是把 AI 放進企業流程的顧問夥伴。Enterprise AI advisory, tool integration, training and adoption coaching — not custom software." },
      { property: "og:title", content: "Enterprise AI Advisory | AEGIS POWER INTEGRATIONS" },
      { property: "og:description", content: "AI advisory, tool integration, training and adoption coaching — we embed AI into real business workflows." },
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
          serviceType: "AI System Integration",
          provider: {
            "@type": "Organization",
            name: "AEGIS POWER INTEGRATIONS",
            alternateName: "宏鼎集成股份有限公司",
            url: `${SITE_URL}/`,
          },
          areaServed: "TW",
          description: "Process discovery, AI assistants and knowledge bases, CRM/ERP integration, automation workflows, BI dashboards and enterprise AI adoption.",
        }),
      },
    ],
  }),
  component: AiIntegration,
});

type Bi = { zh: string; en: string };

const services: { icon: React.ComponentType<{ className?: string }>; t: Bi; d: Bi }[] = [
  { icon: Settings2, t: { zh: "企業流程訪談與盤點", en: "Process Interview & Discovery" }, d: { zh: "由顧問訪談現場與管理層，盤點報價、成本、客戶、專案等關鍵流程。", en: "Consultants interview field and management to map quotation, cost, customer and project workflows." } },
  { icon: Workflow, t: { zh: "流程數位化", en: "Workflow Digitalization" }, d: { zh: "將報價、成本、CRM、庫存、專案流程逐步系統化與標準化。", en: "Progressively systematize and standardize quotation, cost, CRM, inventory and project workflows." } },
  { icon: BrainCircuit, t: { zh: "AI 助理與知識庫", en: "AI Assistants & Knowledge Base" }, d: { zh: "建置內部 AI 助理與企業知識庫，讓員工可快速查詢與決策。", en: "Deploy internal AI assistants and knowledge bases so staff can query and decide faster." } },
  { icon: MessagesSquare, t: { zh: "自動化串接", en: "Automation Integration" }, d: { zh: "LINE、Google Workspace、API、n8n 等工具串接與工作流自動化。", en: "LINE, Google Workspace, APIs, n8n and workflow automation integrations." } },
  { icon: FileBarChart, t: { zh: "管理儀表板與週報", en: "Dashboards & Weekly Reports" }, d: { zh: "依角色設計儀表板與自動週報，主管可即時掌握營運狀態。", en: "Role-based dashboards and automated weekly reports for real-time management visibility." } },
  { icon: Database, t: { zh: "既有系統與流程改善", en: "Existing System & Workflow Improvement" }, d: { zh: "盤點 ERP、CRM、Excel 等既有工具，判斷應調整流程、加做串接，或引入合作廠商，避免不必要的重建。", en: "Audit ERP, CRM, Excel and other tools, then decide whether to adjust workflows, add integrations or bring in partners — instead of unnecessary rebuilds." } },
];

const scenarios: Bi[] = [
  { zh: "報價與成本流程數位化", en: "Quotation and cost workflow digitalization" },
  { zh: "業務拜訪與 CRM 管理", en: "Sales visits and CRM management" },
  { zh: "LINE 回報與自動週報", en: "LINE reporting and automated weekly reports" },
  { zh: "庫存、採購、請款與專案資料整合", en: "Inventory, procurement, billing and project data integration" },
  { zh: "企業內部 AI 助理與知識庫", en: "Internal AI assistants and knowledge bases" },
  { zh: "Google Workspace、n8n、API、自動化報表串接", en: "Google Workspace, n8n, API and automated reporting integration" },
];

function AiIntegration() {
  const { isEn } = useLang();
  
  const tr = (b: Bi) => (isEn ? b.en : b.zh);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
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

            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift bg-ink text-ink-foreground p-8">
                <div className="text-xs uppercase tracking-widest text-ink-foreground/60">
                  <L zh="服務情境示意" en="Service concept" />
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
              <span className="eyebrow"><span className="dot" /> <L zh="常見導入情境" en="Common Scenarios" /></span>
              <h2 className="mt-4 text-3xl md:text-4xl"><L zh="常見導入情境" en="Common Adoption Scenarios" /></h2>
              <p className="mt-3 text-muted-foreground">
                <L
                  zh="以下是我們在企業端最常協助導入的 AI 與系統整合場景。"
                  en="The AI and system integration scenarios we most commonly deliver."
                />
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scenarios.map((s) => (
                <div key={s.en} className="panel p-5 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-[15px] font-medium">{tr(s)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl"><L zh="導入流程" en="Adoption Process" /></h2>
              <div className="mt-6 grid gap-5 md:grid-cols-4">
                {[
                  { n: "01", t: { zh: "流程盤點", en: "Process Discovery" }, d: { zh: "訪談現場與主管，盤點關鍵流程與資料來源。", en: "Interview field and managers; map key workflows and data sources." } },
                  { n: "02", t: { zh: "藍圖設計", en: "Blueprint Design" }, d: { zh: "提出系統與 AI 導入藍圖，明確範圍與順序。", en: "Present a system and AI adoption blueprint with clear scope and sequencing." } },
                  { n: "03", t: { zh: "建置與串接", en: "Build & Integrate" }, d: { zh: "建立系統、AI 助理與自動化工作流。", en: "Build systems, AI assistants and automation workflows." } },
                  { n: "04", t: { zh: "教育與優化", en: "Training & Optimization" }, d: { zh: "教育訓練與導入後追蹤，持續優化流程。", en: "Training and post-launch follow-up for continuous improvement." } },
                ].map((s) => (
                  <div key={s.n}>
                    <span className="num-badge">{s.n}</span>
                    <h3 className="mt-3 text-base font-semibold">{tr(s.t)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tr(s.d)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">
                <L zh="想開始導入 AI 嗎？" en="Ready to start with AI?" />
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                <L
                  zh="從一個流程開始，我們協助你盤點、設計、導入，逐步建立企業自己的 AI 與自動化能力。"
                  en="Start with one workflow — we help you discover, design and deploy your own AI and automation capabilities."
                />
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn btn-primary"><L zh="聯絡我們" en="Contact Us" /> <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/engineering" className="btn btn-ghost"><L zh="查看工程整合服務" en="View Engineering Services" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
