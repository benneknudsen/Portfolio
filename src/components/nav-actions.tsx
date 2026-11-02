"use client";

import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

/** Right-hand nav group: language + theme toggles and the burger menu. */
export function NavActions() {
  return (
    <div className="flex items-center gap-2.5">
      <LangToggle />
      <ThemeToggle />
      <MobileMenu />
    </div>
  );
}
