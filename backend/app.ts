import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import accountRoutes from "./routes/accountRoutes";
import expenseRoutes from "./routes/expenseRoutes";

// Create the app and set the port
const port: string | undefined = process.env.PORT;
const app: Express = express();

// Parse requests with content-type application/json and x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable cors
const allowedOrigins: string[] = ["http://localhost", "http://127.0.0.1"];
const options: CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
app.use(cors(options));

// Define routes
app.use("/api/account", accountRoutes);
app.use("/api/expenses", expenseRoutes);

console.log(process.env.DATABASE_URL as string)

// Start the application
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
