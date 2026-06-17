import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "價格方案｜Aegis Business Apps" },
      { name: "description", content: "Aegis Business Apps 訂閱方案與導入服務價格。先用小方案驗證，再逐步擴充成企業系統。" },
      { property: "og:title", content: "價格方案｜Aegis Business Apps" },
      { property: "og:description", content: "Starter / Pro / Business 三種方案，依使用人數、資料量與導入深度調整。" },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Starter", title: "小團隊試用",
    price: "NT$5,000", suffix: "/ 月起",
    desc: "適合先把單一流程數位化的小型團隊。",
    features: ["基本專案／客戶管理", "Excel 匯入", "基本報表", "Email 支援"],
    cta: "申請試用", variant: "ghost" as const,
  },
  {
    name: "Pro｜建議主推", title: "中小企業成長版",
    price: "NT$15,000", suffix: "/ 月起",
    desc: "適合需要成本、業務、專案與 AI 報表的企業。",
    features: ["完整模組權限", "AI 提醒與週報", "主管儀表板", "導入顧問支援"],
    cta: "預約 Demo", variant: "primary" as const, featured: true,
  },
  {
    name: "Business", title: "企業導入版",
    price: "專案報價", suffix: "",
    desc: "適合多部門、多據點、需要串接既有系統的企業。",
    features: ["客製流程設定", "LINE / CRM / BI 串接", "專屬導入顧問", "SLA 與資安規範"],
    cta: "聯絡顧問", variant: "ghost" as const,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-3xl">
            <span className="eyebrow"><span className="dot" /> Pricing</span>
            <h1 className="mt-6 text-4xl md:text-5xl">先用小方案驗證，再逐步擴充成企業系統。</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              價格可依使用人數、資料量、導入深度與串接需求調整。以下為網站第一版建議價格，可再依市場測試微調。
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
      </main>
      <SiteFooter />
    </div>
  );
}
