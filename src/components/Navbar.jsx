"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import ThemeToggle from "../components/ThemeToggle"
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();
  const handleNav = () => setNav(!nav);

  async function handleSignOut() {
    const res = await signOut();
    window.location.href = "/";
  }

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 dark:bg-dark">
      <div className="flex items-center">
        <div className="bg-white rounded-full p-3">
          <Link href={"/"}>
            <Image src="/icon.png" alt="EmpowerEd logo" width={50} height={100} id="logo" />
          </Link>
        </div>
      </div>
      <div>
        <ThemeToggle />
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">
        <a href="/about" className="text-black dark:text-white hover:text-[#501616] dark:hover:text-[#CCA677] mx-2">About</a>
        <p className="text-black dark:text-white">|</p>
        <a href="/tutorials" className="text-black dark:text-white hover:text-[#501616] dark:hover:text-[#CCA677] mx-2">Tutorials</a>
        {session ? (
          <>
            <p className="text-black dark:text-white">|</p>
            <Link href={"/resume"} className="text-black dark:text-white hover:text-[#501616] dark:hover:text-[#CCA677] mx-2">Resume Builder</Link>
            <Link href={"/profile"} className="mr-4 font-bold text-[#501616] dark:text-[#CCA677]">Welcome, {session.user.name}</Link>
            <Link href={"/"}>
              <button onClick={handleSignOut} className="text-[#501616] dark:text-[#CCA677] border border-[#501616] dark:border-[#CCA677] hover:bg-[#501616] dark:hover:bg-[#CCA677] hover:text-white dark:hover:text-black px-4 py-2 rounded-full my-2 w-full">
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href={"/login"} className="text-[#501616] dark:text-[#CCA677] border border-[#501616] dark:border-[#CCA677] hover:bg-[#501616] dark:hover:bg-[#CCA677] hover:text-white dark:hover:text-black px-4 py-2 rounded-full my-2 w-full">Login</Link>
            <Link href={"/register"} className="text-[#501616] dark:text-[#CCA677] border border-[#501616] dark:border-[#CCA677] hover:bg-[#501616] dark:hover:bg-[#CCA677] hover:text-white dark:hover:text-black px-4 py-2 rounded-full my-2 w-full">Register</Link>
          </>
        )}
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
