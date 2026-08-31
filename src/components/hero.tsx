"use client";

import { useEffect, useRef, useState } from "react";
import { heroH1, useLang } from "@/lib/i18n";
import { Reveal, TokenReveal } from "@/components/reveal";
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
  const { lang } = useLang();
  const [time, setTime] = useState("");

  useEffect(() => {
    // en-GB keeps the 24-hour clock of the Danish format; en-US would
    // switch to 12-hour AM/PM and break the meta line's tone.
    const fmt = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "da-DK", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Copenhagen",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, [lang]);

  return <span>{time}</span>;
}

/**
 * Hero section — meta line (role · location · clock · glyph strip), the
 * word-reveal headline beside the levitating avatar, an intro paragraph, and
 * the two contact buttons. The blob backdrop, headline underline and avatar
 * motion all live in globals.css so reduced-motion can disable them in one
 * place; the section entrance reuses the shared <Reveal> (A1). The h1 uses
 * the shared token reveal — hero tokens never set `tail`, so the shared loop
 * is behaviourally identical here.
 */
export function Hero() {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  async function copyEmail() {
    /* false when clipboard API is missing or writeText is blocked — no feedback */
    const ok = await navigator.clipboard?.writeText(EMAIL).then(
      () => true,
      () => false,
    );
    if (!ok) return;
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
        <TokenReveal as="h1" tokens={heroH1[lang]} />
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
