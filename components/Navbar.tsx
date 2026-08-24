"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useCallModal } from "./CallModalContext";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Who We Help", href: "#who-we-help" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const { openModal } = useCallModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 focus-ring rounded-md">
          <Image src="/logo-mark.png" alt="" width={32} height={32} className="h-8 w-8" priority />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-fg">MakeMeFound</span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
              Client Acquisition
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg focus-ring rounded-md"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="primary"
            className="px-4 py-2.5 text-sm"
            onClick={() => openModal("navbar")}
          >
            Book a Free Growth Call
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-fg focus-ring lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2.5 text-sm text-fg-muted hover:text-fg focus-ring"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3">
              <Button
                variant="primary"
                onClick={() => {
                  setMobileOpen(false);
                  openModal("navbar_mobile");
                }}
              >
                Book a Free Growth Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
