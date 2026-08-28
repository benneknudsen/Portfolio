"use client";

import { aboutH2, useLang } from "@/lib/i18n";
import { Reveal, TokenReveal } from "@/components/reveal";

/**
 * About section (#04 — Om mig). A compact personal aside: kicker, word-reveal
 * heading (shared <TokenReveal>: `em` words render serif italic accent and
 * `tail` rides the trailing period inside the same mask; the enclosing
 * `.about-head` <Reveal> is the trigger, `.rv.visible .word`) and a short lead
 * paragraph — deliberately lighter than Projects and Experience (smaller
 * heading) so it never competes with them. All copy comes from i18n.
 * `margin-top: var(--section-gap)` spaces it from Experience (convention #3:
 * section spacing is margin, not padding).
 */
export function About() {
  const { t, lang } = useLang();
  const a = t.about;

  return (
    <section id="about" className="about container">
      <Reveal className="about-head">
        <span className="kicker">{a.kicker}</span>
        <TokenReveal as="h2" className="about-h2" tokens={aboutH2[lang]} />
        <p className="about-lead">{a.lead}</p>
      </Reveal>
    </section>
  );
}
