import { neon } from '@neondatabase/serverless';

const DEFAULT_NEON_URL = "postgresql://neondb_owner:npg_F9DgXO8urHyx@ep-nameless-waterfall-ahjjfj7x-pooler.c-3.us-east-1.aws.neon.tech/website?sslmode=require";

export const NEON_DATABASE_URL =
  (import.meta.env.VITE_NEON_DATABASE_URL || "").trim() || DEFAULT_NEON_URL;

// Returns serverless SQL tagged template runner
export function getNeonSql() {
  return neon(NEON_DATABASE_URL);
}
