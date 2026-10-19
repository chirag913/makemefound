"use client";

import { useState } from "react";
import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";
import WorkPlayer from "../media/WorkPlayer";
import BeforeAfter from "../media/BeforeAfter";
import { WORK, WORK_CATEGORIES, type WorkCategory } from "@/lib/portfolio";

export default function Work() {
  const [filter, setFilter] = useState<WorkCategory | "all">("all");
  const showComparison = filter === "all" || filter === "before-after";
  const items = WORK.filter((w) => filter === "all" || w.category === filter);
  const hasSamples = WORK.some((w) => w.sample);

  return (
    <section id="work" className="section-y border-t border-line bg-bg-raised" aria-labelledby="work-title">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Our Work"
          aside={hasSamples ? "Sample formats" : undefined}
          titleId="work-title"
          title={
            <>
              Formats we produce, <span className="t-em text-accent-strong">frame by frame.</span>
            </>
          }
          intro={
            hasSamples
              ? "We’re a new studio, so this section shows labelled sample slots for the formats we make. Real edits replace them as work is cleared to share — ask on the call for samples relevant to your channel."
              : "A selection of recent edits, shorts and packaging work."
          }
        />

        <div
          role="tablist"
          aria-label="Filter work by format"
          className="mt-14 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:mt-20"
        >
          {WORK_CATEGORIES.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c.id)}
                className={`h-10 flex-none rounded-full border px-4 text-sm transition-colors focus-ring ${
                  active ? "border-fg bg-fg text-bg" : "border-line-strong text-fg-muted hover:border-line-hover hover:text-fg"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {showComparison && (
          <Reveal className="mt-8">
            <div className="panel grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
              <div className="lg:col-span-4">
                <span className="t-label text-accent">Before &amp; after</span>
                <h3 className="t-h3 mt-4 text-fg">From raw recording to a video that gets to the point.</h3>
                <p className="t-body mt-4 text-fg-muted">
                  Same speaker, same take. The edit cuts the warm-up, opens on the strongest line, and adds
                  the visual support the idea needs.
                </p>
              </div>
              <div className="lg:col-span-8">
                <BeforeAfter />
              </div>
            </div>
          </Reveal>
        )}

        {items.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 pt-6 lg:grid-cols-12">
            {items.map((item, i) => {
              const vertical = item.aspect === "9/16";
              // Shorts sit four to a row on desktop, two on mobile; 16:9 work two to a row.
              const span = vertical ? "col-span-1 lg:col-span-3" : "col-span-2 lg:col-span-6";
              return (
                <Reveal
                  as="li"
                  key={item.id}
                  delay={(i % 3) * 70}
                  className={span}
                >
                  <article className="group h-full">
                    <WorkPlayer item={item} />
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold tracking-[-0.02em] text-fg">{item.title}</h3>
                        <p className="t-label mt-1.5 text-fg-subtle">{item.format}</p>
                      </div>
                      {item.sample && (
                        <span className="t-label flex-none rounded-[var(--radius-xs)] border border-line-strong px-2 py-1 text-fg-subtle">
                          Sample
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 max-w-[52ch] text-fg-muted ${vertical ? "text-sm leading-relaxed" : "t-body"}`}>{item.note}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
