import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/lib/nav";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import {
  PUBLISHED_PROMPTS,
  type PromptCategory,
  type PromptDifficulty,
  type PromptAudienceTag,
} from "@/lib/prompts";
import { SITE } from "@/lib/site-config";
import { L, useT } from "@/lib/i18n";
import { usePromptLocale } from "@/lib/knowledge-i18n";

export const Route = createFileRoute("/knowledge/prompts/")({
  head: () => {
    const empty = PUBLISHED_PROMPTS.length === 0;
    const meta: Array<Record<string, string>> = [
      { title: "AEGIS 企業 AI 提示詞庫 Business Prompt Library — 宏鼎集成" },
      {
        name: "description",
        content:
          "AEGIS 企業 AI 提示詞庫：提供網站建置、系統規劃與企業管理等可直接使用的實務提示詞，協助企業更有效率地與 AI 協作。",
      },
      { property: "og:title", content: "AEGIS 企業 AI 提示詞庫 — 宏鼎集成" },
      {
        property: "og:description",
        content: "網站建置、系統規劃與企業管理的可用提示詞，含變數、使用步驟與注意事項。",
      },
      { property: "og:url", content: `${SITE.domain}/knowledge/prompts` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    // Hub with 0 published items: noindex, follow — still 200, still crawlable,
    // just not indexed. Auto-flips to indexable when a prompt goes live.
    if (empty) meta.push({ name: "robots", content: "noindex, follow" });
    return {
      meta,
      links: [{ rel: "canonical", href: `${SITE.domain}/knowledge/prompts` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "首頁", item: `${SITE.domain}/` },
              { "@type": "ListItem", position: 2, name: "知識中心", item: `${SITE.domain}/knowledge` },
              { "@type": "ListItem", position: 3, name: "企業 AI 提示詞庫", item: `${SITE.domain}/knowledge/prompts` },
            ],
          }),
        },
      ],
    };
  },
  component: PromptsIndex,
});

const CATEGORY_OPTIONS: { value: PromptCategory | "all"; zh: string; en: string }[] = [
  { value: "all", zh: "全部", en: "All" },
  { value: "website-build", zh: "網站建置", en: "Website Build" },
  { value: "system-build", zh: "系統建置", en: "System Build" },
  { value: "management", zh: "企業管理", en: "Management" },
];

const DIFFICULTY_OPTIONS: { value: PromptDifficulty | "all"; zh: string; en: string }[] = [
  { value: "all", zh: "所有難度", en: "All Levels" },
  { value: "beginner", zh: "入門", en: "Beginner" },
  { value: "intermediate", zh: "中階", en: "Intermediate" },
  { value: "advanced", zh: "進階", en: "Advanced" },
];

const AUDIENCE_OPTIONS: { value: PromptAudienceTag | "all"; zh: string; en: string }[] = [
  { value: "all", zh: "所有對象", en: "All Audiences" },
  { value: "sme", zh: "中小企業", en: "SME" },
  { value: "manufacturing", zh: "製造業", en: "Manufacturing" },
  { value: "engineering", zh: "工程業", en: "Engineering" },
  { value: "general", zh: "通用", en: "General" },
];

export function PromptsIndex() {
  const t = useT();
  const { isEn, prompts, catLabel, diffLabel, audLabel } = usePromptLocale();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<PromptCategory | "all">("all");
  const [diff, setDiff] = useState<PromptDifficulty | "all">("all");
  const [aud, setAud] = useState<PromptAudienceTag | "all">("all");

  const localized = useMemo(() => prompts(PUBLISHED_PROMPTS), [isEn]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return localized.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (diff !== "all" && p.difficulty !== diff) return false;
      if (aud !== "all" && !p.industries.includes(aud)) return false;
      if (!query) return true;
      const hay = [p.title, p.summary, p.audience, p.tags.join(" ")].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [localized, q, cat, diff, aud]);

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
              <li className="text-foreground/80"><L zh="企業 AI 提示詞庫" en="AI Prompt Library" /></li>
            </ol>
          </nav>
          <div className="mt-6 text-xs font-semibold tracking-widest uppercase text-primary">
            AEGIS Business Prompt Library
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] max-w-4xl">
            <L zh="AEGIS 企業 AI 提示詞庫" en="AEGIS Business AI Prompt Library" />
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            <L
              zh="提供網站建置、系統規劃及企業管理等實務提示詞，協助企業更有效率地與 AI 協作。使用者可依實際需求替換公司名稱、產業、規模與目標等欄位。"
              en="Practical prompts for website build, system planning, and enterprise management, helping companies collaborate with AI more efficiently. Swap in your own company name, industry, size, and goals as needed."
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
                placeholder={t({ zh: "搜尋標題、摘要、標籤或使用情境…", en: "Search title, summary, tags, or use case…" })}
                className="w-full h-12 rounded-md border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <FilterChips label={t({ zh: "分類", en: "Category" })} value={cat} onChange={setCat} options={CATEGORY_OPTIONS} isEn={isEn} />
            <FilterChips label={t({ zh: "難度", en: "Difficulty" })} value={diff} onChange={setDiff} options={DIFFICULTY_OPTIONS} isEn={isEn} />
            <FilterChips label={t({ zh: "適用對象", en: "Audience" })} value={aud} onChange={setAud} options={AUDIENCE_OPTIONS} isEn={isEn} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight"><L zh="提示詞列表" en="Prompt List" /></h2>
            <span className="text-sm text-muted-foreground">
              <L zh={`${filtered.length} 則提示詞`} en={`${filtered.length} prompt${filtered.length === 1 ? "" : "s"}`} />
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 panel p-8">
              <p className="text-foreground/85">
                {PUBLISHED_PROMPTS.length === 0 ? (
                  <L
                    zh="提示詞庫正在整備中。目前所有提示詞皆處於內部審核（review）狀態，將於通過查核並補齊版本與官方來源後陸續公開。"
                    en="The prompt library is being prepared. All prompts are currently under internal review and will be published once verified with version and source details."
                  />
                ) : (
                  <L
                    zh="沒有符合條件的提示詞。試著調整關鍵字或篩選。"
                    en="No prompts match your criteria. Try adjusting your keywords or filters."
                  />
                )}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <L
                  zh="如有特定情境需求，歡迎透過「聯絡我們」提出，我們會列入下一批釋出優先順序。"
                  en="If you have a specific use case in mind, reach out via Contact Us and we'll prioritize it for the next release."
                />
              </p>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/knowledge/prompts/$slug"
                    params={{ slug: p.slug }}
                    className="panel p-6 flex h-full flex-col gap-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-widest">
                      <span className="text-primary">{catLabel(p.category)}</span>
                      <span className="text-muted-foreground">
                        · {diffLabel(p.difficulty)}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                      {p.industries.slice(0, 3).map((i) => (
                        <span key={i} className="rounded-sm border border-border/70 px-1.5 py-0.5">
                          {audLabel(i)}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto text-xs text-muted-foreground inline-flex items-center gap-1">
                      <L zh="查看提示詞" en="View prompt" /> <ArrowRight className="h-3.5 w-3.5" />
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

function FilterChips<T extends string>({
  label,
  value,
  onChange,
  options,
  isEn,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; zh: string; en: string }[];
  isEn: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`text-xs rounded-sm border px-2.5 py-1.5 transition-colors ${
              value === o.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 text-muted-foreground hover:text-foreground"
            }`}
          >
            {isEn ? o.en : o.zh}
          </button>
        ))}
      </div>
    </div>
  );
}
