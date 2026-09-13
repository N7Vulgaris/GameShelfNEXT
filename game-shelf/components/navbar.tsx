"use client";
import Link from "next/link";
import { Gamepad2, Grid2x2, ClipboardPenLine, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import SignInDialog from "./dialogs/sign-in-dialog";
import { useSession, signOut } from "@/lib/auth/auth-client";
import { Button } from "./ui/button";
import SignUpDialog from "./dialogs/sign-up-dialog";

export default function Navbar() {
  const pathName = usePathname();

  const session = useSession();

  return (
    <nav className="flex h-[70px] justify-between bg-header text-white items-center px-4">
      <Link href="/" className="flex gap-x-2 items-center">
        <Gamepad2 width={70} height={70} />
        <p className="font-semibold text-2xl md:flex hidden">The Game Shelf</p>
      </Link>
      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-x-10 h-full items-stretch font-semibold">
        <Link
          className={`items-center h-full flex hover:text-gray-400 ${pathName === "/viewGames" ? "text-gray-400" : ""}`}
          href="/viewGames"
        >
          View Games
        </Link>
        {session.data?.user && (
          <Link
            className={`items-center h-full flex hover:text-gray-400 ${pathName === "/quiz" ? "text-gray-400" : ""}`}
            href="/quiz"
          >
            Quiz
          </Link>
        )}
        {session.data?.user.role === "admin" && (
          <Link
            className={`items-center h-full flex hover:text-gray-400 ${pathName === "/management" ? "text-gray-400" : ""}`}
            href="/management"
          >
            Management
          </Link>
        )}
      </div>
      {/* Mobile Navbar */}
      <div className="flex md:hidden gap-x-6 h-full items-center">
        <Link href="/viewGames">
          <Grid2x2 width={30} height={30} />
        </Link>
        {session.data?.user && (
          <Link href="/quiz">
            <ClipboardPenLine width={30} height={30} />
          </Link>
        )}
        {session.data?.user.role === "admin" && (
          <Link href="/management">
            <Settings width={30} height={30} />
          </Link>
        )}
      </div>
      {session.data?.user ? (
        <div className="flex items-center gap-x-2">
          <div>{session.data.user.name}</div>
          <Button
            onClick={async () => {
              const result = await signOut();
              if (!result.data) {
                alert("Error signing out: " + result.error?.message);
              }
            }}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex gap-x-2">
          <SignInDialog />
          <SignUpDialog />
        </div>
      )}
    </nav>
  );
}
