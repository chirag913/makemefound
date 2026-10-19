import { z } from "zod";

// Field keys are kept stable because the Google Apps Script web app, Postgres table
// and email template all read them. What each key holds on the creator form:
//   businessName  → channel or brand name
//   website       → channel URL
//   serviceArea   → services the creator is interested in (comma-separated)
//   idealAccounts → channel, workflow and where they need help
export const growthCallRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  businessName: z.string().trim().min(1, "Channel name is required").max(200),
  website: z.string().trim().min(1, "Channel link is required").max(300),
  serviceArea: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  idealAccounts: z.string().trim().max(1000).optional().or(z.literal("")),
  // Honeypot field — real users never fill this in.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type GrowthCallRequestInput = z.infer<typeof growthCallRequestSchema>;
