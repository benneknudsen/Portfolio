# Issue #4 — Build i18n system + theme toggle

## Goal
Implement a language toggle (DA/EN) and theme toggle (light/dark) for the portfolio site.

## Acceptance Criteria (from issue)
- [ ] `src/lib/i18n.ts` — context/hook with default `da`, persist in `localStorage['bk-lang']`
- [ ] `src/lib/theme.ts` — toggle `data-theme="dark"` on `<html>`, persist in `localStorage['bk-theme']`
- [ ] `src/components/lang-toggle.tsx` — DA/EN pill group, active = `--ink` fill, no color-transition
- [ ] `src/components/theme-toggle.tsx` — 34×34 round button, icon ◑/◐, aria-label from i18n
- [ ] No color/background transitions that break theme switch
- [ ] `prefers-reduced-motion` respected

## Files to create/modify
- `src/lib/i18n.ts`
- `src/lib/theme.ts`
- `src/components/lang-toggle.tsx`
- `src/components/theme-toggle.tsx`
- `src/app/providers.tsx` (wrap layout with providers)
- `src/app/layout.tsx` (import Providers, add lang attribute)

## Project Rules (from AGENTS.md — MUST follow)

### Critical Conventions
0. Mobilmenu + Lenis: `body { overflow: hidden }` doesn't stop Lenis — call `lenis.stop()`/`lenis.start()`. Store instance (e.g. `window.__lenis`) so menu code can reach it.
1. **Theme toggle uses `data-theme` attribute, NOT class.** `darkMode: ["class", '[data-theme="dark"]']`.
2. **NO color/background transitions** on body, buttons, pills, or controls — they break the theme switch (text goes dark-on-dark). Transition only `transform` and `box-shadow`.
3. Section spacing uses `margin-top`, not `padding-top`.
4. Pills and buttons need `white-space: nowrap` or text breaks out of the pill shape.
5. Outline titles (`color: transparent; -webkit-text-stroke`) must be `color: var(--ink)` under 760px.
6. GlyphStrip needs `vertical-align: bottom` + fixed `width: 12ch`.
7. Burger stack MUST be `flex-direction: column` — NOT `display: grid; place-items: center`.

### State
| State | Default | Persistence | Effect |
|---|---|---|---|
| `lang` | `'da'` | `localStorage['bk-lang']` | `<html lang>`, swaps copy |
| `theme` | `'light'` | `localStorage['bk-theme']` | `<html data-theme="dark">` |

### Design System
- Design tokens are CSS custom properties in `src/app/globals.css` (light default, dark via `<html data-theme="dark">`).
- Tailwind config in `tailwind.config.ts` mirrors the same values.
- **Never invent your own colors, spacing, or font sizes — use the tokens.**
- Tokens: `--bg`, `--ink`, `--body`, `--dim`, `--line`, `--card`, `--accent`, `--accent-soft`, `--nav`

### Language Behavior
- DA is default language, EN via toggle → `localStorage['bk-lang']`
- On language change: headings with word-reveal must **re-split AND set `transform: none`** (otherwise words stay hidden below baseline).

### prefers-reduced-motion
- All transitions → `none`. Panel switches instantly.

## Implementation Notes

1. **i18n.ts**: Create a React context + hook (`useLang`). Default `'da'`. Read from `localStorage['bk-lang']` on mount. Provide a `setLang` function that updates both context and localStorage. Also set `<html lang>` attribute. Create a `copy` object or import from a JSON file with DA/EN translations for UI strings (nav labels, aria-labels, etc.).

2. **theme.ts**: Create a React context + hook (`useTheme`). Default `'light'`. Read from `localStorage['bk-theme']` on mount. Toggle by setting/removing `data-theme="dark"` on `<html>`. Persist to localStorage. No color transitions on the toggle itself.

3. **lang-toggle.tsx**: DA/EN pill-style toggle. Active language gets `--ink` background fill. Use `white-space: nowrap`. No color transitions (only transform/box-shadow if any).

4. **theme-toggle.tsx**: 34×34 round button. Shows ◑ in light mode, ◐ in dark mode (or vice versa). `aria-label` from i18n copy. No color/background transitions.

5. **providers.tsx**: Client component that wraps children with `LangProvider` and `ThemeProvider`. Import in `layout.tsx`.

6. **layout.tsx**: Import and wrap with `<Providers>`. Set `lang` attribute on `<html>` dynamically.

## Stack
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
`feat(i18n): build i18n system + theme toggle (#4)`
