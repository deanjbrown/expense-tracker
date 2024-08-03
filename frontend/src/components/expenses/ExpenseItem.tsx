function ExpenseItem(props: Expense) {
  const day = props.expenseDate.getDate();
  const month = props.expenseDate.getMonth() + 1;
  const year = props.expenseDate.getFullYear();

  console.log(`Expense Name: ${props.expenseName}`);

  return (
    <>
      <p>Expense name: {props.expenseName}</p>
      <p>Expense Amount: {props.expenseAmount}</p>
      <p>
        Expense Date: {day}/{month}/{year}
      </p>
      <p>Expense Frequency: {props.expenseFrequency}</p>
      {props.expenseFrequency == "everyxdays" && (
        <p>Every {props.expenseXDays}</p>
      )}
    </>
  );
}

export default ExpenseItem;
