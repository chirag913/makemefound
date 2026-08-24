// Sends a new growth-call request to a Google Sheet via an Apps Script Web App
// (see google-apps-script/Code.gs for the script that receives this POST,
// appends a row, and emails hello@makemefound.com).
export async function sendToGoogleSheet(data: {
  name: string;
  businessName: string;
  website: string;
  serviceArea: string;
  email: string;
  phone: string;
  idealAccounts: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    // Not configured — skip silently.
    return;
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Google Sheet webhook responded with ${res.status}`);
  }
}
