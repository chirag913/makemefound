import { NextRequest, NextResponse } from "next/server";
import { growthCallRequestSchema } from "@/lib/validation";
import { insertGrowthCallRequest } from "@/lib/db";
import { sendLeadNotification, isEmailConfigured } from "@/lib/email";
import { sendToGoogleSheet, isGoogleSheetConfigured } from "@/lib/googleSheet";
import { CONTACT_EMAIL } from "@/lib/site";

// Email (Resend) is the primary channel. Google Sheet and Postgres are optional extras
// and are skipped entirely unless their env vars are set.
const destinations = () => ({
  email: isEmailConfigured(),
  googleSheet: isGoogleSheetConfigured(),
  database: Boolean(process.env.DATABASE_URL),
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
  const source = parsed.data.source || "";

  // Each destination is independent and best-effort: a failure in one (e.g. bad DB
  // credentials) doesn't block the others. But the visitor only sees success if at
  // least one configured destination actually stored the enquiry — otherwise the
  // lead would be silently lost.
  const configured = destinations();
  const [emailResult, sheetResult, dbResult] = await Promise.allSettled([
    sendLeadNotification({ ...data, source }),
    sendToGoogleSheet(data),
    configured.database ? insertGrowthCallRequest(data) : Promise.resolve(),
  ]);

  const delivered: string[] = [];
  if (dbResult.status === "rejected") console.error("[enquiry] Postgres failed:", dbResult.reason);
  else if (configured.database) delivered.push("database");
  if (sheetResult.status === "rejected") console.error("[enquiry] Google Sheet failed:", sheetResult.reason);
  else if (sheetResult.value === "ok") delivered.push("googleSheet");
  if (emailResult.status === "rejected") console.error("[enquiry] Resend email failed:", emailResult.reason);
  else if (emailResult.value === "ok") delivered.push("email");

  if (delivered.length === 0) {
    console.error(
      "[enquiry] NOT STORED — no destination accepted it.",
      Object.values(configured).some(Boolean) ? "Configured destinations all failed (see errors above)." : "No destination is configured: set RESEND_API_KEY in the hosting environment and redeploy.",
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
