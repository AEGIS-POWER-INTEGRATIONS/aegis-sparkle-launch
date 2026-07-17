import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import {
  AI_TIPS,
  AI_TIP_CATEGORY_LABEL,
  AI_TIP_AUDIENCE_LABEL,
  type AiTipCategory,
} from "@/lib/ai-tips";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/knowledge/ai-tips/")({
  head: () => ({
    meta: [
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
    ],
    links: [{ rel: "canonical", href: `${SITE.domain}/knowledge/ai-tips` }],
  }),
  component: TipsIndex,
});

const CAT_OPTIONS: { value: AiTipCategory | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "ai-basics", label: "AI 入門" },
  { value: "office", label: "辦公效率" },
  { value: "management", label: "企業管理" },
  { value: "web-system", label: "網站與系統" },
  { value: "advanced", label: "進階技巧" },
  { value: "security", label: "資安與風險" },
];

function TipsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<AiTipCategory | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return AI_TIPS.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (!query) return true;
      const hay = [a.title, a.summary, a.tags.join(" ")].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [q, cat]);

  return (
    <div className="pb-24">
      <section className="border-b border-border/60 bg-surface/40">
        <div className="container-x py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="hover:text-foreground">首頁</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/knowledge" className="hover:text-foreground">知識中心</Link></li>
              <li aria-hidden>/</li>
              <li className="text-foreground/80">AI 使用技巧</li>
            </ol>
          </nav>
          <div className="mt-6 text-xs font-semibold tracking-widest uppercase text-primary">AI Tips</div>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] max-w-4xl">
            企業 AI 使用技巧
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            以企業實際工作情境為出發點，分享生成式 AI、辦公效率、企業管理、網站系統及資訊安全等使用方法。
          </p>

          <div className="mt-10 max-w-2xl">
            <label className="relative block">
              <span className="sr-only">搜尋</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜尋文章標題、摘要或標籤…"
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
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">文章列表</h2>
            <span className="text-sm text-muted-foreground">{filtered.length} 篇文章</span>
          </div>
          {filtered.length === 0 ? (
            <p className="mt-10 text-muted-foreground">沒有符合條件的文章。試著調整關鍵字或分類。</p>
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
                      {AI_TIP_CATEGORY_LABEL[a.category]}
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-foreground">{a.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{a.summary}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                      {a.audience.slice(0, 3).map((au) => (
                        <span key={au} className="rounded-sm border border-border/70 px-1.5 py-0.5">
                          {AI_TIP_AUDIENCE_LABEL[au]}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto text-xs text-muted-foreground inline-flex items-center gap-1">
                      {a.readingTime} 分鐘閱讀 · 查看文章 <ArrowRight className="h-3.5 w-3.5" />
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
