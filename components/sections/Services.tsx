import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";
import ServiceCard from "../ServiceCard";

const ICON_STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.75 } as const;

const SERVICES = [
  {
    title: "AI Search Optimization",
    description: "Make your business easier for AI systems to understand and retrieve.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...ICON_STROKE}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Entity & Knowledge Optimization",
    description: "Build a consistent, authoritative digital identity across the web.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...ICON_STROKE}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="5" cy="6" r="1.5" />
        <circle cx="19" cy="6" r="1.5" />
        <circle cx="5" cy="18" r="1.5" />
        <circle cx="19" cy="18" r="1.5" />
        <path d="M9.5 10.5L6.2 7.2M14.5 10.5l3.3-3.3M9.5 13.5L6.2 16.8M14.5 13.5l3.3 3.3" />
      </svg>
    ),
  },
  {
    title: "Local Search Authority",
    description: "Strengthen your Google Business Profile, local presence, and reputation.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...ICON_STROKE}>
        <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Answer-Focused Content",
    description: "Create useful pages that directly answer the questions customers ask.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...ICON_STROKE}>
        <path d="M8 9h8M8 13h5" strokeLinecap="round" />
        <path d="M21 12c0 4.42-4.03 8-9 8-1.02 0-2-.15-2.9-.43L4 21l1.5-3.6C4.56 16.1 4 14.6 4 12c0-4.42 4.03-8 9-8s8 3.58 8 8z" />
      </svg>
    ),
  },
  {
    title: "Digital PR & Mentions",
    description: "Build legitimate third-party authority and relevant citations.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...ICON_STROKE}>
        <path d="M4 11v2a2 2 0 002 2h1l3 4V7L7 11H6a2 2 0 00-2 2z" />
        <path d="M15 8a4 4 0 010 8M18 5a8 8 0 010 14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Visibility Monitoring",
    description: "Track mentions, recommendations, citations, and competitors over time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...ICON_STROKE}>
        <path d="M4 19V9M11 19V5M18 19v-7" strokeLinecap="round" />
        <path d="M3 19h18" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Everything AI needs to understand your business.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 60}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
