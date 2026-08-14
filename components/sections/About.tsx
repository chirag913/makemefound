import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

export default function About() {
  return (
    <section id="about" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Why we built MakeMeFound.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-8 space-y-5 text-base leading-relaxed text-fg-muted">
          <p>
            AI search is changing how people find local businesses. When someone asks ChatGPT,
            Gemini, or Perplexity for a recommendation, that answer is shaped by whether a business
            has the digital presence, authority, and content those systems rely on. Most businesses
            have no visibility into whether they&apos;re showing up at all.
          </p>
          <p>
            MakeMeFound is US-focused and built specifically for high-ticket local service
            businesses — practices and companies where a single new customer is worth acquiring
            properly, not chasing with volume tactics.
          </p>
          <p>
            Before offering this to clients, we tested our own methodology on our own company,
            running it through the same audit, build, and measurement process described above.
          </p>
          <p className="text-sm text-fg-subtle">Founded 2026</p>
        </Reveal>
      </div>
    </section>
  );
}
