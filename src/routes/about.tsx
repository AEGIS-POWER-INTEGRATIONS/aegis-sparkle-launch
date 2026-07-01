import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import {
  ArrowRight,
  Cable,
  BrainCircuit,
  Boxes,
  AlertTriangle,
  Workflow,
  Database,
  Sparkles,
  Layers3,
  Factory,
  Cpu,
  Server,
  Building2,
  Briefcase,
  HardHat,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "關於宏鼎｜宏鼎集成股份有限公司" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. — AI 時代的工程與企業系統整合夥伴，結合工程集成、AI 系統開發與企業流程數位化，協助企業從現場工程到 AI 自動化建立可管理、可擴充的營運能力。" },
      { property: "og:title", content: "關於宏鼎｜宏鼎集成股份有限公司" },
      { property: "og:description", content: "AI 時代的工程與企業系統整合夥伴。工程集成、AI 系統整合、模組化企業系統。" },
      { property: "og:url", content: "https://aegis-sparkle-launch.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://aegis-sparkle-launch.lovable.app/about" }],
  }),
  component: About,
});

const problems = [
  {
    icon: AlertTriangle,
    title: "工程現場與管理系統斷裂",
    desc: "許多企業現場作業、報價、請款、進度與成本資料分散在 Excel、LINE、紙本與個人經驗中，難以即時掌握。",
  },
  {
    icon: Layers3,
    title: "傳統 ERP 太重、導入太慢",
    desc: "中小企業需要的是可以快速上線、逐步擴充、貼近實際流程的輕量化企業管理系統。",
  },
  {
    icon: Sparkles,
    title: "AI 工具很多，但缺少導入方法",
    desc: "企業真正需要的不是單一 AI 工具，而是把 AI 放進實際工作流程中，協助員工、主管與經營者提升效率。",
  },
  {
    icon: Workflow,
    title: "工程與系統需要一起思考",
    desc: "對工程公司與科技廠供應鏈而言，工程能力、資料能力與系統能力必須整合，才能支撐更高品質的服務交付。",
  },
];

const capabilities = [
  {
    icon: Cable,
    title: "工程集成能力",
    desc: "弱電、網路、光纖、監控、門禁、資料中心與廠區系統整合，協助企業完成現場端基礎建置與工程協調。",
  },
  {
    icon: BrainCircuit,
    title: "AI 系統整合能力",
    desc: "協助企業進行流程盤點、資料整理、AI 助理設計、自動化串接、管理儀表板與內部知識庫建置。",
  },
  {
    icon: Boxes,
    title: "模組化企業系統能力",
    desc: "透過 Aegis Business Apps，協助企業快速建立報價、成本、CRM、業務管理、專案管理與營運儀表板。",
  },
];

const steps = [
  { n: "01", title: "流程訪談", desc: "了解企業目前的作業方式、痛點與資料來源。" },
  { n: "02", title: "需求盤點", desc: "整理出可優先改善的流程，例如報價、成本、CRM、庫存、專案管理或週報。" },
  { n: "03", title: "系統設計", desc: "以模組化方式設計第一階段可落地功能，避免一次導入過度複雜。" },
  { n: "04", title: "快速導入", desc: "協助企業將現有 Excel、表單、LINE 回報或內部資料逐步轉入系統。" },
  { n: "05", title: "AI 與自動化擴充", desc: "依照企業成熟度，逐步加入 AI 助理、自動報表、API 串接與決策儀表板。" },
];

const audiences = [
  { icon: HardHat, label: "工程公司" },
  { icon: Factory, label: "製造業" },
  { icon: Cpu, label: "半導體與科技廠供應鏈" },
  { icon: Server, label: "資料中心與弱電工程團隊" },
  { icon: Briefcase, label: "會計師、顧問與企業服務通路" },
  { icon: Building2, label: "想導入 AI 與輕量化企業管理系統的中小企業" },
];

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-24">
          <div className="container-x max-w-4xl">
            <span className="eyebrow"><span className="dot" /> 關於宏鼎</span>
            <h1 className="mt-6 text-4xl md:text-5xl">關於宏鼎集成</h1>
            <p className="mt-3 text-sm text-muted-foreground tracking-wider">
              Aegis Power Integrations Co., Ltd.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. 是一家結合工程集成、AI 系統開發與企業流程數位化的整合型公司。
              我們協助工程公司、製造業、科技廠供應鏈與中小企業，從現場工程、流程管理、資料整合到 AI 自動化，建立更有效率、更可管理、更可擴充的營運能力。
            </p>
          </div>
        </section>

        {/* Positioning */}
        <section className="pb-20">
          <div className="container-x">
            <div className="panel-lift p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start">
                <div>
                  <span className="tag">Positioning</span>
                  <h2 className="mt-4 text-2xl md:text-3xl leading-snug">
                    AI 時代的<br />工程與企業系統<br />整合夥伴
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">
                  我們相信，企業數位化不只是導入一套軟體，而是將實際營運流程、現場管理經驗、資料結構與決策需求重新整合。
                  宏鼎集成以工程現場與企業流程為基礎，結合 AI、自動化與模組化系統，協助企業用更務實的方式完成數位轉型。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 我們解決的問題</span>
              <h2 className="mt-4 text-3xl md:text-4xl">我們解決的問題</h2>
              <p className="mt-3 text-muted-foreground">
                從工程現場到企業管理，宏鼎集成聚焦四個最常見、也最關鍵的營運斷點。
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {problems.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="panel p-7">
                  <div className="flex items-start gap-4">
                    <div className="num-badge shrink-0">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-lg">{title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core capabilities */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 核心能力</span>
              <h2 className="mt-4 text-3xl md:text-4xl">核心能力</h2>
              <p className="mt-3 text-muted-foreground">
                工程、AI 與企業系統三條主軸，貫穿宏鼎集成所有服務。
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="panel p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-3xl">
              <span className="eyebrow"><span className="dot" /> 導入方法</span>
              <h2 className="mt-4 text-3xl md:text-4xl">從單一流程開始，逐步建立企業數位營運系統</h2>
              <p className="mt-3 text-muted-foreground">
                我們以模組化方式分階段導入，降低風險、縮短上線時間，讓企業在每一步都能看見成效。
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {steps.map((s, i) => (
                <div key={s.n} className="relative panel p-6">
                  <div className="text-xs font-mono tracking-widest text-muted-foreground">STEP {s.n}</div>
                  <h3 className="mt-3 text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 z-10 text-muted-foreground/50">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section className="pb-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 服務對象</span>
              <h2 className="mt-4 text-3xl md:text-4xl">服務對象</h2>
              <p className="mt-3 text-muted-foreground">
                從現場工程到企業總部，宏鼎集成的服務涵蓋以下領域。
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map(({ icon: Icon, label }) => (
                <div key={label} className="panel p-5 flex items-center gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 border border-border">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="text-[15px] font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand spirit */}
        <section className="pb-20">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-14">
              <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start">
                <div>
                  <span className="tag">Brand</span>
                  <h2 className="mt-4 text-3xl md:text-4xl leading-tight">
                    務實、整合、<br />可落地
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    宏鼎集成不追求華麗但難以落地的系統，而是重視企業真實流程、資料可用性、導入成本與後續擴充。
                    我們希望成為企業在工程集成、AI 導入與營運系統升級上的長期合作夥伴。
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { icon: Workflow, label: "貼近實際流程" },
                      { icon: Database, label: "資料可用、可治理" },
                      { icon: Sparkles, label: "可分階段擴充" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="rounded-lg border border-border bg-surface/60 p-3 text-center">
                        <Icon className="h-4 w-4 mx-auto text-muted-foreground" />
                        <div className="mt-2 text-xs font-medium">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl">想讓企業流程開始系統化與 AI 化嗎？</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                從一個流程開始，宏鼎集成協助你盤點、設計、導入，逐步建立企業自己的數位營運系統。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary">預約諮詢 <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="btn btn-ghost">聯絡我們</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
