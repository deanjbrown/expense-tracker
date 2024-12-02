/**
 *
 * TODO => We need to create a generic way to send the Axios request and handle the errors....
 * Looking below we are repeating a lot of that code.
 *
 */

import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Navbar from "../../components/navigation/Navbar";
import NewExpense from "../../components/expenses/NewExpense";
import Expenses from "../../components/expenses/Expenses";
import { useNavigate } from "react-router-dom";
import { userDetail } from "@/api/auth";
import { createExpense, expenseList } from "@/api/expenses";
import { z } from "zod";
import {
  ExpenseCreateZodSchema,
  expenseSchema,
  ExpenseZodSchema,
} from "@/types/Expense/Expense";
import LoadingScreen from "@/components/navigation/LoadingScreen";

type User = {
  id: 21;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  createdAt: Date;
};

const ExpenseListPage: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<ExpenseZodSchema[]>([]);
  const [isNewExpenseVisible, setIsNewExpenseDialogVisible] =
    useState<boolean>(false);

  // New State related to the HTTP requests
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // TODO => We're not currently setting the errors.
  // Just console logging them. . . . .

  const handleNewExpenseClicked = () => {
    setIsNewExpenseDialogVisible(true);
  };

  const closeNewExpenseDialog = () => {
    setIsNewExpenseDialogVisible(false);
  };

  const saveNewExpense = async (newExpense: ExpenseCreateZodSchema) => {
    try {
      const response: AxiosResponse = await createExpense(newExpense);
      if (response.status >= 200 && response.status < 300) {
        console.log(
          `[+] saveNewExpense => Created new expense\n${JSON.stringify(
            response
          )}`
        );
        const validatedData = expenseSchema.parse(response.data);
        setExpenses((prevExpenses) => {
          return [validatedData, ...prevExpenses];
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            `[-] Server Error: ${JSON.stringify(error.response.data)}`
          );
        } else {
          console.error(
            `[-] No response received from server: ${error.request}`
          );
        }
      } else {
        console.error(`[-] An unexpected error occurred: ${error}`);
      }
    }
  };

  useEffect(() => {
    // Try to get the current user's details from the server.
    const getUserDetail = async () => {
      try {
        const response: AxiosResponse = await userDetail();
        if (response.status >= 200 && response.status < 300) {
          console.log(
            `You are logged in. Server response:\n${JSON.stringify(
              response.data
            )}`
          );
          setUser(response.data);
          return response.data.user.id;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.error(
              `[-] Server Error: ${JSON.stringify(error.response.data)}`
            );
          } else {
            console.error(
              `[-] No response received from server: ${error.request}`
            );
          }
        } else {
          console.error(`[-] An unexpected error occurred: ${error}`);
        }
        navigate("/account/login");
      }
    };

    // Try to get the current users's expenseList from the server.
    const getExpenses = async () => {
      try {
        const response: AxiosResponse = await expenseList();
        if (response.status >= 200 && response.status < 300) {
          console.log(
            `[+] Retrieved list of expenses: ${JSON.stringify(response.data)}`
          );
          const validatedData = z.array(expenseSchema).parse(response.data);
          setExpenses(validatedData);
          setLoading(false); // Stop the page from loading. . . .
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.error(
              `[-] Server Error: ${JSON.stringify(error.response.data)}`
            );
          } else {
            console.error(
              `[-] No response received from server: ${error.request}`
            );
          }
        } else {
          console.error(`[-] An unexpected error occurred: ${error}`);
        }
        navigate("/account/login");
      }
    };

    const getData = async () => {
      try {
        const userId = await getUserDetail();
        if (userId) {
          await getExpenses(); // I don't need to pass the ID, we'll have a session at this stage . . . .
        }
      } catch (error) {
        console.log(`[-] Error in data fetching flow:\n${error}`);
      }
    };

    getData();
  }, [navigate]);
  return (
    <>
      <Navbar handleNewExpenseClicked={handleNewExpenseClicked} />
      <main className="container mx-auto my-8">
        {/* TODO => Once we get this working, we should add a nice loading screen */}
        {loading ? (
          <LoadingScreen />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <NewExpense
              isOpen={isNewExpenseVisible}
              onClose={closeNewExpenseDialog}
              onSave={saveNewExpense}
            />
            {expenses ? (
              <Expenses expenses={expenses} />
            ) : (
              <p>No expenses found</p>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default ExpenseListPage;
