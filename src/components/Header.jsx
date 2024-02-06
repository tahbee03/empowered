"use client"
import React from 'react';
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href={"/"} className="text-xl font-bold mr-6">Empowered</Link>
        <Link href={"/resume"} className="text-gray-300 hover:text-white mr-4">ResumeBuilder</Link>
      </div>
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
            <Link href={"/login"} className="text-gray-300 hover:text-white mr-4">Login</Link>
            <Link href={"/register"} className="text-gray-300 hover:text-white">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
