"use client";

import { useState } from "react";
import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";

const STAGES = [
  {
    name: "Traffic",
    symptom: "“Ads stopped working.”",
    breaks: [
      "Ads send clicks to the homepage instead of the page that sells",
      "Tracking double-counts conversions, so budget flows to the wrong campaigns",
      "Referral partners exist, but nobody asks them for introductions",
    ],
  },
  {
    name: "Landing page",
    symptom: "“We get visits, not calls.”",
    breaks: [
      "The page answers a different question than the ad asked",
      "The call to action sits below three screens of scrolling on mobile",
      "Nothing on the page says why you, not the next result",
    ],
  },
  {
    name: "Lead",
    symptom: "“Form fills feel random.”",
    breaks: [
      "The form submits, but the record never reaches the CRM",
      "Calendar links break on mobile browsers",
      "WhatsApp and SMS inquiries live on one person’s phone",
    ],
  },
  {
    name: "Follow-up",
    symptom: "“Leads are low quality.”",
    breaks: [
      "First response takes hours; the buyer already called someone else",
      "After-hours calls go to a full voicemail",
      "No second touch — one email, then silence",
    ],
  },
  {
    name: "Sales",
    symptom: "“Sales can’t close.”",
    breaks: [
      "Nobody knows which leads came from which channel",
      "Quotes go out with no follow-up sequence",
      "Qualified and unqualified leads get the same treatment",
    ],
  },
  {
    name: "Revenue",
    symptom: "“We don’t know what’s working.”",
    breaks: [
      "Revenue isn’t tied back to the source that created it",
      "Past customers are never asked for referrals or repeat work",
      "Decisions get made on gut feel instead of the funnel",
    ],
  },
];

export default function Problem() {
  const [active, setActive] = useState(3);
  const stage = STAGES[active];

  return (
    <section id="problem" className="section-y" aria-labelledby="problem-title">
      <div className="container-x">
        <SectionHeader
          index="01"
          label="The problem"
          aside="Acquisition is a chain"
          title={
            <span id="problem-title">
              Your acquisition system isn&apos;t <span className="t-em">one</span> thing.
            </span>
          }
          intro="It’s a chain. A leak anywhere looks like a problem everywhere — so ads get blamed for follow-up, and sales gets blamed for a broken form."
        />

        <Reveal className="mt-16 lg:mt-24">
          {/* Chain */}
          <div
            role="tablist"
            aria-label="Acquisition stages"
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const next = (active + (e.key === "ArrowRight" ? 1 : -1) + STAGES.length) % STAGES.length;
              setActive(next);
              document.getElementById(`stage-tab-${next}`)?.focus();
            }}
            className="grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-6">
            {STAGES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.name}
                  role="tab"
                  type="button"
                  id={`stage-tab-${i}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  aria-controls="stage-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group relative flex flex-col items-start gap-6 bg-bg px-4 py-5 text-left transition-colors duration-300 focus-ring sm:px-5 sm:py-6 ${
                    isActive ? "bg-surface" : "hover:bg-bg-raised"
                  }`}
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="t-mono tabular-nums text-fg-faint">0{i + 1}</span>
                    <span className={`dot transition-all duration-300 ${isActive ? "dot-signal" : "opacity-0 group-hover:opacity-100"}`} />
                  </span>
                  <span className={`text-[0.95rem] font-medium tracking-[-0.015em] transition-colors sm:text-base ${isActive ? "text-fg" : "text-fg-subtle"}`}>
                    {s.name}
                  </span>
                  {isActive && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-signal" />}
                  {i < STAGES.length - 1 && (
                    <span aria-hidden="true" className="absolute -right-[5px] top-1/2 z-10 hidden h-[9px] w-[9px] -translate-y-1/2 rotate-45 border-r border-t border-line-strong bg-bg sm:block" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            id="stage-panel"
            role="tabpanel"
            aria-labelledby={`stage-tab-${active}`}
            className="mt-px grid grid-cols-1 gap-10 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <p className="t-mono text-fg-subtle">What you hear</p>
              <p key={stage.symptom} className="t-h3 mt-4 text-fg animate-fade-in">
                {stage.symptom}
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="t-mono text-fg-subtle">What’s often actually broken at “{stage.name}”</p>
              <ul key={stage.name} className="mt-4 divide-y divide-line animate-fade-in">
                {stage.breaks.map((b) => (
                  <li key={b} className="flex gap-4 py-3.5 text-fg-muted">
                    <span className="dot dot-signal mt-[0.6em]" aria-hidden="true" />
                    <span className="t-body">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12 flex max-w-3xl items-start gap-4">
          <p className="t-lead text-pretty text-fg-muted">
            Most businesses don&apos;t have a traffic problem or a sales problem. They have one specific
            break, in one specific place.{" "}
            <span className="text-fg">That&apos;s the thing worth finding first.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
