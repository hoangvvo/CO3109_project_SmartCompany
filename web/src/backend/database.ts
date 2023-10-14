import { POSTGRES_PASSWORD } from "@/constants/environments";
import { Pool } from "pg";

export const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  user: "postgres",
  password: POSTGRES_PASSWORD,
});
