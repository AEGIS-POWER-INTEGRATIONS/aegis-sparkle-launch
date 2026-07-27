import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { CopyButton } from "@/components/copy-button";
import {
  PROMPT_CATEGORY_LABEL,
  PROMPT_DIFFICULTY_LABEL,
  PROMPT_AUDIENCE_LABEL,
  getPrompt,
  getRelatedPrompts,
  type Prompt,
} from "@/lib/prompts";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/knowledge/prompts/$slug")({
  loader: ({ params }) => {
    const prompt = getPrompt(params.slug);
    if (!prompt) throw notFound();
    return { prompt };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.prompt;
    const url = `${SITE.domain}/knowledge/prompts/${params.slug}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.summary,
      dateModified: p.updatedAt,
      inLanguage: "zh-TW",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: SITE.legalName.zh },
      publisher: { "@type": "Organization", name: SITE.legalName.zh, url: SITE.domain },
    };
    const bc = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "知識中心", item: `${SITE.domain}/knowledge` },
        { "@type": "ListItem", position: 2, name: "企業 AI 提示詞庫", item: `${SITE.domain}/knowledge/prompts` },
        { "@type": "ListItem", position: 3, name: PROMPT_CATEGORY_LABEL[p.category] },
        { "@type": "ListItem", position: 4, name: p.title, item: url },
      ],
    };
    return {
      meta: [
        { title: p.seoTitle },
        { name: "description", content: p.seoDescription },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.summary },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(jsonLd) },
        { type: "application/ld+json", children: JSON.stringify(bc) },
      ],
    };
  },
  component: PromptDetail,
  notFoundComponent: () => (
    <div className="container-x py-24">
      <h1 className="text-2xl font-semibold">找不到提示詞</h1>
      <Link to="/knowledge/prompts" className="mt-4 inline-block text-primary">
        返回提示詞庫
      </Link>
    </div>
  ),
});

function PromptDetail() {
  const { prompt } = Route.useLoaderData() as { prompt: Prompt };
  const related = getRelatedPrompts(prompt);
  const url = `${SITE.domain}/knowledge/prompts/${prompt.slug}`;

  async function shareLink() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("頁面連結已複製");
    } catch {
      toast.error("複製失敗，請手動複製網址列連結。");
    }
  }

  return (
    <article className="pb-24">
      <header className="border-b border-border/60 bg-surface/40">
        <div className="container-x py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="hover:text-foreground">首頁</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/knowledge" className="hover:text-foreground">知識中心</Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/knowledge/prompts" className="hover:text-foreground">企業 AI 提示詞庫</Link></li>
              <li aria-hidden>/</li>
              <li>{PROMPT_CATEGORY_LABEL[prompt.category]}</li>
              <li aria-hidden>/</li>
              <li className="text-foreground/80 truncate max-w-[40ch]">{prompt.title}</li>
            </ol>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest">
            <span className="rounded-sm bg-primary/10 text-primary px-2.5 py-1 font-semibold">
              {PROMPT_CATEGORY_LABEL[prompt.category]}
            </span>
            <span className="rounded-sm border border-border/80 px-2 py-1 text-muted-foreground">
              {PROMPT_DIFFICULTY_LABEL[prompt.difficulty]}
            </span>
            {prompt.industries.slice(0, 3).map((i) => (
              <span key={i} className="rounded-sm border border-border/80 px-2 py-1 text-muted-foreground">
                {PROMPT_AUDIENCE_LABEL[i]}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-foreground max-w-4xl leading-[1.15]">
            {prompt.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {prompt.summary}
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            適用對象：{prompt.audience} · 最後更新 {prompt.updatedAt}
          </div>
        </div>
      </header>

      <div className="container-x py-12 md:py-16 max-w-4xl">
        {/* Prompt TOC — collapsible on mobile, expanded on md+. */}
        <details open className="mb-10 rounded-md border border-border bg-surface/40 group">
          <summary className="cursor-pointer list-none flex items-center justify-between px-4 py-3 text-sm font-medium">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
              目錄
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
          </summary>
          <nav aria-label="目錄" className="border-t border-border/70 px-4 py-3">
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/60">
              <li><a href="#scenario" className="hover:text-foreground">適用情境</a></li>
              <li><a href="#audience" className="hover:text-foreground">適用產業或公司規模</a></li>
              <li><a href="#preparation" className="hover:text-foreground">使用前需要準備的資料</a></li>
              <li><a href="#variables" className="hover:text-foreground">可替換欄位說明</a></li>
              <li><a href="#prompt" className="hover:text-foreground">完整提示詞</a></li>
              <li><a href="#usage" className="hover:text-foreground">使用步驟</a></li>
              <li><a href="#example" className="hover:text-foreground">實際填寫範例</a></li>
              <li><a href="#mistakes" className="hover:text-foreground">常見錯誤</a></li>
              <li><a href="#cautions" className="hover:text-foreground">注意事項</a></li>
              {related.length > 0 && (
                <li><a href="#related" className="hover:text-foreground">相關提示詞</a></li>
              )}
            </ol>
          </nav>
        </details>

        <Section id="scenario" title="適用情境">
          <p className="text-foreground/85 leading-[1.85]">{prompt.summary}</p>
        </Section>

        <Section id="audience" title="適用產業或公司規模">
          <ul className="list-disc pl-5 space-y-1 text-foreground/85">
            {prompt.industries.map((i) => (
              <li key={i}>{PROMPT_AUDIENCE_LABEL[i]}</li>
            ))}
          </ul>
        </Section>

        <Section id="preparation" title="使用前需要準備的資料">
          <ul className="list-disc pl-5 space-y-1 text-foreground/85">
            {prompt.preparation.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </Section>

        <Section id="variables" title="可替換欄位說明">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold w-40">變數</th>
                  <th className="text-left py-2 font-semibold">說明</th>
                </tr>
              </thead>
              <tbody>
                {prompt.variables.map((v) => (
                  <tr key={v.name} className="border-b border-border/60">
                    <td className="py-2 pr-4 font-mono text-primary">{v.name}</td>
                    <td className="py-2 text-foreground/85">{v.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="prompt" title="完整提示詞">
          <div className="rounded-md border border-border bg-surface/60">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/60">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                Prompt
              </span>
              <CopyButton
                text={prompt.promptContent}
                ariaLabel={`複製提示詞：${prompt.title}`}
                label="複製提示詞"
              />
            </div>
            <pre className="p-4 md:p-6 whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.75] text-foreground/90">
{prompt.promptContent}
            </pre>
          </div>
        </Section>

        <Section id="usage" title="使用步驟">
          <ol className="list-decimal pl-5 space-y-2 text-foreground/85">
            {prompt.usageSteps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </Section>

        <Section id="example" title="實際填寫範例">
          <p className="text-foreground/85 leading-[1.85]">{prompt.example}</p>
        </Section>

        <Section id="mistakes" title="常見錯誤">
          <ul className="list-disc pl-5 space-y-1 text-foreground/85">
            {prompt.commonMistakes.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>

        <Section id="cautions" title="注意事項">
          <ul className="list-disc pl-5 space-y-1 text-foreground/85">
            {prompt.cautions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>


        {related.length > 0 && (
          <Section id="related" title="相關提示詞">
            <ul className="grid gap-3 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to="/knowledge/prompts/$slug"
                    params={{ slug: r.slug }}
                    className="panel p-4 block hover:border-primary/40 transition-colors"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                      {PROMPT_CATEGORY_LABEL[r.category]}
                    </div>
                    <div className="mt-1 font-semibold text-sm">{r.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.summary}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={shareLink}
            className="inline-flex items-center gap-1.5 rounded-sm border border-border/80 px-3 py-2 text-xs font-medium hover:bg-surface"
          >
            <Share2 className="h-3.5 w-3.5" /> 分享頁面連結
          </button>
          <span className="text-xs text-muted-foreground">最後更新 {prompt.updatedAt}</span>
        </div>

        <section className="mt-16 rounded-lg border border-border bg-ink text-ink-foreground p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            需要依照公司流程與產業需求進一步客製化嗎？
          </h2>
          <p className="mt-3 text-ink-foreground/75 max-w-2xl">
            宏鼎集成提供企業 AI 導入、流程盤點及系統整合顧問服務，可協助您把提示詞落實為可穩定運作的內部流程。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              預約企業 AI 導入諮詢 <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              to="/ai-integration"
              className="btn border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10"
            >
              了解 AI 系統整合
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 first:mt-0 knowledge-toc-target">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">{title}</h2>
      {children}
    </section>
  );
}


