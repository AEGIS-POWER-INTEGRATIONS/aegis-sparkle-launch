import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/lib/nav";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { L, useT } from "@/lib/i18n";
import { useTipLocale } from "@/lib/knowledge-i18n";
import {
  PUBLISHED_AI_TIPS,
  type AiTipCategory,
} from "@/lib/ai-tips";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/knowledge/ai-tips/")({
  head: () => {
    const empty = PUBLISHED_AI_TIPS.length === 0;
    const meta: Array<Record<string, string>> = [
      { title: "企業 AI 使用技巧 AI Tips — AEGIS 宏鼎集成" },
      {
        name: "description",
        content:
          "以企業實際工作情境為出發點，分享生成式 AI、辦公效率、企業管理、網站系統與資訊安全等實務使用方法。",
      },
      { property: "og:title", content: "企業 AI 使用技巧 — AEGIS 宏鼎集成" },
      {
        property: "og:description",
        content: "生成式 AI 在企業辦公、管理、網站系統與資安上的實務使用方法。",
      },
      { property: "og:url", content: `${SITE.domain}/knowledge/ai-tips` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (empty) meta.push({ name: "robots", content: "noindex, follow" });
    return {
      meta,
      links: [{ rel: "canonical", href: `${SITE.domain}/knowledge/ai-tips` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "首頁", item: `${SITE.domain}/` },
              { "@type": "ListItem", position: 2, name: "知識中心", item: `${SITE.domain}/knowledge` },
              { "@type": "ListItem", position: 3, name: "AI 使用技巧", item: `${SITE.domain}/knowledge/ai-tips` },
            ],
          }),
        },
      ],
    };
  },
  component: TipsIndex,
});

const CAT_OPTIONS: { value: AiTipCategory | "all"; zh: string; en: string }[] = [
  { value: "all", zh: "全部", en: "All" },
  { value: "ai-basics", zh: "AI 入門", en: "AI Basics" },
  { value: "office", zh: "辦公效率", en: "Office Productivity" },
  { value: "management", zh: "企業管理", en: "Management" },
  { value: "web-system", zh: "網站與系統", en: "Web & Systems" },
  { value: "advanced", zh: "進階技巧", en: "Advanced" },
  { value: "security", zh: "資安與風險", en: "Security & Risk" },
];

export function TipsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<AiTipCategory | "all">("all");
  const t = useT();
  const { tips, catLabel } = useTipLocale();

  const localizedTips = useMemo(() => tips(PUBLISHED_AI_TIPS), [tips]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return localizedTips.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (!query) return true;
      const hay = [a.title, a.summary, a.tags.join(" ")].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [localizedTips, q, cat]);

  return (
    <div className="pb-24">
      <section className="border-b border-border/60 bg-surface/40">
        <div className="container-x py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="hover:text-foreground"><L zh="首頁" en="Home" /></Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/knowledge" className="hover:text-foreground"><L zh="知識中心" en="Knowledge Center" /></Link></li>
              <li aria-hidden>/</li>
              <li className="text-foreground/80"><L zh="AI 使用技巧" en="AI Tips" /></li>
            </ol>
          </nav>
          <div className="mt-6 text-xs font-semibold tracking-widest uppercase text-primary">AI Tips</div>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] max-w-4xl">
            <L zh="企業 AI 使用技巧" en="Enterprise AI Tips" />
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            <L
              zh="以企業實際工作情境為出發點，分享生成式 AI、辦公效率、企業管理、網站系統及資訊安全等使用方法。"
              en="Practical, work-context-driven articles on generative AI, office productivity, management, web systems, and information security."
            />
          </p>

          <div className="mt-10 max-w-2xl">
            <label className="relative block">
              <span className="sr-only"><L zh="搜尋" en="Search" /></span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t({ zh: "搜尋文章標題、摘要或標籤…", en: "Search titles, summaries, or tags…" })}
                className="w-full h-12 rounded-md border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              {CAT_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setCat(o.value)}
                  className={`text-xs rounded-sm border px-2.5 py-1.5 transition-colors ${
                    cat === o.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/80 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t({ zh: o.zh, en: o.en })}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight"><L zh="文章列表" en="Articles" /></h2>
            <span className="text-sm text-muted-foreground">
              <L zh={`${filtered.length} 篇文章`} en={`${filtered.length} article${filtered.length === 1 ? "" : "s"}`} />
            </span>
          </div>
          {filtered.length === 0 ? (
            <div className="mt-10 panel p-8">
              <p className="text-foreground/85">
                {PUBLISHED_AI_TIPS.length === 0 ? (
                  <L
                    zh="AI 使用技巧文章正在整備中。所有內容皆處於內部審核（review）狀態，於補齊工具版本、官方來源與最後查核日期後才會公開。"
                    en="AI Tips articles are being prepared. All content is currently in internal review and will be published once tool versions, official sources, and last-verified dates are confirmed."
                  />
                ) : (
                  <L zh="沒有符合條件的文章。試著調整關鍵字或分類。" en="No articles match your filters. Try adjusting your keywords or category." />
                )}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <L
                  zh="想優先看某個主題？歡迎透過「聯絡我們」告知，我們會列入下一批釋出優先順序。"
                  en="Want to see a particular topic first? Let us know via Contact and we'll prioritize it in our next release."
                />
              </p>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <li key={a.slug}>
                  <Link
                    to="/knowledge/ai-tips/$slug"
                    params={{ slug: a.slug }}
                    className="panel p-6 flex h-full flex-col gap-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                      {catLabel(a.category)}
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-foreground">{a.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{a.summary}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                      {a.audience.slice(0, 3).map((au) => (
                        <span key={au} className="rounded-sm border border-border/70 px-1.5 py-0.5">
                          {(() => {
                            const { audLabel } = useTipLocale();
                            return audLabel(au);
                          })()}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto text-xs text-muted-foreground inline-flex items-center gap-1">
                      <L zh={`${a.readingTime} 分鐘閱讀`} en={`${a.readingTime} min read`} /> · <L zh="查看文章" en="View article" /> <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
