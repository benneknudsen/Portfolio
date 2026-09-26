"use client";

import type { ReactNode } from "react";
import { LangProvider } from "@/lib/i18n";
import type { Lang } from "@/lib/copy";
import { ThemeProvider } from "@/lib/theme";
import { useSmoothScroll } from "@/lib/lenis";

/**
 * Client bridge for the server-rendered locale: the `[locale]` layout passes
 * the route's locale down so `LangProvider` starts in the same language as the
 * server HTML (no flash for EN visitors).
 */
export function Providers({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  useSmoothScroll();
  return (
    <ThemeProvider>
      <LangProvider initialLang={initialLang}>{children}</LangProvider>
    </ThemeProvider>
  );
}
