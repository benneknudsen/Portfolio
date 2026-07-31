"use client";

import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

/**
 * 34×34 round theme button. Sun icon in light mode, crescent moon in dark.
 * Inline SVGs inherit `currentColor` (text-ink) so they follow the theme.
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
        "tap-44 inline-grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-full border border-line text-ink",
        "transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-none",
      ].join(" ")}
    >
      {isDark ? (
        // Crescent moon
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a.6.6 0 0 0-.8-.75 9.5 9.5 0 1 0 12.35 12.35.6.6 0 0 0-.75-.8Z" />
        </svg>
      ) : (
        // Sun: circle with rays
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      )}
    </button>
  );
}
