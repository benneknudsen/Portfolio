"use client";

import { Fragment, type CSSProperties } from "react";
import { experienceH2, useLang } from "@/lib/i18n";
import { WORD_STAGGER_MS } from "@/lib/animations";
import { Reveal } from "@/components/reveal";
import { ExperienceRow } from "@/components/experience-row";

/**
 * A2 — experience `h2` word reveal. Mirrors {@link MethodHeading}: each word
 * rises out of an overflow-hidden mask, the `em` word renders serif italic
 * accent and `tail` rides the trailing period inside the same mask. The
 * enclosing `.experience-head` <Reveal> is the trigger (`.rv.visible .word`).
 * Keying spans by `lang` remounts them on a language switch so they re-split
 * cleanly (the parent stays `.visible`, so the words keep their risen baseline).
 */
function ExperienceHeading() {
  const { lang } = useLang();
  const tokens = experienceH2[lang];

  return (
    <h2 className="experience-h2">
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
 * Experience section (#03 — Erfaring). A head that pairs the kicker with the
 * word-reveal heading, then a list of ExperienceRows above a top border. All
 * copy comes from i18n. `margin-top: var(--section-gap)` spaces it from Method
 * (convention #3: section spacing is margin, not padding).
 */
export function Experience() {
  const { t } = useLang();
  const x = t.experience;

  return (
    <section id="experience" className="experience container">
      <Reveal className="experience-head">
        <span className="kicker">{x.kicker}</span>
        <ExperienceHeading />
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
