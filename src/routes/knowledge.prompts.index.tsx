import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import {
  PROMPTS,
  PROMPT_CATEGORY_LABEL,
  PROMPT_DIFFICULTY_LABEL,
  PROMPT_AUDIENCE_LABEL,
  type PromptCategory,
  type PromptDifficulty,
  type PromptAudienceTag,
} from "@/lib/prompts";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/knowledge/prompts/")({
  head: () => ({
    meta: [
      { title: "AEGIS 企業 AI 提示詞庫 Business Prompt Library — 宏鼎集成" },
      {
        name: "description",
        content:
          "AEGIS 企業 AI 提示詞庫：提供網站建置、系統規劃與企業管理等可直接使用的實務提示詞，協助企業更有效率地與 AI 協作。",
      },
      { property: "og:title", content: "AEGIS 企業 AI 提示詞庫 — 宏鼎集成" },
      {
        property: "og:description",
        content:
          "網站建置、系統規劃與企業管理的可用提示詞，含變數、使用步驟與注意事項。",
      },
      { property: "og:url", content: `${SITE.domain}/knowledge/prompts` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.domain}/knowledge/prompts` }],
  }),
  component: PromptsIndex,
});

const CATEGORY_OPTIONS: { value: PromptCategory | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "website-build", label: "網站建置" },
  { value: "system-build", label: "系統建置" },
  { value: "management", label: "企業管理" },
];

const DIFFICULTY_OPTIONS: { value: PromptDifficulty | "all"; label: string }[] = [
  { value: "all", label: "所有難度" },
  { value: "beginner", label: "入門" },
  { value: "intermediate", label: "中階" },
  { value: "advanced", label: "進階" },
];

const AUDIENCE_OPTIONS: { value: PromptAudienceTag | "all"; label: string }[] = [
  { value: "all", label: "所有對象" },
  { value: "sme", label: "中小企業" },
  { value: "manufacturing", label: "製造業" },
  { value: "engineering", label: "工程業" },
  { value: "general", label: "通用" },
];

function PromptsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<PromptCategory | "all">("all");
  const [diff, setDiff] = useState<PromptDifficulty | "all">("all");
  const [aud, setAud] = useState<PromptAudienceTag | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (diff !== "all" && p.difficulty !== diff) return false;
      if (aud !== "all" && !p.industries.includes(aud)) return false;
      if (!query) return true;
      const hay = [p.title, p.summary, p.audience, p.tags.join(" ")].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [q, cat, diff, aud]);

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
              <li className="text-foreground/80">企業 AI 提示詞庫</li>
            </ol>
          </nav>
          <div className="mt-6 text-xs font-semibold tracking-widest uppercase text-primary">
            AEGIS Business Prompt Library
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] max-w-4xl">
            AEGIS 企業 AI 提示詞庫
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            提供網站建置、系統規劃及企業管理等實務提示詞，協助企業更有效率地與 AI 協作。使用者可依實際需求替換公司名稱、產業、規模與目標等欄位。
          </p>

          <div className="mt-10 max-w-2xl">
            <label className="relative block">
              <span className="sr-only">搜尋</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜尋標題、摘要、標籤或使用情境…"
                className="w-full h-12 rounded-md border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <FilterChips label="分類" value={cat} onChange={setCat} options={CATEGORY_OPTIONS} />
            <FilterChips label="難度" value={diff} onChange={setDiff} options={DIFFICULTY_OPTIONS} />
            <FilterChips label="適用對象" value={aud} onChange={setAud} options={AUDIENCE_OPTIONS} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">提示詞列表</h2>
            <span className="text-sm text-muted-foreground">{filtered.length} 則提示詞</span>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-muted-foreground">沒有符合條件的提示詞。試著調整關鍵字或篩選。</p>
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
                      <span className="text-primary">{PROMPT_CATEGORY_LABEL[p.category]}</span>
                      <span className="text-muted-foreground">
                        · {PROMPT_DIFFICULTY_LABEL[p.difficulty]}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                      {p.industries.slice(0, 3).map((i) => (
                        <span key={i} className="rounded-sm border border-border/70 px-1.5 py-0.5">
                          {PROMPT_AUDIENCE_LABEL[i]}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto text-xs text-muted-foreground inline-flex items-center gap-1">
                      查看提示詞 <ArrowRight className="h-3.5 w-3.5" />
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
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
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
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
