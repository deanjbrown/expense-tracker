import columns from "./data-table/columns";
import DataTable from "./data-table/data-table";

interface ExpenseListProps {
  expenses: Expense[];
}

function ExpenseList(props: ExpenseListProps) {
  return (
    <>
      <DataTable columns={columns} data={props.expenses}/>
    </>
  )
}

export default ExpenseList;
