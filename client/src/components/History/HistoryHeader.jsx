import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faFile, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const HistoryHeader = () => {
  return (
    <div className='flex justify-between text-lg text-[#999EA4]'>
      <span className='flex gap-3 items-center'>
        <FontAwesomeIcon icon={faFile} />
        Title
      </span>
      <span className='flex gap-3 items-center'>
        <FontAwesomeIcon icon={faUserDoctor} />
        Created By
      </span>

      <span className='flex gap-3 items-center'>
        <FontAwesomeIcon icon={faClock} />
        Timestamp
      </span>
    </div>
  )
}
