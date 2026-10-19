"use client";

import { useEffect, useRef, useState } from "react";

/** SMPTE-style timecode that runs at 25fps while on screen. Static for reduced motion. */
export default function Timecode({ start = 4 * 25 + 12, className = "" }: { start?: number; className?: string }) {
  const [frame, setFrame] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !id) id = setInterval(() => setFrame((f) => f + 1), 40);
      if (!e.isIntersecting && id) {
        clearInterval(id);
        id = undefined;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (id) clearInterval(id);
    };
  }, []);

  const ff = frame % 25;
  const total = Math.floor(frame / 25);
  const ss = total % 60;
  const mm = Math.floor(total / 60) % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    <span ref={ref} className={`t-code tabular-nums ${className}`}>
      00:{p(mm)}:{p(ss)}:{p(ff)}
    </span>
  );
}
