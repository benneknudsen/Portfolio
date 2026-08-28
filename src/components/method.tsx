"use client";

import { type CSSProperties } from "react";
import { methodH2, useLang } from "@/lib/i18n";
import { Reveal, TokenReveal } from "@/components/reveal";
import { MethodStep } from "@/components/method-step";
import { StatsStrip } from "@/components/stats-strip";

/** Per-step entrance stagger (A1), delayed off the shared `--d` reveal delay. */
const STEP_STAGGER = ["0s", ".08s", ".16s", ".24s"];

/**
 * Method section (#02 — Arbejdsmetode). A head that pairs the kicker,
 * word-reveal heading and lead paragraph with the local Hermes logo, then four
 * staggered MethodStep cards and a StatsStrip. All copy comes from i18n; the
 * lead renders its inline-styled Hermes link as real JSX (no innerHTML).
 */
export function Method() {
  const { t, lang } = useLang();
  const m = t.method;

  return (
    <section id="method" className="method container">
      <Reveal className="method-head">
        <div className="method-head-text">
          <span className="kicker">{m.kicker}</span>
          <TokenReveal as="h2" className="method-h2" tokens={methodH2[lang]} />
          <p className="method-lead">
            {m.lead.before}
            <a
              href={m.lead.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              {m.lead.linkText}
            </a>
            {m.lead.after}
          </p>
        </div>
        {/* Local SVG — never a CDN (AGENTS.md). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="method-logo" src="/hermes.svg" alt="Hermes Agent" />
      </Reveal>

      <div className="steps">
        {m.steps.map((step, i) => (
          <MethodStep
            key={step.label}
            label={step.label}
            title={step.title}
            paragraph={step.paragraph}
            pills={[...step.pills]}
            style={{ "--d": STEP_STAGGER[i] } as CSSProperties}
          />
        ))}
      </div>

      <StatsStrip stats={m.stats} />
    </section>
  );
}
