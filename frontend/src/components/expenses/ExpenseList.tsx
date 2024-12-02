import { ExpenseZodSchema } from "@/types/Expense/Expense";
import columns from "./data-table/columns";
import DataTable from "./data-table/data-table";

interface ExpenseListProps {
  expenses: ExpenseZodSchema[];
}

function ExpenseList(props: ExpenseListProps) {
  return (
    <>
      <DataTable columns={columns} data={props.expenses}/>
    </>
  )
}

export default ExpenseList;
