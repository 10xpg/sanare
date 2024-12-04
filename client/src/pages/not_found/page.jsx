import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className='bg-black min-h-screen text-white flex justify-center flex-col items-center font-mono'>
      <h1 className='text-6xl font-bold text-red-600 mb-4'>404</h1>
      <h2 className='text-3xl font-semibold mb-2'>Page Not Found</h2>
      <p className='text-lg mb-8'>The page you are looking for does not exist.</p>
      <Link to='/home' className='text-blue-500 hover:underline text-lg'>
        Go to Homepage
      </Link>
    </div>
  )
}
