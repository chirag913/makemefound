import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";

type Pattern = {
  tag: string;
  title: string;
  flow: { label: string; state: "ok" | "leak" | "fix" }[];
  situation: string;
  found: string;
  fix: string;
};

const PATTERNS: Pattern[] = [
  {
    tag: "Conversion path",
    title: "Paid clicks landing in the wrong place",
    flow: [
      { label: "Ad", state: "ok" },
      { label: "Homepage", state: "leak" },
      { label: "Service page", state: "fix" },
      { label: "Booking", state: "ok" },
    ],
    situation: "Ads get clicks. Calls don’t follow.",
    found: "Every ad points at the homepage. The buyer searched for one service and has to hunt for it.",
    fix: "Each ad gets a matching page with one clear next step. Tracking confirms which pages book.",
  },
  {
    tag: "Referral channel",
    title: "Referral partners nobody talks to",
    flow: [
      { label: "Partners", state: "ok" },
      { label: "No outreach", state: "leak" },
      { label: "Mapped", state: "fix" },
      { label: "Intros", state: "ok" },
    ],
    situation: "Best jobs come from referrals. Referrals are luck.",
    found: "The realtors, designers and property managers who meet your buyers first have never heard of you.",
    fix: "We map them in your target area, start the conversations, and hand you the ones who are interested.",
  },
  {
    tag: "Follow-up",
    title: "Inbound leads that go cold",
    flow: [
      { label: "Inquiry", state: "ok" },
      { label: "3h reply", state: "leak" },
      { label: "Instant", state: "fix" },
      { label: "Booked", state: "ok" },
    ],
    situation: "“Leads are low quality.”",
    found: "The first reply takes hours. By then the buyer has already booked the company that answered.",
    fix: "Instant response, a few qualifying questions, and booking — automated, with your team looped in.",
  },
];

const MORE = [
  "Form submits to an inbox nobody checks",
  "Missed calls after 5pm go to voicemail",
  "WhatsApp inquiries never reach the CRM",
  "Tracking counts one lead three times",
  "Quotes sent with no follow-up",
  "Past customers never asked for referrals",
];

export default function Examples() {
  return (
    <section id="problems" className="section-y border-t border-line" aria-labelledby="problems-title">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Problems we solve"
          aside="Patterns, not case studies"
          title={<span id="problems-title">The breaks we look for <span className="t-em">first.</span></span>}
          intro="These patterns show up across industries. The details change. The shape of the problem usually doesn’t."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 lg:mt-24 lg:grid-cols-3">
          {PATTERNS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <article className="card group flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="t-mono text-fg-subtle">{p.tag}</span>
                  <span className="t-mono text-fg-faint">P-0{i + 1}</span>
                </div>
                <h3 className="t-h3 mt-6 text-balance text-fg">{p.title}</h3>

                <MiniFlow flow={p.flow} />

                <dl className="space-y-5">
                  <div>
                    <dt className="t-mono text-fg-faint">Symptom</dt>
                    <dd className="t-body mt-1.5 text-fg-muted">{p.situation}</dd>
                  </div>
                  <div>
                    <dt className="t-mono flex items-center gap-2 text-signal">
                      <span className="dot dot-signal" aria-hidden="true" /> The break
                    </dt>
                    <dd className="t-body mt-1.5 text-fg-muted">{p.found}</dd>
                  </div>
                  <div>
                    <dt className="t-mono flex items-center gap-2 text-ok">
                      <span className="dot dot-ok" aria-hidden="true" /> The fix
                    </dt>
                    <dd className="t-body mt-1.5 text-fg">{p.fix}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4">
          <div className="card flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-10">
            <p className="t-mono flex-none text-fg-subtle">Also on the list</p>
            <ul className="flex flex-wrap gap-2">
              {MORE.map((m) => (
                <li key={m} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-fg-muted">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MiniFlow({ flow }: { flow: Pattern["flow"] }) {
  return (
    <div className="my-8 rounded-[var(--radius-md)] border border-line bg-bg/60 p-4" aria-hidden="true">
      <div className="flex items-center">
        {flow.map((f, i) => (
          <div key={f.label} className="flex min-w-0 flex-1 items-center last:flex-none">
            <span
              className={`h-2.5 w-2.5 flex-none rounded-full border ${
                f.state === "leak"
                  ? "border-signal bg-signal"
                  : f.state === "fix"
                    ? "border-ok bg-ok"
                    : "border-line-hover bg-transparent"
              }`}
            />
            {i < flow.length - 1 && (
              <span className={`mx-1.5 h-px flex-1 ${i === 0 ? "bg-signal-line" : "bg-line-strong"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {flow.map((f) => (
          <span
            key={f.label}
            className={`t-mono-sm text-[11px] leading-snug ${
              f.state === "leak" ? "text-signal line-through decoration-signal/60" : f.state === "fix" ? "text-ok" : "text-fg-subtle"
            }`}
          >
            {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}
