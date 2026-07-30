# Handoff: Portfolio-redesign — Benjamin Schou Knudsen

**Til:** Claude Code (Opus) · **Fra:** design (HTML-prototype) · **Dato:** 2026-07-25

---

## 0. TL;DR for agenten

Byg en **single-page portfolio** ud fra prototypen i `reference/vision2.html`.
Prototypen er **design-reference, ikke produktionskode** — genskab den i target-repoets eget miljø
(Next.js App Router + TypeScript anbefales) med tokens fra `tokens.css` / `tailwind.config.ts`
og tekst fra `copy.i18n.json`.

Fidelity: **Hi-fi.** Farver, typografi, spacing og animationer er endelige. Gengiv pixel-nært.

Rækkefølge på siden: `nav → hero → 01 Projekter → 02 Arbejdsmetode → 03 Erfaring → 04 Kontakt (footer)`.

Krav der ikke må tabes:
1. **DA er default sprog**, EN som toggle. Valg persisteres (`localStorage: bk-lang`).
2. **Light er default tema**, dark via toggle. Persisteres (`localStorage: bk-theme`, `<html data-theme="dark">`).
3. **Lenis** smooth scroll (`lerp: .1`), disables ved `prefers-reduced-motion`.
4. Alle animationer i §6 skal med — de ER designet.

---

## 1. Design tokens

Autoritative filer: **`tokens.css`** (CSS custom properties, light + dark) og
**`tailwind.config.ts`** (samme værdier som Tailwind theme). Brug én af dem, ikke egne værdier.

### Farver

| Token | Light | Dark | Brug |
|---|---|---|---|
| `--bg` | `#f7f5f1` | `#131211` | Sidebaggrund |
| `--ink` | `#141310` | `#f0ede6` | Overskrifter, primær knap-fill, stærk tekst |
| `--body` | `#41403c` | `#bdb9b0` | Brødtekst |
| `--dim` | `#8a877f` | `#78746b` | Meta, labels, mono-detaljer |
| `--line` | `#e3e0d8` | `#282622` | Alle borders og dividers |
| `--card` | `#ffffff` | `#1b1a17` | Kort-flader (steps, stats, toggles) |
| `--accent` | `#2d4a3e` | `#8fbfa4` | Accent: serif-kursiv, links hover, marquee |
| `--accent-soft` | `#eef1ee` | `#1c211d` | Hover-fill på rækker |
| `--nav` | `rgba(247,245,241,.92)` | `rgba(19,18,17,.92)` | Sticky nav bg (+ `backdrop-filter: blur(8px)`) |

Faste (tema-uafhængige): step-hover border `#d3cfc4`, avatar-skygge `rgba(20,19,16,.25)`,
peek-caption bg `rgba(20,19,16,.85)`, hero-blob `rgba(45,74,62,.09)`.

### Typografi

Google Fonts: `Hanken Grotesk` (400,500,600,700,800) · `Instrument Serif` (400 + italic) · `JetBrains Mono` (400,500).

| Token | Stack | Brug |
|---|---|---|
| `--sans` | `'Hanken Grotesk', sans-serif` | Alt default |
| `--serif` | `'Instrument Serif', serif` | **Kun** kursiverede accent-ord i h1/h2 (`<em>`) |
| `--mono` | `'JetBrains Mono', monospace` | Kickers, meta, facts, piller, stats-tal, periode |

| Rolle | Størrelse | Vægt | Tracking | Line-height |
|---|---|---|---|---|
| `h1` | `clamp(46px,8vw,112px)` | 700 | `-.03em` | 1.02 |
| `h2` | `clamp(34px,5vw,64px)` | 700 | `-.025em` | 1.02 |
| `h2` i footer | `clamp(44px,8vw,104px)` | 700 | `-.025em` | 1.02 |
| Projekt-titel `h3` | `clamp(36px,6vw,80px)` | 700 | `-.03em` | 1 |
| Step-titel | `clamp(22px,2.6vw,32px)` | 700 | `-.02em` | 1.1 |
| Body | `16px` | 400 | — | 1.6 |
| Hero-paragraf | `clamp(16px,1.7vw,19px)` | 400 | — | 1.6 |
| Lead | `clamp(16px,1.6vw,18.5px)` | 400 | — | 1.6 |
| Kicker (mono) | `12.5px` | 500 | `.12em`, uppercase | — |
| Facts / meta (mono) | `12.5–13.5px` | 400 | — | 2.1 (facts) |
| Piller (mono) | `11.5px` | 400 | — | — |

`<em>` i overskrifter: `font-style: italic; font-weight: 400; letter-spacing: 0; color: var(--accent)`.

### Spacing, radius, layout

- Container: `max-width: 1200px; margin-inline: auto; padding-inline: clamp(20px,4vw,48px)`.
- Sektionsafstand: `margin-top: clamp(96px,15vh,180px)` (gælder `section` og `footer`).
- Hero top-padding: `clamp(72px,12vh,140px)`.
- Radius: `18px` (kort/steps/stats) · `14px` (peek) · `99px` (piller, knapper, toggles).
- Nav-højde: `68px`, sticky, `border-bottom: 1px solid var(--line)`.
- Shadows: step-hover `0 24px 60px -28px rgba(20,19,16,.28)` · peek `0 30px 70px -20px rgba(20,19,16,.45), 0 0 0 1px var(--line)` · avatar `drop-shadow(0 18px 30px rgba(20,19,16,.16))`.
- Breakpoints brugt: `820px` (nav-links skjules), `800px`, `760px`, `700px` (grid → 1 kolonne).

---

## 2. Komponent-liste

Se **`components.md`** for fuld tabel med props, states og præcise værdier pr. komponent.
Kort oversigt:

| Komponent | Fil-forslag | Kerne |
|---|---|---|
| `Nav` | `components/nav.tsx` | Sticky, navn + 4 links + `LangToggle` + `ThemeToggle`. Links scrambler på hover. |
| `LangToggle` | `components/lang-toggle.tsx` | DA/EN pill-gruppe, aktiv = `--ink` fill. |
| `ThemeToggle` | `components/theme-toggle.tsx` | 34×34 rund knap, ikon `◑`/`◐`. |
| `Hero` | `components/hero.tsx` | Meta-linje (rolle · by · ur · `GlyphStrip`), h1 + avatar, paragraf + 2 knapper. |
| `GlyphStrip` | `components/glyph-strip.tsx` | Scrambler idle (420ms), dekoder til `OPEN TO WORK` på hover (45ms/frame). |
| `Avatar` | `components/avatar.tsx` | Memoji, levitation-loop + gulvskygge, hover pop. |
| `Button` | `components/button.tsx` | `primary` (ink fill) / `ghost` (outline). Pill, hover `translateY(-2px)`. |
| `SectionHeading` | `components/section-heading.tsx` | Kicker (scrambler ved scroll-in) + h2 med word-reveal. |
| `ProjectRow` | `components/project-row.tsx` | Index-række: `/01` · titel (outline→fill) · facts · hover-marquee + cover-link. |
| `CursorPeek` | `components/cursor-peek.tsx` | Fixed preview-kort der følger musen på projekt-hover. |
| `MethodStep` | `components/method-step.tsx` | Kort: `#n Label` + titel | paragraf + piller. |
| `StatsStrip` | `components/stats-strip.tsx` | 4 celler, mono-tal + label, delt af `--line`. |
| `ExperienceRow` | `components/experience-row.tsx` | `periode | rolle · firma + note`, hover `--accent-soft`. |
| `Footer` | `components/footer.tsx` | Kicker, kæmpe h2, mailto-link, meta-række. |
| `Reveal` | `components/reveal.tsx` | IntersectionObserver wrapper (`threshold .12`), stagger via `--d`. |
| `useLenis` | `lib/lenis.ts` | Lenis init + anchor-scroll (`offset: -80, duration: 1.4`). |
| `useI18n` | `lib/i18n.ts` | DA default, `copy.i18n.json`, persist `bk-lang`. |

---

## 3. Indhold / copy

**Alt tekst ligger i `copy.i18n.json`** med `da` og `en` for hver nøgle — brug den som eneste kilde.
Nøglerne matcher prototypens `data-t`-attributter (`h1`, `heroP`, `kWork`, `strideDesc`, `s1p`, `xp`, …).

Faste data:
- E-mail: `benjaschou12@icloud.com` (mailto + copy-to-clipboard).
- LinkedIn: `https://www.linkedin.com/in/benjamin-schou-knudsen-b8b685178/`
- Stride live: `https://stride-ochre-five.vercel.app`
- Hermes Agent: `https://hermes-agent.nousresearch.com/`
- Ur i hero-meta: `Intl.DateTimeFormat('da-DK',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Copenhagen'})`, opdateres hvert 20. sekund.

Faktatjek der SKAL respekteres (er tidligere blevet forkert):
- Hermes Agent er **Nous Researchs open source-agent** — Benjamin har **sat den op og tunet den**, ikke bygget den.
- Stride forbinder **kun til Strava** (ikke Garmin).
- **Minetilbud opkøbte AVIOU** — derfor arbejder han nu hos Minetilbud (Dayli).
- Dayli Publisher og AVIOU-katalogplatformen er **arbejdsprojekter → hører under Erfaring**, ikke under Projekter.

---

## 4. Assets

| Fil | Placering i target-repo | Note |
|---|---|---|
| `assets/memoji.png` | `/public/memoji.png` | Transparent PNG. **Ingen** hvid cirkel/boble bagved. |
| `assets/stride-preview.png` | `/public/stride-preview.png` | Bruges i `CursorPeek`. Optimér til `next/image` eller WebP. |
| Hermes-logo | `/public/hermes.svg` | Hentes i dag fra `https://unpkg.com/@lobehub/icons-static-svg@latest/icons/hermesagent.svg` — **download og læg lokalt**, ikke CDN i produktion. |
| Favicon | `/public/favicon.svg` | Mangler. Foreslag: `B` i `--ink` på `--bg`. |

---

## 5. Sider / sektioner

### Nav (sticky, 68px)
`justify-content: space-between`: navn (15px/600) · links (`gap: 28px`, 14.5px, skjules < 820px) · højre gruppe (`gap: 14px`) med LangToggle + ThemeToggle.

### Hero
1. **Meta-linje** — mono 13.5px `--dim`, `space-between`, `border-bottom`, `padding-bottom: 24px`, `margin-bottom: clamp(28px,5vh,48px)`. Venstre: rolle. Højre (må ikke ombryde): by · ur · GlyphStrip.
2. **Top** — `flex; align-items: flex-end; justify-content: space-between; gap: 32px`: h1 (2 linjer, `<em>sans</em>` i serif-kursiv med animeret underline) + Avatar `clamp(110px,12vw,170px)`.
3. **Below** — `flex; align-items: flex-end; space-between; gap: 28px; margin-top: clamp(28px,4.5vh,48px)`: paragraf (`max-width: 46ch`) + knapper (`gap: 10px`, `flex-shrink: 0`).

### 01 Projekter
Kicker + h2, derefter `.plist` (`border-top: 1px solid var(--line)`, `margin-top: clamp(36px,6vh,56px)`).
Én `ProjectRow` (Stride). Grid `auto 1fr auto`, `gap: clamp(20px,3.5vw,48px)`, `align-items: baseline`,
`padding: clamp(30px,5vh,52px) clamp(8px,1.5vw,20px)`, `border-bottom`. < 760px → 1 kolonne.

### 02 Arbejdsmetode
Head: grid `1fr auto` — tekstblok (kicker, h2 2 linjer, lead med Hermes-link) + Hermes-logo `clamp(56px,6vw,84px)`, `opacity: .9`.
`.steps`: `display: grid; gap: 14px; margin-top: clamp(40px,7vh,72px)` — 4 × `MethodStep`, stagger `--d: 0/.08/.16/.24s`.
Derefter `StatsStrip` (`margin-top: 18px`): 24/7 · 182+ · 938 · 0.

### 03 Erfaring
Kicker + h2 + `.xp` (`border-top`, `margin-top: clamp(32px,5vh,48px)`), 5 × `ExperienceRow`, grid `150px 1fr`.

### 04 Kontakt (footer)
`border-top`, `padding: clamp(64px,10vh,120px) 0 48px`. Kicker + kæmpe h2 + mailto (`clamp(20px,3vw,32px)/600`, `border-bottom: 2px solid var(--ink)`, hover → accent) + meta-række (`margin-top: 72px`, mono 13px): copyright + LinkedIn.

---

## 6. Interaktioner & animationer (præcise værdier)

| # | Hvad | Trigger | Spec |
|---|---|---|---|
| A1 | Section reveal | IntersectionObserver `threshold .12`, unobserve efter | `opacity 0→1`, `translateY(28px)→0`, `.9s cubic-bezier(.2,.8,.2,1)`, delay `var(--d,0s)` |
| A2 | Word reveal i overskrifter | Samme reveal | Split i ord → hvert ord i `overflow:hidden` wrapper, inner `translateY(115%)→0`, `.9s cubic-bezier(.2,.8,.2,1)`, stagger `50ms` pr. ord |
| A3 | Kicker scramble | Scroll-in | Tegn erstattes af `/\-_=+|<>~:*` og dekoder over `800ms` (rAF) |
| A4 | Nav-link scramble | Hover | Samme decode; lås `min-width` til målt bredde først (undgår jiggle) |
| A5 | GlyphStrip | Idle / hover | Idle: random glyphs hver `420ms`. Hover: dekoder `OPEN TO WORK` bogstav-for-bogstav hver `45ms`, farve → `--accent`. Mouse-leave → tilbage til idle. Timer må **ikke** stoppes (låser ellers i scramble) |
| A6 | Avatar levitation | Altid | `translateY 0 → -14px → 0`, `9s ease-in-out infinite`; gulvskygge `scaleX 1→.8`, `opacity .9→.5` i takt |
| A7 | Avatar hover | Hover | `scale(1.07) rotate(-3deg)`, `.5s cubic-bezier(.34,1.56,.64,1)` |
| A8 | h1 underline | Altid | `scaleX 0→1` fra left, tilbage fra right, `7s cubic-bezier(.6,0,.2,1) infinite`, delay `1.4s` |
| A9 | Hero blob | Altid | Radial-gradient cirkel `clamp(280px,36vw,520px)`, `translate(-70px,60px) scale(1.18)` over `16s alternate` |
| A10 | ProjectRow hover | Hover / focus-within | `::before` `--accent-soft` `scaleX 0→1` fra left `.55s cubic-bezier(.2,.8,.2,1)`; titel `-webkit-text-stroke: 1.5px var(--ink)` + `color: transparent` → `color: var(--ink)` `.45s`; pil `translate(8px,-6px)`; index `translateX(4px)` + accent; desc `translateX(6px)`; marquee `height 0→18px`, `opacity 0→1`, `margin-top 0→18px` |
| A11 | Projekt-marquee | Hover | Mono 12px uppercase `.14em` i accent, 2 duplikerede spans, `translateX(-100%)` over `16s linear infinite` |
| A12 | CursorPeek | Projekt-hover + mousemove | Fixed kort `clamp(260px,26vw,400px)`, `aspect-ratio 16/10`, radius 14px. Ind: `opacity 0→1`, `scale(.82) rotate(-3deg)` → `scale(1) rotate(0)`, `.45s cubic-bezier(.34,1.56,.64,1)`. Følger cursor med lerp `.12` i rAF, offset `+28px` x / centreret y, clamped til viewport (min 16px margin). Skjult ved `hover:none` |
| A13 | Step hover | Hover | `translateY(-4px)`, shadow `0 24px 60px -28px rgba(20,19,16,.28)`, border `#d3cfc4`, `.4s cubic-bezier(.2,.8,.2,1)` |
| A14 | Knap hover | Hover | primary → accent-fill, ghost → ink-fill; begge `translateY(-2px)`, `.25s`. **Kun** `transform`/`box-shadow` i transition (color-transitions bryder tema-skift) |
| A15 | Smooth scroll | Altid | Lenis `{lerp:.1, wheelMultiplier:1, smoothWheel:true}` i rAF-loop; anchors → `lenis.scrollTo(id,{offset:-80,duration:1.4})`; `html{scroll-behavior:auto}` |
| A16 | Copy email | Klik | Clipboard write → label `Kopieret ✓` / `Copied ✓` i `1500ms`, derefter tilbage |

`@media (prefers-reduced-motion: reduce)`: alle reveals synlige uden transition; `avatar`, `hero::before`,
underline, marquee og Lenis slås fra; GlyphStrip viser statisk `OPEN TO WORK`.

---

## 7. State

| State | Default | Persistens | Effekt |
|---|---|---|---|
| `lang` | `'da'` | `localStorage['bk-lang']` | Sætter `<html lang>`, swapper al copy, re-splitter overskrifter til word-reveal |
| `theme` | `'light'` | `localStorage['bk-theme']` | `<html data-theme="dark">`, toggler ikon `◑`/`◐` |
| `copied` | `false` | — | Knap-label i 1.5s |
| `peek` | `{visible, src, label, x, y}` | — | CursorPeek |
| revealed pr. element | `false` | — | IO, unobserve efter første reveal |

⚠ Ved sprogskift: overskrifter med word-reveal skal re-splittes OG sættes til `transform:none`,
ellers står ordene skjult under baseline.

---

## 8. Kendte faldgruber (kostede iterationer i prototypen)

1. **Tema-skift + transitions**: `transition` på `background`/`color` på body, knapper og piller gjorde
   tekst usynlig mørk-på-mørk ved skift. Transition kun `transform` og `box-shadow`.
2. **Sektionsafstand**: `padding-top` på `section` blev overskrevet af container-reglen — brug
   `margin-top` på `section`/`footer`.
3. **Pills/knapper** skal have `white-space: nowrap`, ellers knækker teksten ud af pill-formen.
4. **GlyphStrip** skal have `vertical-align: bottom` for at flugte med resten af meta-linjen, og fast
   `width: 12ch` så layoutet ikke hopper.
5. **Outline-titler** kræver hover — sæt `color: var(--ink)` under 760px, ellers usynlige på touch.

---

## 9. Filer i denne bundle

```
design_handoff_portfolio/
├── README.md              ← denne spec
├── PROMPT_kickoff.md      ← prompt: opret repo + del op i issues (start her)
├── PROMPT.md              ← prompt: byg hele sitet i én køre
├── tokens.css             ← CSS custom properties (light + dark)
├── tailwind.config.ts     ← samme tokens som Tailwind theme
├── components.md          ← komponent-tabel med props/states/værdier
├── copy.i18n.json         ← al tekst, da + en
├── reference/
│   └── vision2.html       ← komplet design-reference (åbn i browser)
└── assets/
    ├── memoji.png
    └── stride-preview.png
```

## 11. Launch — åbne beslutninger

Denne handoff dækker **design**. Det nedenstående er ikke besluttet endnu, og det er med vilje ikke
specificeret. **Gæt ikke — spørg Benjamin.** Kom gerne med et konkret forslag til hvert punkt, men vent
på svar før du implementerer noget der binder projektet til et valg.

| Punkt | Status | Note |
|---|---|---|
| Domæne | **Besluttet: `benjaminschou.dk`** | Sitet skal ligge på `benjaminschou.dk`. Benjamin peger selv DNS mod Vercel — agenten kan ikke købe domæner eller redigere DNS. Sæt domænet op i Vercel-projektet og oplys de records der skal tilføjes. `www` skal redirecte til apex. |
| Open Graph / social share | **Mangler helt** | Titel, beskrivelse og et 1200×630 delebillede. Sitet bliver delt på LinkedIn — uden dette ser linket nøgent ud. Foreslå tekst + billed-idé, byg ikke. |
| Favicon | **Mangler** | Se §4. Forslaget er `B` i `--ink` på `--bg`. Skal bekræftes. |
| Analytics | **Ubesluttet** | Vercel Analytics (ét klik), Plausible (betalt) eller ingenting. Installér ikke noget uspurgt. |
| CV som download | **Ubesluttet** | Der findes en CV-PDF i samme designsystem. Skal den ligge på sitet som download-link, og hvor? Ikke designet endnu. |
| GitHub-profil-link | **Ubesluttet** | Kun LinkedIn er i `copy.i18n.json`. Er GitHub udeladt med vilje? |
| Kontaktformular | **Nej** | Bevidst valg: kun `mailto` + copy-to-clipboard. Ingen backend, ingen mail-service. |

Agenten klarer selv, uden at spørge: fonts via `next/font`, assets i `/public`, `sitemap.xml`,
`robots.txt`, Node-version pinnet, Lighthouse-tjek.

### Generel regel

Støder du på **noget som helst** andet der ikke står i denne handoff — en manglende beslutning, en
tvetydighed, to steder der modsiger hinanden, en teknisk begrænsning der gør en spec upraktisk — så
**stop og spørg**. Foreslå gerne en løsning i samme besked, så der er noget at sige ja eller nej til.
Opfind ikke krav, tekst, farver, sektioner eller sider der ikke står her. En stille antagelse koster
mere at rulle tilbage end et spørgsmål koster at svare på.

---

## 12. Acceptkriterier

- [ ] Alle 4 sektioner + nav + footer i korrekt rækkefølge og med tokens fra `tokens.css`.
- [ ] DA default; EN-toggle skifter **al** tekst; valg overlever reload.
- [ ] Light default; dark-toggle giver korrekt kontrast på **alle** flader og kontroller; overlever reload.
- [ ] Animationer A1–A16 implementeret; `prefers-reduced-motion` respekteret.
- [ ] Lenis aktiv; anchor-links glider med `-80px` offset.
- [ ] Ingen CDN-assets i produktion (Hermes-logo lokalt).
- [ ] Lighthouse a11y ≥ 95; alle interaktive elementer tastatur-tilgængelige (`:focus-visible`).
- [ ] Ingen layout-shift ved hover-scramble eller sprogskift.
