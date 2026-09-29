"use client";

import { useEffect, useRef, useState } from "react";
import { SectionRule } from "../SectionHeader";
import Reveal from "../Reveal";

const STEPS = [
  {
    name: "Find",
    body: "We go through your acquisition path as a buyer: click the ads, read the pages, submit the forms, call the number after hours, book the calendar, wait for the follow-up.",
    output: "A map of your real customer journey — not the one on the whiteboard.",
  },
  {
    name: "Diagnose",
    body: "We pinpoint where it breaks and why. Every finding comes with evidence you can check yourself: screenshots, timestamps, test records, steps to reproduce.",
    output: "A short findings report, ranked by what it’s costing you.",
  },
  {
    name: "Build",
    body: "We fix what we found. Pages, forms, booking, CRM workflows, tracking, referral outreach — built and tested by us, inside the tools you already use where possible.",
    output: "The fix, live and tested end to end.",
  },
  {
    name: "Automate",
    body: "Once the path works, we automate the repetitive parts: instant replies, qualification, booking, reminders, routing. AI where it’s genuinely better. Simple rules where it isn’t.",
    output: "Less manual work. Faster response. Nothing falls through.",
  },
  {
    name: "Improve",
    body: "We keep testing the journey and watching the numbers. When the next bottleneck shows up — and it will — we find it early.",
    output: "A system that keeps getting better, not a one-off project.",
  },
];

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    function update() {
      raf = 0;
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      setProgress(p);
      const items = Array.from(el.children) as HTMLElement[];
      let idx = 0;
      items.forEach((item, i) => {
        if (item.getBoundingClientRect().top < anchor) idx = i;
      });
      setActive(idx);
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="process" className="section-y border-t border-line bg-bg-raised" aria-labelledby="process-title">
      <div className="container-x">
        <SectionRule index="05" label="How we work" aside="Five steps, in order" />

        <div className="mt-10 grid grid-cols-1 gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 id="process-title" className="t-h2 text-balance text-fg">
                  Diagnosis first. <span className="text-fg-subtle">Then the build.</span>
                </h2>
                <p className="t-lead mt-6 max-w-[30rem] text-fg-muted">
                  You see what&apos;s wrong before you pay to fix it. Every step produces something you
                  can hold us to.
                </p>
              </Reveal>

              <ol className="mt-12 hidden space-y-1 lg:block" aria-hidden="true">
                {STEPS.map((s, i) => (
                  <li key={s.name} className="flex items-center gap-4">
                    <span className={`t-mono tabular-nums transition-colors duration-300 ${i === active ? "text-signal" : "text-fg-faint"}`}>
                      0{i + 1}
                    </span>
                    <span className={`text-sm transition-colors duration-300 ${i === active ? "text-fg" : i < active ? "text-fg-subtle" : "text-fg-faint"}`}>
                      {s.name}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            {/* Progress rail */}
            <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line sm:left-[9px]">
              <div className="w-px origin-top bg-fg-muted" style={{ height: "100%", transform: `scaleY(${progress})` }} />
            </div>

            <ol ref={listRef} className="space-y-4">
              {STEPS.map((s, i) => {
                const on = i <= active;
                return (
                  <li key={s.name} className="relative pl-10 sm:pl-14">
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-8 h-[15px] w-[15px] rounded-full border transition-colors duration-300 sm:h-[19px] sm:w-[19px] ${
                        i === active ? "border-signal bg-bg" : on ? "border-fg-muted bg-fg-muted" : "border-line-strong bg-bg-raised"
                      }`}
                    >
                      {i === active && <span className="absolute inset-[3px] rounded-full bg-signal sm:inset-[4px]" />}
                    </span>
                    <div className={`card p-6 transition-[border-color,opacity] duration-500 sm:p-8 ${i === active ? "border-line-strong" : ""} ${on ? "opacity-100" : "opacity-60"}`}>
                      <div className="flex items-baseline gap-5">
                        <span className="t-mono tabular-nums text-fg-faint">0{i + 1}</span>
                        <h3 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium leading-none tracking-[-0.04em] text-fg">
                          {s.name}
                        </h3>
                      </div>
                      <p className="t-body mt-5 text-fg-muted">{s.body}</p>
                      <div className="mt-6 flex gap-3 border-t border-line pt-5">
                        <span className="t-mono flex-none pt-0.5 text-fg-subtle">You get</span>
                        <p className="text-sm text-fg">{s.output}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
