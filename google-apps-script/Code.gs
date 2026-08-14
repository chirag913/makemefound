/**
 * MakeMeFound — Audit request intake for Google Sheets.
 *
 * SETUP (one time):
 * 1. Create a new Google Sheet (sheets.new).
 * 2. Extensions > Apps Script. Delete any starter code and paste this whole file in.
 * 3. Update NOTIFICATION_EMAIL below if needed.
 * 4. Save, then Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the requested permissions (Sheets + Gmail send) when prompted.
 * 6. Copy the "Web app URL" it gives you.
 * 7. In the Next.js project, set GOOGLE_SHEET_WEBHOOK_URL to that URL (in .env.local, and
 *    in your hosting provider's env vars for production).
 *
 * Every submission appends a row to this sheet AND sends a notification email.
 * Re-run Deploy > Manage deployments > edit (pencil) > New version any time you change this file.
 */

const NOTIFICATION_EMAIL = "hello@makemefound.com";

const HEADERS = [
  "Timestamp",
  "Name",
  "Business Name",
  "Website",
  "City",
  "Industry",
  "Email",
  "Phone",
  "Priority Services",
];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders(sheet);

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.businessName || "",
    data.website || "",
    data.city || "",
    data.industry || "",
    data.email || "",
    data.phone || "",
    data.priorityServices || "",
  ]);

  sendNotificationEmail(data);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "MakeMeFound audit intake is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function sendNotificationEmail(data) {
  const subject = `New AI Visibility Audit request — ${data.businessName || "Unknown business"}`;
  const body = [
    `Name: ${data.name || ""}`,
    `Business: ${data.businessName || ""}`,
    `Website: ${data.website || ""}`,
    `City: ${data.city || ""}`,
    `Industry: ${data.industry || ""}`,
    `Email: ${data.email || ""}`,
    `Phone: ${data.phone || ""}`,
    `Priority services: ${data.priorityServices || ""}`,
  ].join("\n");

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    replyTo: data.email || undefined,
    subject: subject,
    body: body,
  });
}
