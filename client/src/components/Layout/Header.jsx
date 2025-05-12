import { useNavigate } from 'react-router-dom'
import { Logo } from './Logo'

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login', { replace: true })
  }
  return (
    <button type='button' onClick={handleLogout}>
      <div className='text-white font-normal font-mono text-sm hover:border rounded px-4 py-2'>Logout</div>
    </button>
  )
}

export const Header = () => {
  return (
    <div className='bg-black border-b-4 border-white py-6 px-5 flex items-center justify-between'>
      <Logo />
      <Logout />
    </div>
  )
}
