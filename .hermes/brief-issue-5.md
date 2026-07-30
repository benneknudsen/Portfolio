# Issue #5 — Build Nav component with scramble hover

## Goal
Create a sticky navigation bar with scramble hover animation on links, integrating existing i18n, theme, and Lenis systems.

## Acceptance Criteria (from issue)
- [ ] `src/components/nav.tsx` — sticky 68px, `backdrop-filter: blur(8px)`, border-bottom
- [ ] Name "Benjamin Knudsen" (15px/600/`var(--ink)`)
- [ ] 4 links: Projekter, Arbejdsmetode, Erfaring, Kontakt (from i18n)
- [ ] Links hide at ≤820px (MobileMenu takes over later in #18)
- [ ] Scramble animation on hover (A4): lock `min-width` to measured width before animation
- [ ] Lenis smooth-scroll to anchors (offset -80px, duration 1.4s)
- [ ] Right group: LangToggle + ThemeToggle + (MobileMenu burger added in #18)
- [ ] Keyboard accessible (`:focus-visible`)

## Files to create/modify
- `src/components/nav.tsx` (create)
- `src/lib/i18n.ts` (update nav copy — add `method` and `xp` keys)

## Context
- `src/lib/lenis.ts` exports `scrollToAnchor(target)` — use this for anchor links
- `src/lib/i18n.ts` has `useLang()` hook with `t.nav` — currently has `work`, `projects`, `about`, `contact`
- Issue wants: Projekter, Arbejdsmetode, Erfaring, Kontakt — need to add `method` and `xp` (or rename `about`→`xp`, add `method`)
- `src/components/lang-toggle.tsx` exports `<LangToggle />`
- `src/components/theme-toggle.tsx` exports `<ThemeToggle />`
- `src/lib/animations.ts` has `prefersReducedMotion()` — use for scramble
- AGENTS.md nav height: `--nav-h: 68px`

## Implementation Notes

### i18n update
Add `method` and `xp` keys to nav copy in both DA and EN:
- DA: `method: "Arbejdsmetode"`, `xp: "Erfaring"`
- EN: `method: "Method"`, `xp: "Experience"`

### `src/components/nav.tsx`
- `"use client"` component
- Sticky: `position: sticky; top: 0; z-index: 50; height: var(--nav-h)`
- Background: `backdrop-filter: blur(8px)`, use `var(--nav)` for background color
- Border-bottom: `border-bottom: 1px solid var(--line)`
- Left: "Benjamin Knudsen" — `font-size: 15px; font-weight: 600; color: var(--ink)`
- Center/Left: 4 anchor links using `scrollToAnchor` from `src/lib/lenis.ts`
- Links: hidden at ≤820px via `hidden md:flex` or media query
- Right group: `<LangToggle />` + `<ThemeToggle />` in a flex row
- Scramble on hover (A4): on `mouseenter`, measure the link's current width, set `min-width` to that, then scramble through random characters for ~300-400ms before resolving to final text. On `mouseleave`, reset to final text.
- `:focus-visible` outline for keyboard accessibility
- `prefers-reduced-motion`: no scramble, instant text swap

### Anchor IDs
The nav links should scroll to sections with IDs like `#projects`, `#method`, `#experience`, `#contact`. These section IDs will be set up when the actual page sections are built (future issues).

## Project Rules (from AGENTS.md — MUST follow)

### Critical Conventions
0. Mobilmenu + Lenis: `body { overflow: hidden }` doesn't stop Lenis — call `lenis.stop()`/`lenis.start()`. Store instance (e.g. `window.__lenis`) so menu code can reach it.
1. Theme toggle uses `data-theme` attribute, NOT class.
2. **NO color/background transitions** on body, buttons, pills, or controls — they break the theme switch. Transition only `transform` and `box-shadow`.
3. Section spacing uses `margin-top`, not `padding-top`.
4. Pills and buttons need `white-space: nowrap`.
7. Burger stack MUST be `flex-direction: column` — NOT `display: grid; place-items: center`.

### Design System
- Design tokens are CSS custom properties in `src/app/globals.css`.
- **Never invent your own colors, spacing, or font sizes — use the tokens.**
- Tokens: `--nav-h: 68px`, `--nav`, `--ink`, `--line`, `--dim`, `--mono`, `--sans`

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
`feat(nav): build Nav component with scramble hover (#5)`
