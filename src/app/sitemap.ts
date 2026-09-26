import type { MetadataRoute } from "next";

const BASE_URL = "https://benjaminschou.dk";

const languages = {
  da: `${BASE_URL}/`,
  en: `${BASE_URL}/en`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: languages.da,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages },
    },
    {
      url: languages.en,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages },
    },
  ];
}
