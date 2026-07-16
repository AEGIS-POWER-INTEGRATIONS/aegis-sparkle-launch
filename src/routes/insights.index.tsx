import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { INSIGHTS, CATEGORY_LABEL, type InsightCategory } from "@/lib/insights";
import { L, useLang } from "@/lib/i18n";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "洞見與客戶案例｜Insights & Success Stories｜AEGIS POWER INTEGRATIONS" },
      { name: "description", content: "AI 導入、數位轉型、工程管理與企業自動化的實務觀點與匿名客戶案例。Practical insights and anonymized customer success stories on AI, digital transformation, engineering management and automation." },
      { property: "og:title", content: "Insights & Success Stories | AEGIS POWER INTEGRATIONS" },
      { property: "og:description", content: "Enterprise knowledge center: AI adoption, digital transformation and engineering management." },
      { property: "og:url", content: `${SITE_URL}/insights` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/insights` }],
  }),
  component: InsightsHub,
});

const FILTERS: { key: "all" | InsightCategory; zh: string; en: string }[] = [
  { key: "all", zh: "全部", en: "All" },
  { key: "case-study", zh: "客戶案例", en: "Case Studies" },
  { key: "ai-adoption", zh: "AI 導入", en: "AI Adoption" },
  { key: "digital-transformation", zh: "數位轉型", en: "Digital Transformation" },
  { key: "engineering-management", zh: "工程管理", en: "Engineering Management" },
  { key: "workflow", zh: "流程優化", en: "Workflow" },
  { key: "automation", zh: "自動化", en: "Automation" },
];

function InsightsHub() {
  const { isEn } = useLang();
  const tr = (b: { zh: string; en: string }) => (isEn ? b.en : b.zh);
  const [active, setActive] = useState<"all" | InsightCategory>("all");

  const items = active === "all" ? INSIGHTS : INSIGHTS.filter((i) => i.category === active);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="container-x py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
            <L zh="企業知識中心" en="Enterprise Knowledge Center" />
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            <L zh="洞見與客戶案例" en="Insights & Success Stories" />
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            <L
              zh="AI 導入、數位轉型、工程管理、企業流程優化與自動化的實務觀點，搭配以產業與挑戰為主軸的匿名客戶案例。"
              en="Practical viewpoints on AI adoption, digital transformation, engineering management, workflow improvement and automation — alongside anonymized customer stories organized by industry and challenge."
            />
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                active === f.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {tr(f)}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((ins) => (
            <Link
              key={ins.slug}
              to="/insights/$slug"
              params={{ slug: ins.slug }}
              className="group flex flex-col justify-between rounded-lg border border-border bg-card p-6 hover:border-foreground/40 hover:shadow-[var(--shadow-card)] transition"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" />
                  {tr(CATEGORY_LABEL[ins.category])}
                </div>
                {ins.industryTag && (
                  <div className="mt-2 text-xs text-muted-foreground">{tr(ins.industryTag)}</div>
                )}
                <h2 className="mt-3 text-lg font-semibold text-foreground leading-snug">
                  {tr(ins.title)}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {tr(ins.summary)}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {ins.readMinutes} <L zh="分鐘" en="min read" />
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <L zh="閱讀" en="Read" />
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-10 rounded-lg border border-border p-10 text-center text-muted-foreground">
            <L zh="此分類目前沒有文章。" en="No articles in this category yet." />
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
