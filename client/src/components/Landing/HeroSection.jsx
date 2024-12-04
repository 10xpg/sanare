import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export const HeroSection = () => {
  return (
    <div className='bg-black text-white text-center font-mono font-normal flex flex-col justify-around py-10'>
      <div className='text-4xl pt-36'>
        Welcome to <span className='italic uppercase'>&#39;Sanare&#39;</span>
      </div>
      <div className='text-3xl py-10'>Empowering Clinicians with Intelligent Drug Recommendations</div>
      <div className='text-2xl py-10 px-40 font-light font-sans italic tracking-wide'>
        Streamline your prescribing process with our advanced AI-driven platform. Access personalized medication suggestions, and
        evidence-based guidelines to enhance patient care. Elevate your practice and make informed decisions at the point of care!
      </div>
      <Link>
        <div className='text-black font-normal font-mono text-sm border bg-white rounded-3xl px-4 py-2 w-1/12 mx-auto hover:bg-black hover:text-white'>
          Learn more <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Link>
    </div>
  )
}
