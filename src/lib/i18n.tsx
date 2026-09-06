import { useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { langFromPath, withLocale, type Lang } from "@/lib/locale";

export type { Lang };

const STORAGE_KEY = "aegis-lang";

/**
 * Language is derived from the URL. `/en/*` is English, everything else is
 * Traditional Chinese (zh-Hant-TW). A stored preference never overrides an
 * explicit language URL — it is only used to offer the visitor their previous
 * choice on first landing (handled by <LanguagePreferenceHint/> below, which
 * only ever records, never redirects).
 */
export function useLangPathname() {
  return useRouterState({ select: (s) => s.location.pathname });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = langFromPath(useLangPathname());

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "en" ? "en" : "zh-Hant-TW";
    }
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  return <>{children}</>;
}

export function useLang() {
  const location = useRouterState({ select: (s) => s.location });
  const lang = langFromPath(location.pathname);

  /** Same page in the other language, keeping query string and hash. */
  function targetHref(next: Lang) {
    const path = withLocale(location.pathname, next);
    return `${path}${location.searchStr ?? ""}${location.hash ? `#${location.hash}` : ""}`;
  }

  return { lang, targetHref, isEn: lang === "en" };
}

/** Bilingual inline switch. Renders `en` when current language is English. */
export function L({ zh, en }: { zh: ReactNode; en: ReactNode }) {
  const { isEn } = useLang();
  return <>{isEn ? en : zh}</>;
}

/**
 * Hook returning a picker for string pairs — useful when a bilingual value
 * must be a string (e.g. an aria-label, alt text, placeholder).
 */
export function useT() {
  const { isEn } = useLang();
  return function t(pair: { zh: string; en: string }): string {
    return isEn ? pair.en : pair.zh;
  };
}
