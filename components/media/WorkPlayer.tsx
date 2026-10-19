"use client";

import { useRef, useState } from "react";
import type { WorkItem } from "@/lib/portfolio";
import MediaFrame, { Caption, Presenter } from "./MediaFrame";

/**
 * Plays real media when an entry has it; otherwise shows a labelled sample slot.
 * YouTube embeds load only after a click (no third-party requests on page load),
 * and self-hosted video never autoplays with sound.
 */
export default function WorkPlayer({ item }: { item: WorkItem }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const vertical = item.aspect === "9/16";

  if (item.youtubeId && playing) {
    return (
      <div className="frame" style={{ aspectRatio: item.aspect }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (item.videoSrc) {
    return (
      <div className="frame" style={{ aspectRatio: item.aspect }}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={item.videoSrc}
          poster={item.poster}
          preload="none"
          playsInline
          controls={playing}
          onPlay={() => setPlaying(true)}
        />
        {!playing && (
          <PlayButton
            label={`Play ${item.title}`}
            onClick={() => {
              setPlaying(true);
              videoRef.current?.play();
            }}
          />
        )}
      </div>
    );
  }

  if (item.youtubeId) {
    return (
      <div className="frame" style={{ aspectRatio: item.aspect }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube still, loaded lazily */}
        <img
          src={item.poster ?? `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <PlayButton label={`Play ${item.title}`} onClick={() => setPlaying(true)} />
      </div>
    );
  }

  // Sample slot — no media yet.
  return (
    <MediaFrame aspect={item.aspect} label="Sample slot" timecode={item.duration} light={vertical ? { x: "50%", y: "35%" } : { x: "35%", y: "40%" }}>
      <SampleComposition item={item} />
    </MediaFrame>
  );
}

function PlayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10 focus-ring"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-fg text-bg transition-transform duration-300 group-hover:scale-105">
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6 4.5v11l9-5.5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}

/** What each sample slot depicts — format cues, not fabricated footage. */
function Accent({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent-strong">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function SampleComposition({ item }: { item: WorkItem }) {
  switch (item.category) {
    case "short-form":
      return (
        <>
          <Presenter className="h-[62%]" />
          <div className="absolute inset-x-3 top-[58%] text-center">
            <Caption className="text-[11px] sm:text-[13px]">
              <Accent text={item.caption} />
            </Caption>
          </div>
          <div className="absolute inset-x-0 top-10 flex justify-center" aria-hidden="true">
            <span className="h-1 w-1/2 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-1/3 rounded-full bg-fg" />
            </span>
          </div>
        </>
      );
    case "motion":
      return (
        <div className="absolute inset-0 flex flex-col justify-end gap-2 p-6 pb-14 sm:p-8 sm:pb-16" aria-hidden="true">
          <span className="h-[3px] w-10 bg-accent" />
          <span className="text-lg font-semibold tracking-[-0.03em] text-fg sm:text-2xl">Chapter 02</span>
          <span className="text-sm text-fg-muted">The pricing mistake</span>
        </div>
      );
    case "breakdown":
      return (
        <div className="absolute inset-x-4 bottom-12 top-12 flex flex-col justify-center gap-2 sm:inset-x-8" aria-hidden="true">
          {[
            ["Cut", "Removed 40s of setup before the point"],
            ["Hook", "Moved the result to the first 10 seconds"],
            ["B-roll", "Visual for every abstract claim"],
          ].map(([k, v]) => (
            <span key={k} className="flex items-center gap-3 rounded-[var(--radius-xs)] border border-line bg-bg/60 px-3 py-2">
              <span className="t-label w-12 flex-none text-accent">{k}</span>
              <span className="t-code truncate text-fg-muted">{v}</span>
            </span>
          ))}
        </div>
      );
    default:
      return (
        <>
          <Presenter className="left-[34%] h-[74%]" />
          <span className="absolute right-[8%] top-[22%] hidden aspect-video w-[32%] rounded-[var(--radius-xs)] border border-line-strong bg-white/[0.03] sm:block" aria-hidden="true">
            <span className="t-label absolute left-2 top-2 text-fg-faint">B-roll</span>
          </span>
          <div className="absolute inset-x-0 bottom-[24%] text-center sm:bottom-[16%]">
            <Caption className="text-[13px] sm:text-[15px]">
              <Accent text={item.caption} />
            </Caption>
          </div>
        </>
      );
  }
}
