import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { copy, LOCALES, type Lang } from "@/lib/copy";

const SITE_URL = "https://benjaminschou.dk";
const CASE_PATH = "/case/stride";

function isLang(value: string): value is Lang {
  return (LOCALES as readonly string[]).includes(value);
}

function caseUrl(lang: Lang): string {
  return lang === "en" ? `${SITE_URL}/en${CASE_PATH}` : `${SITE_URL}${CASE_PATH}`;
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

  const c = copy[locale].caseStride;
  const url = caseUrl(locale);
  const title = `${c.title} — case | Benjamin Schou Knudsen`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: c.lead,
    alternates: {
      canonical: url,
      languages: {
        da: caseUrl("da"),
        en: caseUrl("en"),
      },
    },
    openGraph: {
      title,
      description: c.lead,
      url,
      siteName: "Benjamin Schou Knudsen",
      locale: locale === "en" ? "en_US" : "da_DK",
      type: "website",
    },
  };
}

export default async function StrideCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();

  const c = copy[locale].caseStride;
  const backHref = locale === "en" ? "/en#projects" : "/#projects";

  return (
    <main id="main-content" className="case container">
      <Link className="case-back" href={backHref}>
        {c.back}
      </Link>

      <Reveal as="header" className="case-head">
        <span className="kicker">{c.kicker}</span>
        <h1 className="case-title">{c.title}</h1>
        <p className="case-lead">{c.lead}</p>
      </Reveal>

      <Reveal as="section" className="case-section">
        <h2 className="case-h2">{c.problemTitle}</h2>
        <p className="case-p">{c.problem}</p>
      </Reveal>

      <Reveal as="section" className="case-section">
        <h2 className="case-h2">{c.constraintsTitle}</h2>
        <ul className="case-list">
          {c.constraints.map((item) => (
            <li key={item.title} className="case-item">
              <h3 className="case-item-title">{item.title}</h3>
              <p className="case-p">{item.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="case-section">
        <h2 className="case-h2">{c.decisionsTitle}</h2>
        <ul className="case-list">
          {c.decisions.map((item) => (
            <li key={item.title} className="case-item">
              <h3 className="case-item-title">{item.title}</h3>
              <p className="case-p">{item.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="case-section">
        <h2 className="case-h2">{c.stackTitle}</h2>
        <ul className="case-stack">
          {c.stack.map((item) => (
            <li key={item} className="case-pill">
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="case-section">
        <h2 className="case-h2">{c.learningTitle}</h2>
        <p className="case-p case-learning">{c.learning}</p>
      </Reveal>

      <a
        className="case-live"
        href={c.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {c.live}
        <span aria-hidden>{"↗\uFE0E"}</span>
      </a>
    </main>
  );
}
