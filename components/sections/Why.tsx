import Section from "../Section";
import Reveal from "../Reveal";

const PRINCIPLES = [
  { title: "Research before recommendations", body: "We look at your market and your customer journey before suggesting what to build." },
  { title: "Clearly defined work", body: "Every engagement has an agreed scope, a deliverable and a way to review it." },
  { title: "Practical automation", body: "We automate what repeats and keep people where judgment matters. AI only where it earns its place." },
  { title: "Honest about fit", body: "If we can’t help, or the problem is somewhere we don’t work, we’ll tell you." },
];

export default function Why() {
  return (
    <Section id="about" label="About" titleId="about-title" title="Research, execution and practical automation — applied to one problem at a time.">
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-9 lg:gap-10">
        <Reveal delay={80} className="lg:col-span-4">
          <p className="t-lead text-fg-muted">
            MakeMeFound is a small, founder-led firm. We combine research, hands-on execution and
            practical automation to solve specific customer acquisition problems. You work directly with
            the people doing the work, and we take on a limited number of projects at a time.
          </p>
          <p className="t-body mt-6 text-fg-muted">
            We&apos;re early-stage and say so. We&apos;d rather show you how we think about your business on a
            first call than make claims we can&apos;t back up.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-5">
          {PRINCIPLES.map((r, i) => (
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
