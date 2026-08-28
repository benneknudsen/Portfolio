"use client";

import { useEffect, useRef, useState } from "react";

/** How strongly the card eases toward the cursor each frame (A12). */
const LERP = 0.18;
/** Gap between the cursor and the card, and the viewport-clamp inset. */
const GAP = 24;

type PeekState = { src: string; label: string };

/**
 * A12 — cursor peek. A fixed preview card that eases toward the cursor while a
 * `[data-peek]` element (a ProjectRow) is hovered. A rAF loop lerps the card's
 * position (LERP) and clamps it inside the viewport; the loop only runs during
 * a hover session (started in onEnter, cancelled in onLeave) so the site is
 * fully idle between hovers. The inner card handles the scale/rotate pop and
 * only transform/opacity animate (convention #2).
 *
 * Mounted once. Disabled entirely on touch / no-hover devices — both here (the
 * effect bails) and in CSS (`@media (hover: none)`).
 */
export function CursorPeek() {
  const [peek, setPeek] = useState<PeekState | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Target (cursor) and current (eased) positions live in refs so the rAF loop
  // never re-renders. `active` tracks whether a row is currently hovered,
  // `raf` holds the pending frame handle, and `size` caches the card's
  // dimensions for the viewport clamp (one layout read per hover, see onEnter).
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const active = useRef(false);
  const raf = useRef(0);
  const size = useRef({ w: 0, h: 0 });

  useEffect(() => {
    // Touch / no-hover devices never see the peek.
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const src = el.dataset.peek;
      if (!src) return;
      target.current = { x: e.clientX, y: e.clientY };
      // New hover session: snap so the card doesn't slide in from a stale
      // spot, then measure the card ONCE. Its size is CSS-fixed (`width:
      // clamp(...)` on .peek + `aspect-ratio` on .peek-inner; .peek-img is
      // 100%/100% and .peek-cap is absolutely positioned), so offsetWidth/
      // offsetHeight here replaces a per-frame getBoundingClientRect. The
      // measurement is layout-based and unaffected by the fade transitions.
      if (!active.current) {
        pos.current = { x: e.clientX, y: e.clientY };
        active.current = true;
        const card = cardRef.current;
        if (card) size.current = { w: card.offsetWidth, h: card.offsetHeight };
        raf.current = requestAnimationFrame(tick);
      }
      setPeek({ src, label: el.dataset.peekLabel ?? "" });
    };

    const onLeave = () => {
      // Cancel immediately: the hide-fade is pure CSS on .peek-inner
      // (opacity .3s / transform .4s — compositor-driven, no JS dependency),
      // so the card finishes fading on its own while the frozen outer
      // transform goes invisible. No idle frames needed after the hover ends.
      active.current = false;
      cancelAnimationFrame(raf.current);
      setPeek(null);
    };

    const rows = Array.from(
      document.querySelectorAll<HTMLElement>("[data-peek]"),
    );
    for (const row of rows) {
      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP;
      pos.current.y += (target.current.y - pos.current.y) * LERP;

      const card = cardRef.current;
      if (card) {
        // Offset from the cursor, then clamp so the card stays on screen.
        // Size comes from the cache filled in onEnter — identical clamping
        // behavior, but zero layout reads per frame.
        const x = Math.min(
          Math.max(GAP, pos.current.x + GAP),
          window.innerWidth - size.current.w - GAP,
        );
        const y = Math.min(
          Math.max(GAP, pos.current.y + GAP),
          window.innerHeight - size.current.h - GAP,
        );
        card.style.transform = `translate(${x}px, ${y}px)`;
      }
      // Self-schedule only while a row is hovered — the loop lives and dies
      // with the hover session (onLeave also cancels any pending frame).
      if (active.current) raf.current = requestAnimationFrame(tick);
    };

    return () => {
      active.current = false;
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      for (const row of rows) {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={["peek", peek && "visible"].filter(Boolean).join(" ")}
      aria-hidden
    >
      <div className="peek-inner">
        {peek && (
          <>
            {/* Dynamic, cursor-following preview — next/image adds no value here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={peek.src} alt="" className="peek-img" />
            <span className="peek-cap">{peek.label}</span>
          </>
        )}
      </div>
    </div>
  );
}
