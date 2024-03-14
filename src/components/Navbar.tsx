import Link from "next/link";
import { buttonVariants } from "../components/ui/button";

const Navbar = () => {
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">LOGO</Link>
        
        <Link className={buttonVariants()} href="/login">
          login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
