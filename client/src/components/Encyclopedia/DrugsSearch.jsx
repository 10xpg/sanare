import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropTypes } from 'prop-types'

export const DrugsSearch = ({ placeholder, onChange, value, search }) => {
  return (
    <div className='bg-black pr-8 flex items-center justify-end'>
      <div className='relative py-3 w-1/2 '>
        <input
          type='text'
          placeholder={placeholder}
          className='w-full rounded-2xl  mx-4 py-2 px-2 text-center font-mono font-medium text-black outline-black placeholder:italic'
          onChange={onChange}
          value={value}
        />
        <button type='button' onClick={search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute right-4 top-1/2 transform -translate-y-5 text-black' />
        </button>
      </div>
    </div>
  )
}

DrugsSearch.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  search: PropTypes.func
}
