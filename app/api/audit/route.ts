import { NextRequest, NextResponse } from "next/server";
import { auditRequestSchema } from "@/lib/validation";
import { insertAuditRequest } from "@/lib/db";
import { sendAuditNotification } from "@/lib/email";

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

  try {
    await insertAuditRequest(data);
  } catch (error) {
    console.error("Failed to store audit request:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again shortly." },
      { status: 500 }
    );
  }

  try {
    await sendAuditNotification(data);
  } catch (error) {
    // Storage succeeded — don't fail the request just because the notification email failed.
    console.error("Failed to send audit notification email:", error);
  }

  return NextResponse.json({ ok: true });
}
