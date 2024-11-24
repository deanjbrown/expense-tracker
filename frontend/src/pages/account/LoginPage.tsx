import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth";
import loginImage from "@/assets/login-img.jpg";
import LoginForm from "@/components/accounts/LoginForm";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

// TODO => We need to make it so that the image on the right disappears on small screens

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  // TODO => Again we need to be doing something about the validation
  const onLogin = async (loginData: { email: string; password: string }) => {
    try {
      const response: AxiosResponse = await login(loginData);
      if (response.status >= 200 && response.status < 300) {
        console.log(
          `[+] LoginPage - Login response: ${response.data["message"]}`
        );
      }
      toast({
        title: "Logged in successfully",
      });
      navigate("/expenses");
    } catch (error) {
      toast({
        title: "Check username and password!",
      });
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
  return (
    <>
      <div className="flex h-screen">
        {/* Left Side: Form */}
        <div className="w-2/5 flex flex-col justify-center items-center bg-gray-100 px-10">
          <div className="w-2/3">
            <h1 className="text-3xl fond-bold mb-2">
              Sign in to Expense Tracker
            </h1>
            <p className="text-gray-500 mb-6">Control your expenses</p>
            <LoginForm onLogin={onLogin} />
          </div>
        </div>
        {/* Right Side: Image */}
        <div
          className="w-3/5 bg-cover bg-center"
          style={{
            backgroundImage: `url(${loginImage})`,
          }}
        ></div>
        <Toaster />
      </div>
    </>
  );
};

export default LoginPage;
