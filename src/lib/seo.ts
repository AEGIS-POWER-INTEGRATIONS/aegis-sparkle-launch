import ogCover from "@/assets/og-cover.jpg";

export const SITE_URL = "https://aegispowerapi.com";
export const OG_IMAGE = `${SITE_URL}${ogCover}`;

import { stripLocale, withLocale } from "@/lib/locale";

/**
 * Canonical + hreflang link set for a page.
 * Pass the page's own absolute canonical URL (zh or /en). Both language
 * variants are emitted, with zh-Hant-TW as x-default.
 */
export function alternates(canonical: string) {
  const path = canonical.startsWith("http")
    ? canonical.slice(SITE_URL.length) || "/"
    : canonical || "/";
  const zhPath = stripLocale(path);
  const enPath = withLocale(path, "en");
  return [
    { rel: "canonical", href: `${SITE_URL}${path}` },
    { rel: "alternate", hreflang: "zh-Hant-TW", href: `${SITE_URL}${zhPath}` },
    { rel: "alternate", hreflang: "en", href: `${SITE_URL}${enPath}` },
    { rel: "alternate", hreflang: "x-default", href: `${SITE_URL}${zhPath}` },
  ];
}

/** Standard meta block for a page (title/description/og/twitter). */
export function pageMeta(opts: {
  path: string;
  title: string;
  description: string;
  locale?: "zh_TW" | "en_US";
  type?: string;
}) {
  const { path, title, description, locale = "zh_TW", type = "website" } = opts;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${SITE_URL}${path}` },
    { property: "og:type", content: type },
    { property: "og:locale", content: locale },
    { property: "og:image", content: OG_IMAGE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}
