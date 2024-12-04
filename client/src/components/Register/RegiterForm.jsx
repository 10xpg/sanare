import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export const RegisterForm = () => {
  return (
    <div className='bg-black text-white text-center min-h-screen'>
      <div className='font-mono flex flex-col p-32 '>
        <div className='text-4xl tracking-widest font-semibold py-5'>Register </div>
        <div className='text-lg'>
          Already have an Account?{' '}
          <Link className='hover:text-[#1ED346]' to='/login'>
            Login
          </Link>
        </div>
        <div className='pt-16 pb-3 mx-auto text-[#999EA4]'>
          <input type='text' placeholder='User id' required className='w-64 h-10 rounded-xl p-4 outline-black' />
        </div>
        <div className='flex mx-auto gap-16'>
          <div className='pt-6 pb-3 mx-auto text-[#999EA4]'>
            <input type='text' placeholder='First Name' required className='w-64 h-10 rounded-xl p-4 outline-black' />
          </div>
          <div className='pt-6 pb-3 mx-auto text-[#999EA4]'>
            <input type='text' placeholder='Last Name' required className='w-64 h-10 rounded-xl p-4 outline-black' />
          </div>
        </div>
        <div className='pt-6 pb-3 mx-auto text-[#999EA4]'>
          <input type='text' placeholder='Email' required className='w-96 h-10 rounded-xl p-4 outline-black' />
        </div>
        <div className='pt-6 pb-3 mx-auto text-[#999EA4]'>
          <input type='text' placeholder='Telephone' required className='w-96 h-10 rounded-xl p-4 outline-black' />
        </div>
        <div className='pt-6 pb-6 mx-auto text-[#999EA4]'>
          <div className='relative w-64'>
            <input type='password' placeholder='Password' required className='w-full h-10 rounded-xl p-4 pr-10 outline-black' />
            <button>
              <FontAwesomeIcon icon={faEye} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999EA4] ' />
            </button>
          </div>
        </div>
        <div className='pt-3 pb-32 mx-auto text-[#999EA4]'>
          <div className='relative w-64'>
            <input type='password' placeholder='Confirm Password' required className='w-full h-10 rounded-xl p-4 pr-10 outline-black' />
            <button>
              <FontAwesomeIcon icon={faEye} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999EA4] ' />
            </button>
          </div>
        </div>

        <button type='button'>
          <div className='bg-white text-black w-52 px-6 py-2 rounded-3xl  hover:bg-[#999EA4] mx-auto '>Register Account</div>
        </button>
      </div>
    </div>
  )
}
