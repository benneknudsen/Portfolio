"use client";

import { useEffect, useRef } from "react";
import { createRevealObserver, prefersReducedMotion } from "@/lib/animations";

/** Glyphs a character can flicker through before it decodes (A3). */
const SCRAMBLE_CHARS = "/\\-_=+|<>~:*";

/** Total decode window in milliseconds (A3). */
const SCRAMBLE_DURATION_MS = 800;

/** Fraction of the window within which each character schedules its reveal;
 *  the tail is left as settle time so the last glyphs still flicker briefly. */
const REVEAL_SPREAD = 0.8;

function randomGlyph(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

type KickerProps = {
  /** Final label, e.g. "Projekter". */
  text: string;
  className?: string;
};

/**
 * A3 — kicker. A small mono, uppercase, dim eyebrow label that scrambles in on
 * scroll: it starts as a run of `SCRAMBLE_CHARS`, then decodes to `text` over
 * {@link SCRAMBLE_DURATION_MS}, each character resolving at its own random
 * moment. The animation is driven by `requestAnimationFrame` and writes the
 * glyphs straight to the DOM node (no per-frame re-render).
 *
 * The real `text` is exposed to assistive tech via `aria-label`; the flickering
 * glyphs are `aria-hidden`. Under `prefers-reduced-motion` the label just keeps
 * its server-rendered final text — no animation.
 *
 * Meant to sit inside a `<Reveal>` in section headings; it carries its own
 * reveal observer so the scramble is independent of the wrapper's fade.
 */
export function Kicker({ text, className }: KickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const glyph = glyphRef.current;
    if (!el || !glyph) return;

    // Reduced motion (or no observer support): keep the final text as rendered.
    if (prefersReducedMotion()) return;

    // Spaces are preserved throughout so multi-word kickers keep their shape.
    const scrambled = () =>
      Array.from(text, (ch) => (ch === " " ? " " : randomGlyph())).join("");

    // Pre-reveal placeholder — fully scrambled until the label scrolls in.
    glyph.textContent = scrambled();

    // Each character decodes at its own random point in the window, so the
    // text resolves in a scattered order rather than left-to-right.
    const revealAt = Array.from(
      text,
      () => Math.random() * SCRAMBLE_DURATION_MS * REVEAL_SPREAD,
    );

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      let settled = true;
      const out = Array.from(text, (ch, i) => {
        if (ch === " ") return " ";
        if (elapsed >= revealAt[i]) return ch;
        settled = false;
        return randomGlyph();
      }).join("");

      if (settled || elapsed >= SCRAMBLE_DURATION_MS) {
        glyph.textContent = text;
        return;
      }
      glyph.textContent = out;
      raf = requestAnimationFrame(tick);
    };

    const observer = createRevealObserver(() => {
      raf = requestAnimationFrame(tick);
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      // Restore the final text in case we're torn down mid-scramble (e.g. a
      // language switch re-runs the effect with fresh `text`).
      glyph.textContent = text;
    };
  }, [text]);

  return (
    <span
      ref={ref}
      className={["kicker", className].filter(Boolean).join(" ")}
      aria-label={text}
    >
      <span ref={glyphRef} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
