import { Link } from 'react-router-dom'

export const DrugsItem = () => {
  return (
    <div className='flex justify-between text-lg'>
      <Link to='/encyclopedia-detail'>
        <span className='flex gap-3 items-center hover:text-xl hover:text-[#7DD3FC]'>Some Drug</span>
      </Link>
      <span className='flex gap-3 items-center'>More information about the drug</span>
    </div>
  )
}
