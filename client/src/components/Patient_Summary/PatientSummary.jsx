import { Link, useParams } from 'react-router-dom'
import { PatientInfo } from './AboutPatient'
import { DoctorInfo } from './AboutDoctor'
import { RecommendationInfo } from './AboutRecommendation'
import { useEffect, useState } from 'react'
import api from '../../api/client'

export const PatientSummary = () => {
  const { id } = useParams()

  const [report, setReport] = useState({})
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/report/${id}`)
        console.log(res.data)
        setReport(res.data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [id])

  if (err) return <div>{`An Error Occured ==> ${err}`}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Patient Summary</div>
      <hr />
      <div className='text-white flex flex-col gap-14'>
        <hr />
        <PatientInfo patientId={report.patient} />
        <hr />
        <RecommendationInfo report={report} />
        <hr />
        <DoctorInfo doctorId={report.doctor} created_at={report.created_at} />
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
