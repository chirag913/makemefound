import Reveal from "../Reveal";

const QUERIES = [
  "“Who’s the best dentist near me?”",
  "“What’s the best dental implant clinic in Dallas?”",
  "“Who should I hire for a kitchen remodel?”",
  "“What are the best alternatives to [competitor]?”",
];

function FlowStep({ label, isTerminal = false }: { label: string; isTerminal?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-4 py-2.5 text-sm font-medium ${
        isTerminal
          ? "border-accent/40 bg-accent-soft text-accent"
          : "border-border bg-white/[0.03] text-fg-muted"
      }`}
    >
      {label}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="text-fg-subtle sm:rotate-0 rotate-90 shrink-0"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Problem() {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Your customers are searching differently.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-fg-muted">
            People aren&apos;t only searching Google anymore. They&apos;re asking:
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {QUERIES.map((query) => (
              <div
                key={query}
                className="rounded-xl border border-border bg-bg-card/40 px-5 py-4 text-sm text-fg-muted"
              >
                {query}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-fg-muted">
            AI systems increasingly answer these questions by recommending specific businesses and
            sources.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-bg-card/40 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Traditional Search
              </p>
              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <FlowStep label="Customer" />
                <Arrow />
                <FlowStep label="Google" />
                <Arrow />
                <FlowStep label="Website" />
              </div>
            </div>

            <div className="rounded-2xl border border-accent/30 bg-accent-soft/60 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                AI Search
              </p>
              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <FlowStep label="Customer" />
                <Arrow />
                <FlowStep label="AI" />
                <Arrow />
                <FlowStep label="Recommendation" isTerminal />
                <Arrow />
                <FlowStep label="Website / Call" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-14 text-balance text-center text-xl font-medium tracking-tight text-fg">
            If AI doesn&apos;t understand your business, it can&apos;t recommend you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
