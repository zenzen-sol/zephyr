import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const database = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable.");
  }
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);
  return db;
};
