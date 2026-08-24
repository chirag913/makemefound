import { z } from "zod";

export const growthCallRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  businessName: z.string().trim().min(1, "Company name is required").max(200),
  website: z.string().trim().min(1, "Website is required").max(300),
  serviceArea: z.string().trim().min(1, "Service area is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().min(1, "Phone is required").max(50),
  idealAccounts: z.string().trim().max(1000).optional().or(z.literal("")),
  // Honeypot field — real users never fill this in.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type GrowthCallRequestInput = z.infer<typeof growthCallRequestSchema>;
