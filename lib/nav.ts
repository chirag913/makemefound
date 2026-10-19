// Absolute ("/#…") so the same links work from /privacy and /terms.
export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "How We Work", href: "/#process" },
  { label: "Examples", href: "/#examples" },
  { label: "About", href: "/#about" },
];

export const PRIMARY_CTA = "Discuss Your Growth Goals";
export const SECONDARY_CTA = "See How We Work";

/** Service lines. `label` is also what the intake form sends to the Google Sheet. */
export const SERVICES = [
  { id: "acquisition", label: "Customer acquisition" },
  { id: "conversion", label: "Conversion optimization" },
  { id: "systems", label: "Revenue systems & automation" },
] as const;

/** Extra option on the intake form only — content work is offered when it supports growth. */
export const FORM_INTERESTS = [...SERVICES.map((s) => s.label), "Content production", "Not sure yet"];
