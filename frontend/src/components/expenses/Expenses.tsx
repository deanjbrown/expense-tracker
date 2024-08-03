import { DateRange } from "react-day-picker";
import DatePickerWithRange from "../uiComponents/DatePickerWithRange";
import ExpenseList from "./ExpenseList";
import { useCallback, useState } from "react";
import { addDays } from "date-fns";

interface ExpensesProps {
  expenses: Expense[];
}

function Expenses(props: ExpensesProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // const [dateRange, setDateRange] = useState<DateRange | undefined>({
  //   from: addDays(new Date(), -7),
  //   to: new Date(),
  // });

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(
    props.expenses
  );

  const filterExpenses = useCallback(() => {
    const dateFrom: Date = dateRange?.from ?? addDays(new Date(), -7);
    const dateTo: Date = dateRange?.to ?? new Date();

    console.log(`dateFrom: ${dateFrom}`);
    console.log(`dateTo: ${dateTo}`);

    // Filter the expenses between the date range
    const filtered: Expense[] = props.expenses.filter((expense: Expense) => {
      return expense.expenseDate >= dateFrom && expense.expenseDate <= dateTo;
    });

    setFilteredExpenses(filtered);
  }, [dateRange, props.expenses]);

  return (
    <>
      <DatePickerWithRange
        dateRange={dateRange}
        setDateRange={setDateRange}
        onFilterExpensesClicked={filterExpenses}
      />
      <ExpenseList expenses={filteredExpenses} />
    </>
  );
}

export default Expenses;
