import Section from "../Section";
import Reveal from "../Reveal";

const EXAMPLES = [
  {
    title: "A qualified prospect and outreach system",
    situation: "A B2B service business wants a steadier pipeline than inbound alone provides.",
    approach: "Define the ideal customer, research and verify accounts, write targeted sequences, run outreach and follow-up.",
    outcome: "A verified prospect list, an outreach cadence the team can see, and interested replies routed to sales.",
  },
  {
    title: "A local referral partner program",
    situation: "A local business wins its best work through referrals, but only from a few informal relationships.",
    approach: "Map the professionals who meet your customers first in your area, qualify them, open conversations and keep them warm.",
    outcome: "A partner list you own, a regular outreach rhythm, and introductions handed to you with context.",
  },
  {
    title: "An advertising-to-consultation journey",
    situation: "Ads produce clicks and enquiries, but few turn into booked consultations.",
    approach: "Test the journey end to end, find where people drop or stall, then fix pages, forms, booking and confirmations.",
    outcome: "An audit of the journey, the agreed fixes implemented, and tracking to see whether they worked.",
  },
  {
    title: "Automated enquiry follow-up and qualification",
    situation: "Enquiries come in through several channels and replies depend on who is free.",
    approach: "Respond instantly, ask the qualifying questions, book suitable leads, and record everything in the CRM.",
    outcome: "A documented workflow in your existing tools, with people kept in the loop where judgment matters.",
  },
];

export default function Examples() {
  return (
    <Section id="examples" label="Example engagements" titleId="examples-title" title="The kind of projects we take on.">
      <Reveal delay={80}>
        <p className="t-lead mt-6 max-w-[42rem] text-fg-muted">
          These are examples of potential engagements to show how we work — not completed client case
          studies.
        </p>
      </Reveal>

      <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:mt-16">
        {EXAMPLES.map((e, i) => (
          <Reveal as="li" key={e.title} delay={(i % 2) * 80} className="border-t border-line-strong pt-6">
            <article aria-labelledby={`example-${i}`}>
              <p className="t-small text-fg-subtle">Example {i + 1}</p>
              <h3 id={`example-${i}`} className="mt-3 text-xl font-medium tracking-[-0.025em] text-fg sm:text-2xl">
                {e.title}
              </h3>
              <dl className="mt-6 space-y-4">
                {[
                  ["Situation", e.situation],
                  ["What we’d do", e.approach],
                  ["What you’d have", e.outcome],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-1 gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                    <dt className="t-small text-fg-subtle">{k}</dt>
                    <dd className="t-body text-fg-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
