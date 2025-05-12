import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../api/client'
import { jwtDecode } from 'jwt-decode'

export const UserNPatient = () => {
  const location = useLocation()
  console.log(location.state)
  const patientId = location?.state?.patientId

  const payload = jwtDecode(localStorage.getItem('access'))
  console.log(payload)

  const [doctor, setDoctor] = useState({})
  const [patient, setPatient] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [patient, doc] = await Promise.all([api.get(`/patient/${patientId}`), api.get(`/user/identification/${payload.sub}`)])
        setDoctor(doc.data)
        setPatient(patient.data)
      } catch (error) {
        setError(error)
      }
    }
    fetchDetails()
  }, [payload.sub, patientId])

  if (error) return <div>{`An Error Occured ==> ${error}`}</div>

  return (
    <div className='bg-black text-white font-mono flex justify-between px-32 py-10'>
      <div>Doctor: {`${doctor.first_name} ${doctor.last_name}`} </div>
      <div>Patient: {`${patient.first_name} ${patient.last_name}`}</div>
    </div>
  )
}
