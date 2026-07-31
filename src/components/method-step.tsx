"use client";

import type { CSSProperties } from "react";
import { Reveal } from "@/components/reveal";

type MethodStepProps = {
  /** Mono eyebrow label, e.g. "#1 Husk". */
  label: string;
  /** Bold subtitle for the step. */
  title: string;
  /** Body copy. May contain `<b>` — styled to solid ink. */
  paragraph: string;
  /** Mono tech pills. */
  pills: string[];
  /** Passed to the Reveal wrapper to carry the `--d` stagger delay. */
  style?: CSSProperties;
};

/**
 * A single method step card (A13). The <Reveal> wrapper handles the staggered
 * fade-in (its `--d` delay comes from `style`); the inner `.method-step` article
 * owns the hover lift (translateY(-4px) + shadow + border), kept on a separate
 * element so its `.4s` transform transition never clobbers the reveal's `.9s`
 * opacity/transform entrance.
 */
export function MethodStep({
  label,
  title,
  paragraph,
  pills,
  style,
}: MethodStepProps) {
  return (
    <Reveal style={style}>
      <article className="method-step">
        <div className="method-step-head">
          <span className="method-step-label">{label}</span>
          <span className="method-step-title">{title}</span>
        </div>
        <div className="method-step-body">
          <p className="method-step-p">{paragraph}</p>
          <div className="method-step-pills">
            {pills.map((pill) => (
              <span key={pill} className="method-step-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
