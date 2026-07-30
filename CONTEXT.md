# CONTEXT — Portfolio Implementation Guide

> **Læs dette FØR du rører kode.** Antag at du ikke har set handoffen.

---

## Stack

- **Next.js 16** (App Router) + **TypeScript strict** + **Tailwind CSS v3**
- **Lenis** (smooth scroll) — den eneste ekstra runtime-dependency
- **next/font** for Google Fonts: Hanken Grotesk, Instrument Serif, JetBrains Mono
- Statisk site. Ingen backend, database, auth eller CMS.
- Deployes til Vercel.

## Hvor spec'en ligger

Hele design-handoffen er committet i `/design_handoff_portfolio/`:

| Fil | Hvad den indeholder |
|---|---|
| `README.md` | **Autoritativ spec.** Tokens, sektioner, animationer A1–A16, state, faldgruber, acceptkriterier. |
| `reference/vision2.html` | Pixel-nær design-reference. **Genskab, ikke kopier.** |
| `components.md` | Props, states, præcise værdier pr. komponent. |
| `tokens.css` | CSS custom properties (light + dark). |
| `tailwind.config.ts` | Samme tokens som Tailwind-tema — allerede konfigureret. |
| `copy.i18n.json` | Al tekst, `da` + `en`. **Eneste kilde til copy.** |

## Kvalitetsgate (før hver commit)

```bash
npm run build    # skal være grøn
npm run lint     # skal være grøn
npx tsc --noEmit # skal være grøn
```

Ingen `any`, ingen `@ts-ignore`, ingen ubrugte imports.

## Tokens og konventioner

- Alle farver/spacing/radii via CSS custom properties (`var(--bg)`, `var(--ink)` osv.) eller Tailwind-klassen (`bg-bg`, `text-ink`, osv.)
- Opfind **aldrig** egne værdier. Brug altid tokens.
- Dark mode: `<html data-theme="dark">` — ikke class-baseret.
- `darkMode: ["class", '[data-theme="dark"]']` i tailwind.config.ts.

## De 5 kendte faldgruber — LAV IKKE DEM

1. **Tema-skift + transitions:** Transition kun `transform` og `box-shadow` på knapper, body, piller. Color/background transitions gør tekst usynlig mørk-på-mørk ved skift.
2. **Sektionsafstand:** Brug `margin-top` på `section`/`footer`, ikke `padding-top` (bliver overskrevet).
3. **Pills/knapper:** `white-space: nowrap` — ellers knækker teksten ud af pill-formen.
4. **GlyphStrip:** `vertical-align: bottom` for baseline-flugtning, fast `width: 12ch` så layoutet ikke hopper.
5. **Outline-titler:** Under 760px skal `color: var(--ink)` — ellers usynlige på touch.

## Faktatjek (RESPEKTÉR)

- **Hermes Agent** er **Nous Researchs open source-agent** — Benjamin har sat den op og tunet den, ikke bygget den.
- **Stride** forbinder kun til **Strava** (ikke Garmin).
- **Minetilbud opkøbte AVIOU** — derfor arbejder han hos Minetilbud (Dayli) nu.
- Dayli Publisher og AVIOU-katalogplatformen er **arbejdsprojekter** → hører under **Erfaring**, ikke Projekter.

## Sektionsrækkefølge

`nav → hero → 01 Projekter → 02 Arbejdsmetode → 03 Erfaring → 04 Kontakt (footer)`

## Acceptkriterier (fra README §12)

- [ ] Alle 4 sektioner + nav + footer i korrekt rækkefølge med tokens
- [ ] DA default; EN-toggle skifter al tekst; valg overlever reload
- [ ] Light default; dark-toggle korrekt kontrast på alle flader; overlever reload
- [ ] Animationer A1–A16 implementeret; prefers-reduced-motion respekteret
- [ ] Lenis aktiv; anchor-links med -80px offset
- [ ] Ingen CDN-assets i produktion (Hermes-logo lokalt)
- [ ] Lighthouse a11y ≥ 95; tastatur-tilgængeligt
- [ ] Ingen layout-shift ved hover-scramble eller sprogskift
