import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Search, Puzzle, Rocket, Check } from "lucide-react";

export const Route = createFileRoute("/ai-launch")({
  head: () => ({
    meta: [
      { title: "Aegis AI Launch｜企業 AI 導入服務" },
      { name: "description", content: "協助企業完成流程診斷、AI 助理設計、資料整理與員工訓練，讓 AI 真正落地。" },
      { property: "og:title", content: "Aegis AI Launch｜企業 AI 導入服務" },
      { property: "og:description", content: "不是教你玩 AI，而是把 AI 放進企業流程裡。" },
    ],
  }),
  component: AILaunch,
});

function AILaunch() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="container-x max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag">宏鼎集成旗下 Aegis Business Apps 產品線</span>
            </div>
            <span className="eyebrow mt-3"><span className="dot" /> Aegis AI Launch</span>
            <h1 className="mt-6 text-4xl md:text-5xl leading-[1.15]">
              不是教你玩 AI，而是把 AI <span className="text-gold">放進企業流程裡</span>。
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              協助企業完成流程盤點、資料整理、AI 助理設計、自動化串接、權限控管與員工訓練，讓 AI 真正落地。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/demo" className="btn btn-primary">預約諮詢</Link>
              <Link to="/demo" className="btn btn-ghost">申請試用</Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface/40 border-y border-border/60">
          <div className="container-x grid gap-6 md:grid-cols-3">
            {[
              { icon: Search, t: "流程診斷", d: "找出企業最適合導入 AI 的流程，避免花錢做沒有產出的工具。" },
              { icon: Puzzle, t: "AI 助理設計", d: "根據部門與職務建立 AI 助理，例如業務助理、客服助理、主管週報助理。" },
              { icon: Rocket, t: "落地訓練", d: "透過 SOP、教學與追蹤機制，讓員工真的用得起來。" },
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
          <div className="container-x grid gap-6 lg:grid-cols-2">
            {[
              {
                t: "導入項目",
                items: ["AI 流程盤點工作坊", "資料格式與知識庫整理", "AI Prompt 與助理規格設計", "LINE、表單、CRM、報表串接", "員工教育訓練與管理報表"],
              },
              {
                t: "適合企業",
                items: ["想導入 AI 但不知道從哪裡開始", "有大量表單、報表、客服、業務追蹤工作", "希望建立內部 AI 工作流與標準作業", "想把 AI 變成實際營運績效"],
              },
            ].map((b) => (
              <div key={b.t} className="panel p-8">
                <h3 className="text-2xl">{b.t}</h3>
                <ul className="mt-5 space-y-3">
                  {b.items.map((i) => (
                    <li key={i} className="flex gap-3"><Check className="h-5 w-5 mt-0.5 text-gold flex-none" /><span>{i}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
