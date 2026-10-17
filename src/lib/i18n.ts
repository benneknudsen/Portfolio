"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Copy, Lang } from "./copy";
import { localeSwitchUrl } from "./routes";

export { heroH1, methodH2, experienceH2, aboutH2, footerH2 } from "./copy";
export type { Lang, HeroToken } from "./copy";

const STORAGE_KEY = "bk-lang";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Copy for the currently active language. */
  t: Copy;
};

const LangContext = createContext<LangContextValue | null>(null);

function persist(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable (private mode / SSR) — ignore */
  }
}

/**
 * Language comes from the route, not from storage: the `[locale]` layout passes
 * the URL's locale in as `initialLang`, so server HTML and the first client
 * render always agree (no flash of the wrong language). `setLang` is therefore
 * a navigation, not a state swap — the only client-side state is the server's
 * locale, frozen for the lifetime of the page. `localStorage['bk-lang']` is
 * written on switch as a persistence hint, never read for rendering.
 *
 * The active locale's copy arrives as the `t` prop from the server layout, so
 * the `copy` object is tree-shaken out of the client bundle — only the active
 * locale's copy reaches the browser.
 */
export function LangProvider({
  children,
  initialLang,
  t,
}: {
  children: ReactNode;
  initialLang: Lang;
  t: Copy;
}) {
  const [lang] = useState<Lang>(initialLang);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      persist(next);
      // Full navigation so the server renders the other locale's HTML. Keep the
      // current page when it exists in both locales, and any `#hash` so a deep
      // link (e.g. #projects) survives the language switch.
      window.location.assign(
        localeSwitchUrl(next, window.location.pathname, window.location.hash),
      );
    },
    [lang],
  );

  const toggleLang = useCallback(() => {
    setLang(lang === "da" ? "en" : "da");
  }, [lang, setLang]);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t],
  );
  return createElement(LangContext.Provider, { value }, children);
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
