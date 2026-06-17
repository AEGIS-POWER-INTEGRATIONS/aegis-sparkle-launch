import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { MapPin, Mic, BrainCircuit, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/salesops")({
  head: () => ({
    meta: [
      { title: "Aegis SalesOps｜AI 業務管理系統" },
      { name: "description", content: "LINE 回報、語音日誌、CRM 與 AI 週報，讓主管掌握業務進度。" },
      { property: "og:title", content: "Aegis SalesOps｜AI 業務管理系統" },
      { property: "og:description", content: "把業務管理從追人，變成看數據。" },
    ],
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
              <span className="eyebrow"><span className="dot" /> Aegis SalesOps</span>
              <h1 className="mt-6 text-4xl md:text-5xl leading-[1.15]">
                讓業務拜訪、客戶追蹤與主管週報，<span className="text-gold">變得自動化</span>。
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                用 LINE 回報、語音日誌、CRM 與 AI 週報，解決業務行蹤不清、客戶進度斷線、主管難追蹤的問題。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-primary">預約 Demo</Link>
                <Link to="/demo" className="btn btn-ghost">申請試用</Link>
              </div>
            </div>

            <div className="panel-lift p-6 space-y-3">
              {[
                { who: "業務 · 阿凱", text: "剛拜訪 A 客戶，採購已批，等財務簽核。週四回訪。", time: "14:32", tag: "拜訪" },
                { who: "AI 助理", text: "已整理本週 12 筆拜訪：3 件成交機會 / 2 件需主管支援。", time: "週五 09:00", tag: "週報", gold: true },
                { who: "業務 · 小婷", text: "語音回報已轉文字：報價單已送出，金額 NT$ 480,000。", time: "11:08", tag: "語音" },
              ].map((m, i) => (
                <div key={i} className={`rounded-xl border p-4 ${m.gold ? "border-gold/50 bg-gold/10" : "border-border bg-surface/50"}`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">{m.who}</span>
                    <span className="text-muted-foreground">{m.time}</span>
                  </div>
                  <p className="mt-2 text-sm">{m.text}</p>
                  <span className="mt-2 inline-block text-xs rounded-full bg-background border border-border px-2 py-0.5 text-muted-foreground">#{m.tag}</span>
                </div>
              ))}
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
                <h3 className="mt-5 text-xl">{t}</h3>
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
              <div className="mt-7 flex justify-center"><Link to="/demo" className="btn btn-primary">預約 SalesOps Demo</Link></div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
