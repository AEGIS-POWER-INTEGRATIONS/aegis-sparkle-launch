import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://aegispowerapi.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const LASTMOD = "2026-07-16";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/company-profile", changefreq: "monthly", priority: "0.8" },

          { path: "/engineering", changefreq: "monthly", priority: "0.9" },
          { path: "/energy-experience", changefreq: "monthly", priority: "0.7" },
          { path: "/ai-integration", changefreq: "monthly", priority: "0.9" },
          { path: "/industries", changefreq: "monthly", priority: "0.9" },
          { path: "/industries/semiconductor", changefreq: "monthly", priority: "0.8" },
          { path: "/industries/data-centers", changefreq: "monthly", priority: "0.8" },
          { path: "/industries/epc-engineering", changefreq: "monthly", priority: "0.8" },
          { path: "/industries/manufacturing", changefreq: "monthly", priority: "0.8" },
          { path: "/industries/commercial-buildings", changefreq: "monthly", priority: "0.8" },
          { path: "/industries/energy-esg", changefreq: "monthly", priority: "0.8" },
          { path: "/industries/sme-digital", changefreq: "monthly", priority: "0.8" },
          { path: "/insights", changefreq: "weekly", priority: "0.8" },
          { path: "/knowledge", changefreq: "weekly", priority: "0.9" },
          { path: "/knowledge/ai-integration", changefreq: "weekly", priority: "0.7" },
          { path: "/knowledge/engineering-management", changefreq: "weekly", priority: "0.7" },
          { path: "/knowledge/manufacturing-transformation", changefreq: "weekly", priority: "0.7" },
          { path: "/knowledge/data-center-engineering", changefreq: "weekly", priority: "0.7" },
          { path: "/knowledge/success-stories", changefreq: "weekly", priority: "0.7" },
          { path: "/insights/semiconductor-supplier-quote-ai", changefreq: "monthly", priority: "0.6" },
          { path: "/insights/data-center-ticket-automation", changefreq: "monthly", priority: "0.6" },
          { path: "/insights/epc-cost-transparency", changefreq: "monthly", priority: "0.6" },
          { path: "/insights/manufacturing-sales-weekly-report", changefreq: "monthly", priority: "0.6" },
          { path: "/insights/sme-ai-launch-adoption", changefreq: "monthly", priority: "0.6" },
          { path: "/insights/ai-adoption-guide", changefreq: "monthly", priority: "0.6" },
          { path: "/insights/engineering-project-management", changefreq: "monthly", priority: "0.6" },
          { path: "/insights/workflow-automation-examples", changefreq: "monthly", priority: "0.6" },
          { path: "/costflow", changefreq: "monthly", priority: "0.8" },
          { path: "/salesops", changefreq: "monthly", priority: "0.8" },
          { path: "/ai-launch", changefreq: "monthly", priority: "0.8" },
          { path: "/pricing", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <lastmod>${LASTMOD}</lastmod>`,
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
