import BookCallButton from "../BookCallButton";
import Reveal from "../Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

const NEXT = [
  ["Tell us about your channel", "Your content, your workflow, and where you need help. About two minutes."],
  ["We review it before we talk", "So the call is about your videos, not a generic pitch."],
  ["We decide together", "If we’re a good fit, we’ll suggest a starting point. If not, we’ll say so."],
];

export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line" aria-labelledby="final-cta-title">
      <div aria-hidden="true" className="studio-light pointer-events-none absolute inset-0 -z-10 rotate-180" />
      <div className="container-x py-[clamp(112px,15vw,208px)]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="t-label flex items-center gap-3 text-fg-muted">
              <span className="dot dot-accent" aria-hidden="true" /> Intro call
            </p>
            <h2
              id="final-cta-title"
              className="mt-8 text-balance text-[clamp(2.5rem,5.6vw,5rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-fg"
            >
              Let&apos;s make your next video your <span className="t-em text-accent-strong">best-produced one yet.</span>
            </h2>
            <p className="t-lead mt-8 max-w-xl text-fg-muted">
              Tell us about your channel, your content workflow, and where you need help. We&apos;ll discuss
              whether we&apos;re a good fit.
            </p>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <BookCallButton location="final_cta" label="Book an Intro Call" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-sm text-fg-muted transition-colors hover:text-fg focus-ring rounded-sm">
                or email {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <div className="panel p-6 sm:p-7">
              <p className="t-label text-fg-subtle">What happens next</p>
              <ol className="mt-5 divide-y divide-line">
                {NEXT.map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2rem_1fr] py-4 first:pt-0 last:pb-0">
                    <span className="t-label pt-1 text-accent">0{i + 1}</span>
                    <div>
                      <p className="font-medium tracking-[-0.015em] text-fg">{t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-fg-subtle">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
