import { Request, Response } from "express";
import { ExpenseZodSchema } from "../db/schema/expense";


const TEST_EXPENSES: ExpenseZodSchema[] = [
  {
    mode: "update",
    id: 1,
    createdById: 1,
    expenseName: "Car Insuance",
    expenseAmount: "128.53",
    expenseFrequency: "yearly",
    expenseDate: new Date(2024, 6, 1).toString()
    // createdAt: new Date(2024, 6, 1).toString(),
    // updatedAt: new Date(2024, 6, 1).toString(),
  },
  {
    mode: "update",
    id: 2,
    createdById: 1,
    expenseName: "Electricity Bill",
    expenseAmount: "120.0",
    expenseFrequency: "monthly",
    expenseDate: new Date(2024, 6, 15).toString(),
    // createdAt: new Date(2024, 6, 15),
    // updatedAt: new Date(2024, 6, 15),
  },
  {
    mode: "update",
    id: 3,
    createdById: 1,
    expenseName: "Shopping Bill",
    expenseAmount: "75.0",
    expenseFrequency: "weekly",
    expenseDate: new Date(2024, 6, 17).toString(),
    // createdAt: new Date(2024, 6, 17),
    // updatedAt: new Date(2024, 6, 17),
  },
  {
    mode: "update",
    id: 4,
    createdById: 1,
    expenseName: "Lunch",
    expenseAmount: "7.2",
    expenseFrequency: "everyxdays",
    expenseXDays: 3,
    expenseDate: new Date(2024, 6, 5).toString(),
    // createdAt: new Date(2024, 6, 17),
    // updatedAt: new Date(2024, 6, 17),
  },
  {
    mode: "update",
    id: 5,
    createdById: 1,
    expenseName: "Internet Bill",
    expenseAmount: "45.0",
    expenseFrequency: "monthly",
    expenseDate: new Date(2024, 6, 25).toString(),
  },
];

const expenseList = async(req: Request, res: Response) => {
  return res.status(200).json({expenses: TEST_EXPENSES});
}

export {
  expenseList
}