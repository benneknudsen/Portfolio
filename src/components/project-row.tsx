"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type Ref,
} from "react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/reveal";

/** Keys of `t.projects` that hold an actual project (not the section title). */
type ProjectId = "stride" | "portfolio" | "flagvagten";

type ProjectRowProps = {
  /** Ordinal shown at the row's left edge, e.g. "01". */
  index: string;
  /** Which project's copy to render (key into `t.projects`). */
  id: ProjectId;
  /**
   * Preview image for CursorPeek — a path under `/public`. Optional: when
   * omitted, `data-peek` is left off and CursorPeek's `onEnter` bails, so the
   * row simply has no hover preview (no broken card).
   */
  peekSrc?: string;
  /** Optional live link. */
  href?: string;
};

/**
 * A10/A11 — a single project row. Index · outline title · fact tags · blurb ·
 * hover marquee, laid out on a two-column grid.
 *
 * On touch devices (no hover): first tap expands the row to show details +
 * a "tap again" hint; second tap navigates to the href. On desktop the row
 * navigates directly on click; hover previews via CursorPeek still work.
 */
export function ProjectRow({ index, id, peekSrc, href }: ProjectRowProps) {
  const { t } = useLang();
  const p = t.projects[id];
  const [expanded, setExpanded] = useState(false);
  const rowRef = useRef<HTMLElement | null>(null);

  // Collapse when tapping outside the row or scrolling
  useEffect(() => {
    if (!expanded) return;
    const collapse = () => setExpanded(false);
    const onPointerDown = (e: PointerEvent) => {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        collapse();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", collapse, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", collapse);
    };
  }, [expanded]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      // Desktop (has hover) — let the native <a> open the link. The
      // matchMedia check runs here (not on every render) so it only fires
      // on an actual click, when `window` is guaranteed to exist.
      const isTouch = window.matchMedia("(hover: none)").matches;
      if (!href || !isTouch) return;

      // Touch: first tap → expand (block navigation); second tap → let
      // the native <a> navigate.
      if (!expanded) {
        e.preventDefault();
        setExpanded(true);
      }
    },
    [href, expanded],
  );

  const body = (
    <>
      <span className="prow-index" aria-hidden>
        {index}
      </span>
      <div className="prow-main">
        <h3
          className={["prow-title", expanded && "prow-title--expanded"]
            .filter(Boolean)
            .join(" ")}
        >
          {p.title}
          <span className="prow-arrow" aria-hidden>
            {"↗\uFE0E"}
          </span>
        </h3>
        {href && (
          <span className="prow-hint">
            <span>{t.projects.tapAgain}</span>
          </span>
        )}
        <ul className="prow-facts">
          {p.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <p className="prow-desc">{p.desc}</p>
        {/* A11 — two identical spans so the marquee loop is seamless. */}
        <div className="prow-marquee" aria-hidden>
          <span>{p.marquee}</span>
          <span>{p.marquee}</span>
        </div>
      </div>
    </>
  );

  return (
    <Reveal
      as="article"
      className={["prow", expanded && "prow--expanded"]
        .filter(Boolean)
        .join(" ")}
    >
      {href ? (
        <a
          ref={rowRef as Ref<HTMLAnchorElement>}
          className="prow-inner"
          data-peek={peekSrc}
          data-peek-label={p.peekLabel}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label={p.peekLabel}
        >
          {body}
        </a>
      ) : (
        <div
          ref={rowRef as Ref<HTMLDivElement>}
          className="prow-inner"
          data-peek={peekSrc}
          data-peek-label={p.peekLabel}
        >
          {body}
        </div>
      )}
    </Reveal>
  );
}
