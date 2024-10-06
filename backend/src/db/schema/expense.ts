import {
  decimal,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const expenseFrequencyEnum = pgEnum("expenseFrequency", [
  "single",
  "daily",
  "weekly",
  "foretnightly",
  "monthly",
  "yearly",
  "everyxdays",
]);

export const expense = pgTable("expense", {
  id: serial("id").notNull().primaryKey(),
  expenseName: varchar("expense_name", { length: 255 }).notNull(),
  expenseAmount: decimal("expense_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  expenseFrequency: expenseFrequencyEnum("expense_frequency").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
