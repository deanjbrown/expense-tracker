import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import { AxiosError, AxiosResponse } from "axios";
import { logout } from "@/api/auth";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  handleNewExpenseClicked: () => void;
}

const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuVisible, setIsMobileMenuVisible] =
    useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const onLogout = async () => {
    try {
      const response: AxiosResponse = await logout();
      if (response.status >= 200 && response.status < 300) {
        console.log("[-] You have been logged out successfully");
      }
      navigate("/account/login");
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

  return (
    <>
      <nav className="p-4 bg-background shadow-xl">
        <div className="container mx-auto flex space-x-4 items-center">
          <div className="flex-grow md:flex-grow-0 text-lg font-semibold text-foreground">
            Expense Tracker
          </div>
          <div className="hidden md:flex flex-grow space-x-4">
            <a
              href="#"
              className="text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-foreground/70 hover:text-foreground transition-colors duration-300"
              onClick={props.handleNewExpenseClicked}
            >
              New Expense
            </a>
          </div>
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="#" />
                  <AvatarFallback>
                    <User className="text-foreground/70 hover:text-foreground transition-colors duration-300" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-row-reverse md:hidden">
            <Button
              className="bg-foreground hover:text-primary hover:bg-foreground"
              onClick={toggleMobileMenu}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className="bg-sl"></div>
    </>
  );
};

export default Navbar;
