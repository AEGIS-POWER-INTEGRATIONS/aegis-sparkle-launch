import { createFileRoute, notFound } from "@tanstack/react-router";
import { alternates, SITE_URL } from "@/lib/seo";
import { AI_TIP_CATEGORY_LABEL, getAiTip } from "@/lib/ai-tips";
import { AI_TIPS_EN, AI_TIP_CATEGORY_LABEL_EN } from "@/lib/ai-tips.en";
import { L } from "@/lib/i18n";
import { Link } from "@/lib/nav";
import { TipDetail } from "./knowledge.ai-tips.$slug";

export const Route = createFileRoute("/en/knowledge/ai-tips/$slug")({
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
    const en = AI_TIPS_EN[a.slug];
    const title = en?.seoTitle ?? a.seoTitle;
    const description = en?.seoDescription ?? a.seoDescription;
    const headline = en?.title ?? a.title;
    const summary = en?.summary ?? a.summary;
    const catLabel = AI_TIP_CATEGORY_LABEL_EN[a.category] ?? AI_TIP_CATEGORY_LABEL[a.category];
    const url = `${SITE_URL}/en/knowledge/ai-tips/${params.slug}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description: summary,
      dateModified: a.updatedAt,
      inLanguage: "en",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "AEGIS" },
      publisher: { "@type": "Organization", name: "AEGIS", url: SITE_URL },
    };
    const bc = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Knowledge Center", item: `${SITE_URL}/en/knowledge` },
        { "@type": "ListItem", position: 2, name: "AI Tips", item: `${SITE_URL}/en/knowledge/ai-tips` },
        { "@type": "ListItem", position: 3, name: catLabel },
        { "@type": "ListItem", position: 4, name: headline, item: url },
      ],
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: headline },
        { property: "og:description", content: summary },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: alternates(url),
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
