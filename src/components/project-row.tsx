"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/reveal";

/** Keys of `t.projects` that hold an actual project (not the section title). */
type ProjectId = "stride";

type ProjectRowProps = {
  /** Ordinal shown at the row's left edge, e.g. "01". */
  index: string;
  /** Which project's copy to render (key into `t.projects`). */
  id: ProjectId;
  /** Preview image for CursorPeek — a path under `/public`. */
  peekSrc: string;
  /** Optional live link. When set the row renders as an anchor. */
  href?: string;
};

/**
 * A10/A11 — a single project row. Index · outline title · fact tags · blurb ·
 * hover marquee, laid out on a two-column grid. The whole row is one hover
 * target: on hover the accent line sweeps in (`::before`), the outline title
 * fills to solid ink, the arrow drifts up-right and the marquee fades in — all
 * in globals.css so reduced-motion disables them in one place.
 *
 * On mobile (no hover): first tap expands the row to show details + a "tap
 * again" hint; second tap navigates to the href. On desktop the row is a
 * direct link (hover previews via CursorPeek).
 */
export function ProjectRow({ index, id, peekSrc, href }: ProjectRowProps) {
  const { t } = useLang();
  const p = t.projects[id];
  const [expanded, setExpanded] = useState(false);
  const isTouch = useRef(false);

  /** On touch devices: first tap expands, second tap navigates. */
  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!href) return;

      // Detect touch on first interaction
      if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === "touch") {
        isTouch.current = true;
      }

      // Desktop (mouse) — navigate directly
      if (!isTouch.current) {
        window.open(href, "_blank", "noreferrer");
        return;
      }

      // Touch: first tap → expand, second tap → navigate
      if (!expanded) {
        e.preventDefault();
        setExpanded(true);
      } else {
        window.open(href, "_blank", "noreferrer");
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
        <h3 className={["prow-title", expanded && "prow-title--expanded"].filter(Boolean).join(" ")}>
          {p.title}
          <span className="prow-arrow" aria-hidden>
            {"↗\uFE0E"}
          </span>
        </h3>
        {expanded && href && (
          <span className="prow-hint">
            {t.projects.tapAgain ?? "Tryk igen for at åbne"}
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
    <Reveal as="article" className={["prow", expanded && "prow--expanded"].filter(Boolean).join(" ")}>
      <div
        className="prow-inner"
        data-peek={peekSrc}
        data-peek-label={p.peekLabel}
        role={href ? "link" : undefined}
        tabIndex={href ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={href ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(e as unknown as MouseEvent<HTMLElement>); }} : undefined}
        aria-label={href ? p.peekLabel : undefined}
      >
        {body}
      </div>
    </Reveal>
  );
}
