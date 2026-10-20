// Sends an enquiry to a Google Sheet via an Apps Script Web App
// (see google-apps-script/Code.gs for the script that receives this POST,
// appends a row, and emails chirag@getmakemefound.com).

export function isGoogleSheetConfigured() {
  return Boolean(process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim());
}

/**
 * Returns "skipped" when no webhook is configured, "ok" when the script confirms the
 * row was written. Throws with a diagnostic message otherwise.
 *
 * Apps Script often answers failures with an HTML page and HTTP 200 (sign-in page when
 * the deployment isn't public, "Authorization is required", script errors), so a 200
 * alone is not proof of success — the body must be the script's {"ok":true}.
 */
export async function sendToGoogleSheet(data: {
  name: string;
  businessName: string;
  website: string;
  serviceArea: string;
  email: string;
  phone: string;
  idealAccounts: string;
}): Promise<"ok" | "skipped"> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim();
  if (!webhookUrl) return "skipped";

  if (!/\/exec\/?(\?.*)?$/.test(webhookUrl)) {
    throw new Error(
      "GOOGLE_SHEET_WEBHOOK_URL should be the Web app URL ending in /exec (from Deploy > Manage deployments), not a /dev or editor URL."
    );
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    redirect: "follow",
    cache: "no-store",
  });

  const text = await res.text();
  let json: { ok?: boolean } | null = null;
  try {
    json = JSON.parse(text);
  } catch {
    // not JSON — handled below
  }

  if (res.ok && json?.ok === true) return "ok";

  const snippet = text.replace(/\s+/g, " ").slice(0, 200);
  let hint = "";
  if (/accounts\.google\.com|ServiceLogin|sign in/i.test(text)) {
    hint = " — the deployment is not public: set 'Who has access' to 'Anyone' and redeploy.";
  } else if (/authoriz/i.test(text)) {
    hint = " — the script needs authorizing: run doPost once from the editor or redeploy and accept permissions.";
  } else if (/TypeError|Exception|getActiveSheet|null/i.test(text)) {
    hint = " — the script threw an error: make sure it was created from the Sheet (Extensions > Apps Script).";
  } else if (res.status === 404) {
    hint = " — the deployment URL is wrong or was deleted.";
  }
  throw new Error(`Google Sheet webhook failed (HTTP ${res.status})${hint} Response: ${snippet}`);
}
