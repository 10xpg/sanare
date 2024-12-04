import { Link } from 'react-router-dom'
import { OrthodoxRecommender } from './OrthodoxTool'
import { DoctorsRecommendation } from './DoctorsInput'
import { TraditionalRecommender } from './TraditionalTool'

export const RecommendationTool = () => {
  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Recommend Drugs</div>
      <form className='text-white flex flex-col gap-14'>
        <OrthodoxRecommender />
        <hr />
        <DoctorsRecommendation />
        <hr />
        <TraditionalRecommender />
      </form>
      <div className='flex justify-end py-20'>
        <button className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white '>
          <Link to='/patient-summary'>Generate Report</Link>
        </button>
      </div>
    </div>
  )
}
