import React, { useState } from "react";
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

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] =
    useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
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
              className="text-foreground hover:text-primary transition-colors duration-400"
            >
              Home
            </a>
            <a
              href="#"
              className="text-foreground hover:hover:text-primary transition-colors duration-400"
            >
              New Expense
            </a>
          </div>
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="#" />
                  <AvatarFallback className="bg-background hover:bg-foreground transition-colors duration-1000">
                    <User className="text-foreground hover:text-background transition-colors duration-1000" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
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
