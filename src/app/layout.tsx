import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Runs before paint to apply the persisted theme/lang, avoiding a flash of
// the wrong theme on first load. Keep in sync with the storage keys in
// src/lib/theme.ts and src/lib/i18n.ts.
const themeScript = `(function(){try{var t=localStorage.getItem('bk-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');var l=localStorage.getItem('bk-lang');if(l==='da'||l==='en')document.documentElement.lang=l;}catch(e){}})();`;

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

export const metadata: Metadata = {
  title: "Benjamin Schou Knudsen — Frontend-udvikler",
  description: "Frontend-udvikler med baggrund som multimediedesigner — jeg omsætter visuelle idéer til færdige produkter i React og TypeScript.",
  metadataBase: new URL("https://benjaminschou.dk"),
  openGraph: {
    title: "Benjamin Schou Knudsen — Frontend-udvikler",
    description: "Frontend-udvikler med baggrund som multimediedesigner — jeg omsætter visuelle idéer til færdige produkter i React og TypeScript.",
    url: "https://benjaminschou.dk",
    siteName: "Benjamin Schou Knudsen",
    locale: "da_DK",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${hanken.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
