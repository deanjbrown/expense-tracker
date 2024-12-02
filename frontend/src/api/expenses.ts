import { ExpenseCreateZodSchema } from "@/types/Expense/Expense";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/api/expenses",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const expenseList = () => API.get("/");
export const createExpense = (data: ExpenseCreateZodSchema) =>
  API.post("/create", {"mode": "create", ...data});
