"use client";

import Button from "./Button";
import Reveal from "./Reveal";
import { useCallModal } from "./CallModalContext";

export default function CTASection() {
  const { openModal } = useCallModal();

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
          Ready to Build a More Predictable Sales Pipeline?
        </h2>
        <p className="mt-4 text-lg text-fg-muted">
          Let&apos;s look at your market, ideal customers, and current client acquisition process
          and see whether outbound can help you generate more commercial opportunities.
        </p>
        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={() => openModal("final_cta")}>
            Book a Free Growth Call →
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
