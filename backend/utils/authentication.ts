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
          const [retrievedUser] = await db
            .select()
            .from(user)
            .where(eq(user.email, email));

          console.log(
            `[+] PASSPORT - Retrieved user: ${JSON.stringify(retrievedUser)}`
          );

          if (!retrievedUser) {
            console.log(`[-] Could not retrieve a user.`);
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }

          // Check that the password sent matches the hashed password
          const isMatch = await bcrypt.compare(
            password,
            retrievedUser.password
          );
          if (!isMatch) {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }
          console.log(
            `[+] PASSPORT - Reached the end. Returning the user to done.`
          );
          return done(null, retrievedUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export { configurePassport, generateUnique32ByteKey };
