"use client";

import { Reveal } from "@/components/reveal";

type ExperienceRowProps = {
  /** Time span, e.g. "2024 — nu". Rendered mono/dim. */
  period: string;
  /** Job/education title — the emphasised line. */
  role: string;
  /** Employer or institution — rendered dim next to the role. */
  company: string;
  /** Optional descriptive blurb, shown as a block under role + company. */
  note?: string;
};

/**
 * A single experience entry: a two-column row (period | detail) that lights its
 * background on hover. The hover background snaps with NO transition — a
 * background transition would animate on every theme switch (convention #2).
 * The row is its own <Reveal>, so each entry fades + rises as it scrolls in.
 */
export function ExperienceRow({ period, role, company, note }: ExperienceRowProps) {
  return (
    <Reveal className="xp-row">
      <span className="xp-period">{period}</span>
      <div className="xp-detail">
        <span className="xp-role">{role}</span>{" "}
        <span className="xp-company">{company}</span>
        {note ? <span className="xp-note">{note}</span> : null}
      </div>
    </Reveal>
  );
}
