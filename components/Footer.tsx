import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Who We Help", href: "#who-we-help" },
  { label: "FAQ", href: "#faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/makemefound" },
  { label: "X", href: "https://x.com/makemefoundai" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/logo-mark.png" alt="" width={28} height={28} className="h-7 w-7" />
            <p className="text-lg font-semibold tracking-tight text-fg">MakeMeFound</p>
          </div>
          <p className="mt-1 text-sm text-fg-muted">Client Acquisition for Commercial Cleaning Companies</p>
          <p className="mt-4 text-sm text-fg-subtle">
            <a href="mailto:hello@makemefound.com" className="hover:text-fg-muted focus-ring rounded-md">
              hello@makemefound.com
            </a>
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {FOOTER_LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-fg-muted hover:text-fg focus-ring rounded-md"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-fg-muted hover:text-fg focus-ring rounded-md"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-subtle hover:text-fg-muted focus-ring rounded-md"
              aria-label={social.label}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border pt-6">
        <p className="text-xs text-fg-subtle">
          © {new Date().getFullYear()} MakeMeFound. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
