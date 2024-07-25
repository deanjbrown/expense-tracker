import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
}

function ExpenseList(props: ExpenseListProps) {
  return (
    <>
      {props.expenses.map((expense: Expense) => (
        <ExpenseItem
          key={expense.id}
          expenseName={expense.expenseName}
          expenseAmount={expense.expenseAmount}
          expenseFrequency={expense.expenseFrequency}
          expenseDate={expense.expenseDate}
        />
      ))}
    </>
  );
}

export default ExpenseList;
