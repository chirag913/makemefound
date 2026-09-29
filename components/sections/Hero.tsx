import Button from "../Button";
import BottleneckButton from "../BottleneckButton";
import JourneyScan from "../artifacts/JourneyScan";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-bg fade-mask pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="container-x pb-20 pt-14 sm:pt-20 lg:pb-32 lg:pt-24">
        <p className="t-mono flex flex-wrap items-center gap-x-3 gap-y-2 text-fg-muted">
          <span className="dot dot-live" aria-hidden="true" />
          Customer acquisition diagnostics &amp; build
          <span className="hidden text-fg-faint sm:inline">/</span>
          <span className="text-fg-subtle">For businesses that sell a considered service</span>
        </p>

        <h1 className="t-display mt-8 text-balance text-fg sm:mt-10 sm:text-wrap">
          <span className="sm:block">Your growth is stuck</span>{" "}
          <span className="sm:block">
            somewhere <span className="t-em">specific.</span>
          </span>{" "}
          <span className="text-fg-subtle sm:block">We find it. Then we fix it.</span>
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="t-lead max-w-[34rem] text-pretty text-fg-muted">
              We test your customer journey the way a buyer would, from the ad to the booked
              call. We show you exactly where leads leak, with evidence. Then we build the fix:
              the page, the follow-up, the referral channel, or the automation.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BottleneckButton location="hero" />
              <Button as="a" href="#process" variant="secondary">
                See how we work
              </Button>
            </div>

            <dl className="mt-12 grid max-w-[34rem] grid-cols-3 border-t border-line pt-6">
              {[
                ["Find", "the break"],
                ["Prove", "it to you"],
                ["Fix", "& automate"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm font-medium text-fg">{k}</dt>
                  <dd className="mt-0.5 text-sm text-fg-subtle">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <JourneyScan />
          </div>
        </div>
      </div>
    </section>
  );
}
