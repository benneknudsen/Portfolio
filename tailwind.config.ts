import type { Config } from "tailwindcss";

/**
 * Portfolio design tokens as Tailwind theme.
 * Colors reference the CSS variables in globals.css so the
 * dark theme (html[data-theme="dark"]) works without duplication.
 * darkMode uses the data attribute, not the class strategy.
 *
 * Pruned 2026-08-28 (#34): styling bor i globals.css — tilføj kun tokens her når de faktisk bruges i TSX.
 */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        body: "var(--body)",
        dim: "var(--dim)",
        line: "var(--line)",
        card: "var(--card)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        nav: "var(--nav)",
      },
      fontFamily: {
        sans: ["var(--font-hanken)", "sans-serif"],
        serif: ["var(--font-instrument)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        meta: ["13.5px", { lineHeight: "1.4" }],
        pill: ["11.5px", { lineHeight: "1.4" }],
      },
      borderRadius: {
        pill: "99px",
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        "container-pad": "clamp(20px,4vw,48px)",
        nav: "68px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(.2,.8,.2,1)",
      },
      screens: { md3: "820px" },
    },
  },
  plugins: [],
} satisfies Config;
