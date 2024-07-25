import ExpenseList from "./ExpenseList";

interface ExpensesProps {
  expenses: Expense[];
}

function Expenses(props: ExpensesProps) {
  // Separating this so that we can add filtering functionality above the list
  return (
    <>
      <ExpenseList expenses={props.expenses} />
    </>
  );
}

export default Expenses;
