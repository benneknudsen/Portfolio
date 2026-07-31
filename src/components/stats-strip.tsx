"use client";

import { Reveal } from "@/components/reveal";

type StatsStripProps = {
  stats: ReadonlyArray<{ value: string; label: string }>;
};

/**
 * A 4-cell stats bar below the method steps. One bordered strip with divider
 * lines between cells (vertical above 700px, horizontal below). Wrapped in a
 * <Reveal> so it fades in with the section.
 */
export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <Reveal>
      <div className="stats-strip">
        {stats.map((stat) => (
          <div key={stat.label} className="stats-cell">
            <div className="stats-value">{stat.value}</div>
            <div className="stats-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
