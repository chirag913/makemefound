"use client";

import Button from "../Button";
import Reveal from "../Reveal";
import { useAuditModal } from "../AuditModalContext";

const RESULTS = [
  { name: "Competitor A", status: "recommended" as const },
  { name: "Competitor B", status: "recommended" as const },
  { name: "Competitor C", status: "recommended" as const },
  { name: "Client", status: "missing" as const },
];

export default function Hero() {
  const { openModal } = useAuditModal();

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
            Get Found When Customers Ask AI.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            MakeMeFound helps local businesses become visible, credible, and recommended across
            ChatGPT, Gemini, Perplexity, and Google AI.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" onClick={() => openModal("hero")}>
              Get My Free AI Visibility Audit →
            </Button>
            <Button as="a" href="#how-it-works" variant="secondary">
              See How It Works
            </Button>
          </div>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-subtle">
            We test the searches your customers are already making — then show you exactly where
            you&apos;re being missed.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-border-strong bg-bg-card/70 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-fg-subtle">
                AI Search Result
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] text-fg-subtle">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                ChatGPT
              </span>
            </div>

            <p className="mt-4 rounded-lg border border-border bg-white/[0.02] px-3.5 py-3 text-sm text-fg-muted">
              &ldquo;Best dental implant clinics in Dallas&rdquo;
            </p>

            <ul className="mt-4 space-y-2">
              {RESULTS.map((item, index) => (
                <li
                  key={item.name}
                  className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm ${
                    item.status === "missing"
                      ? "border-accent/40 bg-accent-soft"
                      : "border-border bg-white/[0.02]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                        item.status === "missing"
                          ? "bg-accent/20 text-accent"
                          : "bg-white/[0.06] text-fg-subtle"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className={item.status === "missing" ? "text-fg" : "text-fg-muted"}>
                      {item.name}
                    </span>
                  </span>
                  {item.status === "missing" && (
                    <span className="text-xs font-medium text-accent">missing</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-white/[0.03] px-3.5 py-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-fg-subtle">
                  AI Visibility Score
                </p>
                <p className="mt-0.5 text-2xl font-semibold text-fg">18%</p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                Opportunity detected
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
