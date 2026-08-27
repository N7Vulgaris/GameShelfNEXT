import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between bg-header text-white">
      <Link href="/">
        <Image src="/images/logo2.png" alt="Logo" width={70} height={70} />
      </Link>
      <div>1</div>
      <div>2</div>
    </nav>
  );
}
