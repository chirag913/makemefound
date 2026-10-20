import { Resend } from "resend";

/**
 * Lead notifications via Resend — the primary way enquiries reach us.
 *
 * Env:
 *   RESEND_API_KEY          required
 *   LEAD_NOTIFICATION_EMAIL who gets the email; comma-separate for several
 *   RESEND_FROM_EMAIL       sender, e.g. "MakeMeFound <leads@getmakemefound.com>" once that
 *                           domain is verified in Resend. Until then the default
 *                           onboarding@resend.dev sender only delivers to the email
 *                           address that owns the Resend account.
 */

const DEFAULT_RECIPIENT = "chirag@getmakemefound.com";
const DEFAULT_FROM = "MakeMeFound <onboarding@resend.dev>";

export type LeadData = {
  name: string;
  businessName: string;
  website: string;
  serviceArea: string;
  email: string;
  phone: string;
  idealAccounts: string;
  source?: string;
};

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function recipients() {
  return (process.env.LEAD_NOTIFICATION_EMAIL || DEFAULT_RECIPIENT)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function websiteHref(raw: string) {
  const v = raw.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

/** Returns "skipped" when Resend isn't configured, "ok" when Resend accepted the email. Throws otherwise. */
export async function sendLeadNotification(data: LeadData): Promise<"ok" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return "skipped";

  const received = new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Company", data.businessName],
    ["Website", data.website],
    ["Interested in", data.serviceArea || "—"],
    ["Goals & context", data.idealAccounts || "—"],
    ["Submitted from", data.source || "website"],
    ["Received", `${received} IST`],
  ];

  const text = [
    `New enquiry from ${data.name} (${data.businessName})`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Reply to this email to respond directly.",
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f5f5f4;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0a0a0b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e7e5e4;border-radius:10px">
<tr><td style="padding:24px 24px 8px"><p style="margin:0;font-size:13px;color:#78716c">New enquiry · MakeMeFound</p>
<h1 style="margin:8px 0 0;font-size:22px;line-height:1.25;font-weight:600">${esc(data.name)} — ${esc(data.businessName)}</h1></td></tr>
<tr><td style="padding:16px 24px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">
${rows
  .map(([k, v]) => {
    let val = esc(v).replace(/\n/g, "<br>");
    if (k === "Email") val = `<a href="mailto:${esc(v)}" style="color:#4f46e5">${esc(v)}</a>`;
    if (k === "Website" && v) val = `<a href="${esc(websiteHref(v))}" style="color:#4f46e5">${esc(v)}</a>`;
    if (k === "Phone" && v !== "—") val = `<a href="tel:${esc(v.replace(/[^\d+]/g, ""))}" style="color:#4f46e5">${esc(v)}</a>`;
    return `<tr><td style="padding:8px 12px 8px 0;color:#78716c;vertical-align:top;white-space:nowrap;border-top:1px solid #f0efee">${k}</td><td style="padding:8px 0;border-top:1px solid #f0efee">${val}</td></tr>`;
  })
  .join("\n")}
</table></td></tr>
<tr><td style="padding:16px 24px 24px"><a href="mailto:${esc(data.email)}?subject=${encodeURIComponent("Re: your enquiry to MakeMeFound")}" style="display:inline-block;background:#0a0a0b;color:#ffffff;text-decoration:none;font-size:14px;padding:10px 18px;border-radius:999px">Reply to ${esc(data.name.split(" ")[0] || data.name)}</a></td></tr>
</table></td></tr></table></body></html>`;

  const resend = new Resend(apiKey);
  // The SDK reports failures in `error` rather than throwing — check it, or a bad key or
  // unverified sender would look like success.
  const { data: sent, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM,
    to: recipients(),
    replyTo: data.email,
    subject: `New enquiry — ${data.businessName} (${data.name})`,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend rejected the email: ${error.name ?? "error"} — ${error.message}`);
  }
  if (!sent?.id) throw new Error("Resend returned no message id");
  return "ok";
}
