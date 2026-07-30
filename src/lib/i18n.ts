"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "da" | "en";

const STORAGE_KEY = "bk-lang";

/**
 * UI copy for both languages. DA is the default.
 * Component-facing strings live here so nothing is hardcoded in JSX.
 */
export const copy = {
  da: {
    nav: {
      work: "Erfaring",
      projects: "Projekter",
      method: "Arbejdsmetode",
      xp: "Erfaring",
      about: "Om mig",
      contact: "Kontakt",
    },
    aria: {
      langGroup: "Vælg sprog",
      themeToDark: "Skift til mørkt tema",
      themeToLight: "Skift til lyst tema",
    },
  },
  en: {
    nav: {
      work: "Experience",
      projects: "Projects",
      method: "Method",
      xp: "Experience",
      about: "About",
      contact: "Contact",
    },
    aria: {
      langGroup: "Select language",
      themeToDark: "Switch to dark theme",
      themeToLight: "Switch to light theme",
    },
  },
} as const;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Copy for the currently active language. */
  t: (typeof copy)[Lang];
};

const LangContext = createContext<LangContextValue | null>(null);

function persist(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable (private mode / SSR) — ignore */
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("da");

  // Hydrate from storage after mount (the inline head script already set
  // <html lang> before paint to avoid a flash).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    // One-time sync from persisted client state after hydration. State must
    // start at the SSR default ("da") to match server markup, then reconcile.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "da" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "da" ? "en" : "da";
      persist(next);
      return next;
    });
  }, []);

  const value: LangContextValue = { lang, setLang, toggleLang, t: copy[lang] };
  return createElement(LangContext.Provider, { value }, children);
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
