import Button from "../Button";
import BookCallButton from "../BookCallButton";
import Reveal from "../Reveal";
import { SECONDARY_CTA, SERVICES } from "@/lib/nav";

const SERVICE_LINES: Record<(typeof SERVICES)[number]["id"], string> = {
  acquisition: "Prospect research, targeted outreach and referral partnerships.",
  conversion: "Removing friction between first contact and the next real step.",
  systems: "Lead capture, follow-up, scheduling and CRM workflows that run reliably.",
};

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-16 sm:pt-24 lg:pt-32">
      <div className="container-x">
        <h1 id="hero-title" className="t-display max-w-[13ch] text-balance text-fg">
          Find what&apos;s blocking your growth. <span className="text-fg-subtle">Fix it.</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <p className="t-lead max-w-[38rem] text-pretty text-fg-muted lg:col-span-7">
            MakeMeFound helps businesses find new customer opportunities, improve the path from
            enquiry to sale, and build systems that make growth more consistent.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <BookCallButton location="hero" />
            <Button as="a" href="#process" variant="secondary">
              {SECONDARY_CTA}
            </Button>
          </div>
        </div>

        <Reveal className="mt-20 lg:mt-28">
          <nav aria-label="What we do">
            <ul className="grid grid-cols-1 border-t border-line md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <li key={s.id} className={`border-b border-line md:border-b-0 ${i > 0 ? "md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}>
                  <a href={`#service-${s.id}`} className="group block py-6 focus-ring md:py-8">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="text-lg font-medium tracking-[-0.025em] text-fg">{s.label}</span>
                      <span className="arrow-nudge t-small text-fg-subtle transition-colors group-hover:text-fg" aria-hidden="true">
                        →
                      </span>
                    </span>
                    <span className="t-small mt-2 block text-fg-muted">{SERVICE_LINES[s.id]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
