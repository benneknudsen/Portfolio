"use client";

import { experienceH2, useLang } from "@/lib/i18n";
import { Reveal, TokenReveal } from "@/components/reveal";
import { ExperienceRow } from "@/components/experience-row";

/**
 * Experience section (#03 — Erfaring). A head that pairs the kicker with the
 * word-reveal heading (shared <TokenReveal>: `em` words render serif italic
 * accent and `tail` rides the trailing period inside the same mask; the
 * enclosing `.experience-head` <Reveal> is the trigger, `.rv.visible .word`),
 * then a list of ExperienceRows above a top border. All copy comes from i18n.
 * `margin-top: var(--section-gap)` spaces it from Method (convention #3:
 * section spacing is margin, not padding).
 */
export function Experience() {
  const { t, lang } = useLang();
  const x = t.experience;

  return (
    <section id="experience" className="experience container">
      <Reveal className="experience-head">
        <span className="kicker">{x.kicker}</span>
        <TokenReveal as="h2" className="experience-h2" tokens={experienceH2[lang]} />
      </Reveal>

      <div className="xp">
        {x.rows.map((row) => (
          <ExperienceRow
            key={`${row.period}-${row.company}`}
            period={row.period}
            role={row.role}
            company={row.company}
            note={"note" in row ? row.note : undefined}
          />
        ))}
      </div>
    </section>
  );
}
