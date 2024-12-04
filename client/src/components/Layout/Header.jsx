import { Logo } from './Logo'

export const Header = () => {
  const Logout = () => {
    return (
      <button>
        <div className='text-white font-normal font-mono text-sm hover:border rounded px-4 py-2'>Logout</div>
      </button>
    )
  }
  return (
    <div className='bg-black border-b-4 border-white py-6 px-5 flex items-center justify-between'>
      <Logo />
      <Logout />
    </div>
  )
}
