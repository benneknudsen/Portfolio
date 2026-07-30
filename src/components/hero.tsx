"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { heroH1, useLang } from "@/lib/i18n";
import { WORD_STAGGER_MS } from "@/lib/animations";
import { Reveal } from "@/components/reveal";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { GlyphStrip } from "@/components/glyph-strip";

/** Contact address — the primary CTA links here, the ghost button copies it. */
const EMAIL = "benjaschou12@icloud.com";

/** How long the "copied ✓" confirmation stays on the ghost button. */
const COPIED_MS = 1500;

/**
 * Local time in Copenhagen, refreshed every 20s (matches the design). Renders
 * empty on the server and until mount so there's no hydration mismatch — the
 * first tick fills it in immediately after.
 */
function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("da-DK", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Copenhagen",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

/**
 * A2 — hero `h1` word reveal. Each word rises out of an overflow-hidden mask;
 * the block-level `.top` <Reveal> is the trigger, so `.rv.visible .word` drives
 * the rise. `em` words render serif italic with the animated underline (A8),
 * `br` tokens force the two-line break. Keying by `lang` remounts the spans on
 * a language switch so they re-split cleanly (the CSS then keeps them visible).
 */
function HeroHeading() {
  const { lang } = useLang();
  const tokens = heroH1[lang];

  return (
    <h1>
      {tokens.map((tok, i) => {
        if ("br" in tok) return <br key={`${lang}-${i}`} />;

        // Stagger index counts words only (skipping the br) — computed from the
        // preceding tokens so nothing is reassigned during render.
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
              </span>
            </span>
          </Fragment>
        );
      })}
    </h1>
  );
}

/**
 * Hero section — meta line (role · location · clock · glyph strip), the
 * word-reveal headline beside the levitating avatar, an intro paragraph, and
 * the two contact buttons. The blob backdrop, headline underline and avatar
 * motion all live in globals.css so reduced-motion can disable them in one
 * place; the section entrance reuses the shared <Reveal> (A1).
 */
export function Hero() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard?.writeText(EMAIL);
    } catch {
      /* clipboard blocked — the mailto CTA still works */
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
  }

  return (
    <section className="hero container">
      <Reveal className="meta">
        <span>{t.hero.metaRole}</span>
        <span>
          <span>{t.hero.metaLoc}</span> · <Clock /> ·{" "}
          <GlyphStrip label={t.hero.glyphLabel} />
        </span>
      </Reveal>

      <Reveal className="top">
        <HeroHeading />
        <Avatar />
      </Reveal>

      <Reveal className="below">
        <p>
          <b>{t.hero.pLead}</b>
          {t.hero.pRest}
        </p>
        <div className="btns">
          <Button variant="primary" href={`mailto:${EMAIL}`}>
            {t.hero.btnWrite}
          </Button>
          <Button variant="ghost" onClick={copyEmail}>
            {copied ? t.hero.copied : t.hero.btnCopy}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
