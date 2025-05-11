import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/client'
import { parseISO } from 'date-fns'

export const HistoryItem = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const reports = await api.get('/report/all')
        const transform = await Promise.all(
          reports.data.map(async (report) => {
            const [doctor, patient, diagnosis] = await Promise.all([
              api.get(`/user/${report.doctor}`),
              api.get(`/patient/${report.patient}`),
              api.get(`/diagnosis/${report.diagnosis}`)
            ])
            // console.log(doctor.data, patient.data, diagnosis.data)
            return { ...report, doctor: doctor.data, patient: patient.data, diagnosis: diagnosis.data }
          })
        )

        setHistory(transform)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  if (err) return <div>{`An Error Occured ==> ${err}`}</div>
  if (loading) return <div>Loading...</div>

  console.log(history)

  return history.map((report) => (
    <tr key={report._id}>
      <td className='border p-3  hover:text-[#7DD3FC]'>
        <Link to={`/patient-summary/${report._id}`}>{`Report for ${report.patient.first_name} ${report.patient.last_name}`} </Link>
      </td>
      <td className='border p-3'>{`${report.doctor.first_name} ${report.doctor.last_name}`}</td>
      <td className='border p-3'>{parseISO(report.created_at).toLocaleString()}</td>
    </tr>
  ))
}
