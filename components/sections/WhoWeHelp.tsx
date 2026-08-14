import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const SEGMENTS = [
  { title: "Dental Practices", detail: "Implants · Invisalign · Cosmetic Dentistry" },
  { title: "Med Spas", detail: "Injectables · Laser · Body Treatments" },
  { title: "Home Services", detail: "Roofing · HVAC · Remodeling" },
  { title: "Interior & Design", detail: "Full-home · Kitchens · Remodeling" },
];

export default function WhoWeHelp() {
  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Who We Help</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Built for businesses where one customer is worth a lot.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((segment, i) => (
            <Reveal key={segment.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-bg-card/40 p-6">
                <h3 className="text-base font-semibold text-fg">{segment.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{segment.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <p className="mx-auto mt-12 max-w-2xl text-balance text-center text-base text-fg-muted">
            If your business depends on local customers finding and choosing you, AI visibility can
            become another acquisition channel.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
