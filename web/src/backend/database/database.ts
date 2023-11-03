import { DATABASE_URL } from "@/constants/environments";
import { Pool } from "pg";

const dbUrl = new URL(DATABASE_URL);

export const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substr(1),
  ssl: true,
});
