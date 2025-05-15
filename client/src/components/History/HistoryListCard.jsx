import { Link } from 'react-router-dom'
import { parseISO } from 'date-fns'
import { PropTypes } from 'prop-types'

export const HistoryItem = ({ loading, history, err }) => {
  if (err)
    return (
      <tr>
        <td>{`An Error Occured ==> ${err}`}</td>
      </tr>
    )

  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    )

  return (
    <>
      {history.length > 0 ? (
        history.map((report) => (
          <tr key={report._id}>
            <td className='border p-3  hover:text-[#7DD3FC]'>
              <Link to={`/patient-summary/${report._id}`}>{`Report for ${report.patient.first_name} ${report.patient.last_name}`} </Link>
            </td>
            <td className='border p-3'>{`${report.doctor.first_name} ${report.doctor.last_name}`}</td>
            <td className='border p-3'>{parseISO(report.created_at).toLocaleString()}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td className='border p-3 ' colSpan={3}>
            No record found
          </td>
        </tr>
      )}
    </>
  )
}

HistoryItem.propTypes = {
  loading: PropTypes.bool,
  history: PropTypes.array,
  err: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
