import Button from "../Button";
import BottleneckButton from "../BottleneckButton";
import Reveal from "../Reveal";

const NEXT = [
  ["You tell us where to look", "Your site, your market, and where growth feels stuck. Two minutes."],
  ["We test your journey", "Before we talk. As a buyer would, on the devices they use."],
  ["We show you what we found", "Then you decide if it’s worth fixing. No obligation to buy."],
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line" aria-labelledby="final-cta-title">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000,transparent_75%)]" />
      <div className="container-x py-[clamp(112px,16vw,224px)]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-8">
          <p className="t-mono flex items-center gap-3 text-fg-muted">
            <span className="dot dot-live" aria-hidden="true" /> Start with a diagnosis
          </p>
          <h2 id="final-cta-title" className="mt-8 text-[clamp(2.5rem,5vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-fg">
            <span className="sm:block">There&apos;s probably a</span>{" "}
            <span className="sm:block">bottleneck somewhere.</span>{" "}
            <span className="t-em sm:block">Let&apos;s find it.</span>
          </h2>
          <p className="t-lead mt-8 max-w-xl text-fg-muted">
            Tell us where to look. We&apos;ll review your customer journey before we talk, so the
            first conversation is about your business — not a pitch.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <BottleneckButton location="final_cta" />
            <Button as="a" href="#process" variant="secondary">
              See how we work
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-4 lg:self-end">
          <div className="card p-6 sm:p-7">
            <p className="t-mono text-fg-subtle">What happens next</p>
            <ol className="mt-5 divide-y divide-line">
              {NEXT.map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2rem_1fr] py-4 first:pt-0 last:pb-0">
                  <span className="t-mono pt-1 tabular-nums text-fg-faint">0{i + 1}</span>
                  <div>
                    <p className="text-[0.975rem] font-medium tracking-[-0.015em] text-fg">{t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-subtle">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
