import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS, SERVICES } from "@/lib/nav";
import { CONTACT_EMAIL, SITE_TAGLINE, SOCIAL_LINKS } from "@/lib/site";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const linkCls = "text-sm text-fg-muted transition-colors hover:text-fg focus-ring rounded-sm";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="inline-block rounded-md focus-ring" aria-label="MakeMeFound home">
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">
            {SITE_TAGLINE}. Long-form editing, short-form repurposing and content packaging.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline mt-6 inline-block rounded-sm text-sm text-fg focus-ring">
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="lg:col-span-2 lg:col-start-6">
          <p className="t-label text-fg-faint">Services</p>
          <ul className="mt-4 space-y-3">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link href={`/#service-${s.id}`} className={linkCls}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="t-label text-fg-faint">Studio</p>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className={linkCls}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="t-label text-fg-faint">Follow</p>
          <ul className="mt-4 space-y-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="t-label text-fg-faint">Legal</p>
          <ul className="mt-4 space-y-3">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:justify-between">
        <p className="text-xs text-fg-subtle">MakeMeFound is a brand operated by CHIRAG DIGITAL PRIVATE LIMITED.</p>
        <p className="text-xs text-fg-subtle">© 2026 CHIRAG DIGITAL PRIVATE LIMITED. All rights reserved.</p>
      </div>
    </footer>
  );
}
