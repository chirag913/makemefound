"use client";

import { useEffect, useRef, useState } from "react";

type Row = {
  step: string;
  pass: string;
  leak?: string;
  fixed?: string;
};

const ROWS: Row[] = [
  { step: "Ad", pass: "Search ad · “kitchen remodel plano”" },
  { step: "Landing page", pass: "/kitchens · loads in 1.8s" },
  { step: "Call to action", pass: "“Book a design consult” above the fold" },
  { step: "Form", pass: "Submits · confirmation shown" },
  {
    step: "Booking",
    pass: "",
    leak: "Calendar link returns 404 on mobile",
    fixed: "Link repointed · tested on 4 devices",
  },
  { step: "CRM", pass: "Record created · owner assigned" },
  { step: "Follow-up", pass: "SMS + email sent in under 2 min" },
];

const LEAK_INDEX = 4;
const STEP_MS = 520;
const HOLD_LEAK_MS = 3600;
const HOLD_FIXED_MS = 3400;

type Phase = "scan" | "leak" | "fixed";

export default function JourneyScan() {
  const [cursor, setCursor] = useState(0);
  const [phase, setPhase] = useState<Phase>("scan");
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Start when on screen. Reduced motion shows the finding, statically.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync to a media query
      setCursor(LEAK_INDEX);
      setPhase("leak");
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "scan") {
      if (cursor < LEAK_INDEX) {
        t = setTimeout(() => setCursor((c) => c + 1), STEP_MS);
      } else {
        t = setTimeout(() => setPhase("leak"), STEP_MS);
      }
    } else if (phase === "leak") {
      t = setTimeout(() => {
        setPhase("fixed");
        setCursor(LEAK_INDEX + 1);
      }, HOLD_LEAK_MS);
    } else {
      if (cursor < ROWS.length) {
        t = setTimeout(() => setCursor((c) => c + 1), STEP_MS);
      } else {
        t = setTimeout(() => {
          setPhase("scan");
          setCursor(0);
        }, HOLD_FIXED_MS);
      }
    }
    return () => clearTimeout(t);
  }, [running, phase, cursor]);

  function statusFor(i: number): "pass" | "active" | "leak" | "fixed" | "pending" | "blocked" {
    if (i === LEAK_INDEX) {
      if (phase === "leak") return "leak";
      if (phase === "fixed") return "fixed";
      return cursor === i ? "active" : "pending";
    }
    if (i < cursor) return "pass";
    if (phase === "leak" && i > LEAK_INDEX) return "blocked";
    if (i === cursor && phase !== "leak") return "active";
    return "pending";
  }

  const done = phase === "fixed" && cursor >= ROWS.length;
  const progress =
    phase === "leak" ? LEAK_INDEX + 1 : Math.min(phase === "fixed" ? cursor : cursor + 1, ROWS.length);

  return (
    <div ref={ref} className="artifact overflow-hidden" role="img" aria-label="Illustrative journey audit: seven steps from ad to follow-up are tested. The booking step fails on mobile, is flagged as a leak, then fixed.">
      <div className="artifact-bar">
        <div className="flex items-center gap-2.5">
          <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </span>
          <span className="t-mono-sm whitespace-nowrap text-fg-muted sm:ml-2">journey-audit</span>
        </div>
        <span className="t-mono whitespace-nowrap text-fg-faint">Sample<span className="hidden sm:inline"> · illustrative</span></span>
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
        <div className="t-mono-sm text-fg-subtle">
          Testing as <span className="text-fg-muted">mobile buyer<span className="hidden sm:inline"> · iPhone · Safari</span></span>
        </div>
        <div className="t-mono-sm tabular-nums text-fg-subtle">
          {String(progress).padStart(2, "0")}/{String(ROWS.length).padStart(2, "0")}
        </div>
      </div>

      <ol className="relative" aria-hidden="true">
        {ROWS.map((row, i) => {
          const s = statusFor(i);
          const text =
            s === "leak" ? row.leak : s === "fixed" ? row.fixed : s === "pass" || s === "active" ? row.pass || "Checking…" : s === "blocked" ? "Not reached" : "—";
          return (
            <li
              key={row.step}
              className={`relative grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-line px-4 py-3.5 transition-colors duration-300 last:border-b-0 sm:grid-cols-[2.5rem_8.5rem_1fr_auto] sm:px-5 ${
                s === "leak" ? "bg-signal-soft" : s === "active" ? "bg-white/[0.025]" : ""
              }`}
            >
              {s === "leak" && <span className="absolute inset-y-0 left-0 w-[2px] bg-signal" />}
              <span className="t-mono-sm tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  s === "pending" || s === "blocked" ? "text-fg-faint" : s === "leak" ? "text-signal" : "text-fg"
                }`}
              >
                {row.step}
              </span>
              <span
                className={`t-mono-sm col-span-2 col-start-2 row-start-2 truncate transition-colors duration-300 sm:col-span-1 sm:col-start-auto sm:row-start-auto ${
                  s === "leak" ? "text-fg" : s === "fixed" ? "text-fg-muted" : s === "pass" ? "text-fg-subtle" : "text-fg-faint"
                }`}
              >
                {text}
              </span>
              <StatusPill status={s} />
            </li>
          );
        })}
      </ol>

      <div className="border-t border-line px-4 py-4 sm:px-5" aria-live="polite">
        {phase === "leak" ? (
          <p className="text-sm leading-relaxed text-fg">
            <span className="t-mono mr-2 text-signal">Finding</span>
            Mobile visitors from this ad can&apos;t book. Desktop works, so nobody inside the business
            ever sees it break.
          </p>
        ) : phase === "fixed" ? (
          <p className="text-sm leading-relaxed text-fg-muted">
            <span className="t-mono mr-2 text-ok">Fix shipped</span>
            {done
              ? "Journey passes end to end. Booking link corrected, fallback form added, confirmation SMS on."
              : "Re-testing the rest of the journey…"}
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-fg-subtle">
            <span className="t-mono mr-2 text-fg-muted">Running</span>
            Walking the journey step by step, the way a real buyer would.
          </p>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; dot: string }> = {
    pass: { label: "Pass", cls: "text-fg-subtle", dot: "dot" },
    active: { label: "Testing", cls: "text-fg-muted", dot: "dot dot-live" },
    leak: { label: "Leak", cls: "text-signal", dot: "dot dot-signal" },
    fixed: { label: "Fixed", cls: "text-ok", dot: "dot dot-ok" },
    blocked: { label: "Blocked", cls: "text-fg-faint", dot: "dot" },
    pending: { label: "", cls: "text-fg-faint", dot: "" },
  };
  const m = map[status];
  return (
    <span className={`t-mono flex min-w-[4.5rem] items-center justify-end gap-2 ${m.cls}`}>
      {m.label}
      {m.dot && <span className={m.dot} />}
    </span>
  );
}
