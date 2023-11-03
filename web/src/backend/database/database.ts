import { DATABASE_URL } from "@/constants/environments";
import { Pool } from "pg";

export const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  connectionString: DATABASE_URL,
  ssl: true,
});
