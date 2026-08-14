import { Pool } from "pg";

// Requires DATABASE_URL to be set (e.g. a Postgres instance on Supabase or Neon).
// Never hardcode connection credentials here — configure via environment variables.
let pool: Pool | undefined;

export function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function insertAuditRequest(data: {
  name: string;
  businessName: string;
  website: string;
  city: string;
  industry: string;
  email: string;
  phone: string;
  priorityServices: string;
}) {
  const db = getPool();
  await db.query(
    `CREATE TABLE IF NOT EXISTS audit_requests (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      business_name TEXT NOT NULL,
      website TEXT NOT NULL,
      city TEXT NOT NULL,
      industry TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      priority_services TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`
  );

  await db.query(
    `INSERT INTO audit_requests
      (name, business_name, website, city, industry, email, phone, priority_services)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      data.name,
      data.businessName,
      data.website,
      data.city,
      data.industry,
      data.email,
      data.phone,
      data.priorityServices,
    ]
  );
}
