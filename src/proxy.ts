import { NextResponse, type NextRequest } from "next/server";

/** Real, generated route below a locale segment. The OG image is a route
 *  handler, not a page, and its URL carries a Next-generated id and cache
 *  hash (`/da/opengraph-image/og?...`), so allow the whole subtree through. */
const LOCALE_ASSET_ROUTE = /^\/(?:da|en)\/opengraph-image(?:\/|$)/;

/** The Stride case page's canonical route. DA is also served from the bare
 *  `/case/stride` (mirroring how `/` serves `/da`), with `/da/...` and
 *  `/en/...` passing through as the prerendered routes. */
const CASE_STRIDE_PATH = "/case/stride";

/**
 * Root URL: the root is the shared, indexed address — `https://benjaminschou.dk`
 * is the canonical URL for the Danish page, linked in both languages and likely
 * already in search results. A redirect would bounce every Danish visitor to
 * `/da` and change the canonical URL; an internal rewrite serves the prerendered
 * Danish route (`/da`) while the browser keeps the bare root the user asked for.
 *
 * The Danish Stride case page has the same bare-URL treatment: `/case/stride`
 * rewrites to the prerendered `/da/case/stride`, while `/da/case/stride` and
 * `/en/case/stride` pass through unchanged.
 *
 * Unmatched URLs: because the root layout lives under `[locale]`, Next's built-in
 * 404 (English, no branding) is the fallback for any URL that never reaches a
 * `[locale]` route — e.g. `/foo` or `/da/nope`. Rewriting those paths to the
 * internal `not-found-page` route renders the branded `[locale]/not-found.tsx`
 * boundary instead: same layout, fonts, CSS and `<html lang>` as before.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/da", request.url));
  }

  if (pathname === "/da" || pathname === "/en") {
    return NextResponse.next();
  }

  if (pathname === CASE_STRIDE_PATH) {
    return NextResponse.rewrite(new URL(`/da${CASE_STRIDE_PATH}`, request.url));
  }

  if (pathname === `/da${CASE_STRIDE_PATH}` || pathname === `/en${CASE_STRIDE_PATH}`) {
    return NextResponse.next();
  }

  if (LOCALE_ASSET_ROUTE.test(pathname)) {
    return NextResponse.next();
  }

  const locale = pathname.startsWith("/en/") ? "en" : "da";
  return NextResponse.rewrite(new URL(`/${locale}/not-found-page`, request.url), {
    status: 404,
  });
}

export const config = {
  matcher: [
    /*
     * Match every request path except Next's own output (`_next`, including
     * `_next/static` and `_next/image`), the dev overlay's `__nextjs` calls, and
     * files served straight from `public/` — images by extension plus the
     * `robots.txt` / `sitemap.xml` metadata files. Note: Next still runs the
     * proxy for `_next/data` requests even when excluded here.
     */
    "/((?!_next|__nextjs|.*\\.(?:svg|png|webp|avif|jpg|jpeg|gif|ico)$|robots\\.txt$|sitemap\\.xml$).*)",
  ],
};