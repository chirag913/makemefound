import FAQAccordion from "../FAQAccordion";
import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const FAQ_ITEMS = [
  {
    question: "Do you work exclusively with commercial cleaning companies?",
    answer:
      "Yes, for now. MakeMeFound is initially specializing in commercial cleaning companies and building a specialized client-acquisition system for this market rather than spreading across many industries.",
  },
  {
    question: "Do you guarantee clients?",
    answer:
      "No — and we're wary of anyone who does. Our goal is to generate qualified sales opportunities. You control pricing, sales conversations, proposals, and closing.",
  },
  {
    question: "Do you provide the leads or actually contact them?",
    answer:
      "We handle the full process: prospect research, decision-maker identification, outreach, and follow-up. You get qualified opportunities ready for a call, estimate, or site visit.",
  },
  {
    question: "What types of businesses can you target?",
    answer:
      "Medical offices, office buildings, warehouses, restaurants, property management companies, gyms, retail locations, industrial facilities, and other commercial properties — depending on your ideal customer profile.",
  },
  {
    question: "What areas do you cover?",
    answer: "Campaigns are built around your service area — wherever you're licensed and able to take on new accounts.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Frequently asked questions.
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          <FAQAccordion items={FAQ_ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}
