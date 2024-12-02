import { Request, Response } from "express";
import {
  createExpenseService,
  getExpensesByUserIdService,
} from "../services/expenseServices";
import { expenseSchema } from "../db/schema/expense";

/**
 *
 * @param req
 * @param res
 *
 * Returns a list of expenses created by a given user
 */
const expenseListController = async (req: Request, res: Response) => {
  // TODO => We need to move the authenticated check elsewhere. . .
  if (req.isAuthenticated()) {
    console.log(
      `[+] expenseListController - User is authenticated: ${JSON.stringify(
        req.user
      )}`
    );

    const retrievedExpenses = await getExpensesByUserIdService(req.user.id);
    res.status(200).json(retrievedExpenses);
    // Get a list of expenses created by them
  } else {
    console.log(`[-] expenseListController - User is not authenticated`);
    res.status(401).json({ message: "Not authenticated" });
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 *
 * Creates an expense with the data posted
 */
const createExpenseController = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    console.log(
      `[+] expenseListController - User is authenticated: ${JSON.stringify(
        req.user
      )}`
    );
    const validatedData = expenseSchema.parse({
      ...req.body,
      createdById: req.user.id,
      expenseAmount: req.body.expenseAmount.toString(),
      expenseDate: new Date(req.body.expenseDate),
    });
    const createdExpense = await createExpenseService(
      validatedData,
      req.user.id
    );
    console.log(
      `[-] createExpenseController - Created an expense: ${JSON.stringify(
        createdExpense
      )}`
    );
    if (createdExpense) {
      return res.status(200).json(createdExpense);
    } else {
      return res
        .status(400)
        .json({ message: "Error - could not create an expense" });
    }
  } else {
    console.log(`[-] expenseListController - User is not authenticated`);
    res.status(401).json({ message: "Not authenticated" });
  }
};

export { expenseListController, createExpenseController };
