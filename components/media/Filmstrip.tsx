import MediaFrame, { Caption, Presenter } from "./MediaFrame";

const CUTS = [
  { cap: ["The ", "one", " metric I check"], tc: "0:41" },
  { cap: ["Stop explaining. ", "Show it."], tc: "0:28" },
  { cap: ["Why your pricing page ", "leaks"], tc: "0:33" },
  { cap: ["Do this ", "before", " you hire"], tc: "0:52" },
  { cap: ["The email that ", "closed", " it"], tc: "0:36" },
  { cap: ["I was ", "wrong", " about this"], tc: "0:44" },
  { cap: ["Three tools, ", "one", " workflow"], tc: "0:30" },
  { cap: ["Watch the ", "dashboard"], tc: "0:45" },
];

/** A slow, endless strip of vertical cuts. Sample frames until real shorts are added. */
export default function Filmstrip() {
  const row = [...CUTS, ...CUTS];
  return (
    <div className="marquee-host edge-fade overflow-hidden" aria-hidden="true">
      <div className="marquee gap-3 sm:gap-4" style={{ ["--marquee-dur" as string]: "70s" }}>
        {row.map((c, i) => (
          <div key={i} className="w-[150px] flex-none sm:w-[190px]">
            <MediaFrame aspect="9/16" label={null} timecode={c.tc} light={{ x: "50%", y: `${28 + (i % 4) * 4}%` }}>
              <Presenter className="h-[56%]" />
              <div className="absolute inset-x-2 top-[52%] text-center">
                <Caption className="text-[10px] sm:text-[12px]">
                  {c.cap.map((part, j) => (j % 2 === 1 ? <span key={j} className="text-accent-strong">{part}</span> : part))}
                </Caption>
              </div>
            </MediaFrame>
          </div>
        ))}
      </div>
    </div>
  );
}
