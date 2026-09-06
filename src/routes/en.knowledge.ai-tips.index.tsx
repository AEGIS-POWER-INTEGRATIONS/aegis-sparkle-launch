import { createFileRoute } from "@tanstack/react-router";
import { alternates, SITE_URL } from "@/lib/seo";
import { PUBLISHED_AI_TIPS } from "@/lib/ai-tips";
import { TipsIndex } from "./knowledge.ai-tips.index";

export const Route = createFileRoute("/en/knowledge/ai-tips/")({
  head: () => {
    const empty = PUBLISHED_AI_TIPS.length === 0;
    const url = `${SITE_URL}/en/knowledge/ai-tips`;
    const meta: Array<Record<string, string>> = [
      { title: "Enterprise AI Tips — AEGIS" },
      {
        name: "description",
        content:
          "Practical, work-context-driven articles on generative AI, office productivity, management, web systems, and information security.",
      },
      { property: "og:title", content: "Enterprise AI Tips — AEGIS" },
      {
        property: "og:description",
        content: "Practical ways to use generative AI in office work, management, web systems, and security.",
      },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (empty) meta.push({ name: "robots", content: "noindex, follow" });
    return {
      meta,
      links: alternates(url),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
              { "@type": "ListItem", position: 2, name: "Knowledge Center", item: `${SITE_URL}/en/knowledge` },
              { "@type": "ListItem", position: 3, name: "AI Tips", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: TipsIndex,
});
