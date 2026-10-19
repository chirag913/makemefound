import Section from "../Section";
import Reveal from "../Reveal";
import { OWN_CHANNELS } from "@/lib/site";

const REASONS = [
  { title: "Direct collaboration", body: "You talk to the people editing your videos. No account-manager relay." },
  { title: "Consistent delivery", body: "An agreed schedule and turnaround for every video, so publishing day isn’t a scramble." },
  { title: "Thoughtful creative decisions", body: "Every cut, zoom and caption has a reason: clarity, pacing, or keeping the viewer with you." },
  { title: "Research-informed editing", body: "We study the formats and hooks working in your niche before we start." },
  { title: "A streamlined process", body: "One place to upload footage, one review thread, clear revision rounds." },
];

export default function Why() {
  return (
    <Section id="about" label="About" titleId="about-title" title="A small studio that treats your channel like a body of work.">
      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-9 lg:gap-10">
        <Reveal delay={80} className="lg:col-span-4">
          <p className="t-lead text-fg-muted">
            We&apos;re a new, small team — fewer creators at a time, more attention on each one, and
            the people on your intro call are the people doing the work. We run our own channels, so
            we test formats on ourselves first.
          </p>
          <ul className="mt-8 border-t border-line">
            {OWN_CHANNELS.map((c) => (
              <li key={c.handle} className="border-b border-line">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between gap-4 py-4 focus-ring">
                  <span>
                    <span className="block font-medium text-fg">{c.name}</span>
                    <span className="t-small block text-fg-subtle">{c.about}</span>
                  </span>
                  <span className="t-small flex-none text-fg-muted transition-colors group-hover:text-fg">
                    YouTube <span className="arrow-nudge inline-block">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-5">
          {REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 60}>
              <h3 className="font-medium tracking-[-0.02em] text-fg">{r.title}</h3>
              <p className="t-body mt-2 text-fg-muted">{r.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
