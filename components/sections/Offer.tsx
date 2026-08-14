"use client";

import Button from "../Button";
import Reveal from "../Reveal";
import { useAuditModal } from "../AuditModalContext";

const INCLUDES = [
  "AI visibility baseline",
  "High-intent query research",
  "Competitor analysis",
  "Website / entity optimization",
  "Answer-focused content strategy",
  "Local authority",
  "Digital PR / relevant mentions",
  "AI visibility monitoring",
  "Monthly reporting",
];

export default function Offer() {
  const { openModal } = useAuditModal();

  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="rounded-2xl border border-border-strong bg-bg-card/60 p-8 sm:p-10">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              AI Search Visibility Program
            </h2>
            <p className="mt-3 text-base text-fg-muted">
              Built for local businesses ready to become more visible across AI search.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-0.5 shrink-0 text-accent"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button variant="primary" onClick={() => openModal("offer")}>
                Apply for an AI Visibility Audit →
              </Button>
              <p className="mt-4 text-sm text-fg-subtle">
                We work with a limited number of businesses at a time so each account receives
                hands-on strategy.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
