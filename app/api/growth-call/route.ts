import { NextRequest, NextResponse } from "next/server";
import { growthCallRequestSchema } from "@/lib/validation";
import { insertGrowthCallRequest } from "@/lib/db";
import { sendGrowthCallNotification } from "@/lib/email";
import { sendToGoogleSheet, isGoogleSheetConfigured } from "@/lib/googleSheet";
import { CONTACT_EMAIL } from "@/lib/site";

const destinations = () => ({
  googleSheet: isGoogleSheetConfigured(),
  database: Boolean(process.env.DATABASE_URL),
  email: Boolean(process.env.RESEND_API_KEY),
});

/**
 * Health check: open /api/growth-call in a browser to see which lead destinations are
 * configured in this deployment. Reports booleans only — never URLs or keys.
 */
export async function GET() {
  const d = destinations();
  return NextResponse.json(
    { ok: Object.values(d).some(Boolean), configured: d },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = growthCallRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: parsed.data.name,
    businessName: parsed.data.businessName,
    website: parsed.data.website,
    serviceArea: parsed.data.serviceArea || "",
    email: parsed.data.email,
    phone: parsed.data.phone || "",
    idealAccounts: parsed.data.idealAccounts || "",
  };

  // Each destination is independent and best-effort: a failure in one (e.g. bad DB
  // credentials) doesn't block the others. But the visitor only sees success if at
  // least one configured destination actually stored the enquiry — otherwise the
  // lead would be silently lost.
  const configured = destinations();
  const [dbResult, sheetResult, emailResult] = await Promise.allSettled([
    insertGrowthCallRequest(data),
    sendToGoogleSheet(data),
    sendGrowthCallNotification(data),
  ]);

  const delivered: string[] = [];
  if (dbResult.status === "rejected") console.error("[enquiry] Postgres failed:", dbResult.reason);
  else if (configured.database) delivered.push("database");
  if (sheetResult.status === "rejected") console.error("[enquiry] Google Sheet failed:", sheetResult.reason);
  else if (sheetResult.value === "ok") delivered.push("googleSheet");
  if (emailResult.status === "rejected") console.error("[enquiry] Resend email failed:", emailResult.reason);
  else if (configured.email) delivered.push("email");

  if (delivered.length === 0) {
    console.error(
      "[enquiry] NOT STORED — no destination accepted it.",
      Object.values(configured).some(Boolean) ? "Configured destinations all failed (see errors above)." : "No destination is configured: set GOOGLE_SHEET_WEBHOOK_URL in the hosting environment and redeploy.",
      { email: data.email, businessName: data.businessName }
    );
    return NextResponse.json(
      { error: `We couldn’t send your message just now. Please email ${CONTACT_EMAIL} and we’ll reply directly.` },
      { status: 502 }
    );
  }

  console.info(`[enquiry] stored via ${delivered.join(", ")}`);
  return NextResponse.json({ ok: true });
}
