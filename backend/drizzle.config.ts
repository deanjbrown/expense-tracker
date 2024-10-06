import {defineConfig} from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // TODO => Casting this as a string for now, but we should really set up the env schema using zod in lib/env
    url: process.env.DATABASE_URL as string,
  },

  // verbose: true
  strict: true
});