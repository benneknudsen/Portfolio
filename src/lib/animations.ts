/**
 * Animation constants and helpers shared by the Reveal components.
 * Keep tunables (threshold, stagger, durations) here so the CSS and the
 * observer logic never drift out of sync.
 */

/** IntersectionObserver threshold for section reveals (A1). */
export const REVEAL_THRESHOLD = 0.12;

/** Per-word stagger delay in milliseconds (A2). */
export const WORD_STAGGER_MS = 50;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** True when the user prefers reduced motion. SSR-safe (false on the server). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION).matches
  );
}

/**
 * Split a heading string into its words. Collapses runs of whitespace and
 * drops empty tokens; callers re-insert spacing between the word masks.
 */
export function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/**
 * Create an IntersectionObserver that calls `onReveal(element)` the first time
 * an observed element crosses {@link REVEAL_THRESHOLD}, then unobserves it so
 * it never fires twice (the reveal is a one-shot entrance).
 */
export function createRevealObserver(
  onReveal: (el: Element) => void,
  options?: IntersectionObserverInit,
): IntersectionObserver {
  return new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onReveal(entry.target);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: REVEAL_THRESHOLD, ...options },
  );
}
