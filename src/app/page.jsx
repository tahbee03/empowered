import Image from 'next/image';
import React from 'react';
import Hero from "../components/Hero"
import Features from "../components/Features"
export default function Home() {
  return (
    <main className="bg-white dark:text-white dark:bg-medium">
      <div className="container mx-auto px-6 py-12">
        <Hero />
        <Features />
      </div>
    </main>
  );
}

