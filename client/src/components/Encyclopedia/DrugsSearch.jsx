import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DrugsSearch = () => {
  return (
    <div className='bg-black pr-8 flex items-center justify-end'>
      <div className='relative py-3 w-64 '>
        <input
          type='text'
          placeholder='Drug Search'
          className='w-64 rounded-2xl p-1 text-center font-mono font-medium outline-black placeholder:italic'
        />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-black' />
        </button>
      </div>
    </div>
  )
}
