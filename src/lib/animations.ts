/**
 * Animation constants and helpers shared by the Reveal components.
 * Keep tunables (threshold, stagger, durations) here so the CSS and the
 * observer logic never drift out of sync.
 */

/** IntersectionObserver threshold for section reveals (A1). */
const REVEAL_THRESHOLD = 0.12;

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

/** Pending reveal callbacks, keyed by the element they belong to. */
const revealCallbacks = new Map<Element, () => void>();

let revealObserver: IntersectionObserver | null = null;

/** Lazily create the shared observer so SSR never touches `window`. */
function getRevealObserver(): IntersectionObserver {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const onReveal = revealCallbacks.get(entry.target);
          if (!onReveal) continue;
          onReveal();
          revealCallbacks.delete(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );
  }
  return revealObserver;
}

/** Observe `el` once; `onReveal` fires the first time it enters the viewport.
 *  Returns an unsubscribe that also removes it from the shared observer. */
export function observeReveal(el: Element, onReveal: () => void): () => void {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return () => {};
  }
  const observer = getRevealObserver();
  revealCallbacks.set(el, onReveal);
  observer.observe(el);
  return () => {
    revealCallbacks.delete(el);
    revealObserver?.unobserve(el);
  };
}
