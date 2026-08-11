"use client";

import { useLang } from "@/lib/i18n";
import { WordReveal } from "@/components/reveal";
import { ProjectRow } from "@/components/project-row";

/**
 * Projects section — the section heading (word-reveal, A2) above the list of
 * ProjectRows. Currently only Stride. `margin-top: var(--section-gap)` spaces it
 * from the hero (convention #3: section spacing is margin, not padding).
 */
export function Projects() {
  const { t } = useLang();

  return (
    <section id="projects" className="projects container">
      <WordReveal className="projects-title" text={t.projects.sectionTitle} />
      <div className="prow-list">
        <ProjectRow index="01" id="stride" peekSrc="/stride-preview.webp" href="https://stride-run.club" />
        <ProjectRow index="02" id="portfolio" peekSrc="/portfolio-preview.webp" href="https://benjaminschou.dk" />
        <ProjectRow index="03" id="flagvagten" href="https://github.com/benneknudsen/flagvagten" peekSrc="/flagvagten-preview.webp" />
      </div>
    </section>
  );
}
