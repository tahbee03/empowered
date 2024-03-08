"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import ThemeToggle from "../components/ThemeToggle"
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
// import "./Navbar.css";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();
  const handleNav = () => setNav(!nav);

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 dark:bg-dark">
      <div className="flex items-center">
        <Link href={"/"} className="text-xl font-bold mr-6">
          <Image src="/icon.png" alt="EmpowerEd logo" width={50} height={100} id="logo" />
        </Link>

      </div>
      <div>
        <ThemeToggle />
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">

        <Link href={"/resume"} className="text-gray-300 hover:text-white mr-4">Resume Builder</Link>
        <a href="#" className="text-gray-800 hover:text-red-600 mx-2  dark:text-white">About</a>
        <a href="#" className="text-gray-800 hover:text-red-600 mx-2  dark:text-white">Features</a>
        <a href="#" className="text-gray-800 hover:text-red-600 mx-2  dark:text-white">Tutorials</a>
        <div>
          {session ? (
            <>
              <span className="mr-4">Welcome, {session.user.name}</span>
              <Link href={"/"}>
                <button onClick={() => signOut()} className="text-gray-300 hover:text-white mr-4">
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/login"} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full mx-2  dark:text-white">Login</Link>
              <Link href={"/register"} className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full mx-2  dark:text-white">Register</Link>
            </>
          )}
        </div>

      </div>

      {/* Mobile Button */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Empowered.</h1>
        <li className='p-4 border-b border-gray-600 text-white'>Home</li>
        <li className='p-4 border-b border-gray-600  text-white'>About</li>
        <li className='p-4 border-b border-gray-600  text-white'>Features</li>
        <li className='p-4 border-b border-gray-600  text-white'>Tutorial</li>
        <li className='p-4  text-white border-b border-gray-600' >Sign in</li>
        <li className='p-4  text-white'>Register</li>
      </ul>
    </div>
  );
};

export default Navbar;
