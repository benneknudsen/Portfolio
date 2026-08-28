"use client";

import { useEffect, useRef, useState } from "react";
import { footerH2, useLang } from "@/lib/i18n";
import { Reveal, TokenReveal } from "@/components/reveal";

/** How long the "Kopieret ✓" confirmation stays on the copy button (A16). */
const COPIED_MS = 1500;

/**
 * Footer (#04 — Kontakt). A head that pairs the kicker with the word-reveal
 * heading (shared <TokenReveal>: `em` words render serif italic accent and
 * `tail` rides the trailing period inside the same mask; the enclosing
 * `.footer-head` <Reveal> is the trigger, `.rv.visible .word`), a large mailto
 * link with a copy-to-clipboard button (A16), and a meta row (copyright ·
 * LinkedIn). All copy comes from i18n. Spacing from Experience is
 * `margin-top: var(--section-gap)` (convention #3: margin, not padding). The
 * copy confirmation ("Kopieret ✓" / "Copied ✓") holds for 1.5s.
 */
export function Footer() {
  const { t, lang } = useLang();
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
    <footer id="contact" className="footer container">
      <Reveal className="footer-head">
        <span className="kicker">{f.kicker}</span>
        <TokenReveal as="h2" className="footer-h2" tokens={footerH2[lang]} />
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
        <a href={f.linkedinUrl} target="_blank" rel="noopener noreferrer">
          {f.linkedin} <span aria-hidden="true">{"↗\uFE0E"}</span>
        </a>
      </div>
    </footer>
  );
}
