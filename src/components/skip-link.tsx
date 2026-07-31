"use client";

import { useLang } from "@/lib/i18n";

/**
 * Visually-hidden "skip to content" link — the first tab stop on the page.
 * Slides into view on keyboard focus (`.skip-link` in globals.css) and jumps
 * to `#main-content` in page.tsx, letting keyboard users bypass the nav.
 */
export function SkipLink() {
  const { t } = useLang();
  return (
    <a className="skip-link" href="#main-content">
      {t.aria.skip}
    </a>
  );
}
