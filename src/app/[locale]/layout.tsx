import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { Nav } from "@/components/nav";
import { SkipLink } from "@/components/skip-link";
import { copy, LOCALES, type Lang } from "@/lib/copy";

const SITE_URL = "https://benjaminschou.dk";

// Runs before paint to apply the persisted theme. Language is deliberately not
// part of this script anymore: the locale comes from the route, so the server
// HTML is already rendered in the right language and <html lang> is set by this
// layout — nothing to reconcile before paint.
const themeScript = `(function(){try{var t=localStorage.getItem('bk-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`;

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

function isLang(value: string): value is Lang {
  return (LOCALES as readonly string[]).includes(value);
}

/** Canonical URL per locale — DA keeps the bare root, EN lives on `/en`. */
function localeUrl(lang: Lang): string {
  return lang === "en" ? `${SITE_URL}/en` : `${SITE_URL}/`;
}

// Both locales are prerendered at build time; any other value 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) notFound();

  const { title, description } = copy[locale].meta;
  const url = localeUrl(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        da: localeUrl("da"),
        en: localeUrl("en"),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Benjamin Schou Knudsen",
      locale: locale === "en" ? "en_US" : "da_DK",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/apple-touch-icon.png",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${hanken.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers initialLang={locale}>
          <SkipLink />
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
