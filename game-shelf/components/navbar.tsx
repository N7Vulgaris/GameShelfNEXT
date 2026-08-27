import Link from "next/link";
import { Button } from "./ui/button";
import { Gamepad2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex h-[70px] justify-between bg-header text-white items-center px-4">
      <Link href="/">
        <Gamepad2 />
      </Link>
      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-x-10 h-full items-stretch">
        <Link className="items-center h-full flex" href="/viewGames">
          View Games
        </Link>
        <Link className="items-center h-full flex" href="/quiz">
          Quiz
        </Link>
        <Link className="items-center h-full flex" href="/management">
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
        <Button variant="ghost">Login</Button>
        <Button variant="ghost">Sign Up</Button>
      </div>
    </nav>
  );
}
