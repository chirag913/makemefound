import Section from "../Section";
import Reveal from "../Reveal";

const STEPS = [
  { name: "Understand", body: "The creator, the audience, and what the content needs to do for the channel and the business behind it." },
  { name: "Research", body: "Relevant formats, hooks and creative opportunities in your niche, before anyone touches the timeline." },
  { name: "Edit & package", body: "Cut, pace, design and package each piece for the platform it’s going to — long-form, Shorts, or both." },
  { name: "Review", body: "Go through the work together and use the performance data that’s available to shape the next video." },
];

export default function Process() {
  return (
    <Section id="process" label="Process" titleId="process-title" title="The same four steps, every video.">
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
