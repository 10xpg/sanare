import { useEffect, useState } from 'react'

import api from '../../api/client'
import { jwtDecode } from 'jwt-decode'
import { Dashboard } from './Dashboard'

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
    <div className='text-white px-10 pt-8 pb-4  font-mono'>
      Welcome, <span className=' text-[#4D9245] text-3xl'>Dr.{!doctor ? 'Inactive User' : `${doctor.first_name} ${doctor.last_name}`}</span>
      <span className='block text-xl py-4 text-[#A7A9AB]'> Here&apos;s a summary of your recent activity</span>
      <Dashboard payload={payload} doc={doctor} />
    </div>
  )
}
