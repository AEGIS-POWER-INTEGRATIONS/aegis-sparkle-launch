import { createFileRoute, notFound, useParams } from "@tanstack/react-router";
import { Link } from "@/lib/nav";
import { ArrowRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { L, useT } from "@/lib/i18n";
import { useTipLocale } from "@/lib/knowledge-i18n";
import {
  AI_TIP_CATEGORY_LABEL,
  getAiTip,
  getRelatedAiTips,
  type AiTip,
} from "@/lib/ai-tips";
import { getPrompt, PROMPT_CATEGORY_LABEL, type Prompt } from "@/lib/prompts";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/knowledge/ai-tips/$slug")({
  loader: ({ params }) => {
    const tip = getAiTip(params.slug);
    if (!tip) throw notFound();
    return { tip };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.tip;
    const url = `${SITE.domain}/knowledge/ai-tips/${params.slug}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.summary,
      dateModified: a.updatedAt,
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
        { "@type": "ListItem", position: 2, name: "AI 使用技巧", item: `${SITE.domain}/knowledge/ai-tips` },
        { "@type": "ListItem", position: 3, name: AI_TIP_CATEGORY_LABEL[a.category] },
        { "@type": "ListItem", position: 4, name: a.title, item: url },
      ],
    };
    return {
      meta: [
        { title: a.seoTitle },
        { name: "description", content: a.seoDescription },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.summary },
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
  component: TipDetail,
  notFoundComponent: () => (
    <div className="container-x py-24">
      <h1 className="text-2xl font-semibold"><L zh="找不到文章" en="Article not found" /></h1>
      <Link to="/knowledge/ai-tips" className="mt-4 inline-block text-primary">
        <L zh="返回 AI 使用技巧" en="Back to AI Tips" />
      </Link>
    </div>
  ),
});

export function TipDetail() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const raw = getAiTip(slug)!;
  const t = useT();
  const { tip: localize, catLabel, audLabel } = useTipLocale();
  const tip = localize(raw);
  const relatedRaw = getRelatedAiTips(raw);
  const related = relatedRaw.map(localize);
  const relatedPrompts: Prompt[] = raw.relatedPromptSlugs
    .map((s) => getPrompt(s))
    .filter((x): x is Prompt => Boolean(x));
  const url = `${SITE.domain}/knowledge/ai-tips/${tip.slug}`;

  async function shareLink() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t({ zh: "頁面連結已複製", en: "Link copied" }));
    } catch {
      toast.error(t({ zh: "複製失敗", en: "Failed to copy" }));
    }
  }

  return (
    <article className="pb-24">
      <header className="border-b border-border/60 bg-surface/40">
        <div className="container-x py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="hover:text-foreground"><L zh="首頁" en="Home" /></Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/knowledge" className="hover:text-foreground"><L zh="知識中心" en="Knowledge Center" /></Link></li>
              <li aria-hidden>/</li>
              <li><Link to="/knowledge/ai-tips" className="hover:text-foreground"><L zh="AI 使用技巧" en="AI Tips" /></Link></li>
              <li aria-hidden>/</li>
              <li>{catLabel(tip.category)}</li>
              <li aria-hidden>/</li>
              <li className="text-foreground/80 truncate max-w-[40ch]">{tip.title}</li>
            </ol>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest">
            <span className="rounded-sm bg-primary/10 text-primary px-2.5 py-1 font-semibold">
              {catLabel(tip.category)}
            </span>
            {tip.audience.slice(0, 3).map((au) => (
              <span key={au} className="rounded-sm border border-border/80 px-2 py-1 text-muted-foreground">
                {audLabel(au)}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight max-w-4xl leading-[1.15]">
            {tip.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">{tip.summary}</p>
          <div className="mt-6 text-sm text-muted-foreground">
            <L zh={`${tip.readingTime} 分鐘閱讀`} en={`${tip.readingTime} min read`} /> · <L zh={`最後更新 ${tip.updatedAt}`} en={`Last updated ${tip.updatedAt}`} />
          </div>
        </div>
      </header>

      <div className="container-x py-12 md:py-16 max-w-4xl">
        <Section title={t({ zh: "這篇文章可以學到什麼", en: "What you'll learn" })}>
          <ul className="list-disc pl-5 space-y-1 text-foreground/85">
            {tip.learningPoints.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>

        <Section title={t({ zh: "完整操作步驟", en: "Step-by-step guide" })}>
          <div className="space-y-8">
            {tip.sections.map((s, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.heading}</h3>
                <p className="whitespace-pre-line text-foreground/85 leading-[1.85]">{s.content}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t({ zh: "正確範例 / 錯誤範例", en: "Good example / Bad example" })}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-md border border-primary/40 p-4 bg-primary/5">
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                <L zh="正確做法" en="Good practice" />
              </div>
              <p className="mt-2 text-foreground/85 leading-[1.85]">{tip.examples.good}</p>
            </div>
            <div className="rounded-md border border-destructive/30 p-4 bg-destructive/5">
              <div className="text-xs uppercase tracking-widest text-destructive font-semibold">
                <L zh="錯誤做法" en="Bad practice" />
              </div>
              <p className="mt-2 text-foreground/85 leading-[1.85]">{tip.examples.bad}</p>
            </div>
          </div>
        </Section>

        <Section title={t({ zh: "常見問題", en: "Common mistakes" })}>
          <ul className="list-disc pl-5 space-y-1 text-foreground/85">
            {tip.commonMistakes.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>

        <Section title={t({ zh: "注意事項", en: "Cautions" })}>
          <ul className="list-disc pl-5 space-y-1 text-foreground/85">
            {tip.cautions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>

        {relatedPrompts.length > 0 && (
          <Section title={t({ zh: "相關提示詞", en: "Related prompts" })}>
            <ul className="grid gap-3 md:grid-cols-2">
              {relatedPrompts.map((r) => (
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

        {related.length > 0 && (
          <Section title={t({ zh: "相關文章", en: "Related articles" })}>
            <ul className="grid gap-3 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to="/knowledge/ai-tips/$slug"
                    params={{ slug: r.slug }}
                    className="panel p-4 block hover:border-primary/40 transition-colors"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                      {catLabel(r.category)}
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
            <Share2 className="h-3.5 w-3.5" /> <L zh="分享頁面連結" en="Share page link" />
          </button>
          <span className="text-xs text-muted-foreground">
            <L zh={`最後更新 ${tip.updatedAt}`} en={`Last updated ${tip.updatedAt}`} />
          </span>
        </div>

        <section className="mt-16 rounded-lg border border-border bg-ink text-ink-foreground p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            <L zh="需要依照公司流程與產業需求進一步客製化嗎？" en="Need help customizing this for your company and industry?" />
          </h2>
          <p className="mt-3 text-ink-foreground/75 max-w-2xl">
            <L
              zh="宏鼎集成提供企業 AI 導入、流程盤點及系統整合顧問服務，可協助您把提示詞與 AI 技巧落實為可穩定運作的內部流程。"
              en="AEGIS provides enterprise AI adoption, process assessment, and systems integration consulting to help you turn prompts and AI tips into reliable internal workflows."
            />
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" search={{ inquiry: "aiHealth" }} className="btn btn-primary">
              <L zh="預約企業 AI 導入諮詢" en="Book an AI Adoption Consultation" /> <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              to="/ai-integration"
              className="btn border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10"
            >
              <L zh="了解 AI 系統整合" en="Learn about AI Systems Integration" />
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">{title}</h2>
      {children}
    </section>
  );
}
