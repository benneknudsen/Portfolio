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
        {
          title: "Typede blokke gennem zod",
          body: "Anbefalingerne forlader regelmotoren som NDJSON, og hver blok valideres med zod ved grænsen, før den når React. Er blokken ugyldig, rendres den ikke — jeg får en fejl i stedet for et halvt kort på skærmen.",
        },
      ],
      decisionsLink: {
        label: "Typed block-stream",
        href: "https://github.com/benneknudsen/stride/blob/main/docs/case/typed-block-stream.md",
      },
      measurementsTitle: "Målinger",
      measurementsIntro:
        "Alle tal i denne case er lab-målinger, kørt med Lighthouse CI 0.16 / Lighthouse 13.6 (5 kørsler, median) og axe 4.14 på en lokal produktionsbuild. Kommandoerne ligger i repoet.",
      measurements: [
        {
          title: "Performance",
          body: "Landing og demo havde den laveste score (0,69/0,75), fordi de arbejder på main-threaden i browseren. De øvrige sider ligger omkring 1,0. På /login faldt LCP fra 4,45 s til 0,60 s efter fixet, og Performance gik fra 0,85 til 1,00.",
        },
        {
          title: "Tilgængelighed",
          body: "axe, WCAG A/AA: color-contrast (serious) gik fra 4–31 noder pr. side til 0 på alle sider. Én er tilbage på /login — Strava-brandknappen — og den har jeg accepteret. Tokens --color-red-ink og --color-strava-deep blev indført; brandfarverne er uændrede.",
        },
        {
          title: "Test",
          body: "1462 unit-tests (Vitest) og 22 e2e-tests (Playwright), målt i kørsel 6. november 2026.",
        },
      ],
      measurementsNote:
        "Tallene er fra laboratoriet, ikke feltdata. Jeg har endnu ikke målt rigtige brugeres Core Web Vitals, så de siger noget om builden og intet om netværket hos den enkelte løber.",
      measurementsLink: {
        label: "Målingslog",
        href: "https://github.com/benneknudsen/stride/blob/main/docs/performance/changes.md",
      },
      testTitle: "Teststrategi",
      testIntro: "Jeg tester i to lag, fordi de fanger hver sin slags fejl.",
      testLayers: [
        {
          title: "Vitest — enhedskontrakten",
          body: "Det første lag kører på enheder: reglerne, beregningerne og kontrakten for de typede blokke. Givet de samme aktiviteter skal anbefalingen stadig være den samme, og en blok der ikke validerer, skal afvises.",
        },
        {
          title: "Playwright — flows gennem serveren",
          body: "Det andet lag driver den rigtige app gennem serveren: log ind, se dashboardet og få en anbefaling renderet som blokke. Det fanger sammensætningen, som enhedstestene ikke kan se.",
        },
      ],
      testNotTested:
        "Jeg tester bevidst ikke Strava-OAuth mod det rigtige API, prod-sync eller hvordan motion ser ud. Det første kræver et live login, det andet en produktionsdatabase, og det tredje er en visuel vurdering, som en assertion ikke fanger.",
      testLink: {
        label: "Teststrategien i detaljer",
        href: "https://github.com/benneknudsen/stride/blob/main/docs/case/test-strategy.md",
      },
      a11yTitle: "Tilgængelighed i praksis",
      a11yItems: [
        {
          title: "Tastatur og fokus",
          body: "Jeg har gennemgået flows med tastaturet: fokus er synligt, og ingen funktion afhænger af hover for at virke.",
        },
        {
          title: "FlipText",
          body: "FlipText beholder en sr-only kopi af teksten og markerer de animerede bogstaver som aria-hidden. Animationen er dekoration; teksten bliver læst én gang, normalt.",
        },
        {
          title: "Reduceret bevægelse",
          body: "Med prefers-reduced-motion stopper animationerne, og indholdet skifter med det samme i stedet for at glide ind.",
        },
      ],
      a11yLimit:
        "Én begrænsning står tilbage: Strava-knappen på /login har en kontrast på 3,4:1. Jeg har beholdt Stravas brandfarve i stedet for at opfinde en godkendt variant; knappen har stadig synlig tekst og tastaturfokus, og det er det eneste axe-fund, der er tilbage.",
      a11yLink: {
        label: "Tilgængelighedsnoter",
        href: "https://github.com/benneknudsen/stride/blob/main/docs/case/accessibility.md",
      },
      stackTitle: "Stack",
      stack: ["Next.js 16", "TypeScript", "Drizzle ORM", "Neon Postgres", "Recharts", "Strava API", "Vitest", "Playwright", "axe"],
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
        status: "live",
      },
      portfolio: {
        title: "Portfolio",
        desc: "Jeg har bygget denne side med AI som makker. En kodende model skriver koden, Hermes orkestrerer, Vercel deployer. Du kigger allerede på resultatet.",
        facts: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "AI-agenter"],
        marquee:
          "AI-drevet · Design handoff · OpenCode · Hermes Agent · Vercel",
        peekLabel: "Portfolio — bygget af agenter",
        status: "live",
      },
      flagvagten: {
        title: "Flagvagten",
        desc: "Dansk flag-app til iOS, der husker at hejse og fire Dannebrog efter solopgang og solnedgang på din lokation. Kender flagdagene, halv stang og de grønlandske og færøske flag — med live-status via widget og Live Activity på iPhone.",
        facts: ["React Native", "Expo SDK 57", "TypeScript", "NativeWind", "EAS"],
        marquee:
          "Dannebrog · Solopgang/solnedgang · Flagdage · Halv stang · Live Activity · Expo · Skia",
        peekLabel: "Flagvagten — dansk flag-app",
        status: "på hold",
      },
      futSquadLab: {
        title: "Fut Squad Lab",
        desc: "Et værktøj jeg byggede til mig selv for at spare tid, når jeg spiller FIFA. Det løser Squad Building Challenges ud fra det lager, jeg allerede har i klubben — én challenge ad gangen, og det sender intet selv. Alt kører lokalt i browseren, og koden er åben under MIT.",
        facts: ["JavaScript", "Chrome Extension", "MIT", "Vitest"],
        marquee:
          "SBC-solver · Eget klub-lager · Ingen backend · Kører offline · MIT",
        peekLabel: "Fut Squad Lab — SBC-solver til FIFA",
        status: "alpha",
      },
      stravaDigest: {
        title: "strava-digest",
        desc: "Et lille CLI-værktøj jeg byggede til mig selv: det omdanner en Strava-eksport på 22 MB GPS-data til én kompakt træningsrapport — splits, pulsdrift, zoner og tendenser — som en agent kan læse på cirka 14.000 tokens. Det er 454× mindre på mit eget eksport med 196 løb.",
        facts: ["TypeScript", "Node 22", "CLI", "Ingen backend"],
        marquee:
          "Strava-eksport · Kompakt digest · Splits · HR-drift · Zoner · CLI",
        peekLabel: "strava-digest — kompakt træningsdigest",
        status: "v1.0.3",
      },
    },
    method: {
      kicker: "02 — Arbejdsmetode",
      lead: {
        before: "Min udviklingspartner er ",
        linkHref: "https://hermes-agent.nousresearch.com/",
        linkText: "Hermes Agent ↗︎",
        after:
          ", Nous Researchs open source-agent, som jeg har sat op og tunet til mit workflow på en Mac Mini M4. Den kører 24/7, og jeg styrer den fra Discord — ofte fra telefonen — med Telegram ved siden af. Jeg kører to profiler, en til udvikling og en til privat, så skills, hukommelse og cron ikke blander sig. En kodende model skriver koden, og Hermes orkestrerer hele flowet fra issue til deploy. Jeg har bygget denne portfolio med den.",
      },
      steps: [
        {
          label: "#1 Husk",
          title: "Persistent memory",
          paragraph:
            "Hermes husker på tværs af sessioner via mem0 og vector-søgning, så den kender mine projekter, præferencer og tidligere løsninger. Hukommelsen ligger pr. profil — en til udvikling, en til privat — så konteksten ikke flyder sammen, og jeg aldrig starter forfra.",
          pills: ["mem0", "vector-søgning", "profil pr. kontekst"],
        },
        {
          label: "#2 Deleger",
          title: "Alt starter med en brief",
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
      badges: [],
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
        {
          title: "Typed blocks through zod",
          body: "Recommendations leave the rules engine as NDJSON, and every block is validated with zod at the boundary before it reaches React. If the block is invalid, it is not rendered — I get an error instead of half a card on screen.",
        },
      ],
      decisionsLink: {
        label: "Typed block-stream",
        href: "https://github.com/benneknudsen/stride/blob/main/docs/case/typed-block-stream.md",
      },
      measurementsTitle: "Measurements",
      measurementsIntro:
        "Every number in this case is a lab measurement, run with Lighthouse CI 0.16 / Lighthouse 13.6 (five runs, median) and axe 4.14 against a local production build. The commands are in the repository.",
      measurements: [
        {
          title: "Performance",
          body: "The landing page and demo had the lowest score (0.69/0.75) because they do their work on the client-side main thread. The other pages sit around 1.0. On /login, LCP dropped from 4.45 s to 0.60 s after the fix, and Performance went from 0.85 to 1.00.",
        },
        {
          title: "Accessibility",
          body: "axe, WCAG A/AA: color-contrast (serious) went from 4–31 nodes per page to 0 on every page. One remains on /login — the Strava brand button — and I accepted it. The --color-red-ink and --color-strava-deep tokens were added; the brand colours themselves are unchanged.",
        },
        {
          title: "Tests",
          body: "1462 unit tests (Vitest) and 22 end-to-end tests (Playwright), measured in the run on 6 November 2026.",
        },
      ],
      measurementsNote:
        "These are lab numbers, not field data. I have not measured real users' Core Web Vitals yet, so they describe the build and say nothing about the network of any individual runner.",
      measurementsLink: {
        label: "Measurement log",
        href: "https://github.com/benneknudsen/stride/blob/main/docs/performance/changes.md",
      },
      testTitle: "Test strategy",
      testIntro: "I test in two layers because they catch different kinds of failure.",
      testLayers: [
        {
          title: "Vitest — the unit contract",
          body: "The first layer runs on units: the rules, the calculations and the contract for the typed blocks. Given the same activities, the advice should still be the same, and a block that does not validate should be rejected.",
        },
        {
          title: "Playwright — flows through the server",
          body: "The second layer drives the real app through the server: sign in, see the dashboard and get a recommendation rendered as blocks. It catches the wiring that unit tests cannot see.",
        },
      ],
      testNotTested:
        "I deliberately do not test the live Strava OAuth flow, production sync, or how the motion looks. The first needs a real login, the second a production database, and the third is a visual judgement that an assertion does not capture.",
      testLink: {
        label: "The test strategy in detail",
        href: "https://github.com/benneknudsen/stride/blob/main/docs/case/test-strategy.md",
      },
      a11yTitle: "Accessibility in practice",
      a11yItems: [
        {
          title: "Keyboard and focus",
          body: "I worked through the flows with the keyboard: focus is visible, and nothing depends on hover to work.",
        },
        {
          title: "FlipText",
          body: "FlipText keeps a screen-reader-only copy of the text and marks the animated letters as aria-hidden. The animation is decoration; the text is read once, normally.",
        },
        {
          title: "Reduced motion",
          body: "With prefers-reduced-motion, the animations stop and the content switches instantly instead of sliding in.",
        },
      ],
      a11yLimit:
        "One limitation remains: the Strava button on /login has a contrast ratio of 3.4:1. I kept Strava's brand colour rather than invent an approved variant; the button still has visible text and keyboard focus, and it is the only axe finding left.",
      a11yLink: {
        label: "Accessibility notes",
        href: "https://github.com/benneknudsen/stride/blob/main/docs/case/accessibility.md",
      },
      stackTitle: "Stack",
      stack: ["Next.js 16", "TypeScript", "Drizzle ORM", "Neon Postgres", "Recharts", "Strava API", "Vitest", "Playwright", "axe"],
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
        status: "live",
      },
      portfolio: {
        title: "Portfolio",
        desc: "I built this site with AI as my coding partner. A coding model writes the code, Hermes orchestrates, Vercel deploys. You're already looking at the result.",
        facts: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "AI agents"],
        marquee:
          "AI-driven · Design handoff · OpenCode · Hermes Agent · Vercel",
        peekLabel: "Portfolio — built by agents",
        status: "live",
      },
      flagvagten: {
        title: "Flagvagten",
        desc: "Danish flag app for iOS that remembers to raise and lower the Dannebrog at sunrise and sunset for your location. It knows the flag days, half-mast and the Greenlandic and Faroese flags — with live status via a widget and Live Activity on iPhone.",
        facts: ["React Native", "Expo SDK 57", "TypeScript", "NativeWind", "EAS"],
        marquee:
          "Dannebrog · Sunrise/sunset · Flag days · Half-mast · Live Activity · Expo · Skia",
        peekLabel: "Flagvagten — Danish flag app",
        status: "on hold",
      },
      futSquadLab: {
        title: "Fut Squad Lab",
        desc: "A tool I built for myself to save time when I play FIFA. It solves Squad Building Challenges from the club I already have — one challenge at a time, and it never submits anything on its own. Everything runs locally in the browser, and the code is open under MIT.",
        facts: ["JavaScript", "Chrome Extension", "MIT", "Vitest"],
        marquee:
          "SBC solver · Your own club · No backend · Runs offline · MIT",
        peekLabel: "Fut Squad Lab — SBC solver for FIFA",
        status: "alpha",
      },
      stravaDigest: {
        title: "strava-digest",
        desc: "A small CLI tool I built for myself: it turns a 22 MB Strava GPS export into one compact training report — splits, heart-rate drift, zones and trends — that an agent can read in about 14,000 tokens. That is 454× smaller on my own 196-run export.",
        facts: ["TypeScript", "Node 22", "CLI", "No backend"],
        marquee:
          "Strava export · Compact digest · Splits · HR drift · Zones · CLI",
        peekLabel: "strava-digest — compact training digest",
        status: "v1.0.3",
      },
    },
    method: {
      kicker: "02 — How I work",
      lead: {
        before: "My development partner is ",
        linkHref: "https://hermes-agent.nousresearch.com/",
        linkText: "Hermes Agent ↗︎",
        after:
          ", Nous Research's open source agent, which I've set up and tuned to my workflow on a Mac Mini M4. It runs 24/7, and I steer it from Discord — often from my phone — with Telegram alongside. I run two profiles, one for development and one for personal use, so skills, memory and cron don't bleed into each other. A coding model writes the code and Hermes orchestrates everything from issue to deploy. I built this portfolio with it.",
      },
      steps: [
        {
          label: "#1 Remember",
          title: "Persistent memory",
          paragraph:
            "Hermes remembers across sessions via mem0 and vector search, so it knows my projects, preferences and past solutions. Memory lives per profile — one for development, one for personal — so context doesn't bleed, and I never start from scratch.",
          pills: ["mem0", "vector search", "profile per context"],
        },
        {
          label: "#2 Delegate",
          title: "Everything starts with a brief",
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
      badges: [],
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
