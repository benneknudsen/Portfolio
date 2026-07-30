# Komponent-spec

Alle værdier er endelige. `var(--x)` refererer til `tokens.css`.
Props er forslag — brug repoets konventioner, men bevar adfærd og værdier.

---

## Nav

| Egenskab | Værdi |
|---|---|
| Container | `position: sticky; top: 0; z-index: 20; background: var(--nav); backdrop-filter: blur(8px)` |
| Indhold | `.container` + `display: flex; align-items: center; justify-content: space-between; height: 68px; border-bottom: 1px solid var(--line)` |
| Navn | `15px / 600 / var(--ink)` — "Benjamin Knudsen" (oversættes ikke) |
| Links | `display: flex; gap: 28px; font-size: 14.5px; color: var(--body)`; hover `var(--ink)`; `display: inline-block; text-align: center` |
| Højre gruppe | `display: flex; align-items: center; gap: 14px` |
| Responsive | `@media (max-width: 820px) { links { display: none } }` |
| Hover-adfærd | Link-tekst scrambler (A4). Lås `min-width` til målt bredde inden animationen. |

Links: `#work`, `#method`, `#experience`, `#contact` (labels fra i18n: `navWork`, `navMethod`, `navXp`, `navContact`).

---

## LangToggle

| Egenskab | Værdi |
|---|---|
| Wrapper | `display: flex; align-items: center; border: 1px solid var(--line); border-radius: 99px; padding: 3px; gap: 2px; background: var(--card)`; `role="group"` |
| Knap | `font-family: var(--mono); font-size: 11.5px; font-weight: 600; color: var(--dim); padding: 6px 10px; border-radius: 99px; line-height: 1; border: none; background: transparent` |
| Aktiv | `background: var(--ink); color: var(--bg)` |
| Hover (inaktiv) | `color: var(--ink)` |
| Ingen transition | Farve-transitions bryder tema-skift |

Props: `lang: 'da' | 'en'`, `onChange(lang)`. Default `'da'`. Persist `localStorage['bk-lang']`.

---

## ThemeToggle

`34×34px`, `border: 1px solid var(--line); background: var(--card); border-radius: 99px; display: grid; place-items: center; font-size: 15px; color: var(--ink); padding: 0`.
Hover: `border-color: var(--dim)`. Ikon: `◑` (light) / `◐` (dark).
Sætter `<html data-theme>`; persist `localStorage['bk-theme']`. `aria-label="Skift tema" / "Toggle theme"`.

---

## Hero

| Del | Spec |
|---|---|
| Sektion | `padding-top: clamp(72px,12vh,140px); position: relative` |
| Blob (`::before`) | `position: absolute; top: 6%; right: -4%; width: clamp(280px,36vw,520px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, rgba(45,74,62,.09), transparent 65%); pointer-events: none`; animation A9 |
| Meta | `display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-family: var(--mono); font-size: 13.5px; color: var(--dim); padding-bottom: 24px; border-bottom: 1px solid var(--line); margin-bottom: clamp(28px,5vh,48px)`. Sidste barn: `white-space: nowrap` |
| Top | `display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap` |
| h1 | `clamp(46px,8vw,112px) / 700 / -.03em / 1.02`, `color: var(--ink)`, `text-wrap: balance`. To linjer via `<br>`. `<em>` → serif italic 400, `letter-spacing: 0`, `color: var(--accent)`, med animeret underline (A8: `::after`, `left: 2%; right: 5%; bottom: .02em; height: .07em; border-radius: 99px`) |
| Below | `display: flex; align-items: flex-end; justify-content: space-between; gap: 28px; flex-wrap: wrap; margin-top: clamp(28px,4.5vh,48px)`; reveal-delay `--d: .15s` |
| Paragraf | `max-width: 46ch; font-size: clamp(16px,1.7vw,19px); line-height: 1.6; text-wrap: pretty`; `<b>` → `var(--ink) / 600` |
| Knapper | `display: flex; gap: 10px; flex-shrink: 0` |

---

## Avatar

| Egenskab | Værdi |
|---|---|
| Wrapper | `width/height: clamp(110px,12vw,170px); flex-shrink: 0; position: relative; cursor: pointer` |
| Gulvskygge (`::after`) | `position: absolute; left: 10%; right: 10%; bottom: -8px; height: 14px; border-radius: 50%; background: radial-gradient(ellipse, rgba(20,19,16,.25), transparent 70%)`; animation A6 |
| Billede | `width/height: 100%; object-fit: contain; position: relative; z-index: 1; filter: drop-shadow(0 18px 30px rgba(20,19,16,.16))`; animation A6; `transition: transform .5s var(--ease-spring)` |
| Hover | `transform: scale(1.07) rotate(-3deg)` |

**Vigtigt:** memoji'en er transparent og må ikke placeres i en cirkel/boble med baggrundsfarve.

---

## GlyphStrip

`display: inline-block; width: 12ch; overflow: hidden; white-space: pre; font-family: var(--mono); font-size: inherit; font-weight: inherit; color: var(--dim); cursor: default; vertical-align: bottom`.
Aktiv/dekodet tilstand: `color: var(--accent)` (ingen vægt-ændring — det forskyder baseline).

Adfærd: idle-scramble hver **420ms** fra tegnsættet `/\-_=+|<>~:*#%`; på hover dekodes `OPEN TO WORK`
bogstav-for-bogstav hver **45ms**; når teksten er komplet vises den statisk, men **intervallet må ikke
ryddes** (ellers kan den låse i scramble ved mouse-leave). Mouse-leave → idle igen.
`aria-label="Open to work"`. `prefers-reduced-motion` → statisk tekst.

---

## Button

| Variant | Normal | Hover |
|---|---|---|
| `primary` | `background: var(--ink); color: var(--bg); border: 1px solid var(--ink)` | `background: var(--accent); border-color: var(--accent); color: #fff; transform: translateY(-2px)` |
| `ghost` | `background: transparent; color: var(--ink); border: 1px solid var(--ink)` | `background: var(--ink); color: var(--bg); transform: translateY(-2px)` |

Fælles: `font-size: 15px; font-weight: 600; padding: 14px 26px; border-radius: 99px; white-space: nowrap; display: inline-block; cursor: pointer; font-family: var(--sans); transition: transform .25s, box-shadow .25s`.
**Kun** transform/box-shadow i transition.

---

## SectionHeading

`Kicker` (mono `12.5px / 500 / .12em` uppercase, `color: var(--dim)`) — scrambler ved scroll-in (A3).
`h2`: `margin: 12px 0 0; clamp(34px,5vw,64px) / 700 / -.025em / 1.02; color: var(--ink); text-wrap: balance`, word-reveal (A2).
`<em>` → serif italic 400 i `var(--accent)`.
Optional `lead`: `margin: 20px 0 0; max-width: 56ch; font-size: clamp(16px,1.6vw,18.5px); text-wrap: pretty`.

---

## ProjectRow

| Del | Spec |
|---|---|
| Wrapper | `display: grid; grid-template-columns: auto 1fr auto; gap: clamp(20px,3.5vw,48px); align-items: baseline; padding: clamp(30px,5vh,52px) clamp(8px,1.5vw,20px); border-bottom: 1px solid var(--line); position: relative; overflow: hidden` |
| Hover-fill (`::before`) | `position: absolute; inset: 0; background: var(--accent-soft); transform: scaleX(0); transform-origin: left; transition: transform .55s var(--ease-out); z-index: 0`. Børn: `position: relative; z-index: 1` |
| Index | mono `13px`, `color: var(--dim)`; hover → `var(--accent)` + `translateX(4px)`, `.35s` |
| Titel `h3` | `clamp(36px,6vw,80px) / 700 / -.03em / 1`; `display: flex; align-items: center; gap: 16px`; `color: transparent; -webkit-text-stroke: 1.5px var(--ink)`; hover/focus-within → `color: var(--ink)` `.45s ease`. **< 760px: `color: var(--ink)`** |
| Pil | `font-size: .55em; color: var(--dim); -webkit-text-stroke: 0`; hover → `translate(8px,-6px)` + accent |
| Desc | `margin: 14px 0 0; max-width: 56ch; text-wrap: pretty`; hover → `translateX(6px)` `.45s var(--ease-out)` |
| Facts | mono `12.5px / line-height 2.1`, `color: var(--dim)`, `text-align: right`; `<b>` → `var(--ink) / 500`. < 760px → `text-align: left` |
| Cover-link | `position: absolute; inset: 0; z-index: 2`; `target="_blank" rel="noopener"` + `aria-label` |
| Marquee | `grid-column: 1/-1; height 0 → 18px; opacity 0 → 1; margin-top 0 → 18px` (`.5s var(--ease-out)`); mono `12px`, `.14em`, uppercase, `color: var(--accent)`; 2 duplikerede spans, `animation: marquee 16s linear infinite` |
| Responsive | < 760px → `grid-template-columns: 1fr` |

Props: `index`, `title`, `href`, `description`, `facts`, `marqueeItems`, `peekSrc`, `peekLabel`.

Aktuelt indhold: **kun Stride.** Arbejdsprojekter hører under Erfaring.

---

## CursorPeek

| Egenskab | Værdi |
|---|---|
| Wrapper | `position: fixed; z-index: 40; top: 0; left: 0; width: clamp(260px,26vw,400px); aspect-ratio: 16/10; border-radius: 14px; overflow: hidden; pointer-events: none; background: var(--card); box-shadow: 0 30px 70px -20px rgba(20,19,16,.45), 0 0 0 1px var(--line)` |
| Skjult | `opacity: 0; transform: scale(.82) rotate(-3deg)` |
| Synlig | `opacity: 1; transform: scale(1) rotate(0deg)`; `transition: opacity .35s var(--ease-out), transform .45s var(--ease-spring)` |
| Billede | `width/height: 100%; object-fit: cover; object-position: top` |
| Caption | `position: absolute; left: 10px; bottom: 10px; background: rgba(20,19,16,.85); color: var(--bg); font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; border-radius: 99px; padding: 6px 12px` |
| Følg-logik | rAF-lerp `.12`; mål `x = min(clientX + 28, innerWidth - w - 16)`, `y = clamp(16, clientY - h/2, innerHeight - h - 16)` |
| Touch | `@media (hover: none) { display: none }` |

---

## MethodStep

| Del | Spec |
|---|---|
| Kort | `display: grid; grid-template-columns: minmax(200px,260px) 1fr; gap: clamp(20px,4vw,64px); padding: clamp(26px,4vh,40px) clamp(20px,3vw,36px); border: 1px solid var(--line); border-radius: 18px; background: var(--card); transition: transform .4s var(--ease-out), box-shadow .4s, border-color .4s` |
| Hover | `translateY(-4px)`, `box-shadow: 0 24px 60px -28px rgba(20,19,16,.28)`, `border-color: #d3cfc4` |
| Label | mono `12.5px`, `.1em`, `color: var(--dim)` — fx `#1 Husk` |
| Titel | `display: block; font-family: var(--sans); clamp(22px,2.6vw,32px) / 700 / -.02em / 1.1; color: var(--ink); margin-top: 8px` |
| Paragraf | `max-width: 62ch; text-wrap: pretty`; `<b>` → `var(--ink) / 600` |
| Piller | `display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px`; hver: mono `11.5px`, `color: var(--dim)`, `border: 1px solid var(--line)`, `border-radius: 99px`, `padding: 5px 11px`, `display: inline-block; white-space: nowrap` |
| Responsive | < 760px → `grid-template-columns: 1fr; gap: 10px` |
| Container | `.steps { display: grid; gap: 14px; margin-top: clamp(40px,7vh,72px) }`; stagger `--d: 0 / .08s / .16s / .24s` |

Head over stepsne: `display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: end`
(< 800px → `1fr`), med Hermes-logo `clamp(56px,6vw,84px)`, `opacity: .9`.

---

## StatsStrip

`margin-top: 18px; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr)); border: 1px solid var(--line); border-radius: 18px; overflow: hidden; background: var(--card)`.
Celle: `padding: 20px 24px; border-right: 1px solid var(--line)` (sidste: `0`).
Tal: mono `clamp(20px,2.2vw,26px) / 500`, `color: var(--ink)`. Label: `13px`, `color: var(--dim)`, `margin-top: 2px`.
< 700px: `border-right: 0; border-bottom: 1px solid var(--line)` (sidste: `0`).

Indhold: `24/7` · `182+` · `938` · `0` (labels fra i18n `mstats`).

---

## ExperienceRow

`display: grid; grid-template-columns: 150px 1fr; gap: 20px; padding: 22px 8px; border-bottom: 1px solid var(--line); align-items: baseline`.
Hover: `background: var(--accent-soft)` (ingen transition).
`period`: mono `13px`, `color: var(--dim)`. `role`: `600`, `color: var(--ink)`. `company`: `color: var(--dim)`.
`note`: `display: block; font-size: 14.5px; color: var(--body); max-width: 60ch; margin-top: 2px`.
< 700px → `grid-template-columns: 1fr; gap: 4px`.
Container: `.xp { border-top: 1px solid var(--line); margin-top: clamp(32px,5vh,48px) }`.

5 rækker — se i18n-nøglen `xp`.

---

## Footer

`margin-top: clamp(96px,15vh,180px); border-top: 1px solid var(--line); padding: clamp(64px,10vh,120px) 0 48px`.
`h2`: `clamp(44px,8vw,104px)`.
E-mail-link: `display: inline-block; margin-top: 28px; font-size: clamp(20px,3vw,32px); font-weight: 600; color: var(--ink); border-bottom: 2px solid var(--ink); padding-bottom: 4px`; hover → accent (farve + border).
Meta: `display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-top: 72px; font-family: var(--mono); font-size: 13px; color: var(--dim)`.

---

## Reveal (wrapper)

`opacity: 0; transform: translateY(28px); transition: opacity .9s var(--ease-out), transform .9s var(--ease-out); transition-delay: var(--d, 0s)` → `.in { opacity: 1; transform: none }`.
IntersectionObserver `threshold: .12`, unobserve efter første udløsning.

Word-reveal (overskrifter): hvert ord i `span.w { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: .12em; margin-bottom: -.12em }`
med inner `span.wi { display: inline-block; transform: translateY(115%); transition: transform .9s var(--ease-out) }`,
`transition-delay: index * 50ms`. `.in .wi { transform: none }`.
**Skal re-splittes ved sprogskift** og derefter sættes til `transform: none`.

`prefers-reduced-motion`: `.rv, .wi { opacity: 1; transform: none; transition: none }` og alle
`animation: none` på avatar, blob, underline og marquee.
