import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import {
  ArrowRight, Check, Cpu, HardHat, LayoutDashboard, FileSpreadsheet,
  MessagesSquare, Workflow, Database, BrainCircuit, Network, Building2,
  Factory, ServerCog, Cable, Briefcase, ShieldCheck, Boxes, Wrench,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "宏鼎集成｜AI 時代的工程與企業系統整合夥伴" },
      { name: "description", content: "宏鼎集成股份有限公司 Aegis Power Integrations Co., Ltd. 提供工程集成、AI 系統整合與 Aegis Business Apps 模組化企業系統，協助企業建立可落地的數位化能力。" },
      { property: "og:title", content: "宏鼎集成｜AI 時代的工程與企業系統整合夥伴" },
      { property: "og:description", content: "結合工程現場經驗、企業流程系統與 AI 自動化技術，從報價、成本、專案管理到營運決策一站式整合。" },
      { property: "og:url", content: "https://aegis-sparkle-launch.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://aegis-sparkle-launch.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="container-x grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div className="flex flex-col justify-center">
              <span className="eyebrow self-start"><span className="dot" /> Aegis Power Integrations Co., Ltd.</span>
              <h1 className="mt-6 text-5xl leading-[1.1] md:text-6xl">
                宏鼎集成
                <br />
                <span className="relative inline-block">
                  AI 時代的工程與
                  <span className="absolute inset-x-0 -bottom-1 h-3 -z-10 bg-gold/70 rounded-sm" />
                </span>
                <br />
                企業系統整合夥伴。
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                結合工程現場經驗、企業流程系統與 AI 自動化技術，協助工程公司、製造業與中小企業，從報價、成本、專案管理到營運決策，快速建立可落地的數位化能力。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-primary">
                  預約諮詢 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/costflow" className="btn btn-ghost">了解 Aegis 產品線</Link>
              </div>
            </div>

            {/* Hero panel — three core services */}
            <div className="relative">
              <div className="panel-lift overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-surface/60">
                  <strong className="text-sm">三大核心服務</strong>
                  <span className="text-xs text-muted-foreground tracking-wider">CORE SERVICES</span>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { icon: HardHat, t: "工程集成服務", d: "半導體廠房、資料中心、弱電、光纖、監控、門禁與現場系統整合。" },
                    { icon: BrainCircuit, t: "AI 系統導入", d: "協助企業盤點流程、整理資料、建立 AI 助理與自動化工作流。" },
                    { icon: LayoutDashboard, t: "企業管理系統", d: "以 Aegis Business Apps 建立報價、CRM、成本、庫存與營運儀表板。" },
                  ].map(({ icon: Icon, t, d }) => (
                    <div key={t} className="flex gap-4 p-5">
                      <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-ink text-ink-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">{t}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 -z-10 h-40 w-40 rounded-full bg-gold/40 blur-3xl" />
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="py-20 bg-surface/40 border-y border-border/60">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 我們解決的問題</span>
              <h2 className="mt-5 text-3xl md:text-4xl">
                我們解決的不是單一軟體問題，<br />而是企業營運流程問題。
              </h2>
              <p className="mt-4 text-muted-foreground">
                企業真正的瓶頸，常常不在「沒有系統」，而是流程之間沒有銜接、資料沒有沉澱、AI 沒有真正進入工作日常。
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: FileSpreadsheet, t: "報價靠 Excel", d: "成本與毛利分散在多份檔案，主管難以即時掌握真實獲利。" },
                { icon: MessagesSquare, t: "業務紀錄分散", d: "拜訪紀錄散落在 LINE、表單、紙本與口頭回報，資料無法沉澱。" },
                { icon: Wrench, t: "工程專案缺乏整合", d: "進度、成本、人力、請款各自為政，難以建立統一視角。" },
                { icon: Boxes, t: "傳統 ERP 太重", d: "中小企業想導入系統，但既有 ERP 太慢、太貴、太複雜。" },
                { icon: BrainCircuit, t: "AI 工具用不起來", d: "工具很多，但缺乏可落地的導入流程與企業內部資料整合。" },
                { icon: ShieldCheck, t: "資料治理缺位", d: "資料散落各部門，缺少權限與標準，難以做進一步的分析與決策。" },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="panel p-6">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="mt-4 text-lg">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THREE CAPABILITIES */}
        <section className="py-24">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 三大服務能力</span>
              <h2 className="mt-5 text-3xl md:text-4xl">從工程現場到企業流程，一站式整合。</h2>
              <p className="mt-4 text-muted-foreground">
                宏鼎集成以三條服務線串接企業數位化關鍵環節，由顧問、系統與工程團隊協同交付。
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                {
                  icon: HardHat, title: "工程集成服務", to: "/engineering" as const,
                  items: [
                    "弱電與網路工程",
                    "光纖與資料中心基礎建置",
                    "監控、門禁與廠區系統整合",
                    "工程專案管理與協力廠商整合",
                  ],
                },
                {
                  icon: Cpu, title: "AI 系統整合", to: "/ai-integration" as const,
                  items: [
                    "企業流程盤點",
                    "AI 助理設計",
                    "n8n / API / LINE / Google Workspace 串接",
                    "自動化報表與決策儀表板",
                    "內部資料整合與知識庫建置",
                  ],
                },
                {
                  icon: LayoutDashboard, title: "Aegis Business Apps", to: "/costflow" as const,
                  items: [
                    "Aegis CostFlow 工程成本分析",
                    "Aegis SalesOps 業務管理",
                    "Aegis AI Launch 企業 AI 導入",
                    "可依產業需求客製模組",
                  ],
                },
              ].map(({ icon: Icon, title, to, items }) => (
                <div key={title} className="panel p-7 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-ink-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl">{title}</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {items.map((b) => (
                      <li key={b} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-gold flex-none" />{b}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-2">
                    <Link to={to} className="btn btn-ghost w-full">了解更多 <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AEGIS PRODUCT LINE */}
        <section className="py-24 bg-surface/40 border-y border-border/60">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> Aegis Business Apps 產品線</span>
              <h2 className="mt-5 text-3xl md:text-4xl">宏鼎集成旗下模組化企業系統。</h2>
              <p className="mt-4 text-muted-foreground">
                三套標準化產品，協助企業快速啟動報價、業務與 AI 導入流程，可獨立使用，也能模組化組合。
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                {
                  to: "/costflow" as const, tag: "主推產品", name: "Aegis CostFlow",
                  slogan: "工程報價與成本分析平台",
                  desc: "協助工程公司快速整理材料、人工、外包、專案毛利與報價資料，降低 Excel 重工，提高報價速度與成本掌握度。",
                  cta: "查看 CostFlow",
                  icon: FileSpreadsheet, featured: true,
                },
                {
                  to: "/salesops" as const, tag: "業務團隊", name: "Aegis SalesOps",
                  slogan: "業務管理與 AI 週報系統",
                  desc: "整合客戶拜訪、LINE 回報、語音日誌、CRM、主管週報與業務追蹤，讓業務管理更即時、更透明。",
                  cta: "查看 SalesOps",
                  icon: MessagesSquare,
                },
                {
                  to: "/ai-launch" as const, tag: "顧問導入", name: "Aegis AI Launch",
                  slogan: "企業 AI 導入與流程自動化服務",
                  desc: "協助企業從流程盤點、資料整理、AI 助理設計到自動化串接，真正把 AI 導入日常工作。",
                  cta: "查看 AI Launch",
                  icon: Workflow,
                },
              ].map((p) => (
                <div key={p.name} className={`panel p-7 flex flex-col gap-5 ${p.featured ? "ring-2 ring-gold" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className="tag">{p.tag}</span>
                    <p.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl">{p.name}</h3>
                    <p className="mt-1 text-sm font-medium text-foreground/80">{p.slogan}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mt-auto pt-2">
                    <Link to={p.to} className={p.featured ? "btn btn-primary w-full" : "btn btn-ghost w-full"}>
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TARGET AUDIENCE */}
        <section className="py-24">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 適合合作的企業</span>
              <h2 className="mt-5 text-3xl md:text-4xl">為工程、製造與中小企業設計。</h2>
              <p className="mt-4 text-muted-foreground">
                我們服務的對象普遍面對流程數位化與 AI 導入的轉型壓力，需要兼具工程現場理解與企業系統能力的夥伴。
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: HardHat, t: "工程公司" },
                { icon: Factory, t: "製造業" },
                { icon: Cpu, t: "半導體與科技廠供應鏈" },
                { icon: ServerCog, t: "資料中心與弱電工程團隊" },
                { icon: Briefcase, t: "會計師、顧問與企業服務通路" },
                { icon: Building2, t: "想導入 AI 與輕量 ERP 的中小企業" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="panel p-6 flex items-center gap-4">
                  <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-surface-2 text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{t}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-24 bg-surface/40 border-y border-border/60">
          <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow"><span className="dot" /> 為什麼選擇宏鼎集成</span>
              <h2 className="mt-5 text-3xl md:text-4xl">同時懂工程現場，<br />也懂企業流程。</h2>
              <p className="mt-4 text-muted-foreground">
                我們不是只寫系統的軟體公司，也不是只接案的工程廠商。宏鼎集成以整合角度，協助企業逐步建立自己的數位營運能力。
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {[
                ["01", "懂工程現場，不只是寫系統", "理解工地、廠區與專案的真實節奏與限制。"],
                ["02", "懂中小企業流程", "不做過度複雜的系統，從關鍵流程切入。"],
                ["03", "一站式服務", "從顧問、導入、系統開發到工程整合可一條龍。"],
                ["04", "模組化導入", "以模組分階段上線，降低導入成本與時間。"],
              ].map(([n, t, d]) => (
                <li key={n} className="panel p-6">
                  <span className="num-badge">{n}</span>
                  <h3 className="mt-4 text-lg">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24">
          <div className="container-x">
            <div className="panel-lift relative overflow-hidden p-10 md:p-14 text-center">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
              <span className="eyebrow"><span className="dot" /> 開始你的數位化旅程</span>
              <h2 className="mt-5 text-3xl md:text-4xl max-w-3xl mx-auto">
                想讓你的工程、業務與營運流程開始 AI 化嗎？
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                從一個流程開始，我們協助你盤點、設計、導入，逐步建立企業自己的數位營運系統。
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary">預約初步諮詢</Link>
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
