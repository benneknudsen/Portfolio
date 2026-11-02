/**
 * Nav anchor links, in order. `label` resolves through i18n at render.
 * Shared with `MobileMenu` so the burger panel stays in sync.
 */
export const NAV_LINKS = [
  { key: "projects", href: "#projects" },
  { key: "method", href: "#method" },
  { key: "xp", href: "#experience" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;
