import { faBook, faClockRotateLeft, faHome, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'

export const SideBar = () => {
  const location = useLocation()

  const activeColor = 'text-[#4D9245]'
  const inactiveColor = 'text-[#A7A9AB]'

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <div className='bg-black text-white font-mono font-normal flex flex-col items-center gap-28 py-10 px-5 mr-1 w-36 h-auto'>
      <Link to='/home' className='flex flex-col items-center text-center text-sm gap-2 '>
        <FontAwesomeIcon icon={faHome} size='2xl' className={isActive('/home') ? activeColor : inactiveColor} />
        Home
      </Link>
      <Link to='/patient' className='flex flex-col items-center text-center text-sm gap-2 '>
        <FontAwesomeIcon icon={faPrescriptionBottleMedical} size='2xl' className={isActive('/patient') ? activeColor : inactiveColor} />
        Recommendation <br />
        Tool
      </Link>
      <Link to='/history' className='flex flex-col items-center text-center text-sm gap-2'>
        <FontAwesomeIcon icon={faClockRotateLeft} size='2xl' className={isActive('/history') ? activeColor : inactiveColor} />
        History
      </Link>
      <Link to='/encyclopedia' className='flex flex-col items-center text-center text-sm gap-2 '>
        <FontAwesomeIcon icon={faBook} size='2xl' className={isActive('/encyclopedia') ? activeColor : inactiveColor} />
        Drug <br /> Encyclopedia
      </Link>
    </div>
  )
}
