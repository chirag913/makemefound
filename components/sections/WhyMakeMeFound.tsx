import Reveal from "../Reveal";

const POINTS = [
  {
    title: "We show you the actual AI results.",
    description: "No vague “optimization score.”",
  },
  {
    title: "We focus on commercial searches.",
    description: "Not vanity keywords.",
  },
  {
    title: "We measure what changes.",
    description: "Track visibility, recommendations, citations, and competitors over time.",
  },
];

export default function WhyMakeMeFound() {
  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Not another SEO report.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 90}>
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-fg">{point.title}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{point.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
