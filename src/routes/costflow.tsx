import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Check, TrendingUp, GitBranch, Bot, FileSpreadsheet, LayoutDashboard, AlertTriangle, Upload, Calculator, FileText, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/costflow")({
  head: () => ({
    meta: [
      { title: "Aegis CostFlow｜工程成本分析平台" },
      { name: "description", content: "工程公司專用的成本、報價、毛利與專案決策平台。把 Excel 報價轉成可追蹤、可分析、可決策的成本系統。" },
      { property: "og:title", content: "Aegis CostFlow｜工程成本分析平台" },
      { property: "og:description", content: "材料、人工、外包、毛利一套管理。AI 成本提醒，避免接到越做越賠的案子。" },
    ],
  }),
  component: CostFlow,
});

function CostFlow() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <span className="eyebrow"><span className="dot" /> Aegis CostFlow · 主推產品</span>
              <h1 className="mt-6 text-4xl md:text-5xl leading-[1.15]">
                工程報價、材料成本、人工成本與專案毛利，<span className="text-gold">一套系統</span>掌握。
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                協助工程公司把 Excel 報價與成本資料轉成可追蹤、可分析、可決策的專案成本平台。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-primary">預約 Demo</Link>
                <Link to="/pricing" className="btn btn-ghost">查看方案</Link>
              </div>
            </div>

            <div className="panel-lift p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Project · 機電工程報價單 v3</div>
              <div className="space-y-2.5">
                {[
                  ["材料成本", "NT$ 1,840,000", "62%"],
                  ["人工成本", "NT$ 520,000", "18%"],
                  ["外包費用", "NT$ 360,000", "12%"],
                  ["管理 + 利潤", "NT$ 230,000", "8%"],
                ].map(([k, v, p]) => (
                  <div key={k}>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-ink" style={{ width: p }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg bg-gold/15 border border-gold/40 p-4 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-700 flex-none mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">AI 成本提醒</div>
                  <div className="text-muted-foreground mt-0.5">材料 #M-2031 單價較歷史均價高 24%，建議重新詢價。</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface/40 border-y border-border/60">
          <div className="container-x grid gap-6 md:grid-cols-3">
            {[
              { icon: TrendingUp, t: "報價前就知道毛利", d: "材料、人工、外包、管理費、利潤率整合試算，避免接到越做越賠的案子。" },
              { icon: GitBranch, t: "版本變更可追蹤", d: "每一次報價調整都留下版本紀錄，方便比較成本差異與成交條件。" },
              { icon: Bot, t: "AI 成本提醒", d: "針對異常單價、遺漏項目、毛利過低與歷史差異提供即時提醒。" },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="panel p-7">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-ink-foreground"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24">
          <div className="container-x grid gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow"><span className="dot" /> Who is it for</span>
              <h2 className="mt-5 text-3xl">適合這些企業</h2>
              <ul className="mt-6 space-y-3">
                {[
                  "機電、弱電、光纖、監控、系統整合工程公司",
                  "目前大量使用 Excel 做報價與成本控管",
                  "老闆需要即時掌握專案毛利與成本風險",
                  "想把工程 Know-how 逐步系統化的團隊",
                ].map((t) => (
                  <li key={t} className="flex gap-3"><Check className="h-5 w-5 mt-0.5 text-gold flex-none" /><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="panel p-7">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-5 w-5 text-gold" />
                <h3 className="text-xl">第一版核心功能</h3>
              </div>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                {[
                  "客戶與專案管理",
                  "報價單與版本管理",
                  "材料、人工、外包成本表",
                  "Excel 匯入與 PDF 報價單輸出",
                  "毛利試算與成本異常提醒",
                  "老闆儀表板",
                ].map((t) => (
                  <li key={t} className="flex gap-2"><FileSpreadsheet className="h-4 w-4 mt-0.5 text-muted-foreground flex-none" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
              <h2 className="text-3xl md:text-4xl max-w-2xl mx-auto">先把成本看清楚，再開始放大營收。</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                CostFlow 不取代你的工程經驗，而是把經驗轉成可管理、可複製、可交接的數據流程。
              </p>
              <div className="mt-7 flex justify-center"><Link to="/demo" className="btn btn-primary">預約 CostFlow Demo</Link></div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
