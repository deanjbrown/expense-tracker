import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/account/LoginPage";
import RegisterPage from "./pages/account/RegisterPage";
import ExpenseListPage from "./pages/expenses/ExpenseListPage";

const App = () => {
  return (
    <>
      <Routes>
        {/* Account Routes */}
        <Route path="/account/login" element={<LoginPage/>}/>
        <Route path="/account/register" element={<RegisterPage/>}/>
        {/* Expense Routes */}
        <Route path="/expenses" element={<ExpenseListPage/>}/>
      </Routes>
    </>
  );
}

export default App;
