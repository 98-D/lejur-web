// src/db/index.ts
import "dotenv/config"; // ← better than manual config() import
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/db/schema"; // ← path to your better-auth schema

// This is the key fix for Vite:
// In dev: use import.meta.env.DATABASE_URL
// In production (Vercel/Netlify/etc.): process.env.DATABASE_URL still works
const connectionString =
  import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is missing! Add it to your .env file or environment variables."
  );
}

const pool = new Pool({
  connectionString,
  // Optional but recommended for Neon/Serverless
  max: 20,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool, { schema });

// Graceful shutdown (highly recommended for serverless)
if (import.meta.env.PROD) {
  process.on("SIGTERM", async () => {
    await pool.end();
    process.exit(0);
  });
}