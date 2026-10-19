import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS, SERVICES } from "@/lib/nav";
import { CONTACT_EMAIL, SOCIAL_LINKS, OWN_CHANNELS } from "@/lib/site";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const linkCls = "t-small text-fg-muted transition-colors hover:text-fg focus-ring rounded-sm";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <p className="t-small text-fg-subtle">Start a project</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="link-underline mt-3 inline-block rounded-sm text-[clamp(1.75rem,3.6vw,3rem)] font-medium tracking-[-0.04em] text-fg focus-ring"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-6">
            <FooterCol title="Services" links={SERVICES.map((s) => ({ label: s.label, href: `/#service-${s.id}` }))} />
            <FooterCol title="Company" links={[...NAV_LINKS, { label: "Contact", href: "/#contact" }]} />
            <FooterCol title="Follow" external links={[...SOCIAL_LINKS, ...OWN_CHANNELS.map((c) => ({ label: c.name, href: c.url }))]} />
            <FooterCol title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-block rounded-md focus-ring" aria-label="MakeMeFound home">
            <Logo />
          </Link>
          <div className="t-small text-fg-subtle sm:text-right">
            <p>MakeMeFound is a brand operated by CHIRAG DIGITAL PRIVATE LIMITED.</p>
            <p className="mt-1">© 2026 CHIRAG DIGITAL PRIVATE LIMITED. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, external = false }: { title: string; links: { label: string; href: string }[]; external?: boolean }) {
  return (
    <div>
      <p className="t-small text-fg-subtle">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            {external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
