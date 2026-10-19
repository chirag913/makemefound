import BookCallButton from "../BookCallButton";
import Reveal from "../Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section id="contact" aria-labelledby="final-cta-title" className="section-y">
      <div className="container-x">
        <div className="border-t border-line pt-16 lg:pt-24">
          <Reveal>
            <h2 id="final-cta-title" className="t-display max-w-[16ch] text-balance text-fg">
              Let&apos;s find the next opportunity in your business.
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <p className="t-lead max-w-[36rem] text-fg-muted lg:col-span-6">
              Tell us what you&apos;re trying to achieve and where growth feels stuck. We&apos;ll work out
              whether we can help.
            </p>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:col-span-6 lg:justify-end">
              <BookCallButton location="final_cta" />
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
