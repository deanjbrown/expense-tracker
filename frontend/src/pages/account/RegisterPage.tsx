import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/auth";
import loginImage from "@/assets/login-img.jpg";
import RegisterForm from "@/components/accounts/RegisterForm";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";


// TODO => Would be nice if we could get the form to scroll without the image scrolling

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // TODO => We really need to sort out how we're going to do validation.
  const onRegister = async (registerData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
  }) => {
    try {
      const response: AxiosResponse = await register(registerData);
      if (response.status >= 200 && response.status < 300) {
        console.log(
          `[+] Register page - Register response: ${response.data["message"]}`
        );
        toast({
          title: "Registered successfully. Please verify your email address",
        });
        navigate("/verifyEmailNotice"); // TODO => This route does not exist yet.
      }
    } catch (error) {
      toast({
        title: "Please check you have entered the required information"
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
      <div className="flex h-full min-h-screen">
        {/* Left Side: Form */}
        <div className="w-2/5 flex flex-col justify-center items-center bg-gray-100 px-10 py-6 overflow-y-auto">
          <div className="w-2/3">
            <h1 className="text-3xl fond-bold mb-2">
              Register For Expense Tracker
            </h1>
            <p className="text-gray-500 mb-6">Control your expenses</p>
            <RegisterForm onRegister={onRegister} />
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

export default RegisterPage;
