"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkItem } from "@/lib/portfolio";

/**
 * Shows a real video's thumbnail and loads the player only after a click, so the
 * page makes no third-party video requests on load and nothing plays with sound
 * unasked.
 */
export default function WorkPlayer({ item, priority = false }: { item: WorkItem; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState<"maxresdefault" | "hqdefault" | "none">("maxresdefault");
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onThumbError = () => setThumb((t) => (t === "maxresdefault" && !item.poster ? "hqdefault" : "none"));

  // An eager image can fail before hydration, when onError isn't attached yet.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) onThumbError();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once after mount
  }, []);

  const frame = "relative overflow-hidden rounded-[var(--radius-md)] bg-surface";

  if (item.youtubeId && playing) {
    return (
      <div className={frame} style={{ aspectRatio: "16/9" }}>
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

  const src = item.poster ?? (item.youtubeId && thumb !== "none" ? `https://i.ytimg.com/vi/${item.youtubeId}/${thumb}.jpg` : undefined);

  return (
    <div className={`group ${frame}`} style={{ aspectRatio: "16/9" }}>
      {item.videoSrc && playing ? (
        <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" src={item.videoSrc} poster={item.poster} controls autoPlay playsInline />
      ) : (
        <>
          {src && (
            // eslint-disable-next-line @next/next/no-img-element -- remote YouTube still; the player loads on click
            <img
              ref={imgRef}
              src={src}
              alt=""
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              onError={onThumbError}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          )}
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play “${item.title}”`}
            className="absolute inset-0 flex items-center justify-center focus-ring"
          >
            <span className="flex h-14 w-14 scale-90 items-center justify-center rounded-full bg-fg/95 text-bg opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:opacity-100 max-lg:scale-100 max-lg:opacity-100">
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6 4.5v11l9-5.5z" fill="currentColor" />
              </svg>
            </span>
          </button>
          <span className="t-small pointer-events-none absolute bottom-3 right-3 rounded-[4px] bg-black/75 px-1.5 py-0.5 tabular-nums text-fg">
            {item.duration}
          </span>
        </>
      )}
    </div>
  );
}
