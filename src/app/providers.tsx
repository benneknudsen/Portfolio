"use client";

import type { ReactNode } from "react";
import { LangProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { useSmoothScroll } from "@/lib/lenis";

export function Providers({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
