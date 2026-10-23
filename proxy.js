import { NextResponse } from "next/server";

const locales = ["en-GB", "en", "es", "fr"];
const defaultLocale = "en-GB";

function getLocale(request) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.trim(), q: q ? parseFloat(q) : 1 };
    })
    .filter(({ tag }) => tag && tag !== "*")
    .sort((a, b) => b.q - a.q)
    .map(({ tag }) => tag.toLowerCase());

  for (const lang of preferred) {
    const exact = locales.find((l) => l.toLowerCase() === lang);
    if (exact) return exact;

    const base = lang.split("-")[0];
    const partial =
      locales.find((l) => l.toLowerCase() === base) ||
      locales.find((l) => l.toLowerCase().startsWith(`${base}-`));
    if (partial) return partial;
  }

  return defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip _next, API routes, and files with an extension (favicon.ico, images, etc.)
    "/((?!_next|api|.*\\..*).*)",
  ],
};
