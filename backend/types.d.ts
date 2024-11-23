import { SelectUserModel } from "./db/schema/user";

declare global {
  namespace Express {
    // Extend Passport's Express.User to use Drizzle's SelectUserModel
    interface User extends SelectUserModel {}
  }
}
