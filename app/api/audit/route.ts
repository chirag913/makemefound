import { NextRequest, NextResponse } from "next/server";
import { auditRequestSchema } from "@/lib/validation";
import { insertAuditRequest } from "@/lib/db";
import { sendAuditNotification } from "@/lib/email";
import { sendToGoogleSheet } from "@/lib/googleSheet";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = auditRequestSchema.safeParse(body);
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
    city: parsed.data.city,
    industry: parsed.data.industry,
    email: parsed.data.email,
    phone: parsed.data.phone,
    priorityServices: parsed.data.priorityServices,
  };

  // Each destination is independent and best-effort — a visitor's submission should
  // succeed as long as at least one of these is configured, and a failure in one
  // (e.g. bad DB credentials) shouldn't block the others or the user-facing response.
  const results = await Promise.allSettled([
    insertAuditRequest(data),
    sendToGoogleSheet(data),
    sendAuditNotification(data),
  ]);

  const [dbResult, sheetResult, emailResult] = results;
  if (dbResult.status === "rejected") {
    console.error("Failed to store audit request in Postgres:", dbResult.reason);
  }
  if (sheetResult.status === "rejected") {
    console.error("Failed to send audit request to Google Sheet:", sheetResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("Failed to send audit notification email:", emailResult.reason);
  }

  return NextResponse.json({ ok: true });
}
