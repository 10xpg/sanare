import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { PropTypes } from 'prop-types'
// import { suppressor } from '../../utils/helpers'

export const HistorySearch = ({ setHistory, og }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setSearchTerm(value)

    if (value.trim() === '') {
      setHistory(og.ogHistory)
    } else {
      const filteredHistory = og.ogHistory.filter(
        (h) =>
          h.patient.first_name.toLowerCase().includes(value.toLowerCase()) ||
          h.patient.last_name.toLowerCase().includes(value.toLowerCase())
      )
      if (filteredHistory) {
        console.log(filteredHistory)
        setHistory(filteredHistory)
      }
    }
  }

  return (
    <div className='bg-black pr-8 flex flex-col'>
      <div className='font-medium  uppercase text-2xl pb-6'>Patient&apos;s Search</div>
      <div className='relative py-3 w-64 '>
        <input
          type='text'
          list='patientlist'
          placeholder='Patient Name'
          className='w-96 rounded-2xl mx-4 py-2 px-2 text-center font-mono font-medium text-black outline-black placeholder:italic'
          value={searchTerm}
          onChange={handleChange}
        />
        <button type='button'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute -right-28 top-1/2 transform -translate-y-5 text-black' />
        </button>
      </div>
    </div>
  )
}

// TODO: find way to handle patients with same names

HistorySearch.propTypes = {
  history: PropTypes.array,
  setHistory: PropTypes.func,
  og: PropTypes.object
}
