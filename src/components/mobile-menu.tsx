"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/i18n";
import { scrollToAnchor } from "@/lib/lenis";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS } from "@/components/nav";

/** Below this width the burger replaces the inline nav (matches `md3`). */
const BURGER_MQ = "(min-width: 820px)";

/**
 * Burger button + full-screen anchor panel for viewports < 820px.
 *
 * The burger lives inline in the nav's right group; the panel (`#msheet`) is
 * portalled to `<body>` because the nav's `backdrop-filter` would otherwise
 * become the containing block for the fixed panel, collapsing `inset: 68px 0 0`
 * against the 68px header instead of the viewport.
 *
 * Opening stops Lenis (plain `overflow: hidden` does not — AGENTS.md #0) and
 * locks the body; closing restores both. Escape and a viewport crossing the
 * burger breakpoint both close the panel; Escape also returns focus to the
 * burger. A link closes the panel, then drives the anchor scroll on the next
 * macrotask — after the close cleanup has restarted Lenis and unlocked scroll.
 */
export function MobileMenu() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Portals need the DOM — render the panel only after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  /** Close without moving focus (viewport change / link navigation). */
  const close = useCallback(() => setOpen(false), []);

  /** Close and return focus to the burger (Escape). */
  const closeToBurger = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  // While open: stop Lenis, lock the body, and wire Escape + breakpoint exits.
  useEffect(() => {
    if (!open) return;

    const lenis = window.__lenis;
    lenis?.stop();
    document.body.classList.add("menu-open");

    const mq = window.matchMedia(BURGER_MQ);
    const onViewport = () => {
      // Burger is gone at ≥820px — close silently, don't chase focus.
      if (mq.matches) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeToBurger();
        return;
      }
      // Focus trap: keep Tab / Shift+Tab cycling inside the opaque panel so
      // focus never walks into the obscured header/main behind it (#20).
      if (e.key !== "Tab") return;
      const sheet = sheetRef.current;
      if (!sheet) return;
      const focusable = sheet.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !sheet.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !sheet.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };
    mq.addEventListener("change", onViewport);
    document.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.body.classList.remove("menu-open");
      mq.removeEventListener("change", onViewport);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, closeToBurger]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  function handleLink(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    close();
    // Defer to a macrotask so the close effect's cleanup runs first — it
    // restarts Lenis and drops `menu-open`/`lenis-stopped` (both `overflow:
    // hidden`). Scrolling in the same tick fires against a stopped instance and
    // a locked scroll container, so the section never comes into view (#26).
    setTimeout(() => scrollToAnchor(href), 0);
  }

  const panel = (
    <div
      id="msheet"
      ref={sheetRef}
      className={open ? "open" : undefined}
      aria-hidden={!open}
    >
      {/* Explicit close affordance inside the panel — closing never depends on
          recognising the header's burger→X morph (#26 follow-up). Returns focus
          to the burger like Escape (closeToBurger). */}
      <button
        type="button"
        onClick={closeToBurger}
        aria-label={t.aria.menuClose}
        tabIndex={open ? 0 : -1}
        className="msheet-close tap-44 rounded-full text-dim outline-none hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <svg
          aria-hidden
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <nav aria-label="Menu" className="msheet-nav">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.key}
            ref={i === 0 ? firstLinkRef : undefined}
            href={link.href}
            onClick={(e) => handleLink(e, link.href)}
            tabIndex={open ? 0 : -1}
            className="msheet-link rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            style={{ "--i": i } as CSSProperties}
          >
            {t.nav[link.key]}
          </a>
        ))}
      </nav>

      <div className="msheet-footer">
        <LangToggle />
        <ThemeToggle />
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="msheet"
        aria-label={open ? t.aria.menuClose : t.aria.menuOpen}
        className="burger tap-44 rounded-sm text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md3:hidden"
      >
        <span aria-hidden className="burger-line" />
        <span aria-hidden className="burger-line" />
        <span aria-hidden className="burger-line" />
      </button>

      {mounted && createPortal(panel, document.body)}
    </>
  );
}
