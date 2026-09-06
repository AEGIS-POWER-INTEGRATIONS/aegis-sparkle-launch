import { createFileRoute, notFound } from "@tanstack/react-router";

import { ArticlePage, ArticleNotFound } from "./knowledge.$category.$slug";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/components/knowledge/article-template";
import { getArticle } from "@/lib/knowledge";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/knowledge/$category/$slug")({
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
    const path = `/en/knowledge/${a.category}/${a.slug}`;
    return {
      meta: pageMeta({
        path,
        locale: "en_US",
        type: "article",
        title: `${a.title.en} | Knowledge Center | AEGIS POWER INTEGRATIONS`,
        description: a.excerpt.en,
      }),
      links: alternates(path),
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(buildArticleJsonLd(a, "en")) },
        { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbJsonLd(a, "en")) },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});
