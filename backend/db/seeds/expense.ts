import { faker } from "@faker-js/faker";
import { DB, db } from "..";
import { expense, ExpenseZodSchema } from "../schema/expense";

const mock = async () => {
  const userData = await db.query.user.findMany();

  const today = new Date();
  const oneWeekAgo = new Date();
  const oneWeekAhead = new Date();

  oneWeekAgo.setDate(today.getDate() - 7);
  oneWeekAhead.setDate(today.getDate() + 7);

  const data: Omit<Extract<ExpenseZodSchema, { mode: "create" }>, "mode">[] =
    [];

  for (let i = 0; i < 100; i++) {
    data.push({
      createdById: faker.helpers.arrayElement(userData).id,
      expenseName: faker.word.verb(),
      expenseAmount: faker.number
        .float({
          min: 2.5,
          max: 5000.0,
          fractionDigits: 2,
        })
        .toString(),
      expenseFrequency: "single",
      expenseXDays: faker.number.int({ min: 1, max: 200 }),
      expenseDate: faker.date.between({ from: oneWeekAgo, to: oneWeekAhead }),
    });
  }

  return data;
};

export async function seed(db: DB) {
  const insertData = await mock();
  await db.insert(expense).values(insertData);
}
