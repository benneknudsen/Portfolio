/**
 * Pure i18n data: locales, UI copy and word-reveal tokens.
 *
 * No `"use client"` directive on purpose — server components (the root
 * layout's `generateMetadata` and the per-locale OG image) import this module
 * directly. Clients get their copy through the `useLang` hook (`t`) and the
 * word-reveal tokens through `@/lib/i18n`, which re-exports only the tokens
 * and types from this module — never the `copy` object.
 */

export const LOCALES = ["da", "en"] as const;

export type Lang = (typeof LOCALES)[number];

/**
 * UI copy for both languages. DA is the default.
 * Component-facing strings live here so nothing is hardcoded in JSX.
 */
export const copy = {
  da: {
    meta: {
      title: "Benjamin Schou Knudsen — Frontend-udvikler",
      description:
        "Frontend-udvikler med baggrund som multimediedesigner — jeg omsætter visuelle idéer til færdige produkter i React og TypeScript.",
    },
    nav: {
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
      pRest:
        " Frontend-udvikler med baggrund som multimediedesigner. Jeg bygger visuelle produkter i React og TypeScript, med AI-agenter som udviklingspartnere.",
      btnWrite: "Skriv til mig",
      btnCopy: "Kopiér e-mail",
      copied: "Kopieret ✓",
      glyphLabel: "Open to work",
      glyphMsg: "ÅBEN FOR JOB",
    },
    aria: {
      nav: "Primær",
      langGroup: "Vælg sprog",
      themeToDark: "Skift til mørkt tema",
      themeToLight: "Skift til lyst tema",
      menuOpen: "Åbn menu",
      menuClose: "Luk menu",
      skip: "Spring til indhold",
    },
    notFound: {
      message: "Siden blev ikke fundet. Den er måske flyttet eller aldrig eksisteret.",
      back: "Tilbage til forsiden",
    },
    error: {
      title: "Noget gik galt",
      message:
        "Siden kunne ikke hentes. Prøv igen — hvis fejlen fortsætter, kan du gå tilbage til forsiden.",
      retry: "Prøv igen",
      back: "Tilbage til forsiden",
    },
    caseStride: {
      kicker: "Case — Stride",
      title: "Stride",
      lead: "En løbetræner der regner rådene ud i stedet for at gætte dem.",
      back: "Tilbage til projekter",
      live: "Se Stride live",
      liveUrl: "https://stride-run.club",
      problemTitle: "Problemet",
      problem:
        "Jeg ville have en coach til mit eget løb, ikke endnu et panel med de samme tal som Strava. Kravet var enkelt: en anbefaling skal kunne forklares. Siger den \"rolig tur\", skal den kunne vise hvilke data der pegede den vej.",
      constraintsTitle: "Begrænsninger",
      constraints: [
        {
          title: "Data bliver i Strava",
          body: "Stride henter aktiviteter via Strava-API'et. Stravas vilkår forbyder at dele data med AI-udbydere, så løbeturene må ikke ende i et kontekstvindue hos en model. Det er en begrænsning der former arkitekturen, ikke en detalje.",
        },
        {
          title: "Rådene skal kunne gentages",
          body: "Samme data ind skal give samme råd ud. Derfor beregnes anbefalingerne af en regelmotor, ikke af en model. Det gør dem forklarlige, testbare og sammenlignelige over tid.",
        },
        {
          title: "Én bruger: mig",
          body: "Jeg tester på min egen telefon og mit eget træningsforløb. Hver ændring bliver vurderet mod et rigtigt løb, ikke mod demodata.",
        },
      ],
      decisionsTitle: "Beslutninger",
      decisions: [
        {
          title: "Regler frem for prompts",
          body: "Belastning, restitution og træningstype er regler med navn og rækkefølge. Når rådet er forkert, kan jeg pege på den regel der er forkert — i stedet for at gætte på om prompten var dårligt formuleret.",
        },
        {
          title: "Readiness som glidende gennemsnit",
          body: "Parathed beregnes som et vægtet, glidende gennemsnit frem for et dagsbillede. En enkelt hård tur skal kunne mærkes uden at vælte tallet, og en langsom omstilling skal kunne ses.",
        },
        {
          title: "Anbefalinger som komponenter",
          body: "Råd leveres som typede blokke der renderes som rigtige React-komponenter — kort, grafer og indsigter — i stedet for en tekstblob. Så kan et råd indeholde en graf uden at nogen skal klippe og lime tekst.",
        },
      ],
      stackTitle: "Stack",
      stack: ["Next.js 16", "TypeScript", "Drizzle ORM", "Neon Postgres", "Recharts", "Strava API"],
      learningTitle: "Hvad jeg tog med mig",
      learning:
        "At bygge mod en regelmotor tvinger beslutningerne frem: hver regel skal kunne forsvares, og hver undtagelse skal skrives ned. Det er mere arbejde end at kalde en model, og det er derfor rådene kan forklares.",
    },
    projects: {
      sectionTitle: "Projekter",
      tapAgain: "Tryk igen for at åbne siden",
      stride: {
        title: "Stride",
        desc: "Løbetræneren forbinder til Strava og bygger sine anbefalinger på en deterministisk regelmotor — samme data giver samme råd, og ingen model ser dine ture. Anbefalingerne leveres som typede blokke, der renderer rigtige React-komponenter: grafer, kort og indsigter direkte i dashboardet.",
        facts: ["Next.js 16", "TypeScript", "Drizzle ORM", "Neon Postgres", "Strava"],
        marquee:
          "Regelmotor · Typede blokke · Strava-sync · Recharts · Drizzle ORM",
        peekLabel: "Stride — regelbaseret løbetræner",
      },
      portfolio: {
        title: "Portfolio",
        desc: "Jeg har bygget denne side med AI som makker. En kodende model skriver koden, Hermes orkestrerer, Vercel deployer. Du kigger allerede på resultatet.",
        facts: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "AI-agenter"],
        marquee:
          "AI-drevet · Design handoff · OpenCode · Hermes Agent · Vercel",
        peekLabel: "Portfolio — bygget af agenter",
      },
      flagvagten: {
        title: "Flagvagten",
        desc: "Dansk flag-app til iOS, der husker at hejse og fire Dannebrog efter solopgang og solnedgang på din lokation. Kender flagdagene, halv stang og de grønlandske og færøske flag — med live-status via widget og Live Activity på iPhone.",
        facts: ["React Native", "Expo SDK 57", "TypeScript", "NativeWind", "EAS"],
        marquee:
          "Dannebrog · Solopgang/solnedgang · Flagdage · Halv stang · Live Activity · Expo · Skia",
        peekLabel: "Flagvagten — dansk flag-app",
      },
    },
    method: {
      kicker: "02 — Arbejdsmetode",
      lead: {
        before: "Min udviklingspartner er ",
        linkHref: "https://hermes-agent.nousresearch.com/",
        linkText: "Hermes Agent ↗︎",
        after:
          ", Nous Researchs open source-agent, som jeg har sat op og tunet til mit workflow på en Mac Mini M4. Den kører 24/7 via Telegram; en kodende model skriver koden, og Hermes orkestrerer hele flowet fra issue til deploy. Jeg har bygget denne portfolio med den.",
      },
      steps: [
        {
          label: "#1 Husk",
          title: "Persistent memory",
          paragraph:
            "Hermes husker alt via mem0, med vector-søgning på tværs af sessioner, så den kender mine projekter, præferencer og tidligere løsninger. Jeg starter aldrig forfra.",
          pills: ["mem0", "vector-søgning", "tværs af sessioner"],
        },
        {
          label: "#2 Deleger",
          title: "Koden skrives aldrig af chefen",
          paragraph:
            "Jeg lader aldrig orchestratoren skrive kode selv. Den læser issuet, skriver briefen og delegerer til en kodende model, der implementerer i sit eget git-worktree per opgave. Sådan har jeg sat flowet op: flere opgaver kører parallelt uden at røre hinanden.",
          pills: ["kodende model", "isolerede sessioner", "worktree per opgave"],
        },
        {
          label: "#3 Verificer",
          title: "Intet slipper igennem uden grønt",
          paragraph:
            "Efter hver opgave kører min QA-gate: build → lint → typecheck → tests, hvor projektet har dem. Derudover læser en uafhængig model — aldrig den samme som skrev koden — diffen read-only og giver APPROVE eller REJECT. Den, der har skrevet fejlen, er den dårligste til at se den. Kun ændringer, der består hele kæden, bliver committet. Den regel har jeg bygget ind i flowet. Ingen undtagelser.",
          pills: ["build", "lint", "typecheck", "tests"],
        },
        {
          label: "#4 Lever",
          title: "Fra issue til produktion",
          paragraph:
            "Fra issue til produktion på minutter, ikke dage. Hele flowet (læs, brief, deleger, QA, commit, merge, deploy) er automatiseret, og jeg tjekker resultatet på det, serveren faktisk udleverer — ikke på et grønt build. Min rolle er at bestemme og godkende.",
          pills: ["GitHub issues", "conventional commits", "auto-deploy"],
        },
      ],
      selfNote: {
        label: "Hvad der stadig er mit",
        body: "Jeg vælger trade-offs, læser hver diff og bestemmer om den er god nok. Agenten foreslår, jeg afviser. Den vigtigste regel har jeg selv sat: den model, der skriver koden, må aldrig bedømme den. En anden model læser diffen read-only og svarer APPROVE eller REJECT, og bliver den afvist, går indvendingerne ordret tilbage til den, der skrev koden. Reglen findes, fordi den, der har skrevet fejlen, er den dårligste til at se den — og fordi et grønt build ikke er det samme som rigtig kode. Det er en beslutning om tillid, ikke om teknik.",
      },
      stats: [
        { value: "24/7", label: "kører på Mac Mini M4" },
        { value: "200+", label: "issues lukket i flowet" },
        { value: "grønt", label: "ved hver commit" },
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
          note: "Kom med i teamet, da Minetilbud opkøbte AVIOU. Bygger og vedligeholder Dayli Publisher: skabeloner, komponentbibliotek og løbende UX-arbejde i React, TypeScript og Storybook.",
        },
        {
          period: "2022 — 2024",
          role: "Frontend-udvikler",
          company: "AVIOU",
          note: "Online katalogplatform i React og TypeScript. Byggede nye funktioner og forbedrede UI-komponenter, der gjorde kundernes arbejdsflow hurtigere. Derudover webdesign og frontend-løsninger for en række kunder.",
        },
        { period: "aug. — okt. 2021", role: "Frontend-udvikler, praktik", company: "Web2Media" },
        { period: "2021", role: "PBA i webudvikling", company: "Erhvervsakademi Aarhus" },
        { period: "2020", role: "Multimediedesigner", company: "Erhvervsakademi Aarhus" },
      ],
    },
    about: {
      kicker: "04 — Om mig",
      lead: "Når jeg ikke bygger digitale løsninger, spiller jeg helst spil, der gør livet lidt sværere, end det behøver at være — Dark Souls, Elden Ring, Sekiro og senest Silksong er alle klaret. Ellers følger jeg fodbold, logger film på Letterboxd og ser stadig Manchester United, efterhånden mest af ren stædighed.",
      badges: ["Manchester United-fan", "Giver ikke op"],
    },
    footer: {
      kicker: "05 — Kontakt",
      email: "benjaschou12@icloud.com",
      copied: "Kopieret ✓",
      copyAria: "Kopiér e-mailadresse",
      copyright: "© 2026 Benjamin Schou Knudsen",
      linkedin: "LinkedIn",
      linkedinUrl:
        "https://www.linkedin.com/in/benjamin-schou-knudsen-b8b685178/",
      github: "GitHub",
      githubUrl: "https://github.com/benneknudsen",
      availability:
        "Åben for frontend- og AI-udviklerroller i Silkeborg og Aarhus — også gerne remote.",
    },
  },
  en: {
    meta: {
      title: "Benjamin Schou Knudsen — Frontend Developer",
      description:
        "Frontend developer with a background in multimedia design — I turn visual ideas into finished products in React and TypeScript.",
    },
    nav: {
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
      pRest:
        " Frontend developer with a background in multimedia design. I build visual products in React and TypeScript, with AI agents as development partners.",
      btnWrite: "Get in touch",
      btnCopy: "Copy email",
      copied: "Copied ✓",
      glyphLabel: "Open to work",
      glyphMsg: "OPEN TO WORK",
    },
    aria: {
      nav: "Primary",
      langGroup: "Select language",
      themeToDark: "Switch to dark theme",
      themeToLight: "Switch to light theme",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      skip: "Skip to content",
    },
    notFound: {
      message: "Page not found. It may have been moved or never existed.",
      back: "Back to the front page",
    },
    error: {
      title: "Something went wrong",
      message:
        "The page could not be loaded. Try again — if the error persists, go back to the front page.",
      retry: "Try again",
      back: "Back to the front page",
    },
    caseStride: {
      kicker: "Case — Stride",
      title: "Stride",
      lead: "A running coach that works the advice out instead of guessing at it.",
      back: "Back to projects",
      live: "See Stride live",
      liveUrl: "https://stride-run.club",
      problemTitle: "The problem",
      problem:
        "I wanted a coach for my own running, not another panel with the same numbers Strava already shows. The requirement was simple: a recommendation has to be explainable. If it says \"easy run\", it should be able to show which data pointed that way.",
      constraintsTitle: "Constraints",
      constraints: [
        {
          title: "Data stays in Strava",
          body: "Stride pulls activities in through the Strava API. Strava's terms forbid sharing that data with AI providers, so runs must never end up in a model's context window. That is a constraint that shapes the architecture, not a detail.",
        },
        {
          title: "Advice has to be repeatable",
          body: "Same data in has to give the same advice out. That is why the recommendations are computed by a rules engine, not a model. It makes them explainable, testable and comparable over time.",
        },
        {
          title: "One user: me",
          body: "I test on my own phone and my own training. Every change gets judged against a real training block, not demo data.",
        },
      ],
      decisionsTitle: "Decisions",
      decisions: [
        {
          title: "Rules instead of prompts",
          body: "Load, recovery and session type are rules with names and an order. When the advice is wrong I can point at the rule that is wrong, instead of guessing whether the prompt was badly worded.",
        },
        {
          title: "Readiness as a moving average",
          body: "Readiness is a weighted moving average rather than a picture of the day. One hard session should register without collapsing the number, and a slow shift should be visible.",
        },
        {
          title: "Advice as components",
          body: "Recommendations arrive as typed blocks that render real React components — cards, charts and insights — instead of a text blob. A piece of advice can contain a chart without anyone cutting and pasting text.",
        },
      ],
      stackTitle: "Stack",
      stack: ["Next.js 16", "TypeScript", "Drizzle ORM", "Neon Postgres", "Recharts", "Strava API"],
      learningTitle: "What I took away",
      learning:
        "Building against a rules engine forces the decisions into the open: every rule has to be defensible and every exception has to be written down. It is more work than calling a model, and it is why the advice can be explained.",
    },
    projects: {
      sectionTitle: "Projects",
      tapAgain: "Tap again to visit",
      stride: {
        title: "Stride",
        desc: "Stride connects to Strava and builds its recommendations from a deterministic rules engine: same data in, same advice out, and no model ever sees your runs. Recommendations arrive as typed blocks that render real React components — charts, cards and insights straight into the dashboard.",
        facts: ["Next.js 16", "TypeScript", "Drizzle ORM", "Neon Postgres", "Strava"],
        marquee:
          "Rules engine · Typed blocks · Strava sync · Recharts · Drizzle ORM",
        peekLabel: "Stride — rule-based running coach",
      },
      portfolio: {
        title: "Portfolio",
        desc: "I built this site with AI as my coding partner. A coding model writes the code, Hermes orchestrates, Vercel deploys. You're already looking at the result.",
        facts: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "AI agents"],
        marquee:
          "AI-driven · Design handoff · OpenCode · Hermes Agent · Vercel",
        peekLabel: "Portfolio — built by agents",
      },
      flagvagten: {
        title: "Flagvagten",
        desc: "Danish flag app for iOS that remembers to raise and lower the Dannebrog at sunrise and sunset for your location. It knows the flag days, half-mast and the Greenlandic and Faroese flags — with live status via a widget and Live Activity on iPhone.",
        facts: ["React Native", "Expo SDK 57", "TypeScript", "NativeWind", "EAS"],
        marquee:
          "Dannebrog · Sunrise/sunset · Flag days · Half-mast · Live Activity · Expo · Skia",
        peekLabel: "Flagvagten — Danish flag app",
      },
    },
    method: {
      kicker: "02 — How I work",
      lead: {
        before: "My development partner is ",
        linkHref: "https://hermes-agent.nousresearch.com/",
        linkText: "Hermes Agent ↗︎",
        after:
          ", Nous Research's open source agent, which I've set up and tuned to my workflow on a Mac Mini M4. It runs 24/7 via Telegram; a coding model writes the code and Hermes orchestrates everything from issue to deploy. I built this portfolio with it.",
      },
      steps: [
        {
          label: "#1 Remember",
          title: "Persistent memory",
          paragraph:
            "Hermes remembers everything via mem0, with vector search across sessions, so it knows my projects, preferences and past solutions. I never start from scratch.",
          pills: ["mem0", "vector search", "cross-session"],
        },
        {
          label: "#2 Delegate",
          title: "The boss never writes the code",
          paragraph:
            "I never let the orchestrator write code itself. It reads the issue, writes the brief and delegates to a coding model that implements each task in its own git worktree. That's how I set up the flow: several tasks run in parallel without touching each other.",
          pills: ["coding model", "isolated sessions", "worktree per task"],
        },
        {
          label: "#3 Verify",
          title: "Nothing ships without green",
          paragraph:
            "After every task my QA gate runs: build → lint → typecheck → tests, where the project has them. On top of that, an independent model — never the one that wrote the code — reads the diff read-only and gives APPROVE or REJECT. The one who wrote the bug is the worst at spotting it. Only changes that pass the whole chain get committed. I built that rule into the flow. No exceptions.",
          pills: ["build", "lint", "typecheck", "tests"],
        },
        {
          label: "#4 Ship",
          title: "From issue to production",
          paragraph:
            "From issue to production in minutes, not days. The whole flow (read, brief, delegate, QA, commit, merge, deploy) is automated, and I check the result against what the server actually serves — not on a green build. My role is to decide and approve.",
          pills: ["GitHub issues", "conventional commits", "auto-deploy"],
        },
      ],
      selfNote: {
        label: "What stays mine",
        body: "I choose the trade-offs, read every diff and decide whether it is good enough. The agent proposes, I reject. The most important rule is one I set myself: the model that writes the code must never judge it. A different model reads the diff read-only and answers APPROVE or REJECT, and on a reject the objections go back verbatim to whoever wrote the code. The rule exists because the author of a mistake is the worst person to spot it — and because a green build is not the same as correct code. That is a decision about trust, not about technique.",
      },
      stats: [
        { value: "24/7", label: "running on a Mac Mini M4" },
        { value: "200+", label: "issues closed in the flow" },
        { value: "green", label: "on every commit" },
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
          note: "Joined the team when Minetilbud acquired AVIOU. I build and maintain Dayli Publisher: templates, a component library and ongoing UX work in React, TypeScript and Storybook.",
        },
        {
          period: "2022 — 2024",
          role: "Frontend developer",
          company: "AVIOU",
          note: "Online catalogue platform in React and TypeScript. Built new features and improved UI components that made customers' workflows faster. Plus web design and frontend work for a range of clients.",
        },
        { period: "Aug — Oct 2021", role: "Frontend developer, intern", company: "Web2Media" },
        { period: "2021", role: "B.Sc. in web development", company: "Business Academy Aarhus" },
        { period: "2020", role: "Multimedia designer", company: "Business Academy Aarhus" },
      ],
    },
    about: {
      kicker: "04 — About",
      lead: "When I'm not building digital solutions, I play games that make life harder than it needs to be — Dark Souls, Elden Ring, Sekiro and, most recently, Silksong are all done. Otherwise I follow football, log films on Letterboxd and still watch Manchester United, these days mostly out of stubbornness.",
      badges: ["Manchester United fan", "Never gives up"],
    },
    footer: {
      kicker: "05 — Contact",
      email: "benjaschou12@icloud.com",
      copied: "Copied ✓",
      copyAria: "Copy email address",
      copyright: "© 2026 Benjamin Schou Knudsen",
      linkedin: "LinkedIn",
      linkedinUrl:
        "https://www.linkedin.com/in/benjamin-schou-knudsen-b8b685178/",
      github: "GitHub",
      githubUrl: "https://github.com/benneknudsen",
      availability:
        "Open to frontend and AI developer roles in the Silkeborg and Aarhus area — remote works too.",
    },
  },
} as const;

/** Shape of one locale's copy — the type of what server passes to the client. */
export type Copy = (typeof copy)[Lang];

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
 * About `h2`, tokenised per language for the word-reveal (A2). Same shape as
 * {@link experienceH2}: the `em` word renders serif italic accent and `tail`
 * carries the trailing period inside the same word mask. Source copy is
 * `"Når jeg ikke <em>koder</em>."` / `"When I'm not <em>coding</em>."`.
 */
export const aboutH2: Record<Lang, HeroToken[]> = {
  da: [
    { w: "Når" }, { w: "jeg" }, { w: "ikke" }, { w: "koder", em: true, tail: "." },
  ],
  en: [
    { w: "When" }, { w: "I'm" }, { w: "not" }, { w: "coding", em: true, tail: "." },
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
