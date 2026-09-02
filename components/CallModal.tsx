"use client";

import { useEffect, useRef, useState } from "react";
import { useCallModal } from "./CallModalContext";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  businessName: string;
  website: string;
  serviceArea: string;
  email: string;
  phone: string;
  idealAccounts: string;
  company_website: string;
};

const initialState: FormState = {
  name: "",
  businessName: "",
  website: "",
  serviceArea: "",
  email: "",
  phone: "",
  idealAccounts: "",
  company_website: "",
};

export default function CallModal() {
  const { isOpen, closeModal } = useCallModal();
  if (!isOpen) return null;
  return <CallModalDialog onClose={closeModal} />;
}

function CallModalDialog({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasStartedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleFieldChange(field: keyof FormState, value: string) {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackEvent("form_start");
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    trackEvent("form_submit");

    try {
      const res = await fetch("/api/growth-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      trackEvent("growth_call_requested");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="call-modal-title"
        className="relative w-full max-w-lg rounded-2xl border border-border-strong bg-bg-raised p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1.5 text-fg-subtle transition-colors hover:text-fg focus-ring"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id="call-modal-title" className="mt-4 text-xl font-semibold text-fg">
              Got it.
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              We&apos;ll review your market and reach out to schedule your Growth Call.
            </p>
          </div>
        ) : (
          <>
            <h2 id="call-modal-title" className="text-xl font-semibold text-fg">
              Book Your Free Growth Call
            </h2>
            <p className="mt-1.5 text-sm text-fg-muted">
              Tell us about your business. We&apos;ll look at your market and follow up to
              schedule a time.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Honeypot — hidden from real users, catches simple bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company_website">Leave this field empty</label>
                <input
                  id="company_website"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company_website}
                  onChange={(e) => setForm((p) => ({ ...p, company_website: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input
                    ref={firstFieldRef}
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    className={inputClasses}
                  />
                </Field>
                <Field label="Company name" htmlFor="businessName">
                  <input
                    id="businessName"
                    required
                    value={form.businessName}
                    onChange={(e) => handleFieldChange("businessName", e.target.value)}
                    className={inputClasses}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Website" htmlFor="website">
                  <input
                    id="website"
                    required
                    placeholder="yourcompany.com"
                    value={form.website}
                    onChange={(e) => handleFieldChange("website", e.target.value)}
                    className={inputClasses}
                  />
                </Field>
                <Field label="Service area" htmlFor="serviceArea">
                  <input
                    id="serviceArea"
                    required
                    placeholder="City or region"
                    value={form.serviceArea}
                    onChange={(e) => handleFieldChange("serviceArea", e.target.value)}
                    className={inputClasses}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className={inputClasses}
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    className={inputClasses}
                  />
                </Field>
              </div>

              <Field label="What type of accounts are you hoping to win more of? (optional)" htmlFor="idealAccounts">
                <textarea
                  id="idealAccounts"
                  rows={3}
                  placeholder="e.g. medical offices, office buildings, warehouses..."
                  value={form.idealAccounts}
                  onChange={(e) => handleFieldChange("idealAccounts", e.target.value)}
                  className={`${inputClasses} resize-none`}
                />
              </Field>

              {status === "error" && (
                <p role="alert" className="text-sm text-red-400">
                  {errorMessage}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-ring disabled:opacity-60"
                >
                  {status === "submitting" ? "Submitting…" : "Book My Free Growth Call"}
                </button>
                <p className="mt-3 text-center text-xs text-fg-subtle">
                  By submitting, you agree to be contacted about your Growth Call. We don&apos;t
                  share your information with third parties.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const inputClasses =
  "w-full rounded-lg border border-border-strong bg-white/[0.03] px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus-ring focus-visible:border-accent";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-fg-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
