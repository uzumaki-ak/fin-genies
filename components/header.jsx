import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LucideLayoutDashboard, NotebookPenIcon } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import { ThemeToggle } from "./theme-toggle";


const Header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={60}
            width={200}
            className="h-14 w-auto object-contain"
          />
        </Link>
        <ThemeToggle />
        <div className="flex items-center space-x-4">
          {/* when user sign in things they can acces  */}
          <SignedIn>
            <Link
              href={"/dashboard"}
              className="text-slate-500 hover:text-cyan-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LucideLayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href={"/transaction/create"} className="">
              <Button className="flex items-center gap-2">
                <NotebookPenIcon size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">LogIn</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-12 h-11",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
