"use client";

import { Fragment, type CSSProperties } from "react";
import { methodH2, useLang } from "@/lib/i18n";
import { WORD_STAGGER_MS } from "@/lib/animations";
import { Reveal } from "@/components/reveal";
import { MethodStep } from "@/components/method-step";
import { StatsStrip } from "@/components/stats-strip";

/** Per-step entrance stagger (A1), delayed off the shared `--d` reveal delay. */
const STEP_STAGGER = ["0s", ".08s", ".16s", ".24s"];

/**
 * A2 — method `h2` word reveal. Mirrors the hero heading: each word rises out of
 * an overflow-hidden mask, `em` words render serif italic accent, `br` forces
 * the line break and `tail` rides the trailing period inside the mask. The
 * enclosing `.method-head` <Reveal> is the trigger. Keying spans by `lang`
 * remounts them on a language switch so they re-split cleanly (the parent stays
 * `.visible`, so the CSS keeps the words at their risen baseline).
 */
function MethodHeading() {
  const { lang } = useLang();
  const tokens = methodH2[lang];

  return (
    <h2 className="method-h2">
      {tokens.map((tok, i) => {
        if ("br" in tok) return <br key={`${lang}-${i}`} />;

        const wordIndex = tokens.slice(0, i).filter((tk) => !("br" in tk)).length;
        const prev = tokens[i - 1];
        const space = prev && !("br" in prev) ? " " : null;

        return (
          <Fragment key={`${lang}-${i}`}>
            {space}
            <span className="word-line">
              <span
                className="word"
                style={{ "--d": `${wordIndex * WORD_STAGGER_MS}ms` } as CSSProperties}
              >
                {tok.em ? <em>{tok.w}</em> : tok.w}
                {tok.tail}
              </span>
            </span>
          </Fragment>
        );
      })}
    </h2>
  );
}

/**
 * Method section (#02 — Arbejdsmetode). A head that pairs the kicker,
 * word-reveal heading and lead paragraph with the local Hermes logo, then four
 * staggered MethodStep cards and a StatsStrip. All copy comes from i18n; the
 * lead renders its inline-styled Hermes link as real JSX (no innerHTML).
 */
export function Method() {
  const { t } = useLang();
  const m = t.method;

  return (
    <section id="method" className="method container">
      <Reveal className="method-head">
        <div className="method-head-text">
          <span className="kicker">{m.kicker}</span>
          <MethodHeading />
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
