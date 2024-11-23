import {
  loginController,
  logoutController,
  registerController,
  verifyEmailController,
} from "../controllers/accountControllers";
import { Router } from "express";

const accountRoutes: Router = Router();
accountRoutes.post("/login", loginController);
accountRoutes.post("/logout", logoutController);
accountRoutes.post("/register", registerController);
accountRoutes.post("/verifyEmail", verifyEmailController);

export default accountRoutes;
