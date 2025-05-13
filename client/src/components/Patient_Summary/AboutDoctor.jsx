import { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import api from '../../api/client'
import { parseISO } from 'date-fns'

export const DoctorInfo = ({ doctorId, created_at }) => {
  const [doctor, setDoctor] = useState({})
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await api.get(`/user/${doctorId}`)
        setDoctor(res.data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDoctorDetails()
  }, [doctorId])

  if (err) return <div>{`An Error Occured ==> ${err}`}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <form>
        <span className='flex flex-col gap-10'>
          <label>
            Doctor:
            <div>{`${doctor.first_name} ${doctor.last_name}`}</div>
          </label>
          <label>
            Doctor Email:
            <div>{doctor.email}</div>
          </label>
          <label>
            Doctor Phone:
            <div>{doctor.phone}</div>
          </label>
          <label>
            Created At:
            <div>{parseISO(created_at).toLocaleString()}</div>
          </label>
        </span>
      </form>
    </div>
  )
}

DoctorInfo.propTypes = {
  doctorId: PropTypes.string,
  created_at: PropTypes.string
}
