import { Request, Response } from "express";
import {
  InputValidationResult,
  validateEmailAddress,
  validatePassword,
} from "../utils/validateInput";
// import passport from "passport"; TODO => Come back to this.

interface EmailValidationResult {}

interface LoginRequestBody {
  email: string;
  password: string;
}

const helloWorldController = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello Beans" });
};

const loginController = async (req: Request, res: Response) => {
  const { email, password }: LoginRequestBody = req.body;

  // Validate the email address
  const emailValidationResult: InputValidationResult =
    validateEmailAddress(email);
  if (!emailValidationResult.isValid) {
    return res
      .status(400)
      .json({ message: emailValidationResult.errorMessage });
  }

  // Validate the password
  const passwordValidationResult: InputValidationResult =
    validatePassword(password);
  if (!passwordValidationResult.isValid) {
    return res
      .status(400)
      .json({ message: passwordValidationResult.errorMessage });
  }

  // TODO Check if a user with that email address exists
};

const logoutController = async (req: Request, res: Response) => {};

const registerController = async (req: Request, res: Response) => {};

export {
  loginController,
  logoutController,
  registerController,
  helloWorldController,
};
