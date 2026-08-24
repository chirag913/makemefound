import Reveal from "../Reveal";
import SectionLabel from "../SectionLabel";

const ACCOUNT_TYPES = [
  "Medical Offices",
  "Office Buildings",
  "Warehouses",
  "Property Management Companies",
  "Restaurants",
  "Gyms",
  "Retail Locations",
  "Industrial Facilities",
  "Daycare Facilities",
];

export default function TargetClients() {
  return (
    <section id="who-we-help" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Who We Help</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            We Help You Target the Right Accounts
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {ACCOUNT_TYPES.map((type, i) => (
            <Reveal key={type} delay={i * 40}>
              <div className="flex h-full items-center rounded-xl border border-border bg-bg-card/40 px-5 py-4 text-sm font-medium text-fg">
                {type}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-fg-subtle">
            Not every campaign targets every account type. We build your campaign around your
            ideal customer profile and service area.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
