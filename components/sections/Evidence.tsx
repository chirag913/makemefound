import { SectionRule } from "../SectionHeader";
import Reveal from "../Reveal";

const JOURNEY = [
  { s: "Ad", ok: true },
  { s: "Page", ok: true },
  { s: "CTA", ok: true },
  { s: "Form", ok: false },
  { s: "Booking", ok: null },
];

const PRINCIPLES = [
  ["You see it first.", "The finding comes before the proposal. If we can’t find something real, we tell you."],
  ["It’s specific.", "Not “improve your funnel.” This step, on this device, fails in this way."],
  ["You can check it.", "Every finding has steps to reproduce. Try it yourself before you trust us."],
];

export default function Evidence() {
  return (
    <section id="proof" className="section-y relative overflow-hidden border-t border-line" aria-labelledby="proof-title">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(180deg,transparent,#000_30%,#000_70%,transparent)]" />
      <div className="container-x">
        <SectionRule index="06" label="Evidence" aside="Before you buy anything" />

        <div className="mt-10 grid grid-cols-1 gap-16 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 id="proof-title" className="t-h2 text-balance text-fg">
                We show you the problem <span className="t-em">before</span> asking you to buy the solution.
              </h2>
            </Reveal>

            <dl className="mt-12 divide-y divide-line border-y border-line">
              {PRINCIPLES.map(([t, d], i) => (
                <Reveal key={t} delay={i * 70} className="grid grid-cols-[2rem_1fr] gap-2 py-5">
                  <span className="t-mono pt-1 text-fg-faint">0{i + 1}</span>
                  <div>
                    <dt className="font-medium tracking-[-0.015em] text-fg">{t}</dt>
                    <dd className="t-body mt-1 text-fg-muted">{d}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <Report />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Report() {
  return (
    <figure className="artifact overflow-hidden">
      <figcaption className="artifact-bar">
        <span className="t-mono-sm text-fg-muted">Findings report · Finding 01 of 03</span>
        <span className="t-mono text-fg-faint">Sample</span>
      </figcaption>

      {/* Meta */}
      <dl className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
        {[
          ["Severity", <span key="s" className="flex items-center gap-2 text-signal"><span className="dot dot-signal" />High</span>],
          ["Device", "Desktop + mobile"],
          ["Tested", "3 submissions"],
          ["Reached CRM", <span key="c" className="tabular-nums text-signal">0 of 3</span>],
        ].map(([k, v], i) => (
          <div key={String(k)} className={`px-5 py-4 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}>
            <dt className="t-mono text-fg-faint">{k}</dt>
            <dd className="t-mono-sm mt-1.5 text-fg">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Observed journey */}
      <div className="border-b border-line px-5 py-6 sm:px-6">
        <p className="t-mono text-fg-subtle">Observed customer journey</p>
        <ol className="mt-5 flex items-center" aria-label="Ad, page and call to action pass. The form fails. Booking is never reached.">
          {JOURNEY.map((j, i) => (
            <li key={j.s} className="flex min-w-0 flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-[11px] ${
                    j.ok === false
                      ? "border-signal bg-signal-soft text-signal"
                      : j.ok
                        ? "border-line-hover text-fg-muted"
                        : "border-dashed border-line-strong text-fg-faint"
                  }`}
                  aria-hidden="true"
                >
                  {j.ok === false ? "!" : j.ok ? "✓" : "–"}
                </span>
                <span className={`t-mono-sm text-[11px] ${j.ok === false ? "text-signal" : j.ok ? "text-fg-muted" : "text-fg-faint"}`}>
                  {j.s}
                </span>
              </div>
              {i < JOURNEY.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mx-1 mb-6 h-px flex-1 sm:mx-2 ${i >= 3 ? "border-t border-dashed border-line-strong" : i === 2 ? "bg-signal-line" : "bg-line-hover"}`}
                />
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Finding */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-line px-5 py-6 sm:border-b-0 sm:border-r sm:px-6">
          <p className="t-mono text-signal">What happens</p>
          <p className="mt-3 text-[0.975rem] leading-relaxed text-fg">
            The quote form submits and shows “Thanks, we’ll be in touch.” No record reaches the CRM. No
            one is notified. The buyer waits for a call that never comes.
          </p>
          <p className="t-mono mt-6 text-fg-subtle">Steps to reproduce</p>
          <ol className="t-mono-sm mt-2 space-y-1.5 text-fg-muted">
            <li>1 · Open /get-a-quote</li>
            <li>2 · Submit with a test name + phone</li>
            <li>3 · Check CRM and owner inbox</li>
          </ol>
        </div>
        <div className="px-5 py-6 sm:px-6">
          <p className="t-mono text-ok">Recommended fix</p>
          <ul className="mt-3 space-y-2.5 text-[0.975rem] leading-relaxed text-fg-muted">
            <li className="flex gap-3"><span className="dot dot-ok mt-[0.6em]" aria-hidden="true" />Reconnect the form to the CRM</li>
            <li className="flex gap-3"><span className="dot dot-ok mt-[0.6em]" aria-hidden="true" />Instant reply to the buyer by SMS and email</li>
            <li className="flex gap-3"><span className="dot dot-ok mt-[0.6em]" aria-hidden="true" />Alert the owner on every new lead</li>
            <li className="flex gap-3"><span className="dot dot-ok mt-[0.6em]" aria-hidden="true" />Weekly automated test submission</li>
          </ul>
          <p className="t-mono mt-6 text-fg-subtle">Est. effort</p>
          <p className="t-mono-sm mt-2 text-fg">Small · days, not weeks</p>
        </div>
      </div>
    </figure>
  );
}
