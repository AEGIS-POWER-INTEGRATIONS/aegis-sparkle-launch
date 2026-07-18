import { createFileRoute, Link, notFound, Navigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { L, useLang } from "@/lib/i18n";
import {
  TAG_LABEL,
  getArticlesByCategory,
  getCategory,
} from "@/lib/knowledge";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/knowledge/$category/")({
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { category: cat };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.category;
    const url = `${SITE.domain}/knowledge/${c.slug}`;
    return {
      meta: [
        { title: `${c.name.zh} ${c.name.en} — 知識中心 AEGIS POWER INTEGRATIONS` },
        { name: "description", content: c.description.zh },
        { property: "og:title", content: `${c.name.en} — Knowledge Center` },
        { property: "og:description", content: c.description.en },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "首頁", item: `${SITE.domain}/` },
              { "@type": "ListItem", position: 2, name: "知識中心", item: `${SITE.domain}/knowledge` },
              { "@type": "ListItem", position: 3, name: c.name.zh, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-x py-24">
      <h1 className="text-2xl font-semibold">
        <L zh="找不到分類" en="Category not found" />
      </h1>
      <Link to="/knowledge" className="mt-4 inline-block text-primary">
        <L zh="返回知識中心" en="Back to Knowledge Center" />
      </Link>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { isEn } = useLang();

  // Category 6 aggregates the existing /industries/* pages — redirect there.
  if (category.externalPath) {
    return <Navigate to={category.externalPath} replace />;
  }

  const articles = getArticlesByCategory(category.slug);

  return (
    <div className="pb-24">
      <section className="border-b border-border/60 bg-surface/40">
        <div className="container-x py-14 md:py-20">
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
              <li aria-hidden="true">/</li>
              <li className="text-foreground/80">
                <L zh={category.name.zh} en={category.name.en} />
              </li>
            </ol>
          </nav>
          <div className="mt-6 text-xs font-semibold tracking-widest uppercase text-primary">
            <L zh="知識分類" en="Category" />
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] max-w-4xl">
            <L zh={category.name.zh} en={category.name.en} />
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            <L zh={category.description.zh} en={category.description.en} />
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            {articles.length} <L zh="篇文章" en="articles" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
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
                  <span className="mt-auto text-xs text-muted-foreground inline-flex items-center gap-1">
                    {a.readingMinutes} <L zh="分鐘閱讀" en="min read" />
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
