# Kickoff-prompt: repo + issues (før kode)

Til en agent der starter helt fra nul. Vedhæft/udpak `design_handoff_portfolio/` og sig hvor den ligger.

---

Læs hele mappen `design_handoff_portfolio/` igennem, før du gør noget andet. Den indeholder en færdig design-handoff til min personlige portfolio-site. Læs i denne rækkefølge, og læs det hele:

1. `README.md` — den autoritative spec: design tokens, sektioner, animationer A1–A16, state, kendte faldgruber, acceptkriterier.
2. `reference/vision2.html` — komplet design-reference. Åbn den i en browser og se den. Det er reference, **ikke** produktionskode: den skal genskabes pixel-nært i en ordentlig komponentstruktur, ikke kopieres.
3. `components.md` — komponent-for-komponent tabel med props, states og præcise værdier.
4. `tokens.css` + `tailwind.config.ts` — eneste kilde til farver, typografi og spacing.
5. `copy.i18n.json` — al tekst, `da` + `en`. Eneste kilde til copy.

**Denne opgave er planlægning, ikke implementering.** Kodearbejdet bliver uddelegeret bagefter, så din output er et repo og et sæt issues som en anden agent kan arbejde ud fra uden at have set handoffen selv. Skriv ikke feature-kode i denne runde.

**Gør følgende:**

1. **Opret repoet** — privat GitHub-repo. Next.js (App Router) + TypeScript strict + Tailwind. Statisk site: ingen backend, database, auth eller CMS. Eneste ekstra runtime-dependency er `lenis`.

2. **Sæt deployment op** — forbind repoet til Vercel som Next.js-projekt på `main`, så hver push giver et preview og `main` deployer til produktion. Har du ikke adgang til min Vercel-konto, så gør alt hvad du kan uden (commit `vercel.json` hvis der er brug for en, verificér at `next build` kører rent) og giv mig en præcis liste over de klik jeg selv skal lave. Gæt ikke på tokens eller opret ikke konti i mit navn.

3. **Scaffold og commit grundlaget** — Next.js-projekt, Tailwind konfigureret med tokens fra `tailwind.config.ts` (ikke default-temaet), ESLint, Prettier, `typecheck`-script, `design_handoff_portfolio/` committet i repoet så alle issues kan referere til den, og assets fra `assets/` lagt i `/public`. `build`, `lint` og `typecheck` skal være grønne på første commit.

4. **Skriv en `CONTEXT.md` i repoets rod** — kort brief til de agenter der skal implementere: stack, hvor spec'en ligger, hvad de skal læse før de rører kode, kvalitetsgate, og de fem faldgruber fra README §8 gengivet direkte. Antag at de ikke har læst handoffen.

5. **Del arbejdet op i GitHub-issues** — sigt efter 10–16 issues, hver på et halvt til to dages arbejde. Én sektion eller ét sammenhængende komponentsæt pr. issue, ikke én issue pr. lille komponent. Brug labels (`setup`, `section`, `component`, `animation`, `i18n`, `theming`, `a11y`, `polish`) og skriv afhængigheder eksplicit ("blokeret af #3").

   Hver issue skal indeholde:
   - Hvad der skal bygges, i én sætning.
   - Præcis reference til hvor spec'en står (`README.md §5 Hero`, `components.md → CursorPeek`) — ikke en genfortælling af den.
   - Hvilke animationer fra README §6 der hører til (ved nummer: A6, A7, A8).
   - Afkrydsbare acceptkriterier, konkrete nok at en anden kan afgøre om de er opfyldt.
   - Filer der forventes oprettet eller ændret.

   Sørg for at animationerne, DA/EN-toggle, dark mode og a11y-kravene ligger som eksplicit arbejde et sted — de må ikke forsvinde ind i "byg hero-sektionen". Dæk alle acceptkriterier fra README §12.

6. **Rapportér tilbage** — link til repoet, deployment-URL (eller hvad der mangler for at få den), listen over issues med titel og label, den rækkefølge du anbefaler at tage dem i, og hvad du var i tvivl om.

Respektér faktatjekket i README §3 ordret i alt hvad du skriver. Særligt: Hermes Agent er Nous Researchs open source-agent som jeg har sat op og tunet — ikke noget jeg har bygget.

Spørg mig hvis noget i handoffen er tvetydigt eller selvmodsigende. Gæt ikke, og opfind ikke krav der ikke står der.
