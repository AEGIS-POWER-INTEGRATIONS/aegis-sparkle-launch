import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import mockCostflow from "@/assets/mock-costflow.jpg";
import { Check, TrendingUp, GitBranch, Bot, FileSpreadsheet, LayoutDashboard, AlertTriangle, Upload, Calculator, FileText, ShieldAlert } from "lucide-react";

import { OG_IMAGE, SITE_URL } from "@/lib/seo";


export const Route = createFileRoute("/costflow")({
  head: () => ({
    meta: [
      { title: "Aegis CostFlow｜工程報價與成本分析平台" },
      { name: "description", content: "工程公司專用的成本、報價、毛利與專案決策平台。把 Excel 報價轉成可追蹤、可分析、可決策的成本系統。" },
      { name: "keywords", content: "工程報價系統, 工程成本分析, 專案毛利, 工程管理系統, Aegis CostFlow, 台灣工程公司" },
      { property: "og:title", content: "Aegis CostFlow｜工程報價與成本分析平台" },
      { property: "og:description", content: "材料、人工、外包、毛利一套管理。AI 成本提醒，避免接到越做越賠的案子。" },
      { property: "og:url", content: `${SITE_URL}/costflow` },
      { property: "og:type", content: "product" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/costflow` }],
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
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag">宏鼎集成旗下 Aegis Business Apps 產品線</span>
              </div>
              <span className="eyebrow mt-3"><span className="dot" /> Aegis CostFlow</span>
              <h1 className="mt-6 text-4xl md:text-5xl leading-[1.15]">
                工程報價、材料成本、人工成本與專案毛利，<span className="text-gold">一套系統</span>掌握。
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                協助工程公司把 Excel 報價與成本資料轉成可追蹤、可分析、可決策的專案成本平台。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/demo" className="btn btn-primary">預約諮詢</Link>
                <Link to="/pricing" className="btn btn-ghost">查看方案</Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift bg-ink">
                <img
                  src={mockCostflow}
                  alt="Aegis CostFlow 工程成本分析介面概念示意"
                  width={1408}
                  height={1008}
                  className="w-full h-auto object-cover"
                />
                <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-ink-foreground/70 bg-ink/60 px-2 py-0.5 rounded">
                  介面概念示意
                </span>

              </div>
              <div className="mt-4 panel p-4 flex gap-3 items-start">
                <AlertTriangle className="h-5 w-5 text-gold flex-none mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">AI 成本提醒範例</div>
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
                <h2 className="mt-5 text-xl font-bold">{t}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24">
          <div className="container-x grid gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow"><span className="dot" /> 服務對象</span>
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

        {/* 實際使用情境 — Real-world scenario */}
        <section className="py-24 bg-surface/40 border-y border-border/60">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="eyebrow"><span className="dot" /> 實際使用情境</span>
              <h2 className="mt-5 text-3xl md:text-4xl">一家機電工程公司，<br />從 Excel 報價到成本決策的完整流程。</h2>
              <p className="mt-4 text-muted-foreground">
                以下情境取自典型的 30 人規模機電工程公司，導入 CostFlow 後第一個專案的真實操作節奏。
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {[
                { src: reportsAsset.url, alt: "工程報價與成本分析報表" },
                { src: deskAsset.url, alt: "企業營運數據分析" },
              ].map((it) => (
                <figure key={it.alt} className="panel overflow-hidden">
                  <div className="relative aspect-[16/10] bg-ink overflow-hidden">
                    <img src={it.src} alt={it.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  </div>
                </figure>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-start">
              <ol className="space-y-5">
                {[
                  {
                    icon: Upload, time: "Day 1 · 09:00", t: "匯入 Excel 材料表",
                    d: "工程部把過去三個月的報價單與材料成本表上傳至 CostFlow，系統自動辨識欄位、對應「材料／人工／外包」分類，建立 1,240 項材料主檔。",
                  },
                  {
                    icon: FileText, time: "Day 1 · 14:30", t: "產生第一版報價",
                    d: "業務根據新案 RFP 在系統內勾選材料、輸入數量與工時，10 分鐘內產出 v1 報價單；版本紀錄自動保留，方便後續調整比對。",
                  },
                  {
                    icon: Calculator, time: "Day 2 · 10:15", t: "試算毛利與調整方案",
                    d: "系統即時試算材料 62%、人工 18%、外包 12%、管理 + 利潤 8%；老闆檢視儀表板，發現毛利只有 11.8%，請業務調整付款條件與外包比重。",
                  },
                  {
                    icon: ShieldAlert, time: "Day 2 · 16:42", t: "AI 抓出成本異常",
                    d: "送出 v3 報價前，AI 偵測到材料 #M-2031 單價較歷史均價高 24%，且遺漏一項常用配件。系統提醒重新詢價，避免接案後才發現虧錢。",
                  },
                  {
                    icon: LayoutDashboard, time: "Day 7 · 簽約後", t: "進度與毛利持續追蹤",
                    d: "專案開工後，採購、施工、外包成本陸續輸入，老闆儀表板每日更新預估與實際毛利差異，異常超過 ±5% 自動推送至 LINE。",
                  },
                ].map(({ icon: Icon, time, t, d }, i) => (
                  <li key={i} className="panel p-6 flex gap-4">
                    <div className="flex-none">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-ink-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-gold">{time}</div>
                      <h3 className="mt-1 text-lg font-semibold">{t}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <aside className="panel-lift p-7 lg:sticky lg:top-24">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">導入成效（前 30 天）</div>
                <div className="mt-5 space-y-5">
                  {[
                    ["報價產出時間", "由 4 小時 → 25 分鐘", "85%↓"],
                    ["成本異常被攔截", "12 件 / 月", "避免虧損"],
                    ["平均專案毛利", "由 14.2% → 18.6%", "+4.4 pp"],
                    ["主管追問成本次數", "由每週 18 次 → 3 次", "83%↓"],
                  ].map(([k, v, tag]) => (
                    <div key={k} className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0">
                      <div>
                        <div className="text-sm font-semibold">{k}</div>
                        <div className="text-sm text-muted-foreground mt-0.5">{v}</div>
                      </div>
                      <span className="tag flex-none">{tag}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
                  ※ 數據為典型導入案例，實際成效依公司流程、資料完整度與導入深度而定。
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container-x">
            <div className="panel-lift p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
              <h2 className="text-3xl md:text-4xl max-w-2xl mx-auto">先把成本看清楚，再開始放大營收。</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                CostFlow 不取代你的工程經驗，而是把經驗轉成可管理、可複製、可交接的數據流程。
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
