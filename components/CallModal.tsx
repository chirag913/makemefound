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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-md animate-fade-in sm:items-center sm:py-10"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="call-modal-title"
        aria-describedby="call-modal-desc"
        className="artifact relative w-full max-w-xl animate-dialog-in"
      >
        <div className="artifact-bar">
          <span className="t-mono flex items-center gap-2.5 text-fg-muted">
            <span className="dot dot-live" aria-hidden="true" /> New diagnosis request
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1.5 rounded-full p-1.5 text-fg-subtle transition-colors hover:text-fg focus-ring"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {status === "success" ? (
            <div className="py-6">
              <span className="t-mono flex items-center gap-2 text-ok">
                <span className="dot dot-ok" aria-hidden="true" /> Received
              </span>
              <h2 id="call-modal-title" className="t-h3 mt-5 text-fg">
                Got it. We&apos;ll start looking.
              </h2>
              <p id="call-modal-desc" className="t-body mt-3 max-w-[42ch] text-fg-muted">
                We&apos;ll review your site and customer journey before we reach out, so the first
                conversation is about what we found — not a pitch.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm text-fg transition-colors hover:border-line-hover focus-ring"
              >
                Back to the site
              </button>
            </div>
          ) : (
            <>
              <h2 id="call-modal-title" className="t-h3 text-fg">
                Let&apos;s find your bottleneck.
              </h2>
              <p id="call-modal-desc" className="t-body mt-2 text-fg-muted">
                Tell us where to look. We&apos;ll review your journey and follow up to set a time to
                walk you through what we see.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
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
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      className={inputClasses}
                    />
                  </Field>
                  <Field label="Company" htmlFor="businessName">
                    <input
                      id="businessName"
                      name="businessName"
                      autoComplete="organization"
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
                      name="website"
                      autoComplete="url"
                      inputMode="url"
                      required
                      placeholder="yourcompany.com"
                      value={form.website}
                      onChange={(e) => handleFieldChange("website", e.target.value)}
                      className={inputClasses}
                    />
                  </Field>
                  <Field label="Market or service area" htmlFor="serviceArea">
                    <input
                      id="serviceArea"
                      name="serviceArea"
                      required
                      placeholder="City, region or ZIP codes"
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
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      className={inputClasses}
                    />
                  </Field>
                  <Field label="Phone" htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      className={inputClasses}
                    />
                  </Field>
                </div>

                <Field label="Where does growth feel stuck?" hint="Optional" htmlFor="idealAccounts">
                  <textarea
                    id="idealAccounts"
                    name="idealAccounts"
                    rows={3}
                    placeholder="e.g. ads get clicks but few calls · want more referrals from realtors · leads go cold"
                    value={form.idealAccounts}
                    onChange={(e) => handleFieldChange("idealAccounts", e.target.value)}
                    className={`${inputClasses} h-auto resize-none py-3`}
                  />
                </Field>

                {status === "error" && (
                  <p role="alert" className="flex items-center gap-2 text-sm text-signal">
                    <span className="dot dot-signal" aria-hidden="true" />
                    {errorMessage}
                  </p>
                )}

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-fg px-6 text-[0.9375rem] font-medium text-bg transition-colors hover:bg-white focus-ring disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Find my bottleneck"}
                    {status !== "submitting" && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="arrow-nudge">
                        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-fg-subtle">
                    No commitment to buy anything. We don&apos;t share your information with third
                    parties.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputClasses =
  "h-11 w-full rounded-[var(--radius-md)] border border-line-strong bg-bg/60 px-3.5 text-[0.9375rem] text-fg placeholder:text-fg-faint transition-colors hover:border-line-hover focus:border-fg-muted focus:outline-none focus-visible:outline-none";

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-xs font-medium text-fg-muted">
        {label}
        {hint && <span className="t-mono text-fg-faint">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
