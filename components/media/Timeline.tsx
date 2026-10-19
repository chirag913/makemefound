type Clip = { start: number; end: number; label?: string; tone?: "a" | "b" | "c" | "accent" };
type Track = { name: string; clips: Clip[]; kind?: "video" | "audio" | "text" };

const DEFAULT_TRACKS: Track[] = [
  {
    name: "V3",
    kind: "text",
    clips: [
      { start: 2, end: 14, label: "Title", tone: "accent" },
      { start: 48, end: 60, label: "Callout", tone: "accent" },
      { start: 80, end: 92, label: "Lower third", tone: "accent" },
    ],
  },
  {
    name: "V2",
    kind: "video",
    clips: [
      { start: 10, end: 24, label: "B-roll", tone: "b" },
      { start: 36, end: 46, label: "Screen", tone: "b" },
      { start: 62, end: 78, label: "B-roll", tone: "b" },
    ],
  },
  {
    name: "V1",
    kind: "video",
    clips: [
      { start: 0, end: 18, label: "A-roll", tone: "a" },
      { start: 18.6, end: 41, label: "A-roll", tone: "a" },
      { start: 41.6, end: 70, label: "A-roll", tone: "a" },
      { start: 70.6, end: 100, label: "A-roll", tone: "a" },
    ],
  },
  { name: "A1", kind: "audio", clips: [{ start: 0, end: 100, label: "Voice", tone: "c" }] },
  { name: "A2", kind: "audio", clips: [{ start: 0, end: 34, label: "Music", tone: "c" }, { start: 52, end: 100, label: "Music", tone: "c" }] },
];

export type Marker = { at: number; label: string };

const TONE: Record<NonNullable<Clip["tone"]>, string> = {
  a: "bg-[#2a2a33] border-[#3a3a46]",
  b: "bg-[#23232b] border-[#34343f]",
  c: "bg-[#1c1c23] border-[#2c2c36]",
  accent: "bg-accent-soft border-accent-line",
};

/** A non-linear-editor timeline. Decorative, but every element is a real edit concept. */
export default function Timeline({
  tracks = DEFAULT_TRACKS,
  markers = [],
  animate = true,
  duration = "12:40",
  className = "",
}: {
  tracks?: Track[];
  markers?: Marker[];
  animate?: boolean;
  duration?: string;
  className?: string;
}) {
  return (
    <div className={`frame p-3 sm:p-4 ${className}`} aria-hidden="true">
      {/* Ruler */}
      <div className="mb-2 flex items-center pl-8 sm:pl-10">
        <div className="relative h-5 flex-1">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="absolute top-0 h-full border-l border-line-strong" style={{ left: `${i * 10}%` }}>
              {i % 2 === 0 && i < 10 && <span className="t-code absolute left-1 top-0 text-[10px] text-fg-faint">{tc(i, duration)}</span>}
            </span>
          ))}
          {markers.map((m) => (
            <span key={m.label} className="absolute -top-0.5 flex -translate-x-1/2 flex-col items-center" style={{ left: `${m.at}%` }}>
              <span className="h-2 w-2 rotate-45 bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="space-y-1.5">
          {tracks.map((t) => (
            <div key={t.name} className="flex items-center gap-2">
              <span className="t-code w-6 flex-none text-[10px] text-fg-faint sm:w-8">{t.name}</span>
              <div className="relative h-6 flex-1 rounded-[3px] bg-white/[0.02] sm:h-7">
                {t.clips.map((c, i) => (
                  <span
                    key={i}
                    className={`absolute inset-y-0 overflow-hidden rounded-[3px] border px-1.5 ${TONE[c.tone ?? "a"]}`}
                    style={{ left: `${c.start}%`, width: `${c.end - c.start}%` }}
                  >
                    {t.kind === "audio" ? (
                      <Wave seed={i + t.name.length} />
                    ) : (
                      c.label && (
                        <span className={`t-code block truncate pt-[3px] text-[10px] sm:pt-[5px] ${c.tone === "accent" ? "text-accent-strong" : "text-fg-subtle"}`}>
                          {c.label}
                        </span>
                      )
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Playhead */}
        <div className="pointer-events-none absolute inset-y-0 left-8 right-0 sm:left-10">
          <span className={`absolute -top-1 bottom-0 w-px bg-accent ${animate ? "playhead" : ""}`} style={{ left: "38%" }}>
            <span className="absolute -left-[4px] -top-1 h-2.5 w-[9px] rounded-[2px] bg-accent" />
          </span>
        </div>
      </div>

      {markers.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-3 pl-8 sm:pl-10">
          {markers.map((m) => (
            <span key={m.label} className="t-code flex items-center gap-1.5 text-[11px] text-fg-muted">
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
              {m.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function tc(i: number, duration: string) {
  const [m, s] = duration.split(":").map(Number);
  const total = (m * 60 + s) * (i / 10);
  const mm = Math.floor(total / 60);
  const ss = Math.round(total % 60);
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

function Wave({ seed }: { seed: number }) {
  const bars = Array.from({ length: 220 }, (_, i) => 25 + Math.abs(Math.sin((i + seed) * 1.7) * Math.cos(i * 0.45 + seed)) * 70);
  return (
    <span className="flex h-full items-center gap-[2px] overflow-hidden">
      {bars.map((h, i) => (
        <span key={i} className="w-[2px] flex-none rounded-full bg-fg-faint" style={{ height: `${h}%` }} />
      ))}
    </span>
  );
}
