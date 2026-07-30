import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
