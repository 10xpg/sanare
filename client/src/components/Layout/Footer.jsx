import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const Features = () => {
  return (
    <div className='text-white font-mono font-normal text-sm flex flex-col'>
      <div className='text-lg font-semibold tracking-wide'>Features</div>
      <Link>Home</Link>
      <Link>Drug Recommender</Link>
      <Link>History</Link>
      <Link>Drug Encyclopedia</Link>
    </div>
  )
}

const Company = () => {
  return (
    <div className='text-white font-mono font-normal text-sm flex flex-col'>
      <div className='text-lg font-semibold tracking-wide'>Company</div>
      <Link>About</Link>
      <Link>Contact </Link>
      <Link>Support</Link>
    </div>
  )
}
export const Footer = () => {
  return (
    <div className='bg-black border-t-4 border-[#A7A9AB] flex justify-between gap-10 py-6 bottom-0'>
      <div className='px-40'>
        <Logo />
      </div>
      <div className='flex justify-start gap-10 pr-96'>
        <Features />
        <Company />
      </div>
    </div>
  )
}
