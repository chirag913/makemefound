"use client";

import { useEffect } from "react";

/** Feeds pointer coordinates to the hovered .panel for its CSS spotlight. One listener for the page. */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    function onMove(e: PointerEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = (e.target as Element | null)?.closest?.(".panel") as HTMLElement | null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
