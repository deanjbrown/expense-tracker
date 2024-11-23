import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { InferSelectModel, relations } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";


// Define the verification Code model
// TODO => We should be expiring these
export const verificationCode = pgTable("verification_code", {
  id: serial("id").notNull().primaryKey(),
  createdById: integer("created_for_id")
    .notNull()
    .references(() => user.id),
  verificationCode: varchar("verification_code", { length: 255 }).notNull(),
  isUsed: boolean("is_used").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Define the verification codes relations
export const verificationCodeRelations = relations(
  verificationCode,
  ({ one }) => ({
    user: one(user, {
      fields: [verificationCode.createdById],
      references: [user.id],
    }),
  })
);

// Create the base schema
const verificationCodeBaseSchema = createInsertSchema(verificationCode, {
  createdById: (schema) => schema.createdById.min(1),
  verificationCode: (schema) => schema.verificationCode.min(1),
  isUsed: (schema) => z.boolean(),
}).pick({ createdById: true, verificationCode: true, isUsed: true });

const verificationCodeBaseSelectSchema = createSelectSchema(verificationCode).pick({
  id: true,
  verificationCode: true
});

export const verificationCodeSchema = z.union([
  z.object({
    mode: z.literal("create"),
    createdById: verificationCodeBaseSchema.shape.createdById,
    verificationCode: verificationCodeBaseSchema.shape.verificationCode,
    isUsed: verificationCodeBaseSchema.shape.isUsed,
  }),
  z.object({
    mode: z.literal("update"),
    id: z.number().min(1),
    isUsed: verificationCodeBaseSchema.shape.isUsed,
  }),
  z.object({
    mode: z.literal("verify"),
    verificationCode: verificationCodeBaseSchema.shape.verificationCode
  })
]);

export type VerificationCodeZodSchema = z.infer<
  typeof verificationCodeSchema
>;
export type VerificationCodeZodSelectSchema = z.infer<typeof verificationCodeBaseSelectSchema>;
export type SelectVerificationCodeModel = InferSelectModel<
  typeof verificationCode
>;
