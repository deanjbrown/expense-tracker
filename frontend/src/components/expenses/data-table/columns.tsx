import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "expenseDate",
    header: "Date",
    cell: ({ row }) => {
      const date: Date = row.getValue("expenseDate");
      const formattedDate: string = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      return <div>{formattedDate}</div>
    },
    
  },
  {
    accessorKey: "expenseName",
    header: "Expense",
  },
  {
    accessorKey: "expenseAmount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("expenseAmount"));
      const formatted = new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export default columns;
