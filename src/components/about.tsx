"use client";

import { Fragment, type CSSProperties } from "react";
import { aboutH2, useLang } from "@/lib/i18n";
import { WORD_STAGGER_MS } from "@/lib/animations";
import { Reveal } from "@/components/reveal";

/**
 * A2 — about `h2` word reveal. Mirrors {@link ExperienceHeading}: each word
 * rises out of an overflow-hidden mask, the `em` word renders serif italic
 * accent and `tail` rides the trailing period inside the same mask. The
 * enclosing `.about-head` <Reveal> is the trigger (`.rv.visible .word`). Keying
 * spans by `lang` remounts them on a language switch so they re-split cleanly
 * (the parent stays `.visible`, so the words keep their risen baseline).
 */
function AboutHeading() {
  const { lang } = useLang();
  const tokens = aboutH2[lang];

  return (
    <h2 className="about-h2">
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
 * About section (#04 — Om mig). A compact personal aside: kicker, word-reveal
 * heading and a short lead paragraph — deliberately lighter than Projects and
 * Experience (smaller heading) so it never competes with them. All copy comes
 * from i18n. `margin-top: var(--section-gap)` spaces it from Experience
 * (convention #3: section spacing is margin, not padding).
 */
export function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" className="about container">
      <Reveal className="about-head">
        <span className="kicker">{a.kicker}</span>
        <AboutHeading />
        <p className="about-lead">{a.lead}</p>
      </Reveal>
    </section>
  );
}
