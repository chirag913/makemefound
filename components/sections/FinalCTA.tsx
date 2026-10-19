import BookCallButton from "../BookCallButton";
import Reveal from "../Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section id="contact" aria-labelledby="final-cta-title" className="section-y">
      <div className="container-x">
        <div className="border-t border-line pt-16 lg:pt-24">
          <Reveal>
            <h2 id="final-cta-title" className="t-display max-w-[18ch] text-balance text-fg">
              Let&apos;s make your next video your best&#8209;produced one yet.
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <p className="t-lead max-w-[36rem] text-fg-muted lg:col-span-6">
              Tell us about your channel, your content workflow, and where you need help. We&apos;ll
              discuss whether we&apos;re a good fit.
            </p>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:col-span-6 lg:justify-end">
              <BookCallButton location="final_cta" label="Book an intro call" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline t-small rounded-sm text-fg-muted transition-colors hover:text-fg focus-ring">
                {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
