"use client";

import Button from "./Button";
import Reveal from "./Reveal";
import { useAuditModal } from "./AuditModalContext";

export default function CTASection() {
  const { openModal } = useAuditModal();

  return (
    <section className="relative overflow-hidden border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, var(--color-accent-soft), transparent)",
        }}
      />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
          Is AI recommending your competitors instead of you?
        </h2>
        <p className="mt-4 text-lg text-fg-muted">Let&apos;s find out.</p>
        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={() => openModal("final_cta")}>
            Get My Free AI Visibility Audit →
          </Button>
        </div>
        <p className="mt-4 text-xs text-fg-subtle">
          No obligation. We&apos;ll show you the actual searches first.
        </p>
      </Reveal>
    </section>
  );
}
