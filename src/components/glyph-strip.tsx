"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animations";

/** Character set the strip flickers through (A5). */
const CHARS = "/\\-_=+|<>~:*#%";

/** Idle scramble cadence and per-letter decode cadence (A5). */
const IDLE_MS = 420;
const HOVER_MS = 45;

function randomGlyph(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

type GlyphStripProps = {
  /** Accessible label, e.g. "Open to work". The flicker itself is aria-hidden. */
  label: string;
  /** The message that decodes on hover. Must be exactly 12 chars — the strip
   *  has a fixed `12ch` width (convention #6) to avoid layout shift. */
  msg: string;
};

/**
 * A5 — "open to work" glyph strip. Idle it scrambles random glyphs every
 * {@link IDLE_MS}; on hover it decodes the `msg` from `copy` letter by letter
 * every {@link HOVER_MS} and then holds the message. The interval is
 * deliberately never cleared while hovering (components.md) — clearing it can
 * leave the strip frozen mid-scramble on mouse-leave. Fixed `12ch` width and
 * `vertical-align: bottom` keep it from shifting layout (convention #6).
 *
 * Under `prefers-reduced-motion` the message is shown statically, decoded.
 */
export function GlyphStrip({ label, msg }: GlyphStripProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const outerRef = useRef<HTMLSpanElement>(null);

  /** Static placeholder clipped to `msg` length so SSR and first client render
   *  match — the idle scramble takes over on mount. */
  const PLACEHOLDER = "/\\-_=+|<>~:*#%".slice(0, msg.length);

  useEffect(() => {
    const text = textRef.current;
    const outer = outerRef.current;
    if (!text || !outer) return;

    // The `.open` accent state is toggled imperatively (no React state) so the
    // per-frame DOM writes never trigger a re-render.
    if (prefersReducedMotion()) {
      text.textContent = msg;
      outer.classList.add("open");
      return;
    }

    let hovering = false;
    let step = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const frame = () => {
      step += 1;
      if (hovering) {
        if (step > msg.length + 1) {
          text.textContent = msg; // decoded — hold it (interval keeps running)
          return;
        }
        text.textContent = Array.from(msg, (ch, i) =>
          step > i + 1 ? ch : randomGlyph(),
        ).join("");
      } else {
        text.textContent = Array.from(msg, () => randomGlyph()).join("");
      }
    };

    const run = (ms: number) => {
      if (timer) clearInterval(timer);
      timer = setInterval(frame, ms);
    };

    const enter = () => {
      hovering = true;
      step = 0;
      outer.classList.add("open");
      run(HOVER_MS);
    };
    const leave = () => {
      hovering = false;
      step = 0;
      outer.classList.remove("open");
      run(IDLE_MS);
    };

    outer.addEventListener("mouseenter", enter);
    outer.addEventListener("mouseleave", leave);
    run(IDLE_MS);

    return () => {
      if (timer) clearInterval(timer);
      outer.removeEventListener("mouseenter", enter);
      outer.removeEventListener("mouseleave", leave);
    };
  }, [msg]);

  return (
    <span ref={outerRef} className="glyphs" role="img" aria-label={label}>
      <span ref={textRef} aria-hidden="true">
        {PLACEHOLDER}
      </span>
    </span>
  );
}
