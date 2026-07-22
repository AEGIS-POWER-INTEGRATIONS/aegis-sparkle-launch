import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { MapPin, Mic, BrainCircuit, MessageSquare } from "lucide-react";


import { OG_IMAGE, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/salesops")({
  head: () => ({
    meta: [
      { title: "Aegis SalesOps｜AI 業務管理與週報系統" },
      { name: "description", content: "整合客戶拜訪、LINE 回報、語音日誌、CRM、主管週報與客戶進度追蹤，讓中小企業與工程公司的業務管理更即時、更透明。" },
      { name: "keywords", content: "CRM, 業務管理系統, AI 週報, 業務日報, LINE 業務回報, 中小企業 CRM, Aegis SalesOps" },
      { property: "og:title", content: "Aegis SalesOps｜AI 業務管理與週報系統" },
      { property: "og:description", content: "把業務管理從追人，變成看數據。" },
      { property: "og:url", content: `${SITE_URL}/salesops` },
      { property: "og:type", content: "product" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/salesops` }],
  }),
  component: SalesOps,
});


function SalesOps() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag">宏鼎集成旗下 Aegis Business Apps 產品線</span>
              </div>
              <span className="eyebrow mt-3"><span className="dot" /> Aegis SalesOps</span>
              <h1 className="mt-6 text-4xl md:text-5xl leading-[1.15]">
                讓業務拜訪、客戶追蹤與主管週報，<span className="text-gold">變得自動化</span>。
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                用 LINE 回報、語音日誌、CRM 與 AI 週報，解決業務行蹤不清、客戶進度斷線、主管難追蹤的問題。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-primary">預約諮詢</Link>
                <Link to="/demo" className="btn btn-ghost">申請試用</Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift bg-ink text-ink-foreground p-8">
                <div className="text-xs uppercase tracking-widest text-ink-foreground/60">介面概念示意</div>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-lg bg-ink-foreground/10 p-4">
                    <div className="text-xs text-ink-foreground/60">今日拜訪紀錄</div>
                    <div className="mt-1 text-sm">12 家客戶 · 3 家已成交、5 家追蹤中</div>
                  </div>
                  <div className="rounded-lg bg-ink-foreground/10 p-4">
                    <div className="text-xs text-ink-foreground/60">AI 週報摘要</div>
                    <div className="mt-1 text-sm">彙整本週業務進度、客戶動態與待跟進事項</div>
                  </div>
                  <div className="rounded-lg bg-ink-foreground/10 p-4">
                    <div className="text-xs text-ink-foreground/60">LINE 回報</div>
                    <div className="mt-1 text-sm">語音轉文字、自動分類重點與代辦</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="py-20 bg-surface/40 border-y border-border/60">
          <div className="container-x grid gap-6 md:grid-cols-3">
            {[
              { icon: MapPin, t: "拜訪與打卡紀錄", d: "讓業務回報客戶拜訪、地點、照片與備註，主管不用再逐一追問。" },
              { icon: Mic, t: "語音日誌", d: "業務用語音回報，系統協助轉成文字、分類重點與待辦事項。" },
              { icon: BrainCircuit, t: "AI 週報", d: "自動彙整拜訪紀錄、客戶進度、成交機會與主管提醒。" },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="panel p-7">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-ink-foreground"><Icon className="h-5 w-5" /></div>
                <h2 className="mt-5 text-xl font-bold">{t}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><MessageSquare className="h-4 w-4" /> LINE × CRM × AI</div>
              <h2 className="mt-3 text-3xl md:text-4xl max-w-2xl mx-auto">把業務管理從追人，變成看數據。</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                適合保險、房仲、物流、B2B 業務團隊、POS 通路與顧問型銷售團隊。
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/demo" className="btn btn-primary">預約諮詢</Link>
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
