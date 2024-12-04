import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export const LoginForm = () => {
  return (
    <div className='bg-black text-white text-center min-h-screen'>
      <div className='font-mono flex flex-col p-32 '>
        <div className='text-4xl tracking-widest font-semibold py-5'>Login </div>
        <div className='text-lg'>
          Don&apos;t have an Account?
          <Link to='/register' className='hover:text-[#1ED346] '>
            <span className='mx-5'>Register Now</span>
          </Link>
        </div>
        <div className='pt-6 pb-3 mx-auto text-[#999EA4]'>
          <input type='text' placeholder='User id' required className='w-64 h-10 rounded-xl p-4 outline-black' />
        </div>
        <div className='pt-3 pb-6 mx-auto text-[#999EA4]'>
          <div className='relative w-64'>
            <input type='password' placeholder='**********' required className='w-full h-10 rounded-xl p-4 pr-10 outline-black' />
            <button>
              <FontAwesomeIcon icon={faEye} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999EA4] ' />
            </button>
          </div>
        </div>
        <Link className='pb-10 hover:text-[#1ED346] mx-auto'>Forgot password?</Link>

        <button type='button'>
          <div className='bg-white text-black w-1/12 px-4 py-2 rounded-3xl  hover:bg-[#999EA4] mx-auto '>Login</div>
        </button>
      </div>
    </div>
  )
}
