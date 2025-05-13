import { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import api from '../../api/client'
import { calculatPreciseAge } from '../../utils/helpers'

export const PatientInfo = ({ patientId }) => {
  const [patient, setPatient] = useState({})
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await api.get(`/patient/${patientId}`)
        setPatient(res.data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPatientDetails()
  }, [patientId])

  if (err) return <div>{`An Error Occured ==> ${err}`}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <form className='space-y-10'>
        <span className='flex gap-32'>
          <label>
            First Name:
            <div>{patient.first_name}</div>
          </label>
          <label>
            Last Name:
            <div>{patient.last_name}</div>
          </label>
        </span>
        <span className='flex gap-40'>
          <label>
            Sex:
            <div>{patient.sex}</div>
          </label>
          <label>
            Age:
            <div>{calculatPreciseAge(patient.dob)}</div>
          </label>
          <label>
            Phone:
            <div>{patient.phone}</div>
          </label>
        </span>
        <span className='flex gap-32'>
          <label>
            Email:
            <div>{patient.email}</div>
          </label>
          <label>
            Address:
            <div>{patient.address}</div>
          </label>
        </span>
      </form>
    </div>
  )
}

PatientInfo.propTypes = {
  patientId: PropTypes.string
}
