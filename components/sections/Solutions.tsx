import { ReactNode } from "react";
import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";
import BottleneckButton from "../BottleneckButton";

type Service = {
  id: string;
  num: string;
  name: string;
  promise: string;
  problem: string;
  process: string[];
  examples: string[];
  cta: string;
  artifact: ReactNode;
};

const SERVICES: Service[] = [
  {
    id: "conversion-path-rescue",
    num: "01",
    name: "Conversion Path Rescue",
    promise: "Find and fix the leaks between the click and the sale.",
    problem:
      "You’re paying for attention, and somewhere between the ad and the sale it disappears. We don’t guess where. We test the journey ourselves, find something real, show you, then fix it.",
    process: ["Ad", "Landing page", "Form", "Booking", "CRM", "Follow-up", "Sales"],
    examples: [
      "Broken or buried calls to action",
      "Ads pointing to the wrong page",
      "Forms that don’t reach the CRM",
      "Booking friction on mobile",
      "Tracking that misreports",
      "WhatsApp and SMS handoff gaps",
    ],
    cta: "Audit my conversion path",
    artifact: <PathArtifact />,
  },
  {
    id: "referral-channel-build",
    num: "02",
    name: "Referral Channel Build",
    promise: "Build a steady source of introductions from the people who meet your buyers first.",
    problem:
      "For a remodeler, that’s realtors, interior designers and property managers. Give us a target geography. We map the referral ecosystem, start the relationships, and hand you the conversations that are genuinely interested.",
    process: ["Research", "Qualify", "Target list", "Outreach", "Follow-up", "Interest", "Handoff"],
    examples: [
      "Referral partner mapping by ZIP code",
      "Partner qualification by fit and activity",
      "Personal outreach and follow-up",
      "Warm handoff to your team",
      "A partner list you own",
      "Works for any business with referral sources",
    ],
    cta: "Map my referral partners",
    artifact: <ReferralArtifact />,
  },
  {
    id: "revenue-automation",
    num: "03",
    name: "Revenue Automation",
    promise: "Once the opportunity is real, take the repetitive work off your team.",
    problem:
      "Answering every inquiry in seconds. Asking the same qualifying questions. Booking, reminding, updating the CRM, routing to the right person. We automate the parts that repeat — and keep people on the conversations that close.",
    process: ["Capture", "Qualify", "Respond", "Book", "Route", "Report"],
    examples: [
      "AI voice for missed and after-hours calls",
      "AI chat and WhatsApp responses",
      "Lead qualification and routing",
      "Appointment booking and reminders",
      "CRM automation and integrations",
      "Dashboards your team actually reads",
    ],
    cta: "Show me what we’d automate",
    artifact: <AutomationArtifact />,
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="section-y border-t border-line" aria-labelledby="solutions-title">
      <div className="container-x">
        <SectionHeader
          index="04"
          label="Solutions"
          aside="Three ways we fix it"
          title={<span id="solutions-title">Three kinds of fixes. <span className="text-fg-subtle">One way of working.</span></span>}
          intro="Most engagements start with one of these. Many end up touching all three, because the chain is connected."
        />

        {/* Index */}
        <nav aria-label="Solutions" className="mt-14 hidden border-y border-line lg:mt-20 lg:grid lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`group flex items-baseline gap-4 py-5 transition-colors hover:bg-white/[0.02] focus-ring ${i > 0 ? "border-l border-line pl-6" : ""}`}
            >
              <span className="t-mono text-fg-faint">{s.num}</span>
              <span className="text-fg-muted transition-colors group-hover:text-fg">{s.name}</span>
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-4 lg:mt-12">
          {SERVICES.map((s, idx) => (
            <Reveal key={s.id}>
              <article
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="card grid scroll-mt-24 grid-cols-1 gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12"
              >
                <div className="flex flex-col lg:col-span-6">
                  <span className="t-mono text-fg-faint">{s.num} / 03</span>
                  <h3 id={`${s.id}-title`} className="mt-5 text-[clamp(1.9rem,3.2vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-fg">
                    {s.name}
                  </h3>
                  <p className="t-lead mt-4 max-w-[30ch] text-balance text-fg">{s.promise}</p>
                  <p className="t-body mt-6 max-w-[52ch] text-fg-muted">{s.problem}</p>

                  <div className="mt-8">
                    <p className="t-mono text-fg-subtle">Process</p>
                    <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
                      {s.process.map((p, i) => (
                        <li key={p} className="flex items-center gap-2">
                          <span className="t-mono-sm rounded-full border border-line px-2.5 py-1 text-fg-muted">{p}</span>
                          {i < s.process.length - 1 && <span className="text-fg-faint" aria-hidden="true">→</span>}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-8">
                    <p className="t-mono text-fg-subtle">Typical fixes</p>
                    <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                      {s.examples.map((e) => (
                        <li key={e} className="flex items-baseline gap-3 border-b border-line py-2.5 text-sm text-fg-muted">
                          <span className="h-px w-2.5 flex-none translate-y-[-0.3em] bg-fg-faint" aria-hidden="true" />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 lg:mt-auto lg:pt-10">
                    <BottleneckButton location={`solution_${s.id}`} label={s.cta} variant="secondary" />
                  </div>
                </div>

                <div className={`lg:col-span-6 lg:self-center ${idx % 2 === 1 ? "lg:order-first" : ""}`}>{s.artifact}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Artifacts — illustrative interface fragments, not client data
   ---------------------------------------------------------------------------- */

function ArtifactFrame({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <figure className="artifact overflow-hidden">
      <figcaption className="artifact-bar">
        <span className="t-mono-sm text-fg-muted">{title}</span>
        <span className="t-mono text-fg-faint">{meta}</span>
      </figcaption>
      {children}
    </figure>
  );
}

function PathArtifact() {
  const steps = [
    { s: "Ad", v: "Click-through", ok: true },
    { s: "Landing page", v: "Loads · message matches ad", ok: true },
    { s: "Form", v: "Submits · thank-you page shown", ok: true },
    { s: "CRM", v: "No record created", ok: false },
    { s: "Follow-up", v: "Never triggered", ok: false, downstream: true },
    { s: "Sales", v: "Lead never seen", ok: false, downstream: true },
  ];
  return (
    <ArtifactFrame title="conversion-path.test" meta="Example">
      <ol className="p-2 sm:p-3">
        {steps.map((st, i) => (
          <li
            key={st.s}
            className={`grid grid-cols-[1.25rem_1fr_auto] items-center gap-x-4 gap-y-1 rounded-[var(--radius-sm)] px-3 py-3 sm:grid-cols-[1.25rem_7rem_1fr_auto] ${!st.ok && !st.downstream ? "bg-signal-soft" : ""}`}
          >
            <span className="t-mono-sm text-fg-faint">{i + 1}</span>
            <span className={`text-sm font-medium ${st.downstream ? "text-fg-faint" : st.ok ? "text-fg" : "text-signal"}`}>
              {st.s}
            </span>
            <span className={`t-mono-sm col-start-2 row-start-2 min-w-0 sm:col-start-auto sm:row-start-auto ${st.downstream ? "text-fg-faint" : st.ok ? "text-fg-subtle" : "text-fg"}`}>
              {st.v}
            </span>
            <span className={`dot col-start-3 row-start-1 sm:col-start-auto ${st.ok || st.downstream ? "" : "dot-signal"}`} aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="border-t border-line px-5 py-4">
        <p className="t-mono-sm text-fg-muted">
          <span className="text-signal">Root cause</span> · form webhook disconnected after a site update
        </p>
      </div>
    </ArtifactFrame>
  );
}

function ReferralArtifact() {
  const zips = ["75024", "75025", "75093", "75033", "75034", "75036"];
  const partners = [
    { type: "Realtors", note: "Listing & buyer agents active in target ZIPs" },
    { type: "Interior designers", note: "Residential, renovation-heavy portfolios" },
    { type: "Property managers", note: "Single-family & small multifamily" },
  ];
  const stages = ["Researched", "Qualified", "Contacted", "Replied", "Interested", "Handed off"];
  return (
    <ArtifactFrame title="referral-map · remodeling" meta="Example brief">
      <div className="space-y-6 p-5 sm:p-6">
        <div>
          <p className="t-mono text-fg-subtle">Target geography</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {zips.map((z) => (
              <li key={z} className="t-mono-sm rounded-[var(--radius-sm)] border border-line-strong bg-bg/60 px-2.5 py-1 tabular-nums text-fg">
                {z}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="t-mono text-fg-subtle">Who meets the buyer first</p>
          <ul className="mt-3 divide-y divide-line rounded-[var(--radius-md)] border border-line">
            {partners.map((p) => (
              <li key={p.type} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="text-sm font-medium text-fg">{p.type}</span>
                <span className="t-mono-sm text-fg-subtle">{p.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="t-mono text-fg-subtle">Relationship pipeline</p>
          <ol className="mt-3 grid grid-cols-3 gap-1 sm:grid-cols-6">
            {stages.map((s, i) => (
              <li key={s} className="flex flex-col gap-2">
                <span className={`h-1 rounded-full ${i === stages.length - 1 ? "bg-ok" : "bg-line-hover"}`} style={{ opacity: 1 - i * 0.1 }} />
                <span className={`t-mono-sm text-[11px] ${i === stages.length - 1 ? "text-ok" : "text-fg-subtle"}`}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ArtifactFrame>
  );
}

function AutomationArtifact() {
  const log = [
    { t: "09:41:02", e: "New inquiry", d: "Web form · kitchen remodel" },
    { t: "09:41:05", e: "Instant reply", d: "SMS + email sent" },
    { t: "09:42:40", e: "Qualified", d: "ZIP in area · timeline 60 days · budget fit" },
    { t: "09:43:12", e: "Booked", d: "Design consult · Thu 10:30" },
    { t: "09:43:13", e: "Routed", d: "CRM updated · owner notified" },
    { t: "Wed 18:00", e: "Reminder", d: "Confirmation + directions sent" },
  ];
  return (
    <ArtifactFrame title="lead-flow.log" meta="Example flow">
      <ol className="p-2 sm:p-3">
        {log.map((l, i) => (
          <li key={l.t} className="grid grid-cols-[5.25rem_1fr] items-baseline gap-x-3 gap-y-0.5 rounded-[var(--radius-sm)] px-3 py-2.5 sm:grid-cols-[5.5rem_7rem_1fr]">
            <span className="t-mono-sm tabular-nums text-fg-faint">{l.t}</span>
            <span className={`text-sm font-medium ${i === 3 ? "text-ok" : "text-fg"}`}>{l.e}</span>
            <span className="t-mono-sm col-start-2 text-fg-subtle sm:col-start-auto sm:truncate">{l.d}</span>
          </li>
        ))}
      </ol>
      <div className="flex items-center justify-between border-t border-line px-5 py-4">
        <span className="t-mono-sm text-fg-muted">Inquiry → booked</span>
        <span className="t-mono-sm tabular-nums text-fg">2m 10s</span>
      </div>
    </ArtifactFrame>
  );
}
