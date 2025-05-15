import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/client'

export const LoginForm = () => {
  const init = {
    username: '',
    password: ''
  }

  const navigate = useNavigate()
  const [form, setForm] = useState(init)

  console.log(form)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const userLogin = async () => {
      const res = await api.post('/auth/login', form, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      console.log(res.data)
      if (res.status === 404) return
      localStorage.clear()
      localStorage.setItem('access', res.data.access_token)
      navigate('/home')
    }
    userLogin()
  }

  return (
    <div className='bg-black text-white text-center min-h-screen flex items-center justify-center'>
      <form onSubmit={handleLogin} className='font-mono flex flex-col p-16 border '>
        <div className='text-4xl tracking-widest font-semibold py-5 '>Login </div>
        <div className='text-lg'>
          Don&apos;t have an Account?
          <Link to='/register' className='hover:text-[#1ED346] '>
            <span className='mx-5'>Register Now</span>
          </Link>
        </div>
        <div className='pt-6 pb-3 mx-auto text-black'>
          <input
            name='username'
            type='text'
            placeholder='User id'
            required
            className='w-64 h-10 rounded-xl p-4 outline-black placeholder:italic placeholder:text-[#999EA4]'
            onChange={handleChange}
            value={form.username}
          />
        </div>
        <div className='pt-3 pb-6 mx-auto text-black'>
          <div className='relative w-64'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              required
              className='w-full h-10 rounded-xl p-4 pr-10 outline-black placeholder:italic placeholder:text-[#999EA4]'
              onChange={handleChange}
              value={form.password}
            />
            <button>
              <FontAwesomeIcon icon={faEye} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999EA4] ' />
            </button>
          </div>
        </div>
        <Link className='pb-10 hover:text-[#1ED346] mx-auto'>Forgot password?</Link>

        <button type='submit'>
          <div className='bg-white text-black w-4/12 px-4 py-2 rounded-3xl outline outline-black  hover:bg-[#999EA4] mx-auto '>Login</div>
        </button>
      </form>
    </div>
  )
}
