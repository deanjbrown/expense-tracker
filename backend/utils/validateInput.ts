import * as bcrypt from "bcrypt";

export interface InputValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

// Ensure that an email is valid
const validateEmailAddress = (emailAddress: string): InputValidationResult => {
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(emailAddress)) {
    return {
      isValid: true,
    };
  } else {
    return {
      isValid: false,
      errorMessage: "Email address is not valid",
    };
  }
};

// Ensures that a password is 8 characters long and contains a mix of uppercase, lowercase, numbers, and special characters
const validatePassword = (
  password: string,
  repeatedPassword?: string
): InputValidationResult => {
  // If there is a password and repeated password, ensure that they match
  if (repeatedPassword && repeatedPassword !== password) {
    return {
      isValid: false,
      errorMessage: "Passwords do not match",
    };
  }

  // Ensure password is between 8 and 64 characters long
  if (password.length < 8 || password.length > 64) {
    return {
      isValid: false,
      errorMessage: "Password should be between 8 and 64 characters long",
    };
  }

  // Ensure password has required character diversity
  const hasUpperCase: boolean = /[A-Z]/.test(password);
  const hasLowerCase: boolean = /[a-z]/.test(password);
  const hasNumber: boolean = /\d/.test(password);
  const hasSpecialCharacter: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter)) {
    return {
      isValid: false,
      errorMessage:
        "Password must contain a mix of uppercase and lowercase letters, and a least 1 number, and 1 special character",
    };
  }

  // If all of these checks pass, then we can return is valid.
  return {
    isValid: true,
  };
};

// Hashes and salts a password
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds: number = 10;
  try {
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (e) {
    throw new Error(`[-] validateInput - Error hashing password`);
  }
};

// Compare a password to a hashed password
const comparePasswordToHash = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (e) {
    throw new Error(
      `[-] validateInput - Error comparing passaword to hashed password`
    );
  }
};

// Ensures that a given string is a 32Byte string
const validate32ByteString = (string32Bytes: string) => {
  return (
    typeof string32Bytes === "string" &&
    string32Bytes.length === 64 &&
    /^[0-9a-fA-F]+$/.test(string32Bytes)
  );
};

export {
  validateEmailAddress,
  validatePassword,
  hashPassword,
  comparePasswordToHash,
  validate32ByteString,
};
