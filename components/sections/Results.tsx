"use client";

import Button from "../Button";
import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import { useAuditModal } from "../AuditModalContext";

const ROWS = [
  {
    search: "Best dentist in Dallas",
    client: "Not mentioned",
    competitor: "#1",
    opportunity: "High",
  },
  {
    search: "Best dental implants Dallas",
    client: "#6",
    competitor: "#1",
    opportunity: "High",
  },
  {
    search: "Best Invisalign Dallas",
    client: "Not mentioned",
    competitor: "#2",
    opportunity: "High",
  },
];

export default function Results() {
  const { openModal } = useAuditModal();

  return (
    <section id="results" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Results</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Don&apos;t take our word for it. Look at the searches.
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border-strong">
            <div className="flex items-center justify-between border-b border-border bg-white/[0.02] px-5 py-3">
              <span className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Demonstration data
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-fg-subtle">
                    <th className="px-5 py-3.5 font-medium">Search</th>
                    <th className="px-5 py-3.5 font-medium">Client</th>
                    <th className="px-5 py-3.5 font-medium">Competitor</th>
                    <th className="px-5 py-3.5 font-medium">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.search} className="border-b border-border last:border-0">
                      <td className="px-5 py-4 text-fg-muted">{row.search}</td>
                      <td className="px-5 py-4 font-medium text-accent">{row.client}</td>
                      <td className="px-5 py-4 text-fg-muted">{row.competitor}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                          {row.opportunity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-10 flex justify-center">
          <Button variant="primary" onClick={() => openModal("results")}>
            Show Me My Visibility →
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
