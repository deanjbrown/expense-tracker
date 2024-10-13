import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { expense } from "./expense";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

// Define the user model
export const user = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Define the models relations
export const userRelations = relations(user, ({ many }) => ({
  expenses: many(expense),
}));

// Create a base schema for validation (TODO => We should be moving the validation out of inputValidation util and in here, for now this is very basic)
const userBaseSchema = createInsertSchema(user, {
  firstName: (schema) => schema.firstName.min(1),
  lastName: (schema) => schema.lastName.min(1),
  email: (schema) => schema.email.min(1),
  password: (schema) => schema.password.min(1),
}).pick({ firstName: true, lastName: true, email: true, password: true });

// User schema can have 3 different validation modes (Register, Login, Update all require different data)
export const userSchema = z.union([
  z.object({
    mode: z.literal("register"),
    firstName: userBaseSchema.shape.firstName,
    lastName: userBaseSchema.shape.lastName,
    email: userBaseSchema.shape.email,
    password: userBaseSchema.shape.password,
  }),

  z.object({
    mode: z.literal("login"),
    email: userBaseSchema.shape.email,
    password: userBaseSchema.shape.password,
  }),

  z.object({
    mode: z.literal("update"),
    id: z.number().min(1),
    firstName: userBaseSchema.shape.firstName,
    lastName: userBaseSchema.shape.lastName,
  }),
]);

export type UserZodSchema = z.infer<typeof userSchema>;
export type SelectUserModel = InferSelectModel<typeof user>;