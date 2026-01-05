import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Ensure SSL is enabled in the connection string
const url = process.env.DATABASE_URL!;
const dbUrl = new URL(url);
// Append ssl=true to force SSL usage if using url definition
dbUrl.searchParams.set("ssl", "true");

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl.toString(),
  },
});
