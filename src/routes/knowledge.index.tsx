import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { L, useLang, useT } from "@/lib/i18n";
import {
  PUBLISHED_ARTICLES,
  CATEGORIES,
  TAG_LABEL,
  articlePath,
  categoryPath,
  getAllTags,
  type KnowledgeTag,
} from "@/lib/knowledge";

import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title: "知識中心 Knowledge Center — AEGIS POWER INTEGRATIONS" },
      {
        name: "description",
        content:
          "AEGIS POWER INTEGRATIONS 知識中心：涵蓋 AI 導入、工程管理、製造業數位轉型、資料中心工程、成功案例與產業解決方案的深度知識庫。",
      },
      { property: "og:title", content: "Knowledge Center — AEGIS POWER INTEGRATIONS" },
      {
        property: "og:description",
        content:
          "Enterprise knowledge on AI integration, engineering management, manufacturing transformation, data center engineering and industry solutions.",
      },
      { property: "og:url", content: `${SITE.domain}/knowledge` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Knowledge Center — AEGIS POWER INTEGRATIONS" },
    ],
    links: [{ rel: "canonical", href: `${SITE.domain}/knowledge` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "首頁", item: `${SITE.domain}/` },
            { "@type": "ListItem", position: 2, name: "知識中心", item: `${SITE.domain}/knowledge` },
          ],
        }),
      },
    ],
  }),
  component: KnowledgeIndex,
});

function KnowledgeIndex() {
  const { isEn } = useLang();
  const t = useT();
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<KnowledgeTag | null>(null);
  const tags = useMemo(() => getAllTags(), []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PUBLISHED_ARTICLES.filter((a) => {
      if (activeTag && !a.tags.includes(activeTag)) return false;
      if (!query) return true;
      const haystack = [
        a.title.zh,
        a.title.en,
        a.excerpt.zh,
        a.excerpt.en,
        a.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [q, activeTag]);


  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="border-b border-border/60 bg-surface/40">
        <div className="container-x py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-foreground">
                  <L zh="首頁" en="Home" />
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground/80">
                <L zh="知識中心" en="Knowledge Center" />
              </li>
            </ol>
          </nav>
          <div className="mt-6 text-xs font-semibold tracking-widest uppercase text-primary">
            <L zh="知識中心" en="Knowledge Center" />
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] max-w-4xl">
            <L
              zh="以工程整合與 AI 顧問的視角，累積可長期參考的企業知識。"
              en="Long-term enterprise knowledge from an engineering integration and AI advisory perspective."
            />
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            <L
              zh="AEGIS POWER INTEGRATIONS 知識中心涵蓋 AI 導入、工程管理、製造業數位轉型、資料中心工程、匿名情境案例與產業解決方案。"
              en="The AEGIS POWER INTEGRATIONS Knowledge Center covers AI integration, engineering management, manufacturing transformation, data center engineering, anonymized scenarios and industry solutions."
            />
          </p>

          {/* Search */}
          <div className="mt-10 max-w-2xl">
            <label className="relative block">
              <span className="sr-only">
                <L zh="搜尋" en="Search" />
              </span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t({
                  zh: "搜尋主題、關鍵字、產業…",
                  en: "Search topics, keywords, industries…",
                })}
                className="w-full h-12 rounded-md border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className={`text-xs rounded-sm border px-2.5 py-1.5 transition-colors ${
                  !activeTag
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                <L zh="全部" en="All" />
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`text-xs rounded-sm border px-2.5 py-1.5 transition-colors ${
                    activeTag === tag
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/80 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <L zh={TAG_LABEL[tag].zh} en={TAG_LABEL[tag].en} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prompt library + AI tips entry cards (above 知識分類) */}
      {!q.trim() && !activeTag && (
        <section className="py-14 md:py-16 border-b border-border/60">
          <div className="container-x">
            <div className="grid gap-6 md:grid-cols-2">
              <Link
                to="/knowledge/prompts"
                className="panel p-8 flex flex-col gap-4 hover:border-primary/40 transition-colors group"
              >
                <div className="text-[11px] uppercase tracking-widest text-primary font-semibold">
                  Business Prompt Library
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  企業 AI 提示詞庫
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  提供網站建置、系統規劃與企業管理等可直接使用的實務提示詞，含變數說明、使用步驟與注意事項。
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  探索提示詞 <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                to="/knowledge/ai-tips"
                className="panel p-8 flex flex-col gap-4 hover:border-primary/40 transition-colors group"
              >
                <div className="text-[11px] uppercase tracking-widest text-primary font-semibold">
                  AI Tips
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">AI 使用技巧</h2>
                <p className="text-muted-foreground leading-relaxed">
                  分享生成式 AI、辦公應用、企業管理、網站系統與資訊安全等實務使用方法，適合企業內部培訓與流程建立。
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  查看使用技巧 <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories overview */}
      {!q.trim() && !activeTag && (
        <section className="py-16 md:py-20 border-b border-border/60">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                <L zh="知識分類" en="Categories" />
              </h2>
              <span className="text-sm text-muted-foreground">
                {CATEGORIES.length} <L zh="個分類" en="categories" />
              </span>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to={categoryPath(c)}
                  className="panel p-7 flex flex-col gap-3 hover:border-primary/40 transition-colors"
                >
                  <div className="text-[11px] uppercase tracking-widest text-primary font-semibold">
                    <L
                      zh={c.externalPath ? "產業頁面" : "知識分類"}
                      en={c.externalPath ? "Industry pages" : "Category"}
                    />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    <L zh={c.name.zh} en={c.name.en} />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <L zh={c.tagline.zh} en={c.tagline.en} />
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                    {c.externalPath ? (
                      <L zh="前往產業頁面" en="Go to industry pages" />
                    ) : (
                      <>
                        {PUBLISHED_ARTICLES.filter((a) => a.category === c.slug).length}{" "}
                        <L zh="篇文章" en="articles" />
                      </>
                    )}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>

                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-16">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {q.trim() || activeTag ? (
                <L zh="搜尋結果" en="Search Results" />
              ) : (
                <L zh="全部文章" en="All Articles" />
              )}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filtered.length} <L zh="篇" en="results" />
            </span>
          </div>
          {filtered.length === 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
              <L
                zh="相關內容整理中，歡迎訂閱或與我們聯繫。"
                en="Content is being prepared — please subscribe or contact us for updates."
              />
            </div>
          ) : (

            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <li key={`${a.category}/${a.slug}`}>
                  <Link
                    to="/knowledge/$category/$slug"
                    params={{ category: a.category, slug: a.slug }}
                    className="panel p-6 flex h-full flex-col gap-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {a.tags.slice(0, 2).map((t2) => (
                        <span
                          key={t2}
                          className="text-[10px] font-semibold uppercase tracking-widest text-primary"
                        >
                          <L zh={TAG_LABEL[t2].zh} en={TAG_LABEL[t2].en} />
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-foreground">
                      <L zh={a.title.zh} en={a.title.en} />
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      <L zh={a.excerpt.zh} en={a.excerpt.en} />
                    </p>
                    <span className="mt-auto text-xs text-muted-foreground">
                      {a.readingMinutes} <L zh="分鐘閱讀" en="min read" /> ·{" "}
                      {isEn
                        ? new Date(a.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                        : new Date(a.publishedAt).toLocaleDateString("zh-TW", { year: "numeric", month: "long" })}
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
