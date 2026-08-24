"use client";

import Button from "../Button";
import Reveal from "../Reveal";
import { useCallModal } from "../CallModalContext";

const PIPELINE_STAGES = [
  { label: "Found", value: "47" },
  { label: "Qualified", value: "18" },
  { label: "Contacted", value: "18" },
  { label: "Booked", value: "5" },
];

export default function Hero() {
  const { openModal } = useCallModal();

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, var(--color-accent-soft), transparent)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Get More Commercial Cleaning Contracts
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            We help commercial cleaning companies find the right businesses, reach decision-makers,
            and turn cold prospects into qualified sales opportunities.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" onClick={() => openModal("hero")}>
              Book a Free Growth Call →
            </Button>
            <Button as="a" href="#how-it-works" variant="secondary">
              See How It Works
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-border-strong bg-bg-card/70 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
                Pipeline Snapshot
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-fg-subtle">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Active campaign
              </span>
            </div>

            <p className="mt-4 rounded-lg border border-border bg-white/[0.02] px-3.5 py-3 text-sm text-fg-muted">
              Target: Medical offices, Dallas TX
            </p>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {PIPELINE_STAGES.map((stage) => (
                <div
                  key={stage.label}
                  className="rounded-lg border border-border bg-white/[0.02] px-2 py-3 text-center"
                >
                  <p className="text-lg font-semibold text-fg">{stage.value}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wide text-fg-subtle">
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-white/[0.03] px-3.5 py-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-fg-subtle">
                  Sales-Ready Opportunities
                </p>
                <p className="mt-0.5 text-2xl font-semibold text-fg">5</p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                Ready for a call
              </span>
            </div>

            <p className="mt-3 text-center text-[11px] text-fg-subtle">
              Sample data for illustration
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
