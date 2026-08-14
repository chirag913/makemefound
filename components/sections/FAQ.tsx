import FAQAccordion from "../FAQAccordion";
import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const FAQ_ITEMS = [
  {
    question: "What is AI Search Visibility?",
    answer:
      "It's how easily AI systems like ChatGPT, Gemini, and Perplexity can find, understand, and recommend your business when someone asks a relevant question. It covers whether you're mentioned, how you're described, and whether you're cited as a source.",
  },
  {
    question: "Is this the same as SEO?",
    answer:
      "AI search visibility builds on SEO, local search, content, entity authority, and digital PR — it doesn't replace traditional SEO. Think of it as the next layer: the same foundations, applied to how AI systems retrieve and recommend businesses.",
  },
  {
    question: "Can you guarantee that ChatGPT will recommend my business?",
    answer:
      "No. AI results are dynamic and no legitimate provider can guarantee a specific ranking or recommendation. We measure and improve visibility instead — tracking mentions, citations, and recommendation rate over time.",
  },
  {
    question: "Which AI platforms do you optimize for?",
    answer: "ChatGPT, Gemini, Perplexity, Google AI, and other relevant AI search experiences.",
  },
  {
    question: "How long does it take?",
    answer:
      "It varies by market, competition, existing authority, and implementation. The first step is always establishing a baseline — from there we set realistic expectations for your specific situation.",
  },
  {
    question: "Do you work with businesses outside the US?",
    answer: "Yes, but our messaging is initially focused on US local businesses.",
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
