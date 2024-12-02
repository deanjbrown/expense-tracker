import { DateRange } from "react-day-picker";
import DatePickerWithRange from "../uiComponents/DatePickerWithRange";
import ExpenseList from "./ExpenseList";
import { useCallback, useEffect, useState } from "react";
import { addDays } from "date-fns";
import { ExpenseZodSchema } from "@/types/Expense/Expense";

interface ExpensesProps {
  expenses: ExpenseZodSchema[];
}

function Expenses(props: ExpensesProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseZodSchema[]>(
    props.expenses
  );

  console.log(
    `[+] Expenses.tsx - expenses:\n${JSON.stringify(props.expenses)}`
  );

  const filterExpenses = useCallback(() => {
    const dateFrom: Date = dateRange?.from ?? addDays(new Date(), -7);
    const dateTo: Date = dateRange?.to ?? new Date();

    console.log(`dateFrom: ${dateFrom}`);
    console.log(`dateTo: ${dateTo}`);

    // Filter the expenses between the date range
    const filtered: ExpenseZodSchema[] = props.expenses.filter(
      (expense: ExpenseZodSchema) => {
        return expense.expenseDate >= dateFrom && expense.expenseDate <= dateTo;
      }
    );

    setFilteredExpenses(filtered);
  }, [dateRange, props.expenses]);

  // Automatically filter when `expenses` or `dateRange` changes
  useEffect(() => {
    filterExpenses();
  }, [props.expenses, dateRange, filterExpenses]);

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
