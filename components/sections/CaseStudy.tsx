import Reveal from "../Reveal";

const METRICS = [
  { label: "AI visibility", before: "[--]%", after: "[--]%" },
  { label: "Recommendation rate", before: "[--]%", after: "[--]%" },
  { label: "Citation rate", before: "[--]%", after: "[--]%" },
];

export default function CaseStudy() {
  return (
    <section id="case-study" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            We tested the system on our own business first.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
            Before selling AI Search Visibility to other businesses, we built and tested this
            system on our own company — running it through the same audit, build, and measurement
            process we now offer clients.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 rounded-2xl border border-border-strong bg-bg-card/60 p-6 sm:p-8">
            <span className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
              Verified results to be published once available
            </span>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {METRICS.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border bg-white/[0.02] p-5">
                  <p className="text-xs text-fg-subtle">{metric.label}</p>
                  <p className="mt-2 flex items-baseline gap-2 text-2xl font-semibold tracking-tight text-fg">
                    <span className="text-fg-subtle">{metric.before}</span>
                    <span className="text-fg-subtle">→</span>
                    <span className="text-accent">{metric.after}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-8 flex justify-center">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-accent hover:text-accent-hover focus-ring rounded-md"
          >
            See the methodology →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
