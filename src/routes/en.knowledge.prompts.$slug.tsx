import { createFileRoute, notFound } from "@tanstack/react-router";

import { PromptDetail } from "./knowledge.prompts.$slug";
import { getPrompt, getRelatedPrompts } from "@/lib/prompts";
import { localizePrompt } from "@/lib/knowledge-i18n";
import { PROMPT_CATEGORY_LABEL_EN } from "@/lib/prompts.en";
import { SITE } from "@/lib/site-config";
import { alternates } from "@/lib/seo";

export const Route = createFileRoute("/en/knowledge/prompts/$slug")({
  loader: ({ params }) => {
    const prompt = getPrompt(params.slug);
    if (!prompt) throw notFound();
    return { prompt };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const raw = loaderData.prompt;
    const p = localizePrompt(raw, true);
    const path = `/en/knowledge/prompts/${params.slug}`;
    const url = `${SITE.domain}${path}`;
    const related = getRelatedPrompts(raw).map((r) => localizePrompt(r, true));
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.summary,
      dateModified: p.updatedAt,
      inLanguage: "en",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: SITE.legalName.en ?? SITE.legalName.zh },
      publisher: { "@type": "Organization", name: SITE.legalName.en ?? SITE.legalName.zh, url: SITE.domain },
    };
    const bc = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Knowledge Center", item: `${SITE.domain}/en/knowledge` },
        { "@type": "ListItem", position: 2, name: "AI Prompt Library", item: `${SITE.domain}/en/knowledge/prompts` },
        { "@type": "ListItem", position: 3, name: PROMPT_CATEGORY_LABEL_EN[p.category] },
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
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: alternates(path),
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(jsonLd) },
        { type: "application/ld+json", children: JSON.stringify(bc) },
      ],
    };
  },
  component: PromptDetail,
  notFoundComponent: () => null,
});
