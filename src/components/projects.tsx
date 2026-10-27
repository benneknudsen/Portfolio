"use client";

import { useLang } from "@/lib/i18n";
import { WordReveal } from "@/components/reveal";
import { ProjectRow } from "@/components/project-row";

/**
 * Projects section — the section heading (word-reveal, A2) above the list of
 * ProjectRows. Five rows: Stride, Fut Squad Lab, Portfolio, Flagvagten,
 * strava-digest. `margin-top: var(--section-gap)` spaces it from the hero
 * (convention #3: section spacing is margin, not padding).
 */
export function Projects() {
  const { t, lang } = useLang();

  return (
    <section id="projects" className="projects container">
      <WordReveal className="projects-title" text={t.projects.sectionTitle} />
      <div className="prow-list">
        <ProjectRow
          index="01"
          id="stride"
          peekSrc="/stride-preview.webp"
          href={lang === "en" ? "/en/case/stride" : "/case/stride"}
          external={false}
        />
        <ProjectRow
          index="02"
          id="futSquadLab"
          peekSrc="/fut-squad-lab-preview.webp"
          href="https://github.com/benneknudsen/fut-squad-lab"
        />
        <ProjectRow
          index="03"
          id="portfolio"
          peekSrc="/portfolio-preview.webp"
          href="https://github.com/benneknudsen/Portfolio"
        />
        <ProjectRow
          index="04"
          id="flagvagten"
          peekSrc="/flagvagten-preview.webp"
          href="https://github.com/benneknudsen/flagvagten"
        />
        <ProjectRow
          index="05"
          id="stravaDigest"
          peekSrc="/strava-digest-preview.webp"
          href="https://github.com/benneknudsen/strava-digest"
        />
      </div>
    </section>
  );
}
