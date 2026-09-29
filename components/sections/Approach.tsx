import { SectionRule } from "../SectionHeader";
import Reveal from "../Reveal";

const METHOD = [
  {
    word: "Find",
    line: "We walk your customer journey like a buyer — ads, pages, forms, calls, inboxes, calendars.",
  },
  {
    word: "Prove",
    line: "We show you the break, with evidence: screens, timestamps, and steps to reproduce it.",
  },
  {
    word: "Fix",
    line: "We fix the actual problem. Sometimes that’s one form. Sometimes it’s a whole channel.",
  },
  {
    word: "Automate",
    line: "Then we automate the work that repeats, so the fix stays fixed.",
  },
];

const RESPONSES = [
  ["The form is broken", "We fix the form."],
  ["The landing page doesn’t convert", "We rebuild it."],
  ["Follow-up is slow", "We automate it."],
  ["There’s no referral channel", "We build one."],
  ["AI would genuinely make it better", "We deploy AI."],
];

export default function Approach() {
  return (
    <section id="approach" className="section-y relative border-t border-line bg-bg-raised" aria-labelledby="approach-title">
      <div className="container-x">
        <SectionRule index="02" label="The difference" aside="Our method" />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 id="approach-title" className="t-h2 text-balance text-fg">
              We don&apos;t start with software. We start with <span className="t-em">what&apos;s broken.</span>
            </h2>
          </Reveal>
        </div>

        {/* Signature: FIND → PROVE → FIX → AUTOMATE */}
        <ol className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {METHOD.map((m, i) => (
            <Reveal
              as="li"
              key={m.word}
              delay={i * 90}
              className={`group relative border-b border-line py-8 sm:px-6 sm:py-10 lg:border-b-0 ${
                i % 2 === 1 ? "sm:border-l" : ""
              } ${i > 0 ? "lg:border-l" : ""} ${i === 0 ? "sm:pl-0" : ""} lg:first:pl-0`}
            >
              <div className="flex items-center justify-between">
                <span className="t-mono text-fg-faint">0{i + 1}</span>
                {i < METHOD.length - 1 && (
                  <span className="t-mono hidden text-fg-faint lg:block" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
              <p className="mt-10 text-[clamp(2.75rem,4.3vw,3.75rem)] font-medium leading-none tracking-[-0.05em] text-fg transition-colors duration-300">
                {m.word}
                {i === 1 && <span className="text-signal">.</span>}
              </p>
              <p className="t-body mt-6 max-w-[28ch] text-fg-muted">{m.line}</p>
            </Reveal>
          ))}
        </ol>

        {/* Manifesto */}
        <div className="mt-24 grid grid-cols-1 gap-10 lg:mt-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="t-mono text-fg-subtle">The rule we work by</p>
            <p className="t-h3 mt-5 max-w-[20ch] text-balance text-fg">
              We don&apos;t sell technology first. We find something worth fixing.
            </p>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">How we respond to what we find</caption>
              <thead>
                <tr className="t-mono border-b border-line-strong text-fg-subtle">
                  <th scope="col" className="w-[58%] pb-3 font-normal">If</th>
                  <th scope="col" className="pb-3 pl-4 font-normal">Then</th>
                </tr>
              </thead>
              <tbody>
                {RESPONSES.map(([problem, response]) => (
                  <tr key={problem} className="group border-b border-line transition-colors hover:bg-white/[0.02]">
                    <td className="py-5 pr-4 align-top text-[0.975rem] text-fg-subtle transition-colors group-hover:text-fg-muted sm:text-lg sm:tracking-[-0.015em]">
                      {problem}
                    </td>
                    <td className="py-5 pl-4 align-top text-[0.975rem] font-medium text-fg sm:text-lg sm:tracking-[-0.015em]">
                      {response}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="t-body mt-6 text-fg-subtle">
              AI is a tool on the bench, not the headline. We use it when it makes the process
              better — and leave it out when it doesn&apos;t.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
