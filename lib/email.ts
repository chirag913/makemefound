import { Resend } from "resend";

const NOTIFICATION_RECIPIENT = "hello@makemefound.com";

export async function sendAuditNotification(data: {
  name: string;
  businessName: string;
  website: string;
  city: string;
  industry: string;
  email: string;
  phone: string;
  priorityServices: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    // Not configured — skip silently so form submissions still succeed and get stored.
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "MakeMeFound <onboarding@resend.dev>",
    to: NOTIFICATION_RECIPIENT,
    replyTo: data.email,
    subject: `New AI Visibility Audit request — ${data.businessName}`,
    text: [
      `Name: ${data.name}`,
      `Business: ${data.businessName}`,
      `Website: ${data.website}`,
      `City: ${data.city}`,
      `Industry: ${data.industry}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Priority services: ${data.priorityServices}`,
    ].join("\n"),
  });
}
