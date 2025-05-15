import { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import api from '../../api/client'

export const RecommendationInfo = ({ report }) => {
  const [diagnosis, setDiagnosis] = useState({})
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiagnoisDetails = async () => {
      try {
        const res = await api.get(`/diagnosis/${report.diagnosis}`)
        setDiagnosis(res.data)
      } catch (error) {
        setErr(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDiagnoisDetails()
  }, [report])

  if (err) return <div>{`An Error Occured ==> ${err}`}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <form>
        <span className='flex flex-col gap-10'>
          <label>
            Condition(s):
            <div>{diagnosis.condition ? diagnosis.condition.join(', ') : 'none specified'}</div>
          </label>
          <label>
            System Recommended Orthodox Drug(s):
            <div>{report.selected_orthodox_drug.length > 0 ? report.selected_orthodox_drug.join(', ') : 'none specified'}</div>
          </label>
          <label>
            Doctor&apos;s Recommended Drug(s):
            <div>{report.recommended_by_doctor ? report.recommended_by_doctor.join(', ') : 'none specified'}</div>
          </label>
          <label>
            System Recommended Traditional Drug(s):
            <div>{report.selected_traditional_drug.length > 0 ? report.selected_traditional_drug.join(', ') : 'none specified'}</div>
          </label>
        </span>
      </form>
    </div>
  )
}

RecommendationInfo.propTypes = {
  report: PropTypes.object
}
