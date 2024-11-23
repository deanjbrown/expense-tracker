import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { expense } from "./expense";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { verificationCode } from "./verificationCode";

// Define the user model
export const user = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Define the models relations
export const userRelations = relations(user, ({ one, many }) => ({
  expenses: many(expense),
  verificationCode: one(verificationCode, {
    fields: [user.id],
    references: [verificationCode.id],
  }),
}));

// Create a base schema for validation (TODO => We should be moving the validation out of inputValidation util and in here, for now this is very basic)
const userBaseInsertSchema = createInsertSchema(user, {
  firstName: (schema) => schema.firstName.min(1),
  lastName: (schema) => schema.lastName.min(1),
  email: (schema) => schema.email.min(1),
  isVerified: z.boolean(),
  password: (schema) => schema.password.min(1),
}).pick({
  firstName: true,
  lastName: true,
  email: true,
  isVerified: true,
  password: true,
});

const userBaseSelectSchema = createSelectSchema(user).pick({
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  isVerified: true,
});

// User schema can have 3 different validation modes (Register, Login, Update all require different data)
// TODO => Should we refactor this to userZodSchema
export const userSchema = z.union([
  z.object({
    mode: z.literal("register"),
    firstName: userBaseInsertSchema.shape.firstName,
    lastName: userBaseInsertSchema.shape.lastName,
    email: userBaseInsertSchema.shape.email,
    password: userBaseInsertSchema.shape.password,
  }),

  z.object({
    mode: z.literal("login"),
    email: userBaseInsertSchema.shape.email,
    password: userBaseInsertSchema.shape.password,
  }),

  z.object({
    mode: z.literal("update"),
    id: z.number().min(1),
    firstName: userBaseInsertSchema.shape.firstName,
    lastName: userBaseInsertSchema.shape.lastName,
    password: userBaseInsertSchema.shape.password,
    isVerified: userBaseInsertSchema.shape.isVerified,
  }),

  z.object({
    mode: z.literal("select"),
    id: z.number().min(1),
    firstName: userBaseSelectSchema.shape.firstName,
    lastName: userBaseSelectSchema.shape.lastName,
    isVerified: userBaseSelectSchema.shape.isVerified,
  }),
]);

export type UserZodSchema = z.infer<typeof userSchema>;
export type UserZodSelectSchema = z.infer<typeof userBaseSelectSchema>;
export type SelectUserModel = InferSelectModel<typeof user>;
