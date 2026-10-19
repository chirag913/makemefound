"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * The showreel. Autoplays muted and looping (browsers only allow muted autoplay),
 * pauses when off screen, and never autoplays for reduced-motion visitors.
 * Sound is one click away and is part of the edit.
 */
export default function HeroReel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) {
      // Unmuting restarts the reel so the sound design lands from the first hit.
      v.currentTime = 0;
      v.play().catch(() => {});
      trackEvent("reel_unmute");
    }
    setMuted(next);
  }

  function togglePlay() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <div className="group relative overflow-hidden rounded-[var(--radius-md)] bg-surface" style={{ aspectRatio: "16/9" }}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/reel/hero-reel-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="MakeMeFound showreel: how we cut dead air, lead with the payoff, add visuals, cut shorts and package videos."
      >
        <source src="/reel/hero-reel.mp4" type="video/mp4" />
        <source src="/reel/hero-reel.webm" type="video/webm" />
      </video>

      {reduced && !playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play showreel"
          className="absolute inset-0 flex items-center justify-center bg-black/30 focus-ring"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-fg text-bg">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6 4.5v11l9-5.5z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/50 to-transparent p-3 sm:p-6">
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          className="pointer-events-auto inline-flex h-9 items-center gap-2 rounded-full bg-black/55 px-3.5 text-[13px] sm:h-10 sm:gap-2.5 sm:px-4 sm:text-sm text-fg backdrop-blur-md transition-colors hover:bg-black/70 focus-ring"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 7.5h3l4-3.5v12l-4-3.5H3z" fill="currentColor" />
              <path d="m13.5 7.5 4 5m0-5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 7.5h3l4-3.5v12l-4-3.5H3z" fill="currentColor" />
              <path d="M13.5 7a4 4 0 0 1 0 6M15.5 5a7 7 0 0 1 0 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          {muted ? "Play with sound" : "Sound on"}
        </button>
        <span className="t-small hidden text-fg/80 sm:block">Showreel · 0:34</span>
      </div>
    </div>
  );
}
