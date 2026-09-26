import NotFound from "../not-found";

/**
 * Internal 404 renderer. The proxy rewrites every unmatched path here so the
 * branded `[locale]/not-found.tsx` UI renders inside the locale layout — fonts,
 * CSS and `<html lang>` included — instead of Next's built-in English 404.
 * The boundary is imported (not reimplemented) so both stay identical; the
 * proxy sets the 404 status on the rewrite.
 */
export default function NotFoundPage() {
  return <NotFound />;
}