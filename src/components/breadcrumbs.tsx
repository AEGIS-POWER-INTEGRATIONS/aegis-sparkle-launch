import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export type Crumb = {
  /** Visible label. Already localized by caller. */
  label: string;
  /** Absolute path (starts with "/"). Omit for the current page. */
  to?: string;
};

/**
 * Visible breadcrumb trail for hierarchical subpages.
 * Do NOT render on the homepage.
 *
 * Pair with <BreadcrumbJsonLd /> in the route's head() scripts array.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.to && !last ? (
                <Link to={c.to} className="hover:text-foreground transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-foreground" : ""}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Build the BreadcrumbList JSON-LD payload for a route's head() scripts.
 * Every crumb must resolve to an absolute URL, so pass `to` for every item
 * — including the current page — when generating structured data.
 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
