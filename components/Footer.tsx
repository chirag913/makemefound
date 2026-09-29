import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/nav";
import { CONTACT_EMAIL, SITE_TAGLINE } from "@/lib/site";

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/makemefound" },
  { label: "X", href: "https://x.com/makemefoundai" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-block focus-ring rounded-md" aria-label="MakeMeFound home">
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">{SITE_TAGLINE} Conversion paths, referral channels and revenue automation.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline mt-6 inline-block text-sm text-fg focus-ring rounded-sm">
            {CONTACT_EMAIL}
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
          <p className="t-mono text-fg-faint">Site</p>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-fg-muted transition-colors hover:text-fg focus-ring rounded-sm">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#faq" className="text-sm text-fg-muted transition-colors hover:text-fg focus-ring rounded-sm">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="t-mono text-fg-faint">Legal</p>
          <ul className="mt-4 space-y-3">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-fg-muted transition-colors hover:text-fg focus-ring rounded-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="t-mono text-fg-faint">Follow</p>
          <ul className="mt-4 space-y-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-fg-muted transition-colors hover:text-fg focus-ring rounded-sm">
                  {s.label}
                </a>
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
