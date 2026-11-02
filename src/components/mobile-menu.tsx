"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/i18n";
import { scrollToAnchor } from "@/lib/lenis";
import {
  homeAnchorUrl,
  isHomePath,
  localeFromPath,
} from "@/lib/routes";
import { useMenuLifecycle } from "@/hooks/use-menu-lifecycle";
import { MenuPanel } from "@/components/menu-panel";

/**
 * Burger button + full-screen anchor panel for viewports below
 * `BURGER_BREAKPOINT_PX`.
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
  const { open, burgerRef, firstLinkRef, sheetRef, closeToBurger, toggle } =
    useMenuLifecycle();
  const [mounted, setMounted] = useState(false);

  // Portals need the DOM — render the panel only after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  function handleLink(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    // #44: closeToBurger returns focus to the burger before the panel gets
    // aria-hidden, so focus never rests on a link inside the hidden panel.
    closeToBurger();
    const { pathname } = window.location;
    if (!isHomePath(pathname)) {
      window.location.assign(homeAnchorUrl(href, localeFromPath(pathname)));
      return;
    }
    // Defer to a macrotask so the close effect's cleanup runs first — it
    // restarts Lenis and drops `menu-open`/`lenis-stopped` (both `overflow:
    // hidden`). Scrolling in the same tick fires against a stopped instance and
    // a locked scroll container, so the section never comes into view (#26).
    setTimeout(() => scrollToAnchor(href), 0);
  }

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="msheet"
        aria-label={open ? t.aria.menuClose : t.aria.menuOpen}
        className="burger tap-44 rounded-sm text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md3:hidden"
      >
        <span aria-hidden className="burger-line" />
        <span aria-hidden className="burger-line" />
        <span aria-hidden className="burger-line" />
      </button>

      {mounted &&
        createPortal(
          <MenuPanel
            open={open}
            sheetRef={sheetRef}
            firstLinkRef={firstLinkRef}
            onClose={closeToBurger}
            onLinkClick={handleLink}
          />,
          document.body,
        )}
    </>
  );
}
