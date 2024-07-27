import {ColumnDef} from "@tanstack/react-table";

const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "expenseDate",
    header: "Date",
  },
  {
    accessorKey: "expenseName",
    header: "Expense",
  },
  {
    accessorKey: "expenseAmount",
    header: "Amount",
  },
];

export default columns;