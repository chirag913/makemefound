// Absolute ("/#…") so the same links work from /privacy and /terms.
export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];

export const PRIMARY_CTA = "Book a Call";

export const SERVICES = [
  { id: "long-form", label: "Long-form editing" },
  { id: "short-form", label: "Short-form repurposing" },
  { id: "packaging", label: "Content packaging" },
] as const;
