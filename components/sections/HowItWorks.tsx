import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "We test hundreds of high-intent searches your customers could ask AI.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "We identify why competitors are appearing while your business is being overlooked.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We improve your website, entity presence, content, local authority, and relevant third-party mentions.",
  },
  {
    number: "04",
    title: "Measure",
    description:
      "We continuously track your visibility across AI search and show what's changing.",
  },
];

const TIMELINE = ["Baseline", "Optimization", "Authority", "Visibility", "Growth"];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            From invisible to recommended.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-bg-card/40 p-6">
                <span className="text-sm font-semibold text-accent">{step.number}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <div className="mt-16 overflow-x-auto">
            <div className="flex min-w-[560px] items-center justify-between gap-2 sm:min-w-0">
              {TIMELINE.map((stage, i) => (
                <div key={stage} className="flex flex-1 items-center">
                  <div className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        i === TIMELINE.length - 1 ? "bg-accent" : "bg-fg-subtle"
                      }`}
                    />
                    <span className="text-xs text-fg-muted">{stage}</span>
                  </div>
                  {i < TIMELINE.length - 1 && (
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
