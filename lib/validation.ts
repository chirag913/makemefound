import { z } from "zod";

// Field keys are kept stable because the Google Apps Script web app, Postgres table
// and email template all read them. What each key holds on the intake form:
//   businessName  → company name
//   website       → company website
//   serviceArea   → areas they want help with (comma-separated)
//   idealAccounts → goals and where growth feels stuck
export const growthCallRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  businessName: z.string().trim().min(1, "Company name is required").max(200),
  website: z.string().trim().min(1, "Website is required").max(300),
  serviceArea: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  idealAccounts: z.string().trim().max(1000).optional().or(z.literal("")),
  // Which CTA opened the form (e.g. "hero"); included in the notification email only.
  source: z.string().trim().max(60).optional().or(z.literal("")),
  // Honeypot field — real users never fill this in.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type GrowthCallRequestInput = z.infer<typeof growthCallRequestSchema>;
