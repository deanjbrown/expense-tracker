import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SocialLogins from "./SocialLogins";

const loginFormSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

type LoginFormProps = {
  onLogin: (values: z.infer<typeof loginFormSchema>) => Promise<void>;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="johndoe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="************"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>

      <p className="text-center mt-4 text-sm text-gray-500">
        No account?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
      <hr className="border-t-2 mt-8" />
      <SocialLogins />
    </>
  );
};

export default LoginForm;
