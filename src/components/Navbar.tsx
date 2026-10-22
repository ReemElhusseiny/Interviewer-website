"use client"

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DashboardBtn";
import { useUserRole } from "./hooks/useUserRole";

function Navbar() {
    const { isCandidate, isLoading } = useUserRole();
  return (
    <nav className="border-b bg-white dark:bg-[#000]/30 shadow-sm">
      <div className="flex h-16 items-center px-4 container mx-auto">
           <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DasboardBtn />
            <ModeToggle />
            <UserButton />
           {isCandidate ? <p>Candidate</p> : <p>Interviewer</p> } 
         
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
export default Navbar;