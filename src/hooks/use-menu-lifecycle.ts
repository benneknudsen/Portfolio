"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BURGER_BREAKPOINT_PX } from "@/lib/breakpoints";

/** Below this width the burger replaces the inline nav (matches `md3`). */
const BURGER_MQ = `(min-width: ${BURGER_BREAKPOINT_PX}px)`;

/**
 * Open/close lifecycle for the mobile menu: Lenis stop/start, body lock,
 * Escape + breakpoint exits, the focus trap, and focus into/out of the panel.
 */
export function useMenuLifecycle() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  /** Close and return focus to the burger (Escape). */
  const closeToBurger = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  // While open: stop Lenis, lock the body, and wire Escape + breakpoint exits.
  useEffect(() => {
    if (!open) return;

    const lenis = window.__lenis;
    lenis?.stop();
    document.body.classList.add("menu-open");

    const mq = window.matchMedia(BURGER_MQ);
    const onViewport = () => {
      // Burger is gone at or above `BURGER_BREAKPOINT_PX` — close silently,
      // don't chase focus.
      if (mq.matches) setOpen(false);
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
  }, [open, closeToBurger]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  return { open, burgerRef, firstLinkRef, sheetRef, closeToBurger, toggle };
}
