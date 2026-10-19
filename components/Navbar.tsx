"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useCallModal } from "./CallModalContext";
import Logo from "./Logo";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/nav";

export default function Navbar() {
  const { openModal } = useCallModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || mobileOpen
          ? "border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring rounded-md" aria-label="MakeMeFound home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors hover:text-fg focus-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button size="sm" arrow onClick={() => openModal("navbar")}>
            {PRIMARY_CTA}
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-fg focus-ring lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            ) : (
              <path d="M3 7h14M3 13h14" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-lg tracking-[-0.02em] text-fg focus-ring"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="t-label text-fg-faint">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pb-3 pt-5">
              <Button
                arrow
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openModal("navbar_mobile");
                }}
              >
                {PRIMARY_CTA}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
