"use client";

import type { ReactNode } from "react";
import { LangProvider } from "@/lib/i18n";
import type { Copy, Lang } from "@/lib/copy";
import { ThemeProvider } from "@/lib/theme";
import { useSmoothScroll } from "@/lib/lenis";

/**
 * Client bridge for the server-rendered locale: the `[locale]` layout passes
 * the route's locale and that locale's copy down so `LangProvider` starts in
 * the same language as the server HTML (no flash for EN visitors) without
 * shipping both languages' copy to the client.
 */
export function Providers({
  children,
  initialLang,
  t,
}: {
  children: ReactNode;
  initialLang: Lang;
  t: Copy;
}) {
  useSmoothScroll();
  return (
    <ThemeProvider>
      <LangProvider initialLang={initialLang} t={t}>
        {children}
      </LangProvider>
    </ThemeProvider>
  );
}
