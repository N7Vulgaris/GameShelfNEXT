"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Gamepad2 } from "lucide-react";
import { usePathname } from "next/navigation";
import SignInDialog from "./sign-in-dialog";
import SignUpDialog from "./sign-up-dialog";

//import { useState } from "react";

export default function Navbar() {
  //const [activeLink, setActiveLink] = useState<string>("/");
  const pathName = usePathname();

  return (
    <nav className="flex h-[70px] justify-between bg-header text-white items-center px-4">
      <Link href="/" className="flex gap-x-2 items-center">
        <Gamepad2 />
        <p className="font-semibold text-2xl">The Game Shelf</p>
      </Link>
      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-x-10 h-full items-stretch">
        <Link
          className={`items-center h-full flex hover:text-gray-400 ${pathName === "/viewGames" ? "text-gray-400" : ""}`}
          href="/viewGames"
        >
          View Games
        </Link>
        <Link
          className={`items-center h-full flex hover:text-gray-400 ${pathName === "/quiz" ? "text-gray-400" : ""}`}
          href="/quiz"
        >
          Quiz
        </Link>
        <Link
          className={`items-center h-full flex hover:text-gray-400 ${pathName === "/management" ? "text-gray-400" : ""}`}
          href="/management"
        >
          Management
        </Link>
      </div>
      {/* Mobile Navbar */}
      <div className="flex md:hidden gap-x-6 h-full items-center">
        <Link href="/viewGames">1</Link>
        <Link href="/quiz">2</Link>
        <Link href="/management">3</Link>
      </div>
      <div className="flex gap-x-2">
        <SignInDialog />
        <SignUpDialog />
      </div>
    </nav>
  );
}
