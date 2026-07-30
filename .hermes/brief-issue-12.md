# Issue #12 — Implement Lenis smooth scroll

## Goal
Set up Lenis smooth scrolling for the portfolio site.

## Acceptance Criteria (from issue)
- [ ] `src/lib/lenis.ts` — initialise Lenis with `{lerp: .1, wheelMultiplier: 1, smoothWheel: true}`
- [ ] rAF-loop: `lenis.raf(t); requestAnimationFrame(raf)`
- [ ] Anchor links: `lenis.scrollTo(id, {offset: -80, duration: 1.4})`
- [ ] `html { scroll-behavior: auto }` (already in globals.css — verify)
- [ ] `prefers-reduced-motion`: Lenis disabled

## Files to create/modify
- `src/lib/lenis.ts` (create)
- `src/app/layout.tsx` (import/use lenis setup)
- Possibly a hook or component to integrate Lenis into the app

## Context
- Lenis is already installed (`"lenis": "^1.3.25"` in package.json)
- `html { scroll-behavior: auto; }` is already set in `src/app/globals.css` — verify this, do NOT duplicate
- This is a Next.js 16 App Router site — Lenis must be client-side only (`"use client"`)
- The project stores the Lenis instance on `window.__lenis` so other code (like mobile menu) can call `lenis.stop()` / `lenis.start()`
- See AGENTS.md convention #0: "Mobilmenu + Lenis: `body { overflow: hidden }` doesn't stop Lenis — call `lenis.stop()`/`lenis.start()`. Store instance (e.g. `window.__lenis`) so menu code can reach it."

## Implementation Notes

1. **`src/lib/lenis.ts`**: Create a module that:
   - Imports Lenis
   - Creates a Lenis instance with `{lerp: .1, wheelMultiplier: 1, smoothWheel: true}`
   - Sets up the rAF loop: `function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }`
   - Provides `scrollToAnchor(id)` that calls `lenis.scrollTo(id, {offset: -80, duration: 1.4})`
   - Stores the instance on `window.__lenis` for other modules to access
   - Disables Lenis when `prefers-reduced-motion: reduce` is active
   - Exports a hook or function to initialize Lenis in a client component

2. **Integration into layout or providers**: Since Lenis needs to run client-side, integrate it via a client component (possibly in `providers.tsx` or a new `SmoothScroll` component). Must be `"use client"`.

3. **`prefers-reduced-motion`**: Check `window.matchMedia('(prefers-reduced-motion: reduce)')`. If true, do NOT initialize Lenis (fall back to native scroll).

## Project Rules (from AGENTS.md — MUST follow)

### Critical Conventions
0. Mobilmenu + Lenis: `body { overflow: hidden }` doesn't stop Lenis — call `lenis.stop()`/`lenis.start()`. Store instance (e.g. `window.__lenis`) so menu code can reach it.
1. Theme toggle uses `data-theme` attribute, NOT class.
2. **NO color/background transitions** on body, buttons, pills, or controls.
3. Section spacing uses `margin-top`, not `padding-top`.
4. Pills and buttons need `white-space: nowrap`.
7. Burger stack MUST be `flex-direction: column` — NOT `display: grid; place-items: center`.

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
`feat(scroll): implement Lenis smooth scroll (#12)`
