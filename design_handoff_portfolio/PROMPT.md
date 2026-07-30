# Prompt til agenten

Kopiér alt under linjen og send som første besked. Vedhæft/udpak `design_handoff_portfolio/` i repoets rod først.

---

Du skal bygge min personlige portfolio-site fra en færdig design-handoff. Alt du skal vide ligger i mappen `design_handoff_portfolio/` — læs den **først og helt**, før du skriver kode.

Vigtigt: Læs især "PROMPT_kickoff.md" da den fortæller dig alt!

**Start her, i denne rækkefølge:**
1. `design_handoff_portfolio/README.md` — den autoritative spec (tokens, sektioner, animationer A1–A16, state, faldgruber, acceptkriterier).
2. `design_handoff_portfolio/reference/vision2.html` — komplet design-reference. Åbn den i en browser og se den. Den er **reference, ikke produktionskode** — du skal ikke kopiere dens HTML/JS, men genskabe den pixel-nært i en ordentlig komponentstruktur.
3. `components.md` — komponent-for-komponent tabel med props, states og præcise værdier.
4. `tokens.css` + `tailwind.config.ts` — brug én af dem som eneste kilde til farver/typografi/spacing. Opfind ikke egne værdier.
5. `copy.i18n.json` — al tekst, `da` + `en`. Eneste kilde til copy. Skriv ikke ny tekst og oversæt ikke selv.

**Tech stack:**
- Next.js (App Router) + TypeScript + Tailwind CSS.
- Statisk site, ingen backend, ingen database, ingen auth, ingen CMS.
- Deployes til Vercel.
- Kun én runtime-dependency ud over stacken: `lenis` (smooth scroll).

**Sådan vil jeg have dig til at arbejde:**
- Scaffold repoet først (Next.js, TS strict, Tailwind med tokens indsat, ESLint, Prettier), commit.
- Lav issues via det nye Github repo du opretter med dette, så vi kan tage issues i bider hvis vi nu skulle ramme rate-limits.
- Byg gerne efter sektion for sektion i rækkefølgen `nav → hero → 01 Projekter → 02 Arbejdsmetode → 03 Erfaring → 04 Kontakt`. 
- Animationerne (README §6) er **ikke** nice-to-have — de er designet. Implementér dem med de præcise værdier og timings der står. Hvis en af dem er teknisk problematisk, så stop og spørg mig i stedet for at forenkle den stille.
- Læs README §8 "Kendte faldgruber" grundigt. De fem punkter kostede mig rigtig mange iterationer i prototypen — lav ikke de samme fejl igen.
- Respektér faktatjekket i README §3 ordret. Særligt: Hermes Agent er Nous Researchs open source-agent som jeg har sat op og tunet — ikke noget jeg har bygget. Skriv aldrig andet.

**Kvalitetsgate før hver commit:** `build`, `lint` og `typecheck` skal være grønne. Ingen `any`, ingen `@ts-ignore`, ingen ubrugte imports. Ingen CDN-assets i produktion — download Hermes-logoet lokalt til `/public` som beskrevet i README §4.

**Når du er færdig:** gennemgå acceptkriterierne i README §12 punkt for punkt og rapportér status på hver enkelt. Hvis noget ikke er opfyldt, sig det direkte i stedet for at markere det som klaret.

Spørg mig hvis noget i handoffen er tvetydigt eller selvmodsigende. Gæt ikke.
