"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "da" | "en";

const STORAGE_KEY = "bk-lang";

/**
 * UI copy for both languages. DA is the default.
 * Component-facing strings live here so nothing is hardcoded in JSX.
 */
export const copy = {
  da: {
    nav: {
      work: "Erfaring",
      projects: "Projekter",
      method: "Arbejdsmetode",
      xp: "Erfaring",
      about: "Om mig",
      contact: "Kontakt",
    },
    hero: {
      metaRole: "Frontend-udvikler · React & TypeScript",
      metaLoc: "Silkeborg, Danmark",
      pLead: "Hej, jeg er Benjamin.",
      pRest: " Frontend-udvikler med baggrund som multimediedesigner — jeg bygger visuelle produkter i React og TypeScript, med AI-agenter som udviklingspartnere.",
      btnWrite: "Skriv til mig",
      btnCopy: "Kopiér e-mail",
      copied: "Kopieret ✓",
      glyphLabel: "Open to work",
    },
    aria: {
      langGroup: "Vælg sprog",
      themeToDark: "Skift til mørkt tema",
      themeToLight: "Skift til lyst tema",
      menuOpen: "Åbn menu",
      menuClose: "Luk menu",
      skip: "Spring til indhold",
    },
    projects: {
      sectionTitle: "Projekter",
      tapAgain: "Tryk igen for at åbne siden",
      stride: {
        title: "Stride",
        desc: "AI-drevet løbetræner bygget i Next.js 16. Forbinder til Strava, og AI'en svarer ikke med tekst men med rigtige React-komponenter — grafer, anbefalinger og indsigter, renderet direkte i dashboardet.",
        facts: ["Next.js 16", "TypeScript", "Generativ UI", "Strava", "Neon Postgres"],
        marquee:
          "AI-coach · Generativ UI · Strava-sync · Recharts · Drizzle ORM",
        peekLabel: "Stride — AI løbetræner",
      },
      portfolio: {
        title: "Portfolio",
        desc: "Denne side er bygget med AI som makker — Claude Code skriver koden, Hermes orkestrerer, og Vercel deployer. Du kigger allerede på resultatet.",
        facts: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "AI-agenter"],
        marquee:
          "AI-drevet · Design handoff · Claude Code · Hermes Agent · Vercel",
        peekLabel: "Portfolio — bygget af agenter",
      },
    },
    method: {
      kicker: "02 — Arbejdsmetode",
      lead: 'Min udviklingspartner er <a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noopener" style="border-bottom:1px solid var(--line)">Hermes Agent ↗︎</a> — Nous Researchs open source-agent — som jeg har sat op og tunet til mit workflow på en Mac Mini M4. Den kører 24/7 via Telegram; Claude Code skriver koden, og Hermes orkestrerer hele flowet fra issue til deploy. Denne portfolio er bygget med den.',
      steps: [
        {
          label: "#1 Husk",
          title: "Persistent memory",
          paragraph:
            "Hermes husker alt via mem0 — vector-søgning på tværs af sessioner, så den kender mine projekter, præferencer og tidligere løsninger. Jeg starter aldrig forfra.",
          pills: ["mem0", "vector-søgning", "tværs af sessioner"],
        },
        {
          label: "#2 Deleger",
          title: "Koden skrives aldrig af chefen",
          paragraph:
            "Jeg lader aldrig orchestratoren skrive kode selv. Alt implementeres af Claude Code i isolerede sessioner med hvert sit git-worktree — sådan har jeg sat flowet op, så flere opgaver kører parallelt uden konflikter.",
          pills: ["Claude Code", "isolerede sessioner", "worktree per opgave"],
        },
        {
          label: "#3 Verificer",
          title: "Intet slipper igennem uden grønt",
          paragraph:
            "Efter hver opgave kører min QA-gate: build → lint → typecheck → alle 1000+ tests. Kun ændringer, der består hele kæden, bliver committet — en regel, jeg har bygget ind i flowet. Ingen undtagelser.",
          pills: ["build", "lint", "typecheck", "1000+ tests"],
        },
        {
          label: "#4 Lever",
          title: "Fra issue til produktion",
          paragraph:
            "Fra issue til produktion på minutter, ikke dage. Hele flowet — læs, brief, deleger, QA, commit, deploy — er automatiseret. Min rolle er arkitekt og sidste godkender.",
          pills: ["GitHub issues", "conventional commits", "auto-deploy"],
        },
      ],
      stats: [
        { value: "24/7", label: "kører på Mac Mini M4" },
        { value: "200+", label: "issues lukket i flowet" },
        { value: "1000+", label: "tests i QA-gaten" },
        { value: "100%", label: "TypeScript strict" },
      ],
    },
    experience: {
      kicker: "03 — Erfaring",
      rows: [
        {
          period: "2024 — nu",
          role: "Frontend-udvikler",
          company: "Minetilbud (Dayli)",
          note: "Kom med i teamet, da Minetilbud opkøbte AVIOU. Bygger og vedligeholder Dayli Publisher — skabeloner, komponentbibliotek og løbende UX-forbedringer i React, TypeScript og Storybook.",
        },
        {
          period: "2022 — 2024",
          role: "Frontend-udvikler",
          company: "AVIOU",
          note: "Online katalogplatform i React og TypeScript — nye funktioner og forbedrede UI-komponenter, der optimerede kundernes arbejdsflow. Derudover webdesign og frontend-løsninger for en række kunder.",
        },
        { period: "2021", role: "Frontend-udvikler, praktik", company: "Web2Media" },
        { period: "2021", role: "PBA i webudvikling", company: "Erhvervsakademi Aarhus" },
        { period: "2020", role: "Multimediedesigner", company: "Erhvervsakademi Aarhus" },
      ],
    },
    footer: {
      kicker: "04 — Kontakt",
      email: "benjaschou12@icloud.com",
      copied: "Kopieret ✓",
      copyAria: "Kopiér e-mailadresse",
      copyright: "© 2026 Benjamin Schou Knudsen",
      linkedin: "LinkedIn",
      linkedinUrl:
        "https://www.linkedin.com/in/benjamin-schou-knudsen-b8b685178/",
    },
  },
  en: {
    nav: {
      work: "Experience",
      projects: "Projects",
      method: "Method",
      xp: "Experience",
      about: "About",
      contact: "Contact",
    },
    hero: {
      metaRole: "Frontend developer · React & TypeScript",
      metaLoc: "Silkeborg, Denmark",
      pLead: "Hi, I'm Benjamin.",
      pRest: " Frontend developer with a background in multimedia design — I build visual products in React and TypeScript, with AI agents as development partners.",
      btnWrite: "Get in touch",
      btnCopy: "Copy email",
      copied: "Copied ✓",
      glyphLabel: "Open to work",
    },
    aria: {
      langGroup: "Select language",
      themeToDark: "Switch to dark theme",
      themeToLight: "Switch to light theme",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      skip: "Skip to content",
    },
    projects: {
      sectionTitle: "Projects",
      tapAgain: "Tap again to visit",
      stride: {
        title: "Stride",
        desc: "AI-powered running coach built in Next.js 16. Connects to Strava, and the AI responds not with text but with real React components — charts, recommendations and insights rendered straight into the dashboard.",
        facts: ["Next.js 16", "TypeScript", "Generative UI", "Strava", "Neon Postgres"],
        marquee:
          "AI coach · Generative UI · Strava sync · Recharts · Drizzle ORM",
        peekLabel: "Stride — AI running coach",
      },
      portfolio: {
        title: "Portfolio",
        desc: "This site was built with AI as my coding partner — Claude Code writes the code, Hermes orchestrates, and Vercel deploys. You're already looking at the result.",
        facts: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "AI agents"],
        marquee:
          "AI-driven · Design handoff · Claude Code · Hermes Agent · Vercel",
        peekLabel: "Portfolio — built by agents",
      },
    },
    method: {
      kicker: "02 — How I work",
      lead: 'My development partner is <a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noopener" style="border-bottom:1px solid var(--line)">Hermes Agent ↗︎</a> — Nous Research\'s open source agent — which I\'ve set up and tuned to my workflow on a Mac Mini M4. It runs 24/7 via Telegram; Claude Code writes the code and Hermes orchestrates the entire flow from issue to deploy. This portfolio was built with it.',
      steps: [
        {
          label: "#1 Remember",
          title: "Persistent memory",
          paragraph:
            "Hermes remembers everything via mem0 — vector search across sessions, so it knows my projects, preferences and past solutions. I never start from scratch.",
          pills: ["mem0", "vector search", "cross-session"],
        },
        {
          label: "#2 Delegate",
          title: "The boss never writes the code",
          paragraph:
            "I never let the orchestrator write code itself. Everything is implemented by Claude Code in isolated sessions, each with its own git worktree — that's how I've set up the flow, so several tasks run in parallel without conflicts.",
          pills: ["Claude Code", "isolated sessions", "worktree per task"],
        },
        {
          label: "#3 Verify",
          title: "Nothing ships without green",
          paragraph:
            "After every task my QA gate runs: build → lint → typecheck → all 1000+ tests. Only changes that pass the whole chain get committed — a rule I've built into the flow. No exceptions.",
          pills: ["build", "lint", "typecheck", "1000+ tests"],
        },
        {
          label: "#4 Ship",
          title: "From issue to production",
          paragraph:
            "From issue to production in minutes, not days. The entire flow — read, brief, delegate, QA, commit, deploy — is automated. My role is architect and final approver.",
          pills: ["GitHub issues", "conventional commits", "auto-deploy"],
        },
      ],
      stats: [
        { value: "24/7", label: "running on a Mac Mini M4" },
        { value: "200+", label: "issues closed in the flow" },
        { value: "1000+", label: "tests in the QA gate" },
        { value: "100%", label: "TypeScript strict" },
      ],
    },
    experience: {
      kicker: "03 — Experience",
      rows: [
        {
          period: "2024 — now",
          role: "Frontend developer",
          company: "Minetilbud (Dayli)",
          note: "Joined the team when Minetilbud acquired AVIOU. Building and maintaining Dayli Publisher — templates, component library and ongoing UX improvements in React, TypeScript and Storybook.",
        },
        {
          period: "2022 — 2024",
          role: "Frontend developer",
          company: "AVIOU",
          note: "Online catalogue platform in React and TypeScript — new features and improved UI components that streamlined customers' workflows. Plus web design and frontend work for a range of clients.",
        },
        { period: "Aug — Oct 2021", role: "Frontend developer, intern", company: "Web2Media" },
        { period: "2021", role: "B.Sc. in web development", company: "Business Academy Aarhus" },
        { period: "2020", role: "Multimedia designer", company: "Business Academy Aarhus" },
      ],
    },
    footer: {
      kicker: "04 — Contact",
      email: "benjaschou12@icloud.com",
      copied: "Copied ✓",
      copyAria: "Copy email address",
      copyright: "© 2026 Benjamin Schou Knudsen",
      linkedin: "LinkedIn",
      linkedinUrl:
        "https://www.linkedin.com/in/benjamin-schou-knudsen-b8b685178/",
    },
  },
} as const;

/** A single token of a word-reveal heading. `em` words render serif italic
 *  (with the animated underline on the hero, A8); a `br` token forces a line
 *  break; `tail` appends punctuation that rides inside the same word mask
 *  (e.g. a period after an `em` word) so it rises with the word. */
export type HeroToken =
  | { w: string; em?: boolean; tail?: string }
  | { br: true };

/**
 * Hero `h1`, tokenised per language for the word-reveal (A2). Split out of
 * `copy` so the mixed-shape tuple stays a clean `HeroToken[]` (an `as const`
 * heading would infer two divergent tuple types and break iteration).
 */
export const heroH1: Record<Lang, HeroToken[]> = {
  da: [
    { w: "Kode" }, { w: "med" }, { w: "sans", em: true }, { br: true },
    { w: "for" }, { w: "det" }, { w: "visuelle." },
  ],
  en: [
    { w: "Code" }, { w: "with" }, { w: "an" }, { w: "eye", em: true }, { br: true },
    { w: "for" }, { w: "the" }, { w: "visual." },
  ],
};

/**
 * Method `h2`, tokenised per language for the word-reveal (A2). Mirrors
 * {@link heroH1}: the `em` word renders serif italic accent, `tail` carries the
 * trailing period so it rises inside the same mask, `br` forces the line break.
 */
export const methodH2: Record<Lang, HeroToken[]> = {
  da: [
    { w: "Jeg" }, { w: "styrer." }, { br: true },
    { w: "Agenterne" }, { w: "leverer", em: true, tail: "." },
  ],
  en: [
    { w: "I" }, { w: "direct." }, { br: true },
    { w: "The" }, { w: "agents" }, { w: "deliver", em: true, tail: "." },
  ],
};

/**
 * Experience `h2`, tokenised per language for the word-reveal (A2). Same shape
 * as {@link methodH2}: the `em` word renders serif italic accent and `tail`
 * carries the trailing period inside the same word mask.
 */
export const experienceH2: Record<Lang, HeroToken[]> = {
  da: [
    { w: "Hvor" }, { w: "jeg" }, { w: "har" }, { w: "arbejdet", em: true, tail: "." },
  ],
  en: [
    { w: "Where" }, { w: "I've" }, { w: "worked", em: true, tail: "." },
  ],
};

/**
 * Footer `h2`, tokenised per language for the word-reveal (A2). Same shape as
 * {@link experienceH2}: the `em` word renders serif italic accent and `tail`
 * carries the trailing period inside the same word mask. Source copy is
 * `"Lad os <em>snakke</em>."` / `"Let's <em>talk</em>."`.
 */
export const footerH2: Record<Lang, HeroToken[]> = {
  da: [
    { w: "Lad" }, { w: "os" }, { w: "snakke", em: true, tail: "." },
  ],
  en: [
    { w: "Let's" }, { w: "talk", em: true, tail: "." },
  ],
};

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Copy for the currently active language. */
  t: (typeof copy)[Lang];
};

const LangContext = createContext<LangContextValue | null>(null);

function persist(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable (private mode / SSR) — ignore */
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("da");

  // Hydrate from storage after mount (the inline head script already set
  // <html lang> before paint to avoid a flash).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    // One-time sync from persisted client state after hydration. State must
    // start at the SSR default ("da") to match server markup, then reconcile.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "da" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "da" ? "en" : "da";
      persist(next);
      return next;
    });
  }, []);

  const value: LangContextValue = { lang, setLang, toggleLang, t: copy[lang] };
  return createElement(LangContext.Provider, { value }, children);
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
