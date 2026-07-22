import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleTemplate, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/components/knowledge/article-template";
import { L } from "@/lib/i18n";
import { articlePath, getArticle } from "@/lib/knowledge";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/knowledge/$category/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.category, params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex, follow" }] };
    }
    const a = loaderData.article;
    const url = `${SITE.domain}${articlePath(a)}`;
    const jsonLd = buildArticleJsonLd(a, "zh-TW");
    const bc = buildBreadcrumbJsonLd(a, "zh-TW");
    return {
      meta: [
        { title: `${a.title.zh} — 知識中心 AEGIS POWER INTEGRATIONS` },
        { name: "description", content: a.excerpt.zh },
        { property: "og:title", content: a.title.en },
        { property: "og:description", content: a.excerpt.en },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: a.publishedAt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: a.title.en },
        { name: "twitter:description", content: a.excerpt.en },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(bc),
        },
      ],
    };
  },

  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  return <ArticleTemplate article={article} />;
}

function ArticleNotFound() {
  return (
    <div className="container-x py-24">
      <h1 className="text-2xl font-semibold">
        <L zh="找不到文章" en="Article not found" />
      </h1>
      <Link to="/knowledge" className="mt-4 inline-block text-primary">
        <L zh="返回知識中心" en="Back to Knowledge Center" />
      </Link>
    </div>
  );
}
