import React from 'react'
import Image from 'next/image'
import Single from '../../public/filler1.png'
import Double from '../../public/filler2.png'
import Triple from '../../public/filler4.png'
const Features = () => {
  return (
        
    <div className='w-full py-[10rem] px-4 bg-white dark:bg-medium'>
         <h1 className='text-center font-bold text-xl'>Our Features</h1>
    <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8'>
    
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
        <Image src="/filler5.jpg" alt="feature 1" width={400} height={200} />
            <h2 className='text-2xl font-bold text-center py-8'>AI-Powered Questionnaires</h2>
            <p>Utilize our smart AI to craft a resume that stands out. Answer a few simple questions and let our system generate a professional resume that reflects your unique skills and experiences.
</p>
           
       
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
        <Image src="/filler6.jpg" alt="feature 1" width={400} height={200} />
            <h2 className='text-2xl font-bold text-center py-8'>Personalization of resume</h2>
            <p>Analyzes user input to offer personalized recommendations for resume content.
 
 Offers a range of adaptable templates based on user preferences, ensuring unique and tailored resumes for diverse job applications."
 </p>
           
       
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
        <Image src="/filler7.jpg" alt="feature 1" width={400} height={200} />
            <h2 className='text-2xl font-bold text-center py-8'>Accessibility Features </h2>
            <p>Inclusive features such as text-to-speech  and community section.
Ensuring EmpowerEd is accessible and user-friendly for individuals with autism.
</p>
       
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
        <Image src="/filler8.png" alt="feature 1" width={400} height={200} />
            <h2 className='text-2xl font-bold text-center py-8'>Visual-Based Tutorials </h2>
            <p>Addressing potential overstimulation by minimizing
text.
Visuals and easy-to-follow patterns to enhance user understanding.
Meaningful icons reduce ambiguity and improve clarity.

</p>
       
        </div>
    </div>
  </div>
     
  )
}

export default Features
