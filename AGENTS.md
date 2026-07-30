# Portfolio — Benjamin Schou Knudsen

Personal portfolio site deployed at [benjaminschou.dk](https://benjaminschou.dk).

## Stack

- Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v3
- Lenis for smooth scrolling
- Google Fonts via `next/font` (Hanken Grotesk, Instrument Serif, JetBrains Mono)
- Static site — no backend, database, auth, or CMS
- Deployed to Vercel (main → production)

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build (must pass)
npm run lint       # ESLint (must pass)
npm run typecheck  # TypeScript (must pass)
```

**Quality gate:** `build`, `lint`, and `typecheck` must all be green before every commit.

## Design System

Design tokens are CSS custom properties in `src/app/globals.css` (light default, dark via `<html data-theme="dark">`). Tailwind config in `tailwind.config.ts` mirrors the same values.

**Never invent your own colors, spacing, or font sizes — use the tokens.**

## Critical Conventions

1. **Theme toggle uses `data-theme` attribute, NOT class.** `darkMode: ["class", '[data-theme="dark"]']`.
2. **NO color/background transitions** on body, buttons, pills, or controls — they break the theme switch (text goes dark-on-dark). Transition only `transform` and `box-shadow`.
3. **Section spacing uses `margin-top`**, not `padding-top` (padding gets overridden by container).
4. **Pills and buttons need `white-space: nowrap`** or text breaks out of the pill shape.
5. **Outline titles (`color: transparent; -webkit-text-stroke`) must be `color: var(--ink)` under 760px** — invisible on touch otherwise.
6. **GlyphStrip needs `vertical-align: bottom` + fixed `width: 12ch`** to prevent layout shift.

## Fact-Check (MUST Respect)

- **Hermes Agent** is Nous Research's open-source agent. Benjamin set it up and tuned it — he did NOT build it.
- **Stride** connects only to **Strava** (not Garmin).
- **Minetilbud acquired AVIOU** — that's why he works at Minetilbud (Dayli) now.
- Dayli Publisher and AVIOU catalog platform are **work projects → go under Experience**, not Projects.

## Project Structure

```
src/
├── app/              # App Router (layout, page, globals.css)
├── components/       # React components (nav, hero, footer, etc.)
├── lib/              # Utilities (i18n, lenis, animations)
└── hooks/            # Custom React hooks
public/
├── memoji.png        # Avatar
├── stride-preview.png # Project preview for CursorPeek
└── hermes.svg        # Hermes logo (LOCAL — never CDN)
```

## Language & Theme State

- DA is default language, EN via toggle → `localStorage['bk-lang']`
- Light is default theme, dark via toggle → `localStorage['bk-theme']`
- On language change: headings with word-reveal must **re-split AND set `transform: none`** (otherwise words stay hidden below baseline).
