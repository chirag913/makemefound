"use client";

import Button from "../Button";
import MetricCard from "../MetricCard";
import Reveal from "../Reveal";
import { useAuditModal } from "../AuditModalContext";

const METRICS = [
  { label: "AI Visibility", value: "23%" },
  { label: "Competitor Visibility", value: "61%" },
  { label: "Recommendation Rate", value: "11%" },
  { label: "Citation Rate", value: "7%" },
];

const OPPORTUNITIES = [
  {
    query: "Best dental implant dentist in Dallas",
    you: "Not mentioned",
    competitor: "#1",
  },
  {
    query: "Best cosmetic dentist in Dallas",
    you: "#7",
    competitor: "#2",
  },
  {
    query: "Best Invisalign dentist near Plano",
    you: "Not mentioned",
    competitor: "#1",
  },
];

export default function AuditPreview() {
  const { openModal } = useAuditModal();

  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            See exactly where you&apos;re being missed.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-fg-muted">
            We&apos;ll test your business against the searches that matter most — and show you how
            you compare with competitors.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 rounded-2xl border border-border-strong bg-bg-card/60 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Sample audit — illustrative data
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {METRICS.map((metric) => (
                <MetricCard key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-fg">Top missed opportunities</h3>
              <div className="mt-3 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-white/[0.02] text-xs uppercase tracking-wider text-fg-subtle">
                      <th className="px-4 py-3 font-medium">Search</th>
                      <th className="px-4 py-3 font-medium">You</th>
                      <th className="px-4 py-3 font-medium">Competitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OPPORTUNITIES.map((row) => (
                      <tr key={row.query} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-fg-muted">{row.query}</td>
                        <td className="px-4 py-3 font-medium text-accent">{row.you}</td>
                        <td className="px-4 py-3 text-fg-muted">{row.competitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-10 flex justify-center">
          <Button variant="primary" onClick={() => openModal("audit_preview")}>
            Get My Free Audit →
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
