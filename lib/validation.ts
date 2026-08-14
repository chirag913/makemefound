import { z } from "zod";

export const auditRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  businessName: z.string().trim().min(1, "Business name is required").max(200),
  website: z.string().trim().min(1, "Website is required").max(300),
  city: z.string().trim().min(1, "City is required").max(200),
  industry: z.string().trim().min(1, "Industry is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().min(1, "Phone is required").max(50),
  priorityServices: z.string().trim().min(1, "Tell us what matters most").max(1000),
  // Honeypot field — real users never fill this in.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type AuditRequestInput = z.infer<typeof auditRequestSchema>;
