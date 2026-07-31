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
 * position (LERP) and clamps it inside the viewport; the inner card handles the
 * scale/rotate pop and only transform/opacity animate (convention #2).
 *
 * Mounted once. Disabled entirely on touch / no-hover devices — both here (the
 * effect bails) and in CSS (`@media (hover: none)`).
 */
export function CursorPeek() {
  const [peek, setPeek] = useState<PeekState | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Target (cursor) and current (eased) positions live in refs so the rAF loop
  // never re-renders. `active` tracks whether a row is currently hovered.
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const active = useRef(false);
  const raf = useRef(0);

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
      // Snap on the first enter so the card doesn't slide in from a stale spot.
      if (!active.current) pos.current = { x: e.clientX, y: e.clientY };
      active.current = true;
      setPeek({ src, label: el.dataset.peekLabel ?? "" });
    };

    const onLeave = () => {
      active.current = false;
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
        const { width, height } = card.getBoundingClientRect();
        // Offset from the cursor, then clamp so the card stays on screen.
        const x = Math.min(
          Math.max(GAP, pos.current.x + GAP),
          window.innerWidth - width - GAP,
        );
        const y = Math.min(
          Math.max(GAP, pos.current.y + GAP),
          window.innerHeight - height - GAP,
        );
        card.style.transform = `translate(${x}px, ${y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
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
