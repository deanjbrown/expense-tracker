import { SiFacebook, SiGoogle, SiApple } from "react-icons/si";
import { Button } from "../ui/button";

// TODO => We need to handle each click and begin the authentication

const SocialLogins = () => {
  return (
    <>
      <div className="text-center mt-8">
        <p className="text-gray-500">or sign in with</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Button className="bg-blue-600">
            <SiFacebook />
          </Button>
          <Button className="bg-red-600">
            <SiGoogle />
          </Button>
          <Button className="bg-black">
            <SiApple />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SocialLogins;