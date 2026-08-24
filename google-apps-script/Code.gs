/**
 * MakeMeFound — Growth Call request intake for Google Sheets.
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
  "Company Name",
  "Website",
  "Service Area",
  "Email",
  "Phone",
  "Ideal Accounts",
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
    data.serviceArea || "",
    data.email || "",
    data.phone || "",
    data.idealAccounts || "",
  ]);

  sendNotificationEmail(data);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "MakeMeFound growth call intake is live." })
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
  const subject = "New Growth Call request - " + (data.businessName || "Unknown business");
  const body = [
    "Name: " + (data.name || ""),
    "Company: " + (data.businessName || ""),
    "Website: " + (data.website || ""),
    "Service area: " + (data.serviceArea || ""),
    "Email: " + (data.email || ""),
    "Phone: " + (data.phone || ""),
    "Ideal accounts: " + (data.idealAccounts || "")
  ].join("\n");

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    replyTo: data.email || undefined,
    subject: subject,
    body: body,
  });
}
