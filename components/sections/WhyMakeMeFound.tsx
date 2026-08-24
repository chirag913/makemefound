import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const POINTS = [
  {
    title: "More Opportunities",
    description: "Keep your sales pipeline filled with potential commercial accounts.",
  },
  {
    title: "Targeted Prospecting",
    description: "Reach businesses that actually fit your service area and ideal customer profile.",
  },
  {
    title: "Consistent Follow-Up",
    description: "Stop losing opportunities because prospects weren't followed up with.",
  },
  {
    title: "Less Time Prospecting",
    description:
      "Your team spends more time closing and servicing accounts instead of searching for them.",
  },
];

export default function WhyMakeMeFound() {
  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Why MakeMeFound</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            You Focus on Cleaning. We Focus on Finding the Next Contract.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 80}>
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
