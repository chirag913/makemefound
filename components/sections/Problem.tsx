import Section from "../Section";
import Reveal from "../Reveal";

const BREAKPOINTS = [
  { title: "Not enough qualified opportunities", body: "The pipeline is thin, or full of people who were never a good fit." },
  { title: "Too much depends on referrals", body: "Good months follow good luck. Outreach happens in bursts, when someone has time." },
  { title: "Prospects enquire but don’t convert", body: "People click, call or fill in the form — then the journey loses them before the next step." },
  { title: "Follow-up is slow or inconsistent", body: "Enquiries wait hours or days for a reply, and second touches depend on memory." },
  { title: "Manual work caps growth", body: "Copying details between tools, chasing reminders and updating the CRM by hand." },
];

export default function Problem() {
  return (
    <Section id="problem" label="The problem" titleId="problem-title" title="Growth rarely stalls for one reason.">
      <Reveal delay={80}>
        <p className="t-lead mt-6 max-w-[42rem] text-fg-muted">
          It can break at different points between finding a customer and closing the sale. These are
          the places we usually look first — your business may have one, several, or none of them.
        </p>
      </Reveal>
      <ol className="mt-14 border-b border-line lg:mt-16">
        {BREAKPOINTS.map((b, i) => (
          <Reveal as="li" key={b.title} delay={i * 50}>
            <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-t border-line py-6 md:grid-cols-[3rem_1fr_1fr] md:gap-x-10">
              <span className="t-small tabular-nums text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-medium tracking-[-0.02em] text-fg">{b.title}</h3>
              <p className="t-body col-start-2 text-fg-muted md:col-start-auto">{b.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <Reveal>
        <p className="t-body mt-10 max-w-[42rem] text-fg-muted">
          <span className="text-fg">We investigate before we recommend anything.</span> Sometimes the answer is
          outreach. Sometimes it&apos;s a conversion problem. Sometimes it&apos;s automation. We sell the
          outcome and a clearly defined piece of work — not technology for its own sake.
        </p>
      </Reveal>
    </Section>
  );
}
