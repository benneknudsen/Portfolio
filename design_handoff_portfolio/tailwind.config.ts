import type { Config } from "tailwindcss";

/**
 * Portfolio design tokens as Tailwind theme.
 * Colors reference the CSS variables in tokens.css so the
 * dark theme (html[data-theme="dark"]) works without duplication.
 * darkMode uses the data attribute, not the class strategy.
 */
export default {
  darkMode: ["variant", '&:where([data-theme="dark"], [data-theme="dark"] *)'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
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
        sans: ["Hanken Grotesk", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // fluid scale — matches the prototype exactly
        h1: ["clamp(46px,8vw,112px)", { lineHeight: "1.02", letterSpacing: "-.03em", fontWeight: "700" }],
        h2: ["clamp(34px,5vw,64px)", { lineHeight: "1.02", letterSpacing: "-.025em", fontWeight: "700" }],
        "h2-footer": ["clamp(44px,8vw,104px)", { lineHeight: "1.02", letterSpacing: "-.025em", fontWeight: "700" }],
        "project-title": ["clamp(36px,6vw,80px)", { lineHeight: "1", letterSpacing: "-.03em", fontWeight: "700" }],
        "step-title": ["clamp(22px,2.6vw,32px)", { lineHeight: "1.1", letterSpacing: "-.02em", fontWeight: "700" }],
        "hero-p": ["clamp(16px,1.7vw,19px)", { lineHeight: "1.6" }],
        lead: ["clamp(16px,1.6vw,18.5px)", { lineHeight: "1.6" }],
        kicker: ["12.5px", { letterSpacing: ".12em", fontWeight: "500" }],
        facts: ["12.5px", { lineHeight: "2.1" }],
        meta: ["13.5px"],
        pill: ["11.5px"],
      },
      borderRadius: {
        card: "18px",
        peek: "14px",
        pill: "99px",
      },
      boxShadow: {
        step: "0 24px 60px -28px rgba(20,19,16,.28)",
        peek: "0 30px 70px -20px rgba(20,19,16,.45)",
      },
      maxWidth: {
        container: "1200px",
        prose46: "46ch",
        prose56: "56ch",
        prose60: "60ch",
        prose62: "62ch",
      },
      spacing: {
        "container-pad": "clamp(20px,4vw,48px)",
        section: "clamp(96px,15vh,180px)",
        "hero-top": "clamp(72px,12vh,140px)",
        nav: "68px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(.2,.8,.2,1)",
        spring: "cubic-bezier(.34,1.56,.64,1)",
      },
      keyframes: {
        levitate: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        floorShadow: {
          "0%,100%": { transform: "scaleX(1)", opacity: ".9" },
          "50%": { transform: "scaleX(.8)", opacity: ".5" },
        },
        underline: {
          "0%,10%": { transform: "scaleX(0)", transformOrigin: "left" },
          "22%,58%": { transform: "scaleX(1)", transformOrigin: "left" },
          "59%": { transformOrigin: "right" },
          "74%,100%": { transform: "scaleX(0)", transformOrigin: "right" },
        },
        blob: { to: { transform: "translate(-70px,60px) scale(1.18)" } },
        marquee: { to: { transform: "translateX(-100%)" } },
      },
      animation: {
        levitate: "levitate 9s ease-in-out infinite",
        floorShadow: "floorShadow 9s ease-in-out infinite",
        underline: "underline 7s cubic-bezier(.6,0,.2,1) infinite 1.4s",
        blob: "blob 16s ease-in-out infinite alternate",
        marquee: "marquee 16s linear infinite",
      },
      screens: { sm2: "700px", sm3: "760px", md2: "800px", md3: "820px" },
    },
  },
} satisfies Config;
