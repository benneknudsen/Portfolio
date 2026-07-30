"use client";

import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

/**
 * 34×34 round theme button. Shows ◑ in light mode, ◐ in dark mode.
 * No color/background transitions — only transform animates.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? t.aria.themeToLight : t.aria.themeToDark}
      className={[
        "inline-grid h-[34px] w-[34px] place-items-center rounded-full border border-line text-ink",
        "transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-none",
      ].join(" ")}
    >
      <span aria-hidden className="text-[15px] leading-none">
        {isDark ? "◐" : "◑"}
      </span>
    </button>
  );
}
