import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "價格方案｜宏鼎集成 Aegis Business Apps" },
      { name: "description", content: "宏鼎集成 Aegis Business Apps 提供 Starter、Pro 與 Business 三種訂閱方案，依使用人數、資料串接與客製需求評估。" },
      { property: "og:title", content: "價格方案｜宏鼎集成" },
      { property: "og:description", content: "Starter / Pro / Business 三種方案，搭配導入服務費，協助企業逐步建立系統能力。" },
      { property: "og:url", content: "https://aegis-sparkle-launch.lovable.app/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://aegis-sparkle-launch.lovable.app/pricing" }],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Starter", title: "單一流程導入",
    price: "NT$5,000", suffix: "/ 月起",
    desc: "適合單一流程數位化與初期試用，例如報價表單、客戶資料、簡易報表或單一部門流程。",
    features: ["單一產品 / 單一流程模組", "標準欄位與範本", "Excel / CSV 匯入", "基本報表與權限設定", "Email 支援"],
    cta: "申請試用", variant: "ghost" as const,
  },
  {
    name: "Pro", title: "中小企業正式導入",
    price: "NT$15,000", suffix: "/ 月起",
    desc: "適合中小企業正式導入 CRM、報價、成本、業務管理或 AI 週報系統。建議作為正式導入 Aegis CostFlow、SalesOps 或 AI 週報系統的起始方案。",
    features: ["多流程模組權限", "AI 提醒與自動週報", "主管儀表板", "欄位與報表設定", "導入顧問支援"],
    cta: "預約諮詢", variant: "primary" as const, featured: true,
  },
  {
    name: "Business", title: "企業多部門導入",
    price: "專案報價", suffix: "",
    desc: "適合多部門、多據點、需要串接既有系統或客製流程的企業。",
    features: ["客製流程設定", "LINE / CRM / BI 串接", "專屬導入顧問", "專案級支援與資安需求評估"],
    cta: "預約諮詢", variant: "ghost" as const,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> 價格方案</span>
            <h1 className="mt-6 text-4xl md:text-5xl">系統導入與訂閱方案</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              以下方案主要適用於 Aegis Business Apps、AI 系統整合與企業流程數位化導入。
              工程集成與能源機電工程將依現場條件、施工範圍、設備規格與工期另行評估報價。
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
                    <Sparkles className="h-3 w-3" /> 最受歡迎
                  </span>
                )}
                <div>
                  <div className="text-sm font-semibold text-gold uppercase tracking-wider">{p.name}</div>
                  <h3 className="mt-1 text-2xl">{p.title}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <ul className="space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-gold flex-none" />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Link to="/demo" className={`btn w-full ${p.variant === "primary" ? "btn-primary" : "btn-ghost"}`}>
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="container-x mt-14">
            <div className="panel p-8 grid gap-6 md:grid-cols-3 text-sm">
              {[
                ["導入時程", "標準導入 2–4 週可上線第一階段功能。"],
                ["資料搬遷", "支援 Excel / CSV 匯入，常見欄位皆有對應範本。"],
                ["合約彈性", "月繳與年繳擇一，年繳享 2 個月優惠。"],
              ].map(([t, d]) => (
                <div key={t}>
                  <div className="font-semibold">{t}</div>
                  <div className="text-muted-foreground mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 導入服務費 */}
        <section className="py-20 bg-surface/40 border-y border-border/60">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 導入服務費</span>
              <h2 className="mt-5 text-3xl md:text-4xl">導入服務費</h2>
              <p className="mt-4 text-muted-foreground">
                從流程盤點到上線陪跑，協助系統真正落地。以下為一次性導入服務費，依公司流程複雜度、資料量與需要串接的系統選擇方案。
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "基礎導入", price: "NT$50,000", suffix: "起",
                  desc: "單一產品、單一部門上線。",
                  items: ["1 場啟動會議", "Excel 匯入與欄位對應", "標準範本套用", "上線教育訓練 1 場"],
                },
                {
                  name: "標準導入", price: "NT$120,000", suffix: "起",
                  desc: "跨部門流程，含主管儀表板設定。", featured: true,
                  items: ["2–3 場流程訪談", "客製欄位與報表", "主管儀表板設定", "教育訓練 2 場 + 30 天輔導"],
                },
                {
                  name: "企業導入", price: "NT$300,000", suffix: "起",
                  desc: "多據點、多角色，含資料治理與權限規劃。",
                  items: ["完整流程診斷", "權限與資安規範", "歷史資料搬遷", "90 天導入顧問陪跑"],
                },
                {
                  name: "系統串接", price: "另行報價", suffix: "",
                  desc: "依需求串接 LINE、CRM、ERP、BI 等。",
                  items: ["LINE Notify / OA", "ERP 雙向同步", "BI 報表整合", "API / Webhook 客製"],
                },
              ].map((p) => (
                <div key={p.name} className={`panel p-6 flex flex-col gap-4 ${p.featured ? "ring-2 ring-gold" : ""}`}>
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-bold tracking-tight">{p.price}</span>
                      {p.suffix && <span className="text-sm text-muted-foreground">{p.suffix}</span>}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-1.5"><Check className="h-3.5 w-3.5 mt-0.5 text-gold flex-none" />{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted-foreground max-w-3xl leading-relaxed">
              ※ 導入服務費為一次性支付；訂閱方案另外計算。實際報價依公司規模、流程複雜度、資料量、所需串接系統與訓練場次調整。簽約前提供書面估價單。
            </p>

            <div className="mt-8 panel-lift p-6 md:p-8 max-w-4xl">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <span className="tag shrink-0">服務範圍說明</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  以上價格主要適用於 Aegis Business Apps 與 AI 系統整合導入。
                  <strong className="text-foreground"> 工程集成服務</strong>
                  將依現場條件、施工範圍、設備規格、工期與協力廠商需求另行報價。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
