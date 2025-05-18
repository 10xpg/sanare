import { faCircleInfo, faPrescription } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DrugsHeader = () => {
  return (
    <div className='grid grid-cols-[1fr,3fr]  text-lg text-[#4D9245]'>
      <span className='flex gap-3 items-center'>
        <FontAwesomeIcon icon={faPrescription} />
        Name
      </span>
      <span className='flex gap-3 items-center'>
        <FontAwesomeIcon icon={faCircleInfo} />
        Description
      </span>
    </div>
  )
}
