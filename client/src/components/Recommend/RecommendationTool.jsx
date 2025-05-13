import { Link, useLocation } from 'react-router-dom'
import { OrthodoxRecommender } from './OrthodoxTool'
import { DoctorsRecommendation } from './DoctorsInput'
import { TraditionalRecommender } from './TraditionalTool'
import { useEffect, useState } from 'react'
import api from '../../api/client'

export const RecommendationTool = () => {
  const location = useLocation()
  const { diagnosisId, doctorId, patientId, vitalsId } = location.state

  const [conditions, setConditions] = useState([])
  const [docRec, setDocRec] = useState('')
  const [traditional, setTraditional] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const diagnosis = await api.get(`/diagnosis/${diagnosisId}`)
        setConditions((c) => [...c, ...diagnosis.data.condition])
      } catch (error) {
        setError(error)
      }
    }

    fetchConditions()
  }, [diagnosisId])

  const getTd = () => {
    const fetchTd = async () => {
      try {
        const responses = await Promise.all(conditions.map((c) => api.get(`/recommendation/traditional-drugs/${c}`)))
        const trads = responses.map((res) => res.data)
        setTraditional((t) => [...t, ...trads])
      } catch (err) {
        setError(err)
      }
    }

    if (conditions.length > 0) fetchTd()
  }

  const handleDocRec = (e) => {
    setDocRec(e.target.value)
  }

  const body = {
    doctor: doctorId,
    patient: patientId,
    vitals: vitalsId,
    diagnosis: diagnosisId
  }

  console.log(body)
  console.log(conditions)
  console.log(docRec)
  console.log(traditional)

  if (error) return <div>{`An Error Occured ==> ${error}`}</div>

  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Recommend Drugs</div>
      <form className='text-white flex flex-col gap-14'>
        <OrthodoxRecommender />
        <hr />
        <DoctorsRecommendation rec={{ handleDocRec, docRec }} />
        <hr />
        <TraditionalRecommender getDrugs={getTd} drugs={traditional} />
      </form>
      <div className='flex justify-end py-20'>
        <button className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white '>
          <Link to='/patient-summary'>Generate Report</Link>
        </button>
      </div>
    </div>
  )
}

// useEffect(() => {
//   const fetchDetails = async () => {
//     try {
//       const [diagnosis, doc, patient, vitals] = await Promise.all([
//         api.get(`/diagnosis/${diagnosisId}`),
//         api.get(`/user/${doctorId}`),
//         api.get(`/patient/${patientId}`),
//         api.get(`/vitals/${vitalsId}`)
//       ])
//       console.log(diagnosis, doc, patient, vitals)
//     } catch (error) {
//       setError(error)
//     }
//   }

//   fetchDetails()
// }, [diagnosisId, doctorId, patientId, vitalsId])
