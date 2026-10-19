import Section from "../Section";
import Reveal from "../Reveal";

const SERVICES = [
  {
    id: "acquisition",
    name: "Customer acquisition",
    problem: "Not enough of the right people know you exist, or new business depends on referrals arriving by chance.",
    work: [
      "Define who the best-fit customers and referral partners actually are",
      "Research and verify prospects in your target market",
      "Write and run targeted outreach, including follow-up",
      "Build relationships with partners who already meet your customers",
    ],
    deliverable: "A researched prospect or partner list, outreach that runs on a schedule, and interested conversations handed to you.",
  },
  {
    id: "conversion",
    name: "Conversion optimization",
    problem: "People find you and show interest, but too few reach the next meaningful step — a call, a consultation, a quote.",
    work: [
      "Walk the journey the way a prospect does, from ad or search to booking",
      "Find friction: unclear pages, broken forms, slow or missing confirmations",
      "Separate verified problems from assumptions before changing anything",
      "Fix the parts of the journey that matter, and set up tracking to check them",
    ],
    deliverable: "A written audit of what we found and why it matters, followed by the agreed fixes, implemented and tested.",
  },
  {
    id: "systems",
    name: "Revenue systems & automation",
    problem: "Enquiries arrive, but replies are slow, qualification is inconsistent, and too much depends on someone remembering.",
    work: [
      "Map how a lead moves from first contact to a booked conversation",
      "Connect capture, qualification, follow-up, scheduling and your CRM",
      "Automate the steps that repeat; keep people on the steps that need judgment",
      "Use AI agents only where they genuinely do the job better",
    ],
    deliverable: "Working workflows in the tools you already use where possible, with documentation and a hand-over.",
  },
];

export default function Services() {
  return (
    <Section id="services" label="Services" titleId="services-title" title="Three ways we help.">
      <Reveal delay={80}>
        <p className="t-lead mt-6 max-w-[42rem] text-fg-muted">
          Each engagement starts with the problem, not the tool. Most projects sit in one of these areas;
          some touch all three, because acquisition, conversion and follow-up are connected.
        </p>
      </Reveal>

      <ul className="mt-16 border-b border-line lg:mt-20">
        {SERVICES.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 60}>
            <article id={`service-${s.id}`} aria-labelledby={`service-${s.id}-title`} className="grid scroll-mt-24 grid-cols-1 gap-8 border-t border-line py-12 md:grid-cols-9 md:gap-10 lg:py-16">
              <div className="md:col-span-3">
                <p className="t-small tabular-nums text-fg-subtle">0{i + 1}</p>
                <h3 id={`service-${s.id}-title`} className="t-h3 mt-3 text-fg">
                  {s.name}
                </h3>
              </div>
              <dl className="grid grid-cols-1 gap-8 md:col-span-6">
                <div>
                  <dt className="t-small text-fg-subtle">The problem</dt>
                  <dd className="t-lead mt-2 text-fg">{s.problem}</dd>
                </div>
                <div>
                  <dt className="t-small text-fg-subtle">What we do</dt>
                  <dd className="mt-3">
                    <ul className="t-body space-y-2 text-fg-muted">
                      {s.work.map((w) => (
                        <li key={w} className="flex gap-3">
                          <span className="mt-[0.75em] h-px w-3 flex-none bg-fg-subtle" aria-hidden="true" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="border-t border-line pt-6">
                  <dt className="t-small text-fg-subtle">What you get</dt>
                  <dd className="t-body mt-2 text-fg">{s.deliverable}</dd>
                </div>
              </dl>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
