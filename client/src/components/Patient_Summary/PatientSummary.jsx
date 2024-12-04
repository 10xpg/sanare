import { Link } from 'react-router-dom'
import { PatientInfo } from './AboutPatient'
import { DoctorInfo } from './AboutDoctor'
import { RecommendationInfo } from './AboutRecommendation'

export const PatientSummary = () => {
  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Patient Summary</div>
      <hr />
      <div className='text-white flex flex-col gap-14'>
        <hr />
        <PatientInfo />
        <hr />
        <RecommendationInfo />
        <hr />
        <DoctorInfo />
        <hr />
      </div>
      <Link to='/patient-summary' className='flex justify-end py-20'>
        <button className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white'>
          Print Report
        </button>
      </Link>
    </div>
  )
}
