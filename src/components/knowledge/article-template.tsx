import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Calendar, Clock, Copy, Link2, Share2, User } from "lucide-react";
import { L, useLang, useT } from "@/lib/i18n";
import {
  ARTICLES,
  CATEGORIES,
  DEFAULT_AUTHOR,
  DEFAULT_RELATED_SERVICES_BY_CATEGORY,
  TAG_LABEL,
  articlePath,
  getCategory,
  getRelatedArticles,
  type KnowledgeArticle,
} from "@/lib/knowledge";
import { SITE } from "@/lib/site-config";

function formatDate(iso: string, en: boolean) {
  const d = new Date(iso);
  if (en) {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }
  return d.toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
}

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const y = window.scrollY;
      setPct(total > 0 ? Math.min(100, Math.max(0, (y / total) * 100)) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-primary transition-[width] duration-100"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      />
    </div>
  );
}

function Breadcrumb({ article }: { article: KnowledgeArticle }) {
  const cat = getCategory(article.category);
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-foreground">
            <L zh="首頁" en="Home" />
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to="/knowledge" className="hover:text-foreground">
            <L zh="知識中心" en="Knowledge Center" />
          </Link>
        </li>
        {cat && (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to="/knowledge/$category"
                params={{ category: cat.slug }}
                className="hover:text-foreground"
              >
                <L zh={cat.name.zh} en={cat.name.en} />
              </Link>
            </li>
          </>
        )}
        <li aria-hidden="true">/</li>
        <li className="text-foreground/80 truncate max-w-[50ch]">
          <L zh={article.title.zh} en={article.title.en} />
        </li>
      </ol>
    </nav>
  );
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }
  const enc = encodeURIComponent;
  const tw = `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground inline-flex items-center gap-1.5">
        <Share2 className="h-3.5 w-3.5" />
        <L zh="分享" en="Share" />
      </span>
      <a
        href={tw}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm border border-border/80 px-2 py-1 text-foreground/80 hover:text-foreground hover:bg-surface/80"
        aria-label={t({ zh: "分享到 X", en: "Share on X" })}
      >
        X
      </a>
      <a
        href={li}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm border border-border/80 px-2 py-1 text-foreground/80 hover:text-foreground hover:bg-surface/80"
        aria-label={t({ zh: "分享到 LinkedIn", en: "Share on LinkedIn" })}
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1 rounded-sm border border-border/80 px-2 py-1 text-foreground/80 hover:text-foreground hover:bg-surface/80"
        aria-label={t({ zh: "複製連結", en: "Copy link" })}
      >
        {copied ? <Link2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? <L zh="已複製" en="Copied" /> : <L zh="複製" en="Copy" />}
      </button>
    </div>
  );
}

function TocSidebar({ toc }: { toc: NonNullable<KnowledgeArticle["toc"]> }) {
  const [active, setActive] = useState<string | null>(toc[0]?.id ?? null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 1] },
    );
    toc.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);
  return (
    <nav aria-label="Table of contents" className="text-sm">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
        <L zh="目錄" en="On this page" />
      </div>
      <ul className="space-y-2 border-l border-border pl-4">
        {toc.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className={`block leading-snug transition-colors ${
                active === e.id
                  ? "text-foreground font-medium -ml-[17px] pl-4 border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <L zh={e.title.zh} en={e.title.en} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Full article template — used by every article in the knowledge center.
 * The article body is intentionally optional; when missing, we render a
 * professional "in preparation" placeholder so the architecture ships without
 * fabricated content.
 */
export function ArticleTemplate({ article }: { article: KnowledgeArticle }) {
  const { isEn } = useLang();
  const cat = getCategory(article.category);
  const related = useMemo(() => getRelatedArticles(article, 4), [article]);
  const services =
    article.relatedServices ??
    DEFAULT_RELATED_SERVICES_BY_CATEGORY[article.category] ??
    [];
  const author = article.author ?? DEFAULT_AUTHOR;
  const url = `${SITE.domain}${articlePath(article)}`;
  const title = isEn ? article.title.en : article.title.zh;

  return (
    <article className="pb-24">
      <ReadingProgress />

      {/* Header */}
      <header className="border-b border-border/60 bg-surface/40">
        <div className="container-x py-10 md:py-14">
          <Breadcrumb article={article} />
          <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest">
            {cat && (
              <Link
                to="/knowledge/$category"
                params={{ category: cat.slug }}
                className="rounded-sm bg-primary/10 text-primary px-2.5 py-1 font-semibold hover:bg-primary/20"
              >
                <L zh={cat.name.zh} en={cat.name.en} />
              </Link>
            )}
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border/80 px-2 py-1 text-muted-foreground"
              >
                <L zh={TAG_LABEL[tag].zh} en={TAG_LABEL[tag].en} />
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-foreground max-w-4xl leading-[1.15]">
            <L zh={article.title.zh} en={article.title.en} />
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            <L zh={article.excerpt.zh} en={article.excerpt.en} />
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <L zh={author.name.zh} en={author.name.en} />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(article.publishedAt, isEn)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readingMinutes} <L zh="分鐘閱讀" en="min read" />
            </span>
          </div>
        </div>
      </header>

      {/* Body layout */}
      <div className="container-x py-12 md:py-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 max-w-3xl">
          {article.body ? (
            <div
              className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-xl prose-p:text-foreground/85 prose-p:leading-[1.85] prose-li:leading-[1.85] prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: isEn ? article.body.en : article.body.zh }}
            />
          ) : (
            <div className="rounded-md border border-dashed border-border p-8 bg-surface/40">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                <L zh="內容準備中" en="In preparation" />
              </div>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                <L
                  zh="本篇文章目前正在準備中。完稿後將涵蓋方法、步驟、常見陷阱與可落地的範例，並附上參考架構圖與檢查清單。"
                  en="This article is being written. The final version will cover methodology, steps, common pitfalls and actionable examples, with reference architectures and checklists."
                />
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <L
                  zh="如果您正在思考相關主題，歡迎先與我們聯絡，我們可以直接就您的情境提供諮詢。"
                  en="If you are exploring the topic already, contact us — we can advise on your specific situation before the article ships."
                />
              </p>
            </div>
          )}

          {/* FAQ */}
          {article.faq && article.faq.length > 0 && (
            <section id="faq" className="mt-16">
              <h2 className="text-2xl font-semibold tracking-tight">
                <L zh="常見問題" en="Frequently Asked Questions" />
              </h2>
              <dl className="mt-6 divide-y divide-border/70 border-y border-border/70">
                {article.faq.map((f, i) => (
                  <div key={i} className="py-5">
                    <dt className="font-semibold text-foreground">
                      <L zh={f.q.zh} en={f.q.en} />
                    </dt>
                    <dd className="mt-2 text-foreground/80 leading-relaxed">
                      <L zh={f.a.zh} en={f.a.en} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* CTA */}
          <section className="mt-16 rounded-lg border border-border bg-ink text-ink-foreground p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              <L
                zh="需要協助將這些概念應用到您的專案？"
                en="Need help applying these concepts?"
              />
            </h2>
            <p className="mt-3 text-ink-foreground/75 max-w-2xl">
              <L
                zh="與 AEGIS POWER INTEGRATIONS 討論如何將這些方法落地至您的工程或數位轉型專案。"
                en="Talk with AEGIS POWER INTEGRATIONS about bringing these ideas into your engineering or digital transformation project."
              />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                <L zh="聯絡我們" en="Contact Us" />
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
              <Link
                to="/demo"
                className="btn border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10"
              >
                <L zh="預約諮詢" en="Book a Consultation" />
              </Link>
            </div>
          </section>

          {/* Share */}
          <div className="mt-10">
            <ShareButtons url={url} title={title} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 self-start space-y-10">
          {article.toc && article.toc.length > 0 && <TocSidebar toc={article.toc} />}

          {services.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
                <L zh="相關服務" en="Related Services" />
              </div>
              <ul className="space-y-2 text-sm">
                {services.map((s) => (
                  <li key={s.to}>
                    <Link
                      to={s.to}
                      className="group inline-flex items-center gap-1 text-foreground/85 hover:text-foreground"
                    >
                      <L zh={s.label.zh} en={s.label.en} />
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-border bg-surface/40 py-16">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                <L zh="延伸閱讀" en="Related Articles" />
              </h2>
              <Link
                to="/knowledge"
                className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                <L zh="返回知識中心" en="Back to Knowledge Center" />
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => {
                const rc = getCategory(r.category);
                return (
                  <Link
                    key={r.slug}
                    to="/knowledge/$category/$slug"
                    params={{ category: r.category, slug: r.slug }}
                    className="panel p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors"
                  >
                    {rc && (
                      <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                        <L zh={rc.name.zh} en={rc.name.en} />
                      </span>
                    )}
                    <h3 className="text-base font-semibold leading-snug text-foreground">
                      <L zh={r.title.zh} en={r.title.en} />
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      <L zh={r.excerpt.zh} en={r.excerpt.en} />
                    </p>
                    <span className="mt-auto text-xs text-muted-foreground">
                      {r.readingMinutes} <L zh="分鐘閱讀" en="min read" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

export function buildArticleJsonLd(article: KnowledgeArticle, lang: "zh-TW" | "en") {
  const en = lang === "en";
  const author = article.author ?? DEFAULT_AUTHOR;
  const url = `${SITE.domain}${articlePath(article)}`;
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: en ? article.title.en : article.title.zh,
    description: en ? article.excerpt.en : article.excerpt.zh,
    datePublished: article.publishedAt,
    inLanguage: en ? "en" : "zh-TW",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: en ? author.name.en : author.name.zh },
    publisher: {
      "@type": "Organization",
      name: SITE.legalName.en,
      url: SITE.domain,
    },
  };
  if (article.faq && article.faq.length > 0) {
    return [
      base,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((f) => ({
          "@type": "Question",
          name: en ? f.q.en : f.q.zh,
          acceptedAnswer: {
            "@type": "Answer",
            text: en ? f.a.en : f.a.zh,
          },
        })),
      },
    ];
  }
  return base;
}

export function buildBreadcrumbJsonLd(article: KnowledgeArticle, lang: "zh-TW" | "en") {
  const en = lang === "en";
  const cat = getCategory(article.category);
  const items = [
    { name: en ? "Home" : "首頁", item: `${SITE.domain}/` },
    { name: en ? "Knowledge Center" : "知識中心", item: `${SITE.domain}/knowledge` },
  ];
  if (cat) {
    items.push({
      name: en ? cat.name.en : cat.name.zh,
      item: `${SITE.domain}/knowledge/${cat.slug}`,
    });
  }
  items.push({
    name: en ? article.title.en : article.title.zh,
    item: `${SITE.domain}${articlePath(article)}`,
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: x.name,
      item: x.item,
    })),
  };
}

export { ARTICLES, CATEGORIES };
