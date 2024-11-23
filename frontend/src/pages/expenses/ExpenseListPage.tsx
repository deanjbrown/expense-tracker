import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "../../components/navigation/Navbar";
import NewExpense from "../../components/expenses/NewExpense";
import Expenses from "../../components/expenses/Expenses";

const TEST_EXPENSES: Expense[] = [
  {
    id: 1,
    expenseName: "Car Insuance",
    expenseAmount: 128.53,
    expenseFrequency: "yearly",
    expenseDate: new Date(2024, 6, 1),
  },
  {
    id: 2,
    expenseName: "Electricity Bill",
    expenseAmount: 120.0,
    expenseFrequency: "monthly",
    expenseDate: new Date(2024, 6, 15),
  },
  {
    id: 3,
    expenseName: "Shopping Bill",
    expenseAmount: 75.0,
    expenseFrequency: "weekly",
    expenseDate: new Date(2024, 6, 17),
  },
  {
    id: 4,
    expenseName: "Lunch",
    expenseAmount: 7.2,
    expenseFrequency: "everyxdays",
    expenseXDays: 3,
    expenseDate: new Date(2024, 6, 5),
  },
  {
    id: 5,
    expenseName: "Internet Bill",
    expenseAmount: 45.0,
    expenseFrequency: "monthly",
    expenseDate: new Date(2024, 6, 25),
  },
];

const ExpenseListPage = () => {
  useEffect(() => {
    // Try to get a list of expeneses from the server
    const getExpenses = async () => {
      try {
        const response = await axios.get("http://localhost/api/expenses/", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        console.log(`[+] Response: ${JSON.stringify(response)}`);
      } catch (error) {
        console.log(`[-] Error: ${error}`);
      }
    };
    getExpenses();
  }, []);

  const [expenses, setExpenses] = useState<Expense[]>(TEST_EXPENSES);
  const [isNewExpenseVisible, setIsNewExpenseDialogVisible] =
    useState<boolean>(false);

  const handleNewExpenseClicked = () => {
    setIsNewExpenseDialogVisible(true);
  };

  const closeNewExpenseDialog = () => {
    setIsNewExpenseDialogVisible(false);
  };

  const saveNewExpense = (newExpense: Expense) => {
    setExpenses((prevExpenses: Expense[]) => {
      return [newExpense, ...prevExpenses];
    });
  };
  return (
    <>
      <Navbar handleNewExpenseClicked={handleNewExpenseClicked} />
      <main className="container mx-auto my-8">
        <NewExpense
          isOpen={isNewExpenseVisible}
          onClose={closeNewExpenseDialog}
          onSave={saveNewExpense}
        />
        <Expenses expenses={expenses} />
      </main>
    </>
  );
};

export default ExpenseListPage;
