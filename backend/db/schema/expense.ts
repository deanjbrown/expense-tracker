import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { InferSelectModel, relations } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Define the enum for expenseFrequency
export const expenseFrequencyEnum = pgEnum("expense_frequency_enum", [
  "single",
  "daily",
  "weekly",
  "fortnightly",
  "monthly",
  "yearly",
  "everyxdays",
]);

// Define the expense model
export const expense = pgTable("expense", {
  id: serial("id").notNull().primaryKey(),
  createdById: integer("created_by_id")
    .notNull()
    .references(() => user.id),
  expenseName: varchar("expense_name", { length: 255 }).notNull(),
  expenseAmount: decimal("expense_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  expenseFrequency: expenseFrequencyEnum("expense_frequency").notNull(),
  expenseXDays: integer("expense_x_days"),
  expenseDate: timestamp("expense_date", { mode: "date" })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Define the models relations
export const expenseRelations = relations(expense, ({ one }) => ({
  user: one(user, {
    fields: [expense.createdById],
    references: [user.id],
  }),
}));

// Create a z.enum based on the frequency options
const expenseFrequencyEnumSchema = z.enum([
  "single",
  "daily",
  "weekly",
  "fortnightly",
  "monthly",
  "yearly",
  "everyxdays",
]);

// Create a base schema for validation
export const expenseBaseSchema = createInsertSchema(expense, {
  createdById: (schema) => schema.createdById.min(1),
  expenseName: (schema) => schema.expenseName.min(1),
  expenseAmount: (schema) => schema.expenseAmount.min(1),
  expenseFrequency: () => expenseFrequencyEnumSchema,
  expenseXDays: (schema) => schema.expenseXDays.min(1).positive(),
  expenseDate: (schema) => schema.expenseDate, //.min(1) // TODO => We definitely need to check our validations more.
}).pick({
  createdById: true,
  expenseName: true,
  expenseAmount: true,
  expenseFrequency: true,
  expenseXDays: true,
  expenseDate: true,
});

// Select expense schema
const expenseBaseSelectSchema = createSelectSchema(expense).pick({
  createdById: true,
  expenseName: true,
  expenseAmount: true,
  expenseFrequency: true,
  expenseXDays: true,
  expenseDate: true,
});

// Expense schema can have 2 validation modes (Create and Edit)
export const expenseSchema = z.union([
  z.object({
    mode: z.literal("create"),
    createdById: expenseBaseSchema.shape.createdById,
    expenseName: expenseBaseSchema.shape.expenseName,
    expenseAmount: expenseBaseSchema.shape.expenseAmount,
    expenseFrequency: expenseBaseSchema.shape.expenseFrequency,
    expenseXDays: expenseBaseSchema.shape.expenseXDays,
    expenseDate: expenseBaseSchema.shape.expenseDate,
  }),
  z.object({
    mode: z.literal("update"),
    id: z.number().min(1),
    createdById: expenseBaseSchema.shape.createdById,
    expenseName: expenseBaseSchema.shape.expenseName,
    expenseAmount: expenseBaseSchema.shape.expenseAmount,
    expenseFrequency: expenseBaseSchema.shape.expenseFrequency,
    expenseXDays: expenseBaseSchema.shape.expenseXDays,
    expenseDate: expenseBaseSchema.shape.expenseDate,
  }),
]);

export type ExpenseZodSchema = z.infer<typeof expenseSchema>;
export type SelectExpenseModel = InferSelectModel<typeof expense>;
export type ExpenseZodSelectSchema = z.infer<typeof expenseBaseSelectSchema>;
