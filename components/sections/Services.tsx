import Section from "../Section";
import Reveal from "../Reveal";

const SERVICES = [
  {
    id: "long-form",
    name: "Long-form YouTube editing",
    body: "You record. We shape it into something people watch to the end — a clear story, a strong open, and no dead air between the ideas that matter.",
    points: ["Storytelling and pacing", "Hook refinement", "B-roll and visual support", "Captions, sound and finishing"],
  },
  {
    id: "short-form",
    name: "Short-form repurposing",
    body: "Your long videos already contain your best shorts. We find the moments that stand on their own and rebuild them for vertical, sound-off viewing.",
    points: ["YouTube Shorts and vertical clips", "Strong opening moments", "Captions and platform formatting", "One recording, multiple assets"],
  },
  {
    id: "packaging",
    name: "Content packaging",
    body: "A great video with the wrong title and thumbnail doesn’t get seen. We work on the packaging with you, from the topic itself to the frame people click.",
    points: ["Title brainstorming", "Thumbnail concepts and feedback", "Topic and format research", "Content performance review"],
  },
];

export default function Services() {
  return (
    <Section id="services" label="Services" titleId="services-title" title="Three ways we help your videos land.">
      <Reveal delay={80}>
        <p className="t-lead mt-6 max-w-[40rem] text-fg-muted">
          Book one or combine them. Some creators want full edits; others need shorts or a second
          opinion on packaging. We&apos;ll scope what fits your channel.
        </p>
      </Reveal>

      <ul className="mt-16 border-b border-line lg:mt-20">
        {SERVICES.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 60}>
            <article id={`service-${s.id}`} className="grid scroll-mt-24 grid-cols-1 gap-6 border-t border-line py-10 md:grid-cols-9 md:gap-10 lg:py-14">
              <h3 className="t-h3 text-fg md:col-span-4">{s.name}</h3>
              <div className="md:col-span-5">
                <p className="t-body text-fg-muted">{s.body}</p>
                <ul className="t-small mt-6 grid grid-cols-1 gap-x-6 gap-y-2 text-fg sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-[0.6em] h-px w-3 flex-none bg-fg-subtle" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
