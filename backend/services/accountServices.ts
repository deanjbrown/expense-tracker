import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { UserZodSchema, UserZodSelectSchema, user } from "../db/schema/user";
import {
  SelectVerificationCodeModel,
  verificationCode,
  verificationCodeSchema,
  VerificationCodeZodSchema,
  VerificationCodeZodSelectSchema,
} from "../db/schema/verificationCode";
import { generateUnique32ByteKey } from "../utils/authentication";
import { sendEmail } from "../utils/email";

/**
 *
 * @param validatedData
 * @returns
 *
 * Creates a user and returns the user's id or null
 */
export const registerUserService = async (
  validatedData: UserZodSchema
): Promise<UserZodSelectSchema | null> => {
  if (validatedData.mode === "register") {
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const [insertedUser] = await db
      .insert(user)
      .values({
        ...validatedData,
        password: hashedPassword,
      })
      .returning({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
      });

    return insertedUser;
  } else {
    console.log(`[-] Received validatedData in the incorrect mode.`);
    console.log(`Expected: register, but received: ${validatedData.mode}`);
    return null;
  }
};

/**
 *
 * @returns
 *
 * Generates and returns the verification code string
 */
const generateVerificationCodeString = async (): Promise<string> => {
  let isCodeUsed = true;
  let verificationCodeString = "";

  // Generate the verification code
  while (isCodeUsed) {
    verificationCodeString = generateUnique32ByteKey();
    const verificationCodeRow = await db
      .select()
      .from(verificationCode)
      .where(eq(verificationCode.verificationCode, verificationCodeString))
      .execute()
      .then((res) => res[0] as SelectVerificationCodeModel | undefined);

    if (!verificationCodeRow) {
      console.log(`[+] verificationCode: ${verificationCodeString} not used!`);
      isCodeUsed = false;
    } else {
      console.log(
        `verificationCode: ${verificationCodeString} is being used.\nGenerating a new one!`
      );
    }
  }

  return verificationCodeString;
};

/**
 *
 * @param userId
 * @returns
 *
 * Creates a verificationCode and returns the codes id or null
 */
export const createVerificationCodeService = async (
  userId: number
): Promise<VerificationCodeZodSelectSchema | null> => {
  // Generate the verification code string
  const verificationCodeString = await generateVerificationCodeString();

  // Verify our data
  const validatedData = verificationCodeSchema.parse({
    mode: "create",
    createdById: userId,
    verificationCode: verificationCodeString,
    isUsed: false,
  });

  // Insert the data to the database
  if (validatedData.mode == "create") {
    const [insertedVerificationCode] = await db
      .insert(verificationCode)
      .values(validatedData)
      .returning({
        id: verificationCode.id,
        verificationCode: verificationCode.verificationCode,
      });

    return insertedVerificationCode;
  } else {
    return null;
  }
};

/**
 *
 * @param emailAddress
 * @param verificationCode
 * @returns
 *
 * Creates and send the verification email
 */
export const sendVerificationEmailService = async (
  emailAddress: string,
  verificationCode: string
): Promise<boolean> => {
  console.log(`[+] Sending verification email`);
  try {
    const verificationEmailSubject = `Verify your ${process.env.APP_NAME} account`;
    const verificationURL = `http://${process.env.HOST}/account/verification?verificationCode=${verificationCode}`;
    const verificationMessageBody = `Verify your ${process.env.APP_NAME} account by clicking the following link:\n${verificationURL}`;
    sendEmail(emailAddress, verificationEmailSubject, verificationMessageBody);
    return true;
  } catch (error) {
    console.log(
      `[-] sendVerificationEmailService - Unable to send email\nError: ${error}`
    );
    return false;
  }
};

/**
 *
 * @param codeToVerify
 * @returns
 *
 * TODO => This also needs to be tested
 */
export const verifyEmailService = async (
  codeToVerify: VerificationCodeZodSchema
): Promise<boolean> => {
  try {
    if (codeToVerify.mode === "verify") {
      const [retrievedVerificationCode] = await db
        .select()
        .from(verificationCode)
        .where(
          eq(verificationCode.verificationCode, codeToVerify.verificationCode)
        );

      // TODO => Need to work on expiring these codes
      if (!retrievedVerificationCode.isUsed) {
        // Update the user
        await db
          .update(user)
          .set({ isVerified: true })
          .where(eq(user.id, retrievedVerificationCode.createdById));

        // Update the verification code
        await db
          .update(verificationCode)
          .set({ isUsed: true })
          .where(eq(verificationCode.id, retrievedVerificationCode.id));
      } else {
        throw new Error("Verification code used or expired");
      }
      return true;
    } else {
      throw new Error(
        `Unexpected mode. Expected: "verify" but received: ${codeToVerify.mode}`
      );
    }
  } catch (error) {
    console.log(`[-] Could not verify user.\nError: ${error}`);
    return false;
  }
};

/**
 *
 * TODO => We will also need a service that will update a user's profile
 *
 */
