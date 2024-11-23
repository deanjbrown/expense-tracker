import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { SelectUserModel, user } from "../db/schema/user";
import { db } from "../db";
import { eq } from "drizzle-orm";

// Generate a unique 32 byte key to be used for confirmation and email validation
const generateUnique32ByteKey = () => {
  return randomBytes(32).toString("hex");
};

const configurePassport = () => {
  // Serialize a user
  // TODO => We shouldn't be pulling the entire user!!
  passport.serializeUser((user: SelectUserModel, done) => {
    done(null, user.id);
  });

  // Deserialize a user
  passport.deserializeUser(async (id: number, done) => {
    try {
      const userRow = await db
        .select()
        .from(user)
        .where(eq(user.id, id))
        .execute()
        .then((res) => res[0] as SelectUserModel | undefined);

      done(null, userRow);
    } catch (err) {
      done(err);
    }
  });

  // Define passport's local strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email: string, password: string, done) => {
        try {
          const userRow = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
            .execute()
            .then((res) => res[0] as SelectUserModel | undefined);

          // Check that the user exists
          if (!userRow) {
            console.log("[-] userRow does not exist");
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }

          // Check that the password sent matches the hashed password
          const isMatch = await bcrypt.compare(password, userRow.password);
          if (!isMatch) {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }
          return done(null, userRow);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export { configurePassport, generateUnique32ByteKey };
