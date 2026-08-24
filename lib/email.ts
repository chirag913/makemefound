import { Resend } from "resend";

const NOTIFICATION_RECIPIENT = "hello@makemefound.com";

export async function sendGrowthCallNotification(data: {
  name: string;
  businessName: string;
  website: string;
  serviceArea: string;
  email: string;
  phone: string;
  idealAccounts: string;
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
    subject: `New Growth Call request — ${data.businessName}`,
    text: [
      `Name: ${data.name}`,
      `Company: ${data.businessName}`,
      `Website: ${data.website}`,
      `Service area: ${data.serviceArea}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Ideal accounts: ${data.idealAccounts}`,
    ].join("\n"),
  });
}
