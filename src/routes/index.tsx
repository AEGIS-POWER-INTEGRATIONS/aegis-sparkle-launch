import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, Check, FileSpreadsheet, BrainCircuit, BarChart3, Sparkles, Boxes, MessagesSquare, Zap, Radio, Cable, Camera, Network, Briefcase } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aegis Business Apps｜AI 模組化企業系統平台" },
      { name: "description", content: "把客製系統經驗，產品化成可線上銷售的企業 App。工程成本、業務管理、AI 導入，三套標準化模組。" },
      { property: "og:title", content: "Aegis Business Apps｜AI 模組化企業系統平台" },
      { property: "og:description", content: "工程成本、業務管理、AI 助理，三套標準化模組讓企業 30 天內導入。" },
    ],
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
              <span className="eyebrow self-start"><span className="dot" /> AI 時代的模組化企業系統平台</span>
              <h1 className="mt-6 text-5xl leading-[1.1] md:text-6xl">
                把客製系統經驗，
                <br />
                <span className="relative inline-block">
                  產品化成可訂閱的
                  <span className="absolute inset-x-0 -bottom-1 h-3 -z-10 bg-gold/70 rounded-sm" />
                </span>
                <br />
                企業 App。
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Aegis Business Apps 協助工程公司與中小企業快速建立報價成本、業務管理、AI 助理與營運儀表板，不再從零開始開發。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-primary">
                  預約 Demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/demo" className="btn btn-ghost">申請試用</Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                由 <span className="font-semibold text-foreground">宏點科技</span> ／ <span className="font-semibold text-foreground">宏鼎集成</span> 團隊打造，整合多年企業系統開發與工程資訊化導入經驗。
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-4">
                {[
                  ["工程成本決策", "CostFlow"],
                  ["CRM 與業務追蹤", "SalesOps"],
                  ["AI 週報與儀表板", "AI Launch"],
                  ["Excel 一鍵匯入", "Modules"],
                ].map(([label, sub]) => (
                  <div key={label}>
                    <dt className="font-semibold">{label}</dt>
                    <dd className="text-muted-foreground text-xs mt-0.5">{sub}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Hero panel — dashboard mock */}
            <div className="relative">
              <div className="panel-lift overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-surface/60">
                  <strong className="text-sm">Aegis CostFlow · Dashboard</strong>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 p-5">
                  {[
                    ["18.6%", "預估專案毛利", "text-emerald-600"],
                    ["42", "待確認材料項", ""],
                    ["3.2M", "本月報價金額", ""],
                    ["7", "AI 成本提醒", "text-amber-600"],
                  ].map(([v, l, c]) => (
                    <div key={l} className="rounded-lg border border-border bg-surface/50 p-4">
                      <div className={`text-2xl font-bold tracking-tight ${c}`}>{v}</div>
                      <div className="text-xs text-muted-foreground mt-1">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-5 py-4 space-y-2.5 bg-surface/30">
                  {[
                    ["Excel 成本表匯入", "已完成", "bg-emerald-100 text-emerald-700"],
                    ["材料 / 人工 / 外包分類", "AI 分析中", "bg-amber-100 text-amber-700"],
                    ["毛利與報價版本產生", "可輸出", "bg-slate-100 text-slate-700"],
                  ].map(([t, s, c]) => (
                    <div key={t} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2"><Check className="h-4 w-4 text-muted-foreground" />{t}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 -z-10 h-40 w-40 rounded-full bg-gold/40 blur-3xl" />
            </div>
          </div>
        </section>

        {/* PAIN */}
        <section className="py-20 bg-surface/40 border-y border-border/60">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 為什麼企業 AI 用不起來</span>
              <h2 className="mt-5 text-3xl md:text-4xl">企業最卡的不是沒有系統，<br />而是系統太難落地。</h2>
              <p className="mt-4 text-muted-foreground">
                我們把常見流程拆成可導入、可複製、可訂閱的模組，讓老闆先解決最痛的營運問題，再逐步擴充。
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                { n: "01", t: "Excel 滿天飛", d: "報價、成本、客戶、專案資料分散在不同檔案，版本混亂，主管很難即時掌握。", icon: FileSpreadsheet },
                { n: "02", t: "每次都像重新開發", d: "傳統客製系統導入期長、範圍難控、維護成本高，最後常常變成雙方都痛苦。", icon: Boxes },
                { n: "03", t: "AI 用不起來", d: "員工不知道怎麼用 AI，資料也沒整理好，最後只停留在聊天工具，沒有進入流程。", icon: BrainCircuit },
              ].map(({ n, t, d, icon: Icon }) => (
                <div key={n} className="panel p-7 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="num-badge">{n}</span>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl">{t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BAND */}
        <section className="bg-ink text-ink-foreground">
          <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
            {[
              ["3", "大產品入口"],
              ["30天", "快速導入節奏"],
              ["SaaS", "訂閱制營收模型"],
              ["AI", "報表與決策輔助"],
            ].map(([n, l]) => (
              <div key={l} className="text-center md:text-left">
                <div className="text-3xl font-bold text-gold">{n}</div>
                <div className="text-sm text-ink-foreground/70 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* AUDIENCE — 適合對象 */}
        <section className="py-24">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 適合對象</span>
              <h2 className="mt-5 text-3xl md:text-4xl">為工程公司與業務團隊設計，<br />不是給軟體公司用的通用工具。</h2>
              <p className="mt-4 text-muted-foreground">
                我們服務的對象有共同特徵：用 Excel 撐起報價與成本、靠主管追業務進度、想用 AI 卻不知道從哪開始。下列產業最能在 30 天內看到導入成效。
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Zap, t: "機電工程公司", d: "整合材料、人工、外包成本，追蹤每案毛利的工程團隊。" },
                { icon: Radio, t: "弱電工程公司", d: "報價項目繁雜、版本變動頻繁、需快速產出 PDF 報價單。" },
                { icon: Cable, t: "光纖工程公司", d: "材料單價波動大，希望系統即時提醒成本異常與遺漏項目。" },
                { icon: Camera, t: "監控工程公司", d: "案件多、零組件雜，需把報價與成本資料標準化、可交接。" },
                { icon: Network, t: "系統整合商", d: "跨廠牌、跨方案的成本管理，希望把工程 Know-how 系統化。" },
                { icon: Briefcase, t: "中小企業業務團隊", d: "業務行蹤分散、客戶進度斷線，需要 LINE 回報與 AI 週報。" },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="panel p-6 flex gap-4">
                  <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-surface-2 text-ink">
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
        </section>

        {/* PRODUCTS */}
        <section id="products" className="py-24 bg-surface/40 border-y border-border/60">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 三套標準化產品</span>
              <h2 className="mt-5 text-3xl md:text-4xl">先從最有痛點的場景開始產品化。</h2>
              <p className="mt-4 text-muted-foreground">
                第一階段不做大而全 ERP，而是用三個標準化產品切入工程、業務與 AI 導入。
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                {
                  to: "/costflow" as const, tag: "主推產品", name: "Aegis CostFlow",
                  desc: "工程專案成本分析、報價版本、毛利試算與 AI 成本提醒。",
                  bullets: ["材料／人工／外包成本管理", "Excel 匯入與報價單輸出", "老闆儀表板與異常提醒"],
                  icon: BarChart3, featured: true,
                },
                {
                  to: "/salesops" as const, tag: "業務團隊", name: "Aegis SalesOps",
                  desc: "客戶拜訪、LINE 回報、語音日誌、CRM 與 AI 週報。",
                  bullets: ["業務打卡與拜訪紀錄", "語音轉文字與週報整理", "主管追蹤與客戶進度"],
                  icon: MessagesSquare,
                },
                {
                  to: "/ai-launch" as const, tag: "顧問導入", name: "Aegis AI Launch",
                  desc: "企業 AI 流程盤點、AI 助理設計、資料整理與教育訓練。",
                  bullets: ["流程診斷與導入藍圖", "AI 助理與自動化設計", "員工教育訓練與落地追蹤"],
                  icon: Sparkles,
                },
              ].map((p) => (
                <div key={p.name} className={`panel p-7 flex flex-col gap-5 ${p.featured ? "ring-2 ring-gold" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className="tag">{p.tag}</span>
                    <p.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-gold flex-none" />{b}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-2">
                    <Link to={p.to} className={p.featured ? "btn btn-primary w-full" : "btn btn-ghost w-full"}>
                      看產品 <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="py-24 bg-surface/40 border-y border-border/60">
          <div className="container-x grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow"><span className="dot" /> 導入流程</span>
              <h2 className="mt-5 text-3xl md:text-4xl">從試用到導入，<br />建立可複製的成交流程。</h2>
              <p className="mt-4 text-muted-foreground">
                小方案可以線上試用，中高單價則透過 Demo 與顧問診斷成交。既能產品化，又保留 B2B 必要的信任建立。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-primary">預約 Demo</Link>
                <Link to="/demo" className="btn btn-ghost">申請試用</Link>
              </div>
            </div>

            <ol className="relative space-y-5 border-l-2 border-dashed border-border pl-7">
              {[
                ["產品頁導流", "透過痛點、功能、案例與價格，讓客戶快速理解是否適合。"],
                ["免費試用／預約 Demo", "低價方案走試用，高價方案走顧問診斷與 Demo。"],
                ["資料匯入與導入設定", "協助客戶整理 Excel、設定欄位、建立範例資料與操作流程。"],
                ["訂閱續約與加值擴充", "從單一痛點切入，再加購 AI、LINE、BI、ERP 串接等模組。"],
              ].map(([t, d], i) => (
                <li key={t} className="relative">
                  <span className="absolute -left-[37px] grid h-7 w-7 place-items-center rounded-full bg-ink text-ink-foreground text-xs font-mono font-semibold">
                    {i + 1}
                  </span>
                  <div className="panel p-5">
                    <h3 className="text-lg">{t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container-x">
            <div className="panel-lift relative overflow-hidden p-10 md:p-14 text-center">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
              <span className="eyebrow"><span className="dot" /> 從一套系統開始</span>
              <h2 className="mt-5 text-3xl md:text-4xl max-w-3xl mx-auto">
                先用一套可落地的系統，開始累積訂閱收入。
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                第一階段先主推 Aegis CostFlow，用工程公司成本與報價痛點切入，再擴充成 AI 模組化企業系統平台。
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary">預約 Demo</Link>
                <Link to="/demo" className="btn btn-ghost">申請試用</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
