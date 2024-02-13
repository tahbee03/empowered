import Image from 'next/image'
import './home.css'

export default function Home() {
  return (
    <main>
      <div className='center-cont'>
        <Image
          src='/logo.png'
          alt='EmpowerEd logo'
          width={500}
          height={500}
        />
        <p>Unleashing potential with EmpowerEd resumes</p>
        <div className='row'>
          <Image
            src='/filler1.png'
            alt='paper'
            width={200}
            height={200}
          />
          <p>Enhance your resume with the power of AI</p>
        </div>
        <div className='row'>
          <Image
            src='/filler2.png'
            alt='man in suit'
            width={200}
            height={200}
          />
          <p>Prepare yourself for a job that suits you</p>
        </div>
      </div>
    </main>
  )
}
