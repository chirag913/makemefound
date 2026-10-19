"use client";

import { useId, useState } from "react";
import MediaFrame, { Caption, Presenter } from "./MediaFrame";

/**
 * Drag to compare a raw recording with the edited version.
 * Both sides are labelled sample compositions until real footage is supplied.
 */
export default function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const id = useId();

  return (
    <figure>
      <div className="relative">
        {/* After (edited) */}
        <MediaFrame label={null} timecode="00:00:04:12" light={{ x: "40%", y: "38%" }}>
          <Presenter className="left-[38%] h-[76%]" />
          <span className="absolute right-[7%] top-[18%] aspect-video w-[30%] rounded-[var(--radius-xs)] border border-line-strong bg-white/[0.04]" aria-hidden="true">
            <span className="t-label absolute left-2 top-2 text-fg-faint">B-roll</span>
          </span>
          <span className="absolute left-[6%] top-[62%] hidden flex-col gap-1 sm:flex" aria-hidden="true">
            <span className="h-[2px] w-8 bg-accent" />
            <span className="text-sm font-semibold text-fg">Founder, Sample Co.</span>
          </span>
          <div className="absolute inset-x-0 bottom-[22%] text-center sm:bottom-[12%]" aria-hidden="true">
            <Caption className="text-[13px] sm:text-base">
              Most founders price <span className="text-accent-strong">too low</span>
            </Caption>
          </div>
          <span className="t-label absolute bottom-3 right-3 rounded-[var(--radius-xs)] bg-accent px-2 py-1 text-bg sm:bottom-4 sm:right-4">
            Edited
          </span>
        </MediaFrame>

        {/* Before (raw) — clipped */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
          <MediaFrame label={null} timecode="00:00:47:03" light={{ x: "50%", y: "30%" }} className="h-full !shadow-none">
            <div className="absolute inset-0 bg-black/30" />
            <Presenter className="h-[64%] opacity-70" />
            <div className="absolute inset-x-[10%] bottom-[12%] text-center">
              <span className="t-code text-[11px] text-fg-subtle sm:text-xs">
                “so, um, before we get into it, let me just, uh, give you some background…”
              </span>
            </div>
            <span className="t-label absolute bottom-3 left-3 rounded-[var(--radius-xs)] border border-line-strong bg-bg/80 px-2 py-1 text-fg-muted sm:bottom-4 sm:left-4">
              Raw
            </span>
          </MediaFrame>
        </div>

        {/* Handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute inset-y-0 -left-px w-[2px] bg-fg" />
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg text-bg shadow-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4 2 8l4 4M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <label htmlFor={id} className="sr-only">
          Compare raw recording and edited version
        </label>
        <input
          id={id}
          type="range"
          min={4}
          max={96}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="t-label text-fg-subtle">Sample comparison · drag to compare</span>
        <span className="t-code text-fg-faint">Raw 00:47 in → edited 00:04 in</span>
      </figcaption>
    </figure>
  );
}
