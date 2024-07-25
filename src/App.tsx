import { useState } from "react";
import Navbar from "./components/navigation/Navbar";
import NewExpense from "./components/expenses/NewExpense";
import Expenses from "./components/expenses/Expenses";

const TEST_EXPENSES: Expense[] = [
  {
    id: 1,
    expenseName: "Car Insuance",
    expenseAmount: 128.53,
    expenseFrequency: "yearly",
    expenseDate: new Date(2023, 5, 15),
  },
  {
    id: 2,
    expenseName: "Electricity Bill",
    expenseAmount: 120.0,
    expenseFrequency: "monthly",
    expenseDate: new Date(2023, 5, 17),
  },
  {
    id: 3,
    expenseName: "Shopping Bill",
    expenseAmount: 75.0,
    expenseFrequency: "weekly",
    expenseDate: new Date(2023, 5, 1),
  },
  {
    id: 4,
    expenseName: "Lunch",
    expenseAmount: 7.20,
    expenseFrequency: "everyxdays",
    expenseXDays: 3,
    expenseDate: new Date(2023, 2, 1),
  },
  {
    id: 5,
    expenseName: "Internet Bill",
    expenseAmount: 45.0,
    expenseFrequency: "monthly",
    expenseDate: new Date(2023, 4, 5),
  },
];

function App() {
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
      <main className="container mt-8">
        <NewExpense
          isOpen={isNewExpenseVisible}
          onClose={closeNewExpenseDialog}
          onSave={saveNewExpense}
        />
        <Expenses expenses={expenses} />
      </main>
    </>
  );
}

export default App;
