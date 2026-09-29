import FAQAccordion from "../FAQAccordion";
import { SectionRule } from "../SectionHeader";
import Reveal from "../Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

export const FAQ_ITEMS = [
  {
    question: "Do you specialize in one industry?",
    answer:
      "No. We work with businesses that sell a considered service — remodeling and home services, professional services, B2B. Acquisition problems repeat across industries. The details don’t, so we learn yours before we recommend anything.",
  },
  {
    question: "Do you guarantee results?",
    answer:
      "No. Anyone who guarantees revenue before seeing your business is guessing. What we do guarantee: you’ll see what we found, with evidence, before you decide whether to pay for a fix.",
  },
  {
    question: "Do you replace our team?",
    answer:
      "No. We fix and automate the parts that break or repeat — so your people spend their time on the conversations that actually close.",
  },
  {
    question: "Do you build the systems yourselves?",
    answer:
      "Yes. Pages, forms, booking, CRM workflows, tracking, referral outreach, voice and chat agents, integrations. You don’t get a slide deck and a list of vendors. You get the fix, working.",
  },
  {
    question: "Can you work with our existing CRM?",
    answer:
      "Usually, yes. We’d rather fix what you have than migrate you. If the CRM itself is the problem, we’ll show you exactly why before suggesting a change.",
  },
  {
    question: "Can you work with our existing ads?",
    answer:
      "Yes. We don’t need to take over your ad accounts. We trace where the clicks go after the ad — which is where most of the leaks are.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "It starts with a diagnosis: we test your journey and show you what we find. If there’s something worth fixing, we scope the fix as a defined project. Automation and ongoing improvement come after, if they make sense for you.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-y border-t border-line bg-bg-raised" aria-labelledby="faq-title">
      <div className="container-x">
        <SectionRule index="08" label="FAQ" />
        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <h2 id="faq-title" className="t-h2 text-fg">
              Straight <span className="t-em">answers.</span>
            </h2>
            <p className="t-body mt-6 max-w-[28ch] text-fg-muted">
              Something else on your mind? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-fg focus-ring rounded-sm">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <FAQAccordion items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
