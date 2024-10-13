import {
  helloWorldController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/accountControllers";
import { Router } from "express";

const accountRoutes: Router = Router();
accountRoutes.post("/login", loginController);
accountRoutes.post("/logout", logoutController);
accountRoutes.post("/register", registerController);
accountRoutes.get("/hello", helloWorldController);

export default accountRoutes;
