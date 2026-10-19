import { SectionRule } from "../SectionHeader";
import Reveal from "../Reveal";

const REASONS = [
  {
    title: "Direct collaboration",
    body: "You talk to the people editing your videos. No account-manager relay, no lost notes.",
  },
  {
    title: "Consistent delivery",
    body: "An agreed schedule and turnaround for every video, so publishing day isn’t a scramble.",
  },
  {
    title: "Thoughtful creative decisions",
    body: "Every cut, zoom and caption has a reason: clarity, pacing, or keeping the viewer with you.",
  },
  {
    title: "Research-informed editing",
    body: "We study the formats and hooks working in your niche before we start, not after.",
  },
  {
    title: "A streamlined process",
    body: "One place to upload footage, one review thread, clear revision rounds.",
  },
];

export default function Why() {
  return (
    <section id="about" className="section-y border-t border-line bg-bg-raised" aria-labelledby="about-title">
      <div className="container-x">
        <SectionRule index="04" label="Why MakeMeFound" aside="About us" />

        <div className="mt-10 grid grid-cols-1 gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 id="about-title" className="t-h2 text-balance text-fg">
                A small studio that treats your channel like a <span className="t-em text-accent-strong">body of work.</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="panel mt-10 p-6 sm:p-7">
                <span className="t-label text-accent">Early-stage, on purpose</span>
                <p className="t-body mt-3 text-fg-muted">
                  We&apos;re a new, small team. That means fewer creators at a time, more attention on each
                  one, and the people on your intro call are the people doing the work. We&apos;d rather
                  show you our process than make claims we can&apos;t back up.
                </p>
              </div>
            </Reveal>
          </div>

          <ul className="lg:col-span-6 lg:col-start-7">
            {REASONS.map((r, i) => (
              <Reveal
                as="li"
                key={r.title}
                delay={i * 60}
                className="group grid grid-cols-[2.5rem_1fr] gap-2 border-t border-line py-7 last:border-b"
              >
                <span className="t-label pt-1.5 text-fg-faint transition-colors group-hover:text-accent">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-fg">{r.title}</h3>
                  <p className="t-body mt-2 text-fg-muted">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
