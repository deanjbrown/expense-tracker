import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/account/LoginPage";
import RegisterPage from "./pages/account/RegisterPage";
import ExpenseListPage from "./pages/expenses/ExpenseListPage";
import TestPage from "./pages/test/TestPage";

const App = () => {
  return (
    <>
      <Routes>
        {/* Account Routes */}
        <Route path="/" element={<TestPage/>}/>
        <Route path="/account/login" element={<LoginPage/>}/>
        <Route path="/account/register" element={<RegisterPage/>}/>
        
        {/* Expense Routes */}
        <Route path="/expenses" element={<ExpenseListPage/>}/>

        {/* Test Pages */}
        <Route path="/test/testpage" element={<TestPage/>}/>
      </Routes>
    </>
  );
}

export default App;
