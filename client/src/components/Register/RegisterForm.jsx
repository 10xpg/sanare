import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/client'
import { suppressor } from '../../utils/helpers'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const [registerForm, setRegisterForm] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegisterForm({ ...registerForm, [name]: value })
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.password_2) return
    const res = await api.post('/user/register', registerForm, { headers: { 'Content-Type': 'application/json' } })
    console.log(res.data)
    suppressor(res)
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='bg-black text-white text-center min-h-screen flex items-center justify-center '>
      <form onSubmit={handleRegisterSubmit} className='font-mono flex flex-col p-16  border'>
        <div className='text-4xl tracking-widest font-semibold py-5'>Register </div>
        <div className='text-lg'>
          Already have an Account?{' '}
          <Link className='hover:text-[#1ED346]' to='/login'>
            Login
          </Link>
        </div>
        <div className='pt-100 flex mx-auto gap-16'>
          <div className='pt-6 pb-3 mx-auto text-black'>
            <input
              type='text'
              placeholder='First Name'
              required
              className='w-64 h-10 rounded-xl p-4 outline-black placeholder:italic placeholder:text-[#999EA4]'
              name='first_name'
              onChange={handleChange}
              value={registerForm.first_name}
            />
          </div>
          <div className='pt-6 pb-3 mx-auto text-black'>
            <input
              type='text'
              placeholder='Last Name'
              required
              className='w-64 h-10 rounded-xl p-4 outline-black placeholder:italic placeholder:text-[#999EA4]'
              name='last_name'
              onChange={handleChange}
              value={registerForm.last_name}
            />
          </div>
        </div>
        <div className='pt-6 pb-3  text-black'>
          <input
            type='text'
            placeholder='UserId'
            required
            className='w-[575px] h-10 rounded-xl p-4 outline-black placeholder:italic placeholder:text-[#999EA4]'
            name='username'
            onChange={handleChange}
            value={registerForm.username}
          />
        </div>
        <div className='pt-6 pb-3  text-black'>
          <input
            type='text'
            placeholder='Email'
            required
            className='w-[575px] h-10 rounded-xl p-4 outline-black placeholder:italic placeholder:text-[#999EA4]'
            name='email'
            onChange={handleChange}
            value={registerForm.email}
          />
        </div>
        <div className='pt-6 pb-3  text-black'>
          <input
            type='text'
            placeholder='Telephone'
            required
            className='w-[575px] h-10 rounded-xl p-4 outline-black placeholder:italic placeholder:text-[#999EA4]'
            name='phone'
            onChange={handleChange}
            value={registerForm.phone}
          />
        </div>

        <div className='pt-6 pb-3  text-black'>
          <input
            type='password'
            placeholder='Password'
            required
            className='w-[575px] h-10 rounded-xl p-4 pr-10 outline-black placeholder:italic placeholder:text-[#999EA4]'
            name='password'
            onChange={handleChange}
            value={registerForm.password}
          />
        </div>

        <div className='pt-3 pb-32  text-black'>
          <input
            type='password'
            placeholder='Confirm Password'
            required
            className='w-[575px] h-10 rounded-xl p-4 pr-10 outline-black placeholder:italic placeholder:text-[#999EA4]'
            name='password_2'
            onChange={handleChange}
            value={registerForm.password_2}
          />
        </div>

        <button type='submit'>
          <div className='bg-white text-black w-52 px-6 py-2 rounded-3xl  hover:bg-[#999EA4] mx-auto '>Register Account</div>
        </button>
      </form>
    </div>
  )
}
