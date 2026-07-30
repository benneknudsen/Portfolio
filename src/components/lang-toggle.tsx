"use client";

import { useLang, type Lang } from "@/lib/i18n";

const LANGS: Lang[] = ["da", "en"];

/**
 * DA/EN pill group. Active language is filled with `--ink`.
 * No color/background transitions (those break the theme switch) —
 * only transform animates, and even that is dropped under reduced motion.
 */
export function LangToggle() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.aria.langGroup}
      className="inline-flex items-center gap-1 rounded-pill border border-line p-1"
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={[
              "whitespace-nowrap rounded-pill px-2.5 py-1 text-pill font-medium uppercase",
              "transition-transform duration-200 ease-out active:scale-95 motion-reduce:transition-none",
              active ? "bg-ink text-bg" : "text-dim hover:text-ink",
            ].join(" ")}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
