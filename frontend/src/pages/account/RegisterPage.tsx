import loginImage from "@/assets/login-img.jpg";
import RegisterForm from "@/components/accounts/RegisterForm";
import { Toaster } from "@/components/ui/toaster";

// TODO => Would be nice if we could get the form to scroll without the image scrolling

const RegisterPage = () => {
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
            <RegisterForm />
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
