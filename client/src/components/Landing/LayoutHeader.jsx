import { Link } from 'react-router-dom'
import { Logo } from '../Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

export const LayoutHeader = () => {
  const Language = () => {
    return (
      <Link>
        <div className='text-white font-normal font-mono text-sm  px-4 py-2'>
          <FontAwesomeIcon icon={faGlobe} />
        </div>
      </Link>
    )
  }
  const About = () => {
    return (
      <Link>
        <div className='text-white font-normal font-mono text-sm hover:border rounded px-4 py-2'>About</div>
      </Link>
    )
  }
  const Register = () => {
    return (
      <Link to='/register'>
        <div className='text-white font-normal font-mono text-sm hover:border rounded px-4 py-2'>Register</div>
      </Link>
    )
  }
  const Login = () => {
    return (
      <Link to='/login'>
        <div className='text-white font-normal font-mono text-sm hover:border rounded px-4 py-2'>Login</div>
      </Link>
    )
  }
  return (
    <div className='bg-black border-b-4 border-white py-6 px-5 flex items-center justify-between'>
      <Logo />
      <div className='flex justify-end gap-5'>
        <Language />
        <About />
        <Register />
        <Login />
      </div>
    </div>
  )
}
