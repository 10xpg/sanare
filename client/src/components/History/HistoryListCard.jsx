import { Link } from 'react-router-dom'

export const HistoryItem = () => {
  return (
    <div className='flex justify-between text-lg'>
      <Link to='/patient-summary'>
        <span className='flex gap-3 items-center hover:text-xl hover:text-[#7DD3FC]'>Report for X</span>
      </Link>
      <span className='flex gap-3 items-center'>Dr.Nobody</span>
      <span className='flex gap-3 items-center'>10/10/2024</span>
    </div>
  )
}
