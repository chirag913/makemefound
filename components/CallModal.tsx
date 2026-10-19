"use client";

import { useEffect, useRef, useState } from "react";
import { useCallModal } from "./CallModalContext";
import { trackEvent } from "@/lib/analytics";
import { SERVICES } from "@/lib/nav";

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

  // Services are stored as a comma-separated list in the existing `serviceArea` key,
  // so the Google Sheet keeps receiving the same payload shape.
  const selected = form.serviceArea ? form.serviceArea.split(", ") : [];
  function toggleService(label: string) {
    const next = selected.includes(label) ? selected.filter((s) => s !== label) : [...selected, label];
    handleFieldChange("serviceArea", SERVICES.map((s) => s.label).filter((l) => next.includes(l)).join(", "));
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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-md animate-fade-in sm:items-center sm:py-10"
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
        className="frame relative w-full max-w-xl !overflow-visible bg-surface animate-dialog-in"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
          <span className="t-label flex items-center gap-2.5 text-fg-muted">
            <span className="dot dot-accent" aria-hidden="true" /> Intro call request
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
              <span className="t-label flex items-center gap-2 text-accent">
                <span className="dot dot-accent" aria-hidden="true" /> Received
              </span>
              <h2 id="call-modal-title" className="t-h3 mt-5 text-fg">
                Thanks — we&apos;ll be in touch.
              </h2>
              <p id="call-modal-desc" className="t-body mt-3 max-w-[42ch] text-fg-muted">
                We&apos;ll look at your channel before we reply, then email you to set up a time for the
                intro call.
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
                Book an intro call
              </h2>
              <p id="call-modal-desc" className="t-body mt-2 text-fg-muted">
                Tell us about your channel and where you need help. We&apos;ll review it and email you to
                schedule a time.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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
                  <Field label="Your name" htmlFor="name">
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
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Channel or brand name" htmlFor="businessName">
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
                  <Field label="Channel link" htmlFor="website">
                    <input
                      id="website"
                      name="website"
                      inputMode="url"
                      autoComplete="url"
                      required
                      placeholder="youtube.com/@yourchannel"
                      value={form.website}
                      onChange={(e) => handleFieldChange("website", e.target.value)}
                      className={inputClasses}
                    />
                  </Field>
                </div>

                <fieldset>
                  <legend className="mb-2 flex w-full items-baseline justify-between text-xs font-medium text-fg-muted">
                    What do you need help with?
                    <span className="t-label text-fg-faint">Pick any</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((svc) => {
                      const on = selected.includes(svc.label);
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleService(svc.label)}
                          className={`h-10 rounded-full border px-4 text-sm transition-colors focus-ring ${
                            on ? "border-accent bg-accent-soft text-fg" : "border-line-strong text-fg-muted hover:border-line-hover hover:text-fg"
                          }`}
                        >
                          {svc.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <Field label="Your channel and workflow" hint="Optional" htmlFor="idealAccounts">
                  <textarea
                    id="idealAccounts"
                    name="idealAccounts"
                    rows={3}
                    placeholder="e.g. one long video a week, recorded on Mondays · want shorts from each · editing in-house today"
                    value={form.idealAccounts}
                    onChange={(e) => handleFieldChange("idealAccounts", e.target.value)}
                    className={`${inputClasses} h-auto resize-none py-3`}
                  />
                </Field>

                <Field label="Phone or WhatsApp" hint="Optional" htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    className={inputClasses}
                  />
                </Field>

                {status === "error" && (
                  <p role="alert" className="flex items-center gap-2 text-sm text-rec">
                    <span className="dot bg-rec" aria-hidden="true" />
                    {errorMessage}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-fg px-6 text-[0.9375rem] font-medium text-bg transition-colors hover:bg-white focus-ring disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Request intro call"}
                    {status !== "submitting" && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="arrow-nudge">
                        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-fg-subtle">
                    No obligation. We don&apos;t share your information with third parties.
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
  "h-11 w-full rounded-[var(--radius-sm)] border border-line-strong bg-bg/60 px-3.5 text-[0.9375rem] text-fg placeholder:text-fg-faint transition-colors hover:border-line-hover focus:border-accent focus:outline-none";

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
        {hint && <span className="t-label text-fg-faint">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
