import { SectionRule } from "../SectionHeader";
import Reveal from "../Reveal";

const STEPS = [
  {
    name: "Understand",
    body: "The creator, the audience, and what the content needs to do — for the channel and for the business behind it.",
    out: "Channel brief",
  },
  {
    name: "Research",
    body: "Relevant formats, hooks and creative opportunities in your niche, before anyone touches the timeline.",
    out: "Format & hook notes",
  },
  {
    name: "Edit & package",
    body: "Cut, pace, design and package each piece for the platform it’s going to — long-form, Shorts, or both.",
    out: "Finished video + packaging",
  },
  {
    name: "Review",
    body: "Go through the work together and use the performance data that’s available to shape the next video.",
    out: "Notes for the next upload",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-y border-t border-line" aria-labelledby="process-title">
      <div className="container-x">
        <SectionRule index="03" label="Process" aside="Four steps, every video" />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <h2 id="process-title" className="t-h2 text-balance text-fg">
              A production process you can <span className="t-em text-accent-strong">set your calendar by.</span>
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="t-lead text-fg-muted">
              The same four steps for every video, so you always know what happens next and what you’ll
              receive.
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-0">
          {/* connecting rail (desktop) */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-[22px] hidden h-px bg-line-strong lg:block" />
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 90} className="relative lg:pr-8">
              <div className="flex items-center gap-4">
                <span className="relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-accent-line bg-bg text-accent">
                  <span className="t-code text-[13px]">0{i + 1}</span>
                </span>
                <span className="h-px flex-1 bg-line-strong lg:hidden" aria-hidden="true" />
              </div>
              <div className="panel mt-6 p-6 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                <h3 className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-fg">{s.name}</h3>
                <p className="t-body mt-4 text-fg-muted">{s.body}</p>
                <p className="mt-6 flex items-center gap-2 border-t border-line pt-4">
                  <span className="t-label text-fg-subtle">You get</span>
                  <span className="text-sm text-fg">{s.out}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
