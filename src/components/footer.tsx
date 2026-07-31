"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { footerH2, useLang } from "@/lib/i18n";
import { WORD_STAGGER_MS } from "@/lib/animations";
import { Reveal } from "@/components/reveal";

/** How long the "Kopieret ✓" confirmation stays on the copy button (A16). */
const COPIED_MS = 1500;

/**
 * A2 — footer `h2` word reveal. Mirrors {@link ExperienceHeading}: each word
 * rises out of an overflow-hidden mask, the `em` word renders serif italic
 * accent and `tail` rides the trailing period inside the same mask. The
 * enclosing `.footer-head` <Reveal> is the trigger (`.rv.visible .word`).
 * Keying spans by `lang` remounts them on a language switch so they re-split
 * cleanly (the parent stays `.visible`, so the words keep their risen baseline).
 */
function FooterHeading() {
  const { lang } = useLang();
  const tokens = footerH2[lang];

  return (
    <h2 className="footer-h2">
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
 * Footer (#04 — Kontakt). A head that pairs the kicker with the word-reveal
 * heading, a large mailto link with a copy-to-clipboard button (A16), and a
 * meta row (copyright · LinkedIn). All copy comes from i18n. Spacing from
 * Experience is `margin-top: var(--section-gap)` (convention #3: margin, not
 * padding). The copy confirmation ("Kopieret ✓" / "Copied ✓") holds for 1.5s.
 */
export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard?.writeText(f.email);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
  }

  return (
    <footer className="footer container">
      <Reveal className="footer-head">
        <span className="kicker">{f.kicker}</span>
        <FooterHeading />
      </Reveal>

      <div className="footer-contact">
        <a className="footer-email" href={`mailto:${f.email}`}>
          {f.email}
        </a>
        <button
          type="button"
          className="footer-copy"
          onClick={copyEmail}
          aria-label={f.copyAria}
        >
          {copied ? f.copied : t.hero.btnCopy}
        </button>
      </div>

      <div className="footer-meta">
        <span>{f.copyright}</span>
        <a
          href={f.linkedinUrl}
          target="_blank"
          rel="noopener"
          aria-label={f.linkedin}
        >
          {f.linkedin} ↗
        </a>
      </div>
    </footer>
  );
}
