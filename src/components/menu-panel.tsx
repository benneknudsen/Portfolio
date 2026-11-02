"use client";

import type { CSSProperties, MouseEvent, RefObject } from "react";
import { useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS } from "@/lib/nav-links";

type MenuPanelProps = {
  open: boolean;
  sheetRef: RefObject<HTMLDivElement | null>;
  firstLinkRef: RefObject<HTMLAnchorElement | null>;
  onClose: () => void;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
};

/** Full-screen anchor panel (`#msheet`) for viewports below the burger breakpoint. */
export function MenuPanel({
  open,
  sheetRef,
  firstLinkRef,
  onClose,
  onLinkClick,
}: MenuPanelProps) {
  const { t } = useLang();

  return (
    <div
      id="msheet"
      ref={sheetRef}
      className={open ? "open" : undefined}
      // `inert` removes the whole subtree — including LangToggle/ThemeToggle —
      // from the tab order and accessibility tree in the same tick as close,
      // while the panel is still visible during the 0.45s visibility
      // transition. `aria-hidden` alone did not stop focus.
      inert={!open}
      aria-hidden={!open}
    >
      {/* Explicit close affordance inside the panel — closing never depends on
          recognising the header's burger→X morph (#26 follow-up). Returns focus
          to the burger like Escape (closeToBurger). */}
      <button
        type="button"
        onClick={onClose}
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
            onClick={(e) => onLinkClick(e, link.href)}
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
}
