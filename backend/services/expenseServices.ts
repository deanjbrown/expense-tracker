/**
 *
 * These two services are a very good example of how all services should look.
 * However, instead of returning the object or null and leaving it up to the
 * controller to return an error message, we should be returning either the
 * object that was retrieved/created/updated/deleted or an error message that
 * explains why... This can then be returned from the controller to the client.
 *
 * This will involve a fair bit of refactoring. . . .
 *
 * It might be worth using that executeAction / executeQuery thing that we had before. . . .
 *
 */

import { eq } from "drizzle-orm";
import { db } from "../db";
import { expense } from "../db/schema";
import { ExpenseZodSchema, ExpenseZodSelectSchema } from "../db/schema/expense";

/**
 *
 * @param userId
 * @returns
 *
 * Return a list of expenses by given userId
 */
export const getExpensesByUserIdService = async (
  userId: number
): Promise<ExpenseZodSelectSchema[] | null> => {
  try {
    const retrievedExpenses = await db
      .select()
      .from(expense)
      .where(eq(expense.createdById, userId));

    console.log(
      `[+] expenseServices - Retrieved the following expenses:\n ${JSON.stringify(
        retrievedExpenses
      )}`
    );
    return retrievedExpenses;
  } catch (error) {
    console.log(
      `[-] expenseServices - Error retrieving expenses from the database:\n${error}`
    );
    return null;
  }
};

/**
 * 
 * @param validatedData 
 * @param userId 
 * @returns 
 * 
 * Creates an expense and returns it
 */
export const createExpenseService = async (
  validatedData: ExpenseZodSchema,
  userId: number
): Promise<ExpenseZodSelectSchema | null> => {
  try {
    if (validatedData.mode === "create") {
      const [insertedExpense] = await db
        .insert(expense)
        .values({ ...validatedData, createdById: userId })
        .returning({
          id: expense.id,
          createdById: expense.createdById,
          expenseName: expense.expenseName,
          expenseAmount: expense.expenseAmount,
          expenseFrequency: expense.expenseFrequency,
          expenseXDays: expense.expenseXDays,
          expenseDate: expense.expenseDate,
          createdAt: expense.createdAt,
          updatedAt: expense.updatedAt
        });

      return insertedExpense;
    } else {
      throw new Error(
        `Unexpected mode. Expected: "create", but received: ${validatedData.mode}`
      );
    }
  } catch (error) {
    return null;
  }
};
