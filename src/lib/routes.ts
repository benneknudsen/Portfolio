import type { Lang } from "./copy";

/** Pages below the locale root that exist in both locales. */
const LOCALIZED_PATHS = new Set(["/case/stride"]);

/** True on the only routes that contain the portfolio's anchor sections. */
export function isHomePath(pathname: string): boolean {
  return pathname === "/" || pathname === "/da" || pathname === "/en";
}

/** Locale implied by a browser pathname — `/en...` is EN, everything else DA. */
export function localeFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "da";
}

/** Home URL for a locale. */
export function homePath(lang: Lang): string {
  return lang === "en" ? "/en" : "/";
}

/** Link to an anchor on the current locale's home page. */
export function homeAnchorUrl(href: string, lang: Lang): string {
  return homePath(lang) + href;
}

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(?:da|en)(?=\/|$)/, "");
}

/**
 * URL for switching to `next`. Keeps the current page when it exists in both
 * locales, keeps the hash, and sends unknown paths (e.g. the 404 page) to the
 * locale root.
 */
export function localeSwitchUrl(
  next: Lang,
  pathname: string,
  hash: string,
): string {
  const rest = stripLocale(pathname);
  const known = LOCALIZED_PATHS.has(rest) ? rest : "";
  const path = ((next === "en" ? "/en" : "") + known) || "/";
  return path + hash;
}
