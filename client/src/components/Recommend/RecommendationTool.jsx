import { useLocation, useNavigate } from 'react-router-dom'
import { OrthodoxRecommender } from './OrthodoxTool'
import { DoctorsRecommendation } from './DoctorsInput'
import { TraditionalRecommender } from './TraditionalTool'
import { useEffect, useState } from 'react'
import api from '../../api/client'
import { calculateAge, suppressor } from '../../utils/helpers'

export const RecommendationTool = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const { diagnosisId, doctorId, patientId, vitalsId } = location.state

  const [patient, setPatient] = useState({})
  const [conditions, setConditions] = useState([])
  const [docRec, setDocRec] = useState('')
  const [traditional, setTraditional] = useState([])
  const [orthodox, setOrthodox] = useState([])
  const [error, setError] = useState(null)

  const [tds, setTds] = useState({})
  const [ods, setOds] = useState({})

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const [diagnosis, patient] = await Promise.all([api.get(`/diagnosis/${diagnosisId}`), api.get(`/patient/${patientId}`)])
        setPatient(patient.data)
        setConditions(diagnosis.data.condition)
      } catch (error) {
        setError(error)
      }
    }

    fetchConditions()
  }, [diagnosisId, patientId])

  const getTd = () => {
    const fetchTd = async () => {
      try {
        const responses = await Promise.all(conditions.map((c) => api.get(`/recommendation/traditional-drugs/${c}`)))
        const trads = responses.map((res) => res.data)
        setTraditional(trads)
      } catch (err) {
        setError(err)
      }
    }

    if (conditions.length > 0) fetchTd()
  }

  const getOd = () => {
    const fetchOd = async () => {
      try {
        const responses = await Promise.all(
          conditions.map((c) => api.get(`/recommendation/orthodox-drugs/${c}`, { params: { age: calculateAge(patient.dob) } }))
        )
        console.log(conditions)
        const orths = responses.map((res) => res.data)
        setOrthodox(orths)
      } catch (err) {
        setError(err)
      }
    }

    if (conditions.length > 0) fetchOd()
  }

  const handleDocRec = (e) => {
    setDocRec(e.target.value)
  }

  const reqbody = {
    doctor: doctorId,
    patient: patientId,
    vitals: vitalsId,
    diagnosis: diagnosisId,
    recommended_orthodox_drug: [...orthodox].filter((od) => od !== null),
    recommended_traditional_drug: [...new Map([...traditional].flat().map((td) => [td.product_name, td])).values()],
    recommended_by_doctor: docRec
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0)
  }

  const repbody = {
    doctor: doctorId,
    patient: patientId,
    diagnosis: diagnosisId,
    selected_orthodox_drug: ods.recommended_orthodox_drug || [],
    selected_traditional_drug: tds.recommended_traditional_drug,
    recommended_by_doctor: docRec
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0)
  }

  const handleRecFormSubmit = async (e) => {
    e.preventDefault()
    const [recommend, report] = await Promise.all([
      api.post('/recommendation', reqbody, {
        params: {
          patient_id: patientId,
          doctor_id: doctorId,
          vitals_id: vitalsId,
          diagnosis_id: diagnosisId
        }
      }),
      api.post('/report', repbody, {
        params: {
          patient_id: patientId,
          doctor_id: doctorId,
          diagnosis_id: diagnosisId
        }
      })
    ])
    suppressor(recommend)
    navigate(`/patient-summary/${report.data._id}`)
  }

  if (error) return <div>{`An Error Occured ==> ${error}`}</div>

  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Recommend Drugs</div>
      <form className='text-white flex flex-col gap-14' onSubmit={handleRecFormSubmit}>
        <OrthodoxRecommender getDrugs={getOd} drugs={orthodox} state={{ ods, setOds }} />
        <hr />
        <DoctorsRecommendation rec={{ handleDocRec, docRec }} />
        <hr />
        <TraditionalRecommender getDrugs={getTd} drugs={traditional} state={{ tds, setTds }} />
        <div className='flex justify-end py-20'>
          <button
            className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white '
            type='submit'
          >
            Generate Report
          </button>
        </div>
      </form>
    </div>
  )
}
