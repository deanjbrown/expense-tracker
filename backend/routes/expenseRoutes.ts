import { Router } from "express";
import {
  createExpenseController,
  expenseListController,
} from "../controllers/expenseControllers";

const expenseRoutes: Router = Router();
expenseRoutes.get("/", expenseListController);
expenseRoutes.post("/create", createExpenseController);

export default expenseRoutes;
