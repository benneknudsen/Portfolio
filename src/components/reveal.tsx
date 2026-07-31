"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useLang } from "@/lib/i18n";
import {
  WORD_STAGGER_MS,
  createRevealObserver,
  splitWords,
} from "@/lib/animations";

/**
 * Shared reveal-on-scroll hook: observes `ref` and flips to `true` the first
 * time it enters the viewport. Reduced motion is handled purely in CSS
 * (`.rv` is already visible), so the observer can run unconditionally.
 */
function useRevealOnScroll(ref: React.RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = createRevealObserver(() => setVisible(true));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

type RevealProps = {
  /** Element/tag to render as. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  /** Inline style — used to pass a `--d` stagger delay (A1). */
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * A1 — section reveal. Wraps content and fades + rises it into view the first
 * time it scrolls near the viewport. Under `prefers-reduced-motion` the CSS
 * shows it immediately with no transition.
 */
export function Reveal({
  as: Tag = "div",
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const visible = useRevealOnScroll(ref);

  return (
    <Tag
      ref={ref}
      style={style}
      className={["rv", visible && "visible", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

type WordRevealProps = {
  /** Heading level to render. Defaults to `h2`. */
  as?: "h1" | "h2";
  /** Heading text — split into words on every render (and re-split on lang). */
  text: string;
  className?: string;
};

/**
 * A2 — word reveal. Renders a heading whose words each rise out of an
 * overflow-hidden mask, staggered by 50ms. The heading is itself the reveal
 * trigger.
 *
 * On language change the incoming `text` produces fresh word spans (re-split);
 * if the heading was already revealed we snap those spans to `transform: none`
 * so they don't sit hidden below the baseline (AGENTS.md language convention).
 */
export function WordReveal({ as: Tag = "h2", text, className }: WordRevealProps) {
  const { lang } = useLang();
  const ref = useRef<HTMLHeadingElement>(null);
  const visible = useRevealOnScroll(ref);
  const words = splitWords(text);

  // Re-split + reset on language change. Skip the initial mount; only act once
  // the heading has already been revealed, otherwise the normal reveal handles
  // the entrance.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!visible) return;
    const el = ref.current;
    if (!el) return;
    for (const word of el.querySelectorAll<HTMLElement>(".word")) {
      word.style.transform = "none";
    }
  }, [lang, visible]);

  return (
    <Tag
      ref={ref}
      data-split
      className={["rv", visible && "visible", className]
        .filter(Boolean)
        .join(" ")}
    >
      {words.map((word, i) => (
        // Key by lang so a language switch remounts the spans (clean re-split).
        <Fragment key={`${lang}-${i}`}>
          <span className="word-line">
            <span
              className="word"
              style={{ "--d": `${i * WORD_STAGGER_MS}ms` } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
