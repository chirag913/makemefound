import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const STEPS = [
  {
    number: "01",
    title: "Find",
    description: "Identify businesses in your service area that are likely to need commercial cleaning.",
  },
  {
    number: "02",
    title: "Qualify",
    description: "Filter prospects based on location, business type, size, service requirements, and fit.",
  },
  {
    number: "03",
    title: "Reach",
    description: "Contact decision-makers using targeted outbound campaigns.",
  },
  {
    number: "04",
    title: "Follow Up",
    description: "Use structured follow-up to turn initial outreach into real conversations.",
  },
  {
    number: "05",
    title: "Book Opportunities",
    description:
      "When prospects show interest, move the opportunity to your sales team for a call, estimate, or site visit.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            We Build Your Outbound Client Acquisition System
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-bg-card/40 p-6">
                <span className="text-sm font-semibold text-accent">{step.number}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={350}>
          <div className="mt-16 overflow-x-auto">
            <div className="flex min-w-[560px] items-center justify-between gap-2 sm:min-w-0">
              {STEPS.map((step, i) => (
                <div key={step.number} className="flex flex-1 items-center">
                  <div className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        i === STEPS.length - 1 ? "bg-accent" : "bg-fg-subtle"
                      }`}
                    />
                    <span className="text-xs text-fg-muted">{step.title}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="mx-1 h-px flex-1 bg-border-strong sm:mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
