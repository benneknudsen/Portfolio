"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { useLang } from "@/lib/i18n";
import { scrollToAnchor } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/animations";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

/** Glyphs a character flickers through before it decodes (A4). */
const SCRAMBLE_CHARS = "/\\-_=+|<>~:*";

/** Total decode window on hover in milliseconds (A4) — snappier than the
 *  scroll-in Kicker (A3) so a link resolves within a hover. */
const SCRAMBLE_DURATION_MS = 360;

function randomGlyph(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

/**
 * Nav anchor links, in order. `label` resolves through i18n at render.
 * Shared with {@link MobileMenu} so the burger panel stays in sync.
 */
export const NAV_LINKS = [
  { key: "projects", href: "#projects" },
  { key: "method", href: "#method" },
  { key: "xp", href: "#experience" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

/**
 * A single nav link with the A4 scramble-on-hover effect.
 *
 * On `mouseenter` the link's rendered width is measured and locked as
 * `min-width` (so the varying glyphs never reflow the row), then each
 * character decodes to `label` at its own random moment inside
 * {@link SCRAMBLE_DURATION_MS}. The glyphs are written straight to the DOM
 * node — no per-frame re-render. The real label is always exposed to
 * assistive tech via `aria-label`; the flickering text is `aria-hidden`.
 *
 * Under `prefers-reduced-motion` the label is static — no scramble.
 */
function NavLink({ label, href }: { label: string; href: string }) {
  const glyphRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);

  function stop() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }

  // Cancel any in-flight scramble frame if the link unmounts mid-decode.
  useEffect(() => stop, []);

  function scramble() {
    const glyph = glyphRef.current;
    if (!glyph || prefersReducedMotion()) return;

    // Lock the settled width so glyph flicker never reflows the row.
    glyph.style.minWidth = `${glyph.getBoundingClientRect().width}px`;

    // Each character decodes at its own random point in the window, so the
    // label resolves in a scattered order rather than left-to-right.
    const revealAt = Array.from(label, () => Math.random() * SCRAMBLE_DURATION_MS);
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      let settled = true;
      const out = Array.from(label, (ch, i) => {
        if (ch === " ") return " ";
        if (elapsed >= revealAt[i]) return ch;
        settled = false;
        return randomGlyph();
      }).join("");

      if (settled || elapsed >= SCRAMBLE_DURATION_MS) {
        glyph.textContent = label;
        rafRef.current = 0;
        return;
      }
      glyph.textContent = out;
      rafRef.current = requestAnimationFrame(tick);
    };

    stop();
    rafRef.current = requestAnimationFrame(tick);
  }

  function restore() {
    stop();
    if (glyphRef.current) {
      glyphRef.current.textContent = label;
      // Release the width lock so a language swap can re-measure freely
      // (scramble re-locks it on the next hover).
      glyphRef.current.style.minWidth = "";
    }
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    scrollToAnchor(href);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={scramble}
      onMouseLeave={restore}
      aria-label={label}
      className={[
        "rounded-sm text-meta font-medium text-dim outline-none",
        "transition-transform duration-200 ease-out hover:-translate-y-px hover:text-ink",
        "motion-reduce:transition-none",
        "focus-visible:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
      ].join(" ")}
    >
      {/* inline-block so the min-width lock applies during the scramble */}
      <span ref={glyphRef} aria-hidden="true" className="inline-block text-center">
        {label}
      </span>
    </a>
  );
}

/**
 * Sticky top navigation (A4). 68px tall with an 8px backdrop blur over the
 * translucent `--nav` surface and a hairline bottom border. Holds the name,
 * four anchor links (scramble on hover, Lenis smooth-scroll on click) and the
 * language + theme toggles. Links collapse above the burger breakpoint
 * (≤820px) where the MobileMenu (#18) takes over.
 */
export function Nav() {
  const { t } = useLang();

  function handleHome(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    scrollToAnchor(0);
  }

  return (
    <header className="sticky top-0 z-50 h-nav border-b border-line bg-nav backdrop-blur-[8px]">
      <div className="mx-auto flex h-full max-w-container items-center justify-between px-container-pad">
        <a
          href="#"
          onClick={handleHome}
          className="whitespace-nowrap rounded-sm text-[15px] font-semibold text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Benjamin Knudsen
        </a>

        <nav aria-label="Primær" className="hidden items-center gap-7 md3:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.key} href={link.href} label={t.nav[link.key]} />
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LangToggle />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
