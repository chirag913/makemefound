import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";

const TOOLS = [
  { name: "AI voice", when: "Missed calls, after-hours calls, and first-touch qualification." },
  { name: "AI chat", when: "Answering the same questions on your site, instantly, around the clock." },
  { name: "CRM automation", when: "Every lead recorded, owned, followed up and never lost." },
  { name: "WhatsApp & SMS", when: "Buyers who won’t fill a form but will send a message." },
  { name: "Booking & routing", when: "The right lead on the right calendar, with reminders." },
  { name: "Integrations & APIs", when: "Ads, forms, CRM, phone and inbox talking to each other." },
  { name: "Tracking & dashboards", when: "Knowing which source produced which revenue." },
  { name: "Pages & forms", when: "Often the simplest fix. Sometimes the whole fix." },
];

export default function Technology() {
  return (
    <section id="technology" className="section-y border-t border-line" aria-labelledby="technology-title">
      <div className="container-x">
        <SectionHeader
          index="07"
          label="Technology"
          aside="Infrastructure, not the pitch"
          title={<span id="technology-title">Use whatever technology <span className="t-em">actually</span> solves the problem.</span>}
          intro="We build with AI, automation and integrations every day. We just don’t lead with them. The tool is chosen after the problem is proven."
        />

        <Reveal className="mt-16 lg:mt-24">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t, i) => (
              <li key={t.name} className="group flex flex-col bg-bg p-6 transition-colors duration-300 hover:bg-surface sm:p-7">
                <span className="t-mono tabular-nums text-fg-faint transition-colors group-hover:text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-10">
                  <p className="text-lg font-medium tracking-[-0.02em] text-fg">{t.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-subtle transition-colors group-hover:text-fg-muted">
                    <span className="t-mono mr-1.5 text-fg-faint">When</span>
                    {t.when}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10">
          <p className="t-body max-w-2xl text-fg-subtle">
            We work inside the CRM, ad accounts and phone systems you already have wherever we can.
            Replacing a tool is a last resort, and only when we can show you why.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
