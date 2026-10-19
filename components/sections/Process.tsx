import Section from "../Section";
import Reveal from "../Reveal";

const STEPS = [
  { name: "Investigate", body: "Understand the business, the customer journey and the current constraints — from your side and the customer’s." },
  { name: "Identify", body: "Separate verified problems from assumptions, and agree on the one or two worth solving first." },
  { name: "Implement", body: "Execute the agreed solution: outreach, journey fixes, workflows or automation — clearly scoped." },
  { name: "Measure & improve", body: "Review what happened against what we expected, and decide the next step together." },
];

export default function Process() {
  return (
    <Section id="process" label="How we work" titleId="process-title" title="Investigate first. Then do the work.">
      <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.name} delay={i * 80} className="border-t border-line-strong pt-6">
            <p className="t-small tabular-nums text-fg-subtle">Step {i + 1}</p>
            <h3 className="mt-3 text-xl font-medium tracking-[-0.025em] text-fg">{s.name}</h3>
            <p className="t-body mt-3 text-fg-muted">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
