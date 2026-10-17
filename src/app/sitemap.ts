import type { MetadataRoute } from "next";

const BASE_URL = "https://benjaminschou.dk";

/**
 * Date the site's content last changed. Bump this when copy, projects or
 * experience change — never derive it from the build clock, or every deploy
 * tells search engines the pages changed.
 */
const LAST_MODIFIED = new Date("2026-10-17");

const languages = {
  da: `${BASE_URL}/`,
  en: `${BASE_URL}/en`,
};

const caseLanguages = {
  da: `${BASE_URL}/case/stride`,
  en: `${BASE_URL}/en/case/stride`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: languages.da,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages },
    },
    {
      url: languages.en,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages },
    },
    {
      url: caseLanguages.da,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: caseLanguages },
    },
    {
      url: caseLanguages.en,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: caseLanguages },
    },
  ];
}
