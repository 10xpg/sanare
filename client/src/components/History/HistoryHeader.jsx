import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faFile, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const HistoryHeader = () => {
  return (
    <tr className=' '>
      <th className='border p-3'>
        <FontAwesomeIcon icon={faFile} />
        Title
      </th>
      <th className='border p-3'>
        <FontAwesomeIcon icon={faUserDoctor} />
        Created By
      </th>
      <th className='border p-3'>
        <FontAwesomeIcon icon={faClock} />
        Timestamp
      </th>
    </tr>
  )
}
