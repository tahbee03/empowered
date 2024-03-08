import React from 'react'
import Image from 'next/image'
const Hero = () => {
  return (
    <div className='w-full bg-white py-16 px-4 shadow-md dark:bg-medium'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <Image src="/filler2.png" alt="feature 1" width={400} height={200} />
        <div className='flex flex-col justify-center'>
          <p className='text-red-500 font-bold '>Best AI Resume Builder</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Welcome to EmpowerEd</h1>
          <p>
            Step into a new era of resume design with our AI-powered platform.
            Create a resume that highlights your achievements and showcases your potential,
            all with the ease and precision of artificial intelligence.
          </p>
          <button className='text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full mx-2 w-[200px]'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
