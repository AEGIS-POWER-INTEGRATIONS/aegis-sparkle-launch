/**
 * Locale <-> URL helpers.
 *
 * Language is decided by the URL, not by stored preference:
 *   zh-TW (default) : /about
 *   en              : /en/about
 */
export type Lang = "zh-TW" | "en";

export const EN_PREFIX = "/en";

export function langFromPath(pathname: string): Lang {
  return pathname === EN_PREFIX || pathname.startsWith(EN_PREFIX + "/")
    ? "en"
    : "zh-TW";
}

/** Remove the /en prefix from a path. `/en` -> `/`, `/en/about` -> `/about`. */
export function stripLocale(pathname: string): string {
  if (pathname === EN_PREFIX) return "/";
  if (pathname.startsWith(EN_PREFIX + "/")) return pathname.slice(EN_PREFIX.length);
  return pathname || "/";
}

/** Return the same page in the requested language. */
export function withLocale(pathname: string, lang: Lang): string {
  const base = stripLocale(pathname);
  if (lang !== "en") return base;
  return base === "/" ? EN_PREFIX : EN_PREFIX + base;
}
