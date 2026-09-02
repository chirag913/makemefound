import MetricCard from "../MetricCard";
import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const METRICS = [
  { label: "Potential Accounts Identified", value: "47" },
  { label: "Decision-Makers Identified", value: "31" },
  { label: "Qualified Prospects", value: "18" },
  { label: "Outreach Status", value: "Active" },
];

export default function DemoCampaign() {
  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <SectionLabel>Sample Campaign</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            What a Campaign Could Look Like
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 rounded-2xl border border-border-strong bg-bg-card/60 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
                  Sample Outbound Campaign
                </p>
                <p className="mt-1 text-sm text-fg-muted">
                  Target Market: Medical Offices · Location: Dallas, Texas
                </p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                Active
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {METRICS.map((metric) => (
                <MetricCard key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 text-center text-xs text-fg-subtle">
            Illustrative example — not client results.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
