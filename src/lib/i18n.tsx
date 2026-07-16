import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "zh-TW" | "en";

const STORAGE_KEY = "aegis-lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  isEn: boolean;
};

const LangContext = createContext<Ctx>({
  lang: "zh-TW",
  setLang: () => {},
  isEn: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default zh-TW. Do NOT read localStorage synchronously — that would
  // hydration-mismatch. Read after mount.
  const [lang, setLangState] = useState<Lang>("zh-TW");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "zh-TW") {
        setLangState(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
    }
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }

  return (
    <LangContext.Provider value={{ lang, setLang, isEn: lang === "en" }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
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
