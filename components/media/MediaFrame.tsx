import { CSSProperties, ReactNode } from "react";

/**
 * A monitor-style frame for footage. Without real media it renders a lit,
 * grained backdrop and an explicit "Sample" label — never a fake still.
 */
export default function MediaFrame({
  aspect = "16/9",
  label = "Sample frame",
  timecode,
  rec = false,
  guides = false,
  light = { x: "50%", y: "42%" },
  className = "",
  children,
}: {
  aspect?: "16/9" | "9/16" | "4/5" | "1/1" | "auto";
  label?: string | null;
  timecode?: ReactNode;
  rec?: boolean;
  guides?: boolean;
  light?: { x: string; y: string };
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`frame ${className}`} style={aspect === "auto" ? undefined : { aspectRatio: aspect }}>
      <div className="footage" style={{ "--fx": light.x, "--fy": light.y } as CSSProperties} aria-hidden="true" />
      {guides && <div className="thirds" aria-hidden="true" />}

      {(rec || timecode) && (
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-4" aria-hidden="true">
          {rec ? (
            <span className="t-label flex items-center gap-2 text-fg-muted">
              <span className="dot dot-rec" /> Rec
            </span>
          ) : (
            <span />
          )}
          {timecode && (typeof timecode === "string" ? <span className="t-code text-fg-muted">{timecode}</span> : <span className="text-fg-muted">{timecode}</span>)}
        </div>
      )}

      {children}

      {label && (
        <span className="t-label absolute bottom-3 left-3 rounded-[var(--radius-xs)] border border-line-strong bg-bg/70 px-2 py-1 text-fg-subtle backdrop-blur-sm sm:bottom-4 sm:left-4">
          {label}
        </span>
      )}
    </div>
  );
}

/** Burned-in caption, styled the way we'd caption a talking-head edit. */
export function Caption({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-[var(--radius-xs)] bg-black/60 px-2.5 py-1 text-center font-semibold leading-tight tracking-[-0.01em] text-white ${className}`}
    >
      {children}
    </span>
  );
}

/** Speaker silhouette — a neutral stand-in for the creator's footage. */
export function Presenter({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute bottom-0 left-1/2 h-[78%] -translate-x-1/2 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="presenter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a31" />
          <stop offset="1" stopColor="#16161a" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="70" r="34" fill="url(#presenter)" />
      <path d="M30 200c4-48 34-78 70-78s66 30 70 78z" fill="url(#presenter)" />
    </svg>
  );
}
