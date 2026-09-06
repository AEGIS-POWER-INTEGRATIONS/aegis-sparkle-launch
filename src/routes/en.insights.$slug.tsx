import { createFileRoute, notFound } from "@tanstack/react-router";

import { InsightDetail, InsightNotFound } from "./insights.$slug";
import { breadcrumbJsonLd } from "@/components/breadcrumbs";
import { getInsight, type Insight } from "@/lib/insights";
import { alternates, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/en/insights/$slug")({
  loader: ({ params }): { insight: Insight } => {
    const insight = getInsight(params.slug);
    if (!insight) throw notFound();
    return { insight };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex, follow" }] };
    }
    const { insight } = loaderData;
    const path = `/en/insights/${insight.slug}`;
    return {
      meta: pageMeta({
        path,
        locale: "en_US",
        type: "article",
        title: `${insight.title.en} | AEGIS POWER INTEGRATIONS`,
        description: insight.summary.en,
      }),
      links: alternates(path),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/en" },
              { name: "Insights", path: "/en/insights" },
              { name: insight.title.en, path },
            ]),
          ),
        },
      ],
    };
  },
  component: InsightDetail,
  notFoundComponent: InsightNotFound,
});
