import Reveal from "../Reveal";

const PAIN_POINTS = [
  "New business depends heavily on referrals",
  "Owners don't have time to prospect",
  "Salespeople don't have enough qualified prospects",
  "Cold outreach is inconsistent",
  "Follow-ups get missed",
  "Competitors are reaching potential accounts first",
];

export default function Problem() {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Great Service Businesses Shouldn&apos;t Have to Rely on Referrals Alone
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-fg-muted">
            Most B2B service businesses struggle to grow for the same reasons.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PAIN_POINTS.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-xl border border-border bg-bg-card/40 px-5 py-4 text-sm text-fg-muted"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-accent"
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
                {point}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
