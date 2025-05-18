import { HistoryHeader } from './HistoryHeader'
import { HistoryItem } from './HistoryListCard'
import { HistorySearch } from './HistorySearch'
import { useEffect, useState } from 'react'
import api from '../../api/client'

export const HistorySection = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [ogHistory, setOgHistory] = useState([])

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
            return { ...report, doctor: doctor.data, patient: patient.data, diagnosis: diagnosis.data }
          })
        )
        setOgHistory(transform)
        setHistory(transform)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <HistorySearch history={history} setHistory={setHistory} og={{ ogHistory, setOgHistory }} />
      <div className='font-medium uppercase text-2xl pb-6'>History</div>
      <table className='text-white text-center w-full border-collapse table-auto '>
        <thead className=''>
          <HistoryHeader />
        </thead>
        <tbody>
          <HistoryItem history={history.toReversed()} loading={loading} err={err} />
        </tbody>
      </table>
    </div>
  )
}
