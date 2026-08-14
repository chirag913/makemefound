import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const PLATFORMS = [
  {
    name: "ChatGPT",
    metrics: [
      { label: "Mention rate", value: "22%" },
      { label: "Recommendation rate", value: "9%" },
      { label: "Citation rate", value: "6%" },
      { label: "Avg. position", value: "#5" },
    ],
  },
  {
    name: "Gemini",
    metrics: [
      { label: "Mention rate", value: "31%" },
      { label: "Recommendation rate", value: "14%" },
      { label: "Citation rate", value: "11%" },
      { label: "Avg. position", value: "#4" },
    ],
  },
  {
    name: "Perplexity",
    metrics: [
      { label: "Mention rate", value: "18%" },
      { label: "Recommendation rate", value: "7%" },
      { label: "Citation rate", value: "13%" },
      { label: "Avg. position", value: "#6" },
    ],
  },
  {
    name: "Google AI",
    metrics: [
      { label: "Mention rate", value: "27%" },
      { label: "Recommendation rate", value: "12%" },
      { label: "Citation rate", value: "9%" },
      { label: "Avg. position", value: "#3" },
    ],
  },
];

export default function AISearchVisibility() {
  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>AI Search Visibility</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            We measure whether AI actually knows you exist.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform.name} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-bg-card/40 p-6">
                <h3 className="text-base font-semibold text-fg">{platform.name}</h3>
                <dl className="mt-5 space-y-3.5">
                  {platform.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <dt className="text-xs text-fg-subtle">{metric.label}</dt>
                      <dd className="text-sm font-medium text-fg">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-fg-subtle">
          Example metrics shown for illustration.
        </p>
      </div>
    </section>
  );
}
