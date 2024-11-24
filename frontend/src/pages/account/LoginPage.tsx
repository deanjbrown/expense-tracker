import loginImage from "@/assets/login-img.jpg";
import LoginForm from "@/components/accounts/LoginForm";
import { Toaster } from "@/components/ui/toaster";

// TODO => We need to make it so that the image on the right disappears on small screens

const LoginPage = () => {
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
            <LoginForm />
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
