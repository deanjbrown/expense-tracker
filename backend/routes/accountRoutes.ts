import {
  loginController,
  logoutController,
  registerController,
  userDetailController,
  verifyEmailController,
} from "../controllers/accountControllers";
import { Router } from "express";

const accountRoutes: Router = Router();
accountRoutes.post("/login", loginController);
accountRoutes.post("/logout", logoutController);
accountRoutes.post("/register", registerController);
accountRoutes.post("/verifyEmail", verifyEmailController);
accountRoutes.get("/userDetail", userDetailController);

export default accountRoutes;
