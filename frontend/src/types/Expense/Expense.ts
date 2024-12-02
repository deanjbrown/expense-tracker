import { z } from "zod";

// TODO => Using this expense schema to ensure the data we receive from the server is accurate
export const expenseSchema = z.object({
  id: z.number(),
  createdById: z.number(),
  expenseName: z.string(),
  expenseAmount: z.string().transform((val) => parseFloat(val)),
  expenseFrequency: z.string(),
  expenseXDays: z.number(),
  expenseDate: z.string().transform((val) => new Date(val)),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val))
});

export const expenseCreateSchema = z.object({
  expenseName: z.string(),
  expenseAmount: z.number(),
  expenseFrequency: z.string(),
  expenseXDays: z.number(),
  expenseDate: z.date(),
});

export type ExpenseZodSchema = z.infer<typeof expenseSchema>;
export type ExpenseCreateZodSchema = z.infer<typeof expenseCreateSchema>;