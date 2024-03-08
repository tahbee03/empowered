import React from 'react'
import Image from 'next/image'

const Features = () => {
  return (

    <div className='w-full py-[10rem] px-4 bg-white dark:bg-medium'>
      <h1 className='text-center font-bold text-xl'>Our Features</h1>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8'>

        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <Image src="/filler5.jpg" className="rounded-md" alt="feature 1" width={400} height={200} />
          <h2 className='text-2xl font-bold text-center py-8'>AI-Powered Questionnaires</h2>
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <Image src="/filler6.jpg" className="rounded-md" alt="feature 1" width={400} height={200} />
          <h2 className='text-2xl font-bold text-center py-8'>Resume Personalization</h2>
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <Image src="/filler7.jpg" className="rounded-md" alt="feature 1" width={400} height={200} />
          <h2 className='text-2xl font-bold text-center py-8'>Accessibility Features</h2>
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <Image src="/filler8.png" className="rounded-md" alt="feature 1" width={400} height={200} />
          <h2 className='text-2xl font-bold text-center py-8'>Visual-Based Tutorials</h2>
        </div>
      </div>
    </div>

  )
}

export default Features
