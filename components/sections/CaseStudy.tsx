import Reveal from "../Reveal";

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

        <Reveal delay={150} className="mt-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-card/60 px-4 py-2 text-xs font-medium uppercase tracking-wider text-fg-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Results in progress — verified numbers will be published here once available
          </span>
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
