import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PUBLISHED_ARTICLES, CATEGORIES, articlePath } from "@/lib/knowledge";
import { INSIGHTS } from "@/lib/insights";
import { PROMPTS } from "@/lib/prompts";
import { AI_TIPS } from "@/lib/ai-tips";
import { INDUSTRIES } from "@/lib/industries";

const BASE_URL = "https://aegispowerapi.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

/**
 * Sitemap sources of truth:
 *   - Static routes: enumerated here.
 *   - Knowledge articles: PUBLISHED_ARTICLES (auto-filters drafts).
 *   - Insights, prompts, AI tips, industries: their data modules.
 *
 * Excluded on purpose:
 *   - /demo, /costflow, /salesops, /ai-launch, /energy-experience
 *     (legacy / renamed; kept for internal linking but noindex).
 *   - Draft knowledge stubs.
 *   - Any /buildquest/* route (internal / not part of the public site).
 *   - /lovable/* system routes.
 *
 * <lastmod> intentionally omitted: we don't yet have a per-page authoritative
 * timestamp source, and a shared build-time date is non-page-specific.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/engineering", changefreq: "monthly", priority: "0.9" },
          { path: "/ai-integration", changefreq: "monthly", priority: "0.9" },
          { path: "/industries", changefreq: "monthly", priority: "0.9" },
          { path: "/insights", changefreq: "weekly", priority: "0.8" },
          { path: "/knowledge", changefreq: "weekly", priority: "0.9" },
          { path: "/knowledge/prompts", changefreq: "weekly", priority: "0.8" },
          { path: "/knowledge/ai-tips", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/company-profile", changefreq: "monthly", priority: "0.7" },
          { path: "/pricing", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
        ];

        const industryEntries: SitemapEntry[] = INDUSTRIES.map((i) => ({
          path: `/industries/${i.slug}`,
          changefreq: "monthly",
          priority: "0.8",
        }));

        // Knowledge category landing pages — include only when they have at least
        // one non-draft article. (Aggregator category like `industry-solutions`
        // is served by /industries and doesn't need its own knowledge landing.)
        const knowledgeCategoryEntries: SitemapEntry[] = CATEGORIES
          .filter((c) => !c.externalPath)
          .filter((c) => PUBLISHED_ARTICLES.some((a) => a.category === c.slug))
          .map((c) => ({
            path: `/knowledge/${c.slug}`,
            changefreq: "weekly",
            priority: "0.7",
          }));

        const knowledgeArticleEntries: SitemapEntry[] = PUBLISHED_ARTICLES.map((a) => ({
          path: articlePath(a),
          changefreq: "monthly",
          priority: "0.6",
        }));

        const insightEntries: SitemapEntry[] = INSIGHTS.map((i) => ({
          path: `/insights/${i.slug}`,
          changefreq: "monthly",
          priority: "0.6",
        }));

        const promptEntries: SitemapEntry[] = PROMPTS.map((p) => ({
          path: `/knowledge/prompts/${p.slug}`,
          changefreq: "monthly",
          priority: "0.5",
        }));

        const aiTipEntries: SitemapEntry[] = AI_TIPS.map((t) => ({
          path: `/knowledge/ai-tips/${t.slug}`,
          changefreq: "monthly",
          priority: "0.5",
        }));

        const entries = [
          ...staticEntries,
          ...industryEntries,
          ...knowledgeCategoryEntries,
          ...knowledgeArticleEntries,
          ...insightEntries,
          ...promptEntries,
          ...aiTipEntries,
        ];

        // Dedupe on path (defensive).
        const seen = new Set<string>();
        const unique = entries.filter((e) => {
          if (seen.has(e.path)) return false;
          seen.add(e.path);
          return true;
        });

        const urls = unique.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
