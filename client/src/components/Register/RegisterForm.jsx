import { Link } from 'react-router-dom'

export const RegisterForm = () => {
  return (
    <div className='bg-black text-white text-center min-h-screen'>
      <form className='font-mono flex flex-col p-32 '>
        <div className='text-4xl tracking-widest font-semibold py-5'>Register </div>
        <div className='text-lg'>
          Already have an Account?{' '}
          <Link className='hover:text-[#1ED346]' to='/login'>
            Login
          </Link>
        </div>
        <div className='pt-100flex mx-auto gap-16'>
          <div className='pt-6 pb-3 mx-auto text-[#999EA4]'>
            <input type='text' placeholder='First Name' required className='w-64 h-10 rounded-xl p-4 outline-black' />
          </div>
          <div className='pt-6 pb-3 mx-auto text-[#999EA4]'>
            <input type='text' placeholder='Last Name' required className='w-64 h-10 rounded-xl p-4 outline-black' />
          </div>
        </div>
        <div className='pt-6 pb-3  text-[#999EA4]'>
          <input type='text' placeholder='UserId' required className='w-[575px] h-10 rounded-xl p-4 outline-black' />
        </div>
        <div className='pt-6 pb-3  text-[#999EA4]'>
          <input type='text' placeholder='Email' required className='w-[575px] h-10 rounded-xl p-4 outline-black' />
        </div>
        <div className='pt-6 pb-3  text-[#999EA4]'>
          <input type='text' placeholder='Telephone' required className='w-[575px] h-10 rounded-xl p-4 outline-black' />
        </div>

        <div className='pt-6 pb-3  text-[#999EA4]'>
          <input type='password' placeholder='Password' required className='w-[575px] h-10 rounded-xl p-4 pr-10 outline-black' />
        </div>

        <div className='pt-3 pb-32  text-[#999EA4]'>
          <input type='password' placeholder='Confirm Password' required className='w-[575px] h-10 rounded-xl p-4 pr-10 outline-black' />
        </div>

        <button type='button'>
          <div className='bg-white text-black w-52 px-6 py-2 rounded-3xl  hover:bg-[#999EA4] mx-auto '>Register Account</div>
        </button>
      </form>
    </div>
  )
}
