import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">LOGO</Link>
        <Link className="w-20 bg-green-800 text-white py-2 rounded hover:bg-green-900 transition duration-300 relative text-center font-bold uppercase" href="/login">
          login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
