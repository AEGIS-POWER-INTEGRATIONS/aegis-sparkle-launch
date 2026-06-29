import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, BrainCircuit, Database, FileBarChart, MessagesSquare, Settings2, Workflow } from "lucide-react";

export const Route = createFileRoute("/ai-integration")({
  head: () => ({
    meta: [
      { title: "AI 系統整合服務｜宏鼎集成" },
      { name: "description", content: "從企業流程訪談與盤點、AI 助理建置、自動化串接到管理儀表板，協助企業真正把 AI 導入日常營運。" },
      { property: "og:title", content: "AI 系統整合服務｜宏鼎集成" },
      { property: "og:description", content: "企業流程數位化、AI 助理、自動化與儀表板一站式導入。" },
      { property: "og:url", content: "https://aegis-sparkle-launch.lovable.app/ai-integration" },
    ],
    links: [{ rel: "canonical", href: "https://aegis-sparkle-launch.lovable.app/ai-integration" }],
  }),
  component: AiIntegration,
});

const services = [
  { icon: Settings2, t: "企業流程訪談與盤點", d: "由顧問訪談現場與管理層，盤點報價、成本、客戶、專案等關鍵流程。" },
  { icon: Workflow, t: "流程數位化", d: "將報價、成本、CRM、庫存、專案流程逐步系統化與標準化。" },
  { icon: BrainCircuit, t: "AI 助理與知識庫", d: "建置內部 AI 助理與企業知識庫，讓員工可快速查詢與決策。" },
  { icon: MessagesSquare, t: "自動化串接", d: "LINE、Google Workspace、API、n8n 等工具串接與工作流自動化。" },
  { icon: FileBarChart, t: "管理儀表板與週報", d: "依角色設計儀表板與自動週報，主管可即時掌握營運狀態。" },
  { icon: Database, t: "客製化企業系統開發", d: "依產業特性與既有系統，提供模組化或客製化開發服務。" },
];

function AiIntegration() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> AI Integration</span>
            <h1 className="mt-6 text-4xl md:text-5xl">AI 系統整合服務</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              宏鼎集成協助企業從流程盤點、資料整合、AI 助理建置到自動化串接，逐步把 AI 真正導入日常工作流程，建立可持續迭代的數位營運能力。
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, t, d }) => (
              <div key={t} className="panel p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-ink-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl">導入流程</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-4">
                {[
                  ["01", "流程盤點", "訪談現場與主管，盤點關鍵流程與資料來源。"],
                  ["02", "藍圖設計", "提出系統與 AI 導入藍圖，明確範圍與順序。"],
                  ["03", "建置與串接", "建立系統、AI 助理與自動化工作流。"],
                  ["04", "教育與優化", "教育訓練與導入後追蹤，持續優化流程。"],
                ].map(([n, t, d]) => (
                  <div key={n}>
                    <span className="num-badge">{n}</span>
                    <h3 className="mt-3 text-base font-semibold">{t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">想開始導入 AI 嗎？</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                從一個流程開始，我們協助你盤點、設計、導入，逐步建立企業自己的 AI 與自動化能力。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary">預約諮詢 <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/ai-launch" className="btn btn-ghost">了解 Aegis AI Launch</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
