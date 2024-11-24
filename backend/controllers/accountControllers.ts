import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { SelectUserModel, userSchema } from "../db/schema/user";
import { verificationCodeSchema } from "../db/schema/verificationCode";
import {
  createVerificationCodeService,
  registerUserService,
  sendVerificationEmailService,
  verifyEmailService,
} from "../services/accountServices";

// TODO => Need to refactor this into a service
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    (err: Error, user: SelectUserModel | false, info: any) => {
      if (err) {
        console.log(
          `[-] LOGINCONTROLLER - Error during authentication: ${err}`
        );
        return next(err);
      }
      if (!user) {
        console.log(
          `[-] LOGINCONTROLLER - Authentication failed: ${info.message}`
        );
        return res.status(401).json({ message: info.message });
      }

      console.log("[+] LOGINCONTROLLER - Attempting to log the user in");
      // Log in the user and create a session
      req.login(user, (loginErr) => {
        if (loginErr) {
          console.log(
            `[-] LOGINCONTROLLER - There has been a login issue:\n${loginErr}`
          );
          return next(loginErr);
        } else {
          console.log(
            `LOGINCONTROLLER - There has been no login error and we have reached the end....`
          );
        }

        // Successfully logged in
        return res.status(200).json({ message: "Logged in successfully" });
      });
    }
  )(req, res, next);
};

const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

/**
 *
 * @param req
 * @param res
 *
 * Send the posted data to the registerUserService
 */
const registerController = async (req: Request, res: Response) => {
  // TODO => This try catch should be moved into the service
  try {
    console.log(`Entered the registerController()`);
    // Create the user
    const validatedData = userSchema.parse(req.body);
    const createdUser = await registerUserService(validatedData);
    if (!createdUser) throw new Error("Could not create a user.");

    // Create the verification code:
    const createdVerificationCodeId = await createVerificationCodeService(
      createdUser.id
    );
    if (!createdVerificationCodeId)
      throw new Error("Could not create a verificationCode");

    // TODO => If the email is not sent, we should do some error handling here.
    // TODO => Does this even need to be async???
    const isEmailSent = await sendVerificationEmailService(
      createdUser.email,
      createdVerificationCodeId.verificationCode
    );

    res.status(200).json({
      message: "User created successfully, please verify your email address",
    });
  } catch (error) {
    console.error(`registerController - Error: ${error}`);
    res.status(400).json({ message: "Error creating the user" });
  }
};

/**
 *
 * @param req
 * @param res
 *
 * Passes the posted verification code to the verifyEmailService
 * TODO => This needs to be tested
 */
const verifyEmailController = async (req: Request, res: Response) => {
  const validatedData = verificationCodeSchema.parse(req.body);
  const isVerified = await verifyEmailService(validatedData);
  if (isVerified) {
    res.status(200).json({ message: "User verified successfully" });
  } else {
    res.status(400).json({ message: "Error verifying the user" });
  }
};

/**
 *
 * @param req
 * @param res
 *
 * Checks if the user is authenticated. If they are, it returns the user.
 */
const userDetailController = async (req: Request, res: Response) => {
  // TODO => Move this into a service
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};

export {
  loginController,
  logoutController,
  registerController,
  verifyEmailController,
  userDetailController,
};
