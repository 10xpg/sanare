import { useEffect, useState } from 'react'

import api from '../../api/client'
import { jwtDecode } from 'jwt-decode'

export const WelcomeMessage = () => {
  const tk = localStorage.getItem('access')
  const payload = tk && jwtDecode(tk)
  console.log(payload)

  const [doctor, setDoctor] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await api.get(`user/identification/${payload.sub}`)
        setDoctor(res.data)
      } catch (error) {
        setError(error)
      }
    }
    fetchDoctorDetails()
  }, [payload.sub])

  if (error) return <div>{`An Error Occured ==> ${error}`}</div>

  return (
    <div className='text-white hover:text-[#1ED346] px-10 py-10 text-2xl font-mono'>
      Welcome! Dr.{!doctor ? 'Inactive User' : `${doctor.first_name} ${doctor.last_name}`}{' '}
    </div>
  )
}
