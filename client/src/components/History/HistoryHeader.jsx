import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faFile, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const HistoryHeader = () => {
  return (
    <tr className=' '>
      <th className='border p-3'>
        <span className='flex gap-3 justify-center items-center'>
          <FontAwesomeIcon icon={faFile} />
          Title
        </span>
      </th>
      <th className='border p-3'>
        <span className='flex gap-3 justify-center items-center'>
          <FontAwesomeIcon icon={faUserDoctor} />
          Created By
        </span>
      </th>
      <th className='border p-3'>
        <span className='flex gap-3 justify-center items-center'>
          <FontAwesomeIcon icon={faClock} />
          Timestamp
        </span>
      </th>
    </tr>
  )
}
