"use client";

import { useState } from "react";
import SectionHeader from "../SectionHeader";
import Reveal from "../Reveal";
import WorkPlayer from "../media/WorkPlayer";
import BeforeAfter from "../media/BeforeAfter";
import { WORK, WORK_CATEGORIES, VIEWS_CHECKED, type WorkCategory } from "@/lib/portfolio";
import { OWN_CHANNELS } from "@/lib/site";

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
          aside="In-house channels + sample formats"
          titleId="work-title"
          title={
            <>
              Formats we produce, <span className="t-em text-accent-strong">frame by frame.</span>
            </>
          }
          intro={
            <>
              Real videos from the channels we run ourselves,{" "}
              {OWN_CHANNELS.map((c, i) => (
                <span key={c.handle}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-underline rounded-sm text-fg focus-ring">
                    {c.name}
                  </a>
                  {i < OWN_CHANNELS.length - 1 ? " and " : ""}
                </span>
              ))}
              {hasSamples ? " — plus clearly labelled sample slots for formats we don’t have public footage of yet." : "."}
            </>
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
              // 12-col desktop grid: feature full width, real long-form three to a row,
              // shorts four to a row (two on mobile), other 16:9 slots two to a row.
              const featured = item.featured && (filter === "all" || filter === "long-form");
              const span = vertical
                ? "col-span-1 lg:col-span-3"
                : featured
                  ? "col-span-2 lg:col-span-12"
                  : !item.sample && item.category === "long-form"
                    ? "col-span-2 lg:col-span-4"
                    : "col-span-2 lg:col-span-6";
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
                      <div className="min-w-0">
                        <h3 className={`font-semibold tracking-[-0.02em] text-fg ${featured ? "text-xl sm:text-2xl" : ""}`}>{item.title}</h3>
                        <p className="t-label mt-1.5 text-fg-subtle">
                          {item.channel ? `${item.channel} · ` : ""}
                          {item.format.replace(/^Long-form · /, "")}
                          {item.views && <span className="text-fg-muted"> · {item.views} views</span>}
                        </p>
                      </div>
                      {item.sample ? (
                        <span className={`t-label flex-none rounded-[var(--radius-xs)] border border-line-strong px-2 py-1 text-fg-subtle ${vertical ? "hidden sm:inline-block" : ""}`}>
                          Sample
                        </span>
                      ) : (
                        <span className="t-label flex-none rounded-[var(--radius-xs)] border border-accent-line bg-accent-soft px-2 py-1 text-accent-strong">
                          In-house
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

        {items.some((w) => w.views) && (
          <p className="t-label mt-10 text-fg-faint">
            In-house work is from channels we own and run. View counts are public YouTube figures as of {VIEWS_CHECKED}.
          </p>
        )}
      </div>
    </section>
  );
}
