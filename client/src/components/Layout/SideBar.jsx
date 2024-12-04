import { faBook, faClockRotateLeft, faHome, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <div className='bg-black text-white font-mono font-normal flex flex-col items-center gap-28 py-10 px-5 mr-1 w-32 h-auto'>
      <Link to='/home' className='flex flex-col items-center text-center text-sm gap-2 hover:animate-bounce'>
        <FontAwesomeIcon icon={faHome} size='2xl' />
        Home
      </Link>
      <Link to='/patient' className='flex flex-col items-center text-center text-sm gap-2 hover:animate-bounce'>
        <FontAwesomeIcon icon={faPrescriptionBottleMedical} size='2xl' />
        Recommendation <br />
        Tool
      </Link>
      <Link to='/history' className='flex flex-col items-center text-center text-sm gap-2 hover:animate-bounce'>
        <FontAwesomeIcon icon={faClockRotateLeft} size='2xl' />
        History
      </Link>
      <Link to='/encyclopedia' className='flex flex-col items-center text-center text-sm gap-2 hover:animate-bounce'>
        <FontAwesomeIcon icon={faBook} size='2xl' />
        Drug <br /> Encyclopedia
      </Link>
    </div>
  )
}
