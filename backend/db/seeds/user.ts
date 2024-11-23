import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { DB } from "..";
import { user, UserZodSchema } from "../schema/user";

const mock = async () => {
  const data: Omit<Extract<UserZodSchema, { mode: "register" }>, "mode">[] = [];

  for (let i = 0; i < 20; i++) {
    const password = faker.internet.password({memorable: true, length:8});
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: hashedPassword,
      email: faker.internet.email(),
    }
    console.log(`[+] Created user:\nEmail: ${user.email}\nPassword: ${password}`);
    data.push(user);
  }

  return data;
};

export async function seed(db: DB) {
  const insertData = await mock();
  await db.insert(user).values(insertData);
}
