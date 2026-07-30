# Issue #13 — Add Kicker component with scramble animation

## Goal
Create a `<Kicker>` component (mono, uppercase, dim color) with a scramble-in animation on scroll.

## Acceptance Criteria (from issue)
- [ ] `src/components/kicker.tsx` — mono 12.5px/500, uppercase, color `var(--dim)`
- [ ] Scramble animation on scroll-in (A3): characters replaced by `/\-_=+|<>~:*`, decode over 800ms
- [ ] Used in all sections (Projekter, Arbejdsmetode, Erfaring, Kontakt)

## Files to create/modify
- `src/components/kicker.tsx` (create)

## Implementation Notes

### `src/components/kicker.tsx`
- `"use client"` component
- Style: `font-family: var(--mono)`, `font-size: 12.5px`, `font-weight: 500`, `text-transform: uppercase`, `color: var(--dim)`
- The component accepts a `text` prop (the final label, e.g. "Projekter")
- On scroll-in (use the existing `createRevealObserver` from `src/lib/animations.ts`), start the scramble animation:
  - Initial state: each character is randomly replaced with symbols from `/\-_=+|<>~:*`
  - Over 800ms, characters "decode" one by one (or in random order) to reveal the real text
  - Use `requestAnimationFrame` for smooth animation, not `setInterval`
- `prefers-reduced-motion`: show final text immediately, no animation
- The kicker should be used inside `<Reveal>` wrappers in section headings

### Reusing existing code
- `src/lib/animations.ts` already exports `createRevealObserver` and `prefersReducedMotion()` — use these
- `src/components/reveal.tsx` already handles IntersectionObserver-based reveals

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

### Design System
- Design tokens are CSS custom properties in `src/app/globals.css`.
- **Never invent your own colors, spacing, or font sizes — use the tokens.**
- Tokens: `--mono`, `--dim`, `--ink`, `--bg`, etc.

### prefers-reduced-motion
- All transitions → `none`. Show final state immediately.

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
`feat(components): add Kicker with scramble animation (#13)`
