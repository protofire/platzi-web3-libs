import Link from "next/link";
import React from "react";
import ConnectWallet from "./ConnectWallet";
import Switcher from "./Switcher";

const Navbar = () => {
  return (
    <nav className="py-2.5 flex items-center justify-between">
      <span className="text-xl text-white font-semibold tracking-widest flex items-center justify-center">
        <img className="w-10 h-10 relative top-[-2px] mr-2" src="reactfire.png" alt="react logo" />
        GONZAOTC
      </span>
      <div className="text-blue-200/50 text-lg tracking-widest gap-12 hidden xl:flex">
        <Link href="/">GM </Link>
        <Link href="/">WE ARE</Link>
        <Link href="/">ALL GONNA</Link>
        <Link href="/">MAKE IT</Link>
      </div>
      <Switcher />
      <ConnectWallet />
    </nav>
  );
};

export default Navbar;
