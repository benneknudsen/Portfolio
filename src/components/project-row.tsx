"use client";

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
 * `data-peek` / `data-peek-label` are read by <CursorPeek>; the whole entrance
 * reuses the shared <Reveal> (A1).
 */
export function ProjectRow({ index, id, peekSrc, href }: ProjectRowProps) {
  const { t } = useLang();
  const p = t.projects[id];

  const body = (
    <>
      <span className="prow-index" aria-hidden>
        {index}
      </span>
      <div className="prow-main">
        <h3 className="prow-title">
          {p.title}
          <span className="prow-arrow" aria-hidden>
            ↗
          </span>
        </h3>
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
    <Reveal as="article" className="prow">
      {href ? (
        <a
          className="prow-inner"
          href={href}
          target="_blank"
          rel="noreferrer"
          data-peek={peekSrc}
          data-peek-label={p.peekLabel}
        >
          {body}
        </a>
      ) : (
        <div
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
