# Issue #7 — Build Reveal wrapper + word-reveal animation

## Goal
Implement scroll-triggered reveal animations for sections and word-by-word heading animations.

## Acceptance Criteria (from issue)
- [ ] `src/components/reveal.tsx` — IntersectionObserver wrapper (threshold .12, unobserve after)
- [ ] CSS: `.rv` class with opacity/transform transition
- [ ] Word-split logic for h1/h2 with `data-split` attribute
- [ ] Re-split on language change + set `transform: none`
- [ ] Stagger via CSS variable `--d`
- [ ] `prefers-reduced-motion`: all reveals visible without transition

## Animations
- **A1: Section reveal** — opacity 0→1, translateY 28px→0, .9s
- **A2: Word reveal in headings** — each word in overflow:hidden wrapper, translateY 115%→0, stagger 50ms

## Files to create/modify
- `src/components/reveal.tsx` (create)
- `src/lib/animations.ts` (create)
- `src/app/globals.css` (append reveal CSS)

## Context
- Project uses React contexts from `src/lib/i18n.ts` (`useLang`) — on language change, headings with word-reveal must re-split AND set `transform: none` (AGENTS.md convention)
- This is a Next.js 16 App Router site — all animation code must be `"use client"`
- `prefers-reduced-motion`: all transitions → `none`, elements visible immediately

## Implementation Notes

### `src/components/reveal.tsx`
- `<Reveal>` wrapper component using IntersectionObserver
- threshold: 0.12, unobserve after first intersection
- Adds a CSS class (e.g. `.rv`) when visible
- For word-reveal: a `<WordReveal>` component that splits text into individual `<span>` words, each wrapped in an overflow:hidden container
- Each word span gets a CSS variable `--d` for stagger delay (index × 50ms)
- On language change (`useLang().lang`), re-split headings and reset `transform: none`

### `src/lib/animations.ts`
- Export utility functions: `splitWords(text)`, `createRevealObserver(callback, options)`
- Keep animation constants (threshold, stagger ms, durations) here

### `src/app/globals.css`
- `.rv` class: initial state `opacity: 0; transform: translateY(28px)`, transition `.9s`
- `.rv.visible` (or `.rv.is-visible`): `opacity: 1; transform: translateY(0)`
- Word reveal: `.word` span with `display: inline-block; transform: translateY(115%); transition-delay: var(--d, 0s)`
- `.rv.visible .word`: `transform: translateY(0)`
- `@media (prefers-reduced-motion: reduce)`: `.rv, .rv.visible, .word` — `opacity: 1; transform: none; transition: none`

## Project Rules (from AGENTS.md — MUST follow)

### Critical Conventions
0. Mobilmenu + Lenis: `body { overflow: hidden }` doesn't stop Lenis — call `lenis.stop()`/`lenis.start()`. Store instance (e.g. `window.__lenis`) so menu code can reach it.
1. Theme toggle uses `data-theme` attribute, NOT class.
2. **NO color/background transitions** on body, buttons, pills, or controls — they break the theme switch. Transition only `transform` and `box-shadow`.
3. Section spacing uses `margin-top`, not `padding-top`.
4. Pills and buttons need `white-space: nowrap`.
5. Outline titles (`color: transparent; -webkit-text-stroke`) must be `color: var(--ink)` under 760px.
6. GlyphStrip needs `vertical-align: bottom` + fixed `width: 12ch`.
7. Burger stack MUST be `flex-direction: column` — NOT `display: grid; place-items: center`.

### Language Behavior
- On language change: headings with word-reveal must **re-split AND set `transform: none`** (otherwise words stay hidden below baseline).

### prefers-reduced-motion
- All transitions → `none`. Elements visible immediately.

### Design System
- Design tokens are CSS custom properties in `src/app/globals.css`.
- **Never invent your own colors, spacing, or font sizes — use the tokens.**

### Stack
- Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v3
- No backend, no CMS — pure static site

## QA Gate
```bash
npm run build
npm run lint
npm run typecheck
```
All three must pass (green) before commit.

## Commit Convention
`feat(animations): build Reveal wrapper + word-reveal (#7)`
