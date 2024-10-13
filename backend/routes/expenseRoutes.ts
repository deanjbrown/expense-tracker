import { Router } from "express";
import { expenseList } from "../controllers/expenseControllers";

const expenseRoutes: Router = Router();
expenseRoutes.get("/", expenseList);

export default expenseRoutes;
