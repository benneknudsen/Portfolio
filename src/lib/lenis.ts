"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// The active Lenis instance is stored on `window.__lenis` so unrelated code
// (e.g. the mobile menu) can call `lenis.stop()` / `lenis.start()`. Plain
// `body { overflow: hidden }` does NOT pause Lenis — see AGENTS.md convention #0.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Anchor scroll offset — clears the fixed nav (in px). */
const ANCHOR_OFFSET = -80;
/** Anchor scroll animation length (in seconds). */
const ANCHOR_DURATION = 1.4;

/**
 * Smoothly scroll to an anchor target (id selector, e.g. `"#work"`, an element,
 * or a numeric offset). Falls back to native `scrollIntoView` when Lenis is not
 * running (reduced motion, before mount, or SSR).
 */
export function scrollToAnchor(target: string | HTMLElement | number): void {
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    // `force: true` so a mobile-menu link can close the panel (which stops
    // Lenis) and drive the scroll in the same tick — without it, scrollTo
    // against a stopped instance is a no-op.
    lenis.scrollTo(target, {
      offset: ANCHOR_OFFSET,
      duration: ANCHOR_DURATION,
      force: true,
    });
    return;
  }
  // Native fallback so anchor navigation still works without Lenis.
  if (typeof document !== "undefined" && typeof target === "string") {
    document.querySelector(target)?.scrollIntoView();
  }
}

/**
 * Initialise Lenis smooth scrolling for the lifetime of the calling component.
 * No-op when `prefers-reduced-motion: reduce` is active — native scroll is used
 * instead. Call once, high in the tree (see `Providers`).
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    window.__lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);
}
