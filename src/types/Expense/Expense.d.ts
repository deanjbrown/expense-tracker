interface Expense {
  id?: number;
  expenseName: string;
  expenseAmount: number;
  expenseFrequency: string;
  expenseXDays?: number;
  expenseDate: Date; 
}
