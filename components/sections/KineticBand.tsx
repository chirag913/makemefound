const WORDS = ["Long-form editing", "Short-form repurposing", "Content packaging", "Hooks", "Pacing", "Retention"];

/** Large outlined type drifting between sections — a pause in the page rhythm. */
export default function KineticBand() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee-host overflow-hidden border-t border-line py-10 sm:py-14" aria-hidden="true">
      <div className="marquee" style={{ ["--marquee-dur" as string]: "55s" }}>
        {row.map((w, i) => (
          <span key={i} className="flex flex-none items-center">
            <span
              className={`whitespace-nowrap px-6 text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-none tracking-[-0.05em] sm:px-10 ${
                i % 3 === 1 ? "t-em text-accent-strong" : "t-outline"
              }`}
            >
              {w}
            </span>
            <span className="h-2.5 w-2.5 flex-none rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
