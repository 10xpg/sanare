import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import api from '../../api/client'
import { useNavigate } from 'react-router-dom'

export const PatientSearch = () => {
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [patientList, setPatientList] = useState([])
  const [patientSelect, setPatientSelect] = useState(null)
  const [error, setError] = useState(null)

  const handlePatientSelect = (patient) => {
    setPatientSelect(patient)
  }
  const handleChange = (e) => {
    const { value } = e.target
    setSearchTerm(value)
    // note: PL == patientList
    const filteredPL = patientList.filter(
      (patient) =>
        patient.first_name.toLowerCase().includes(value.toLowerCase()) || patient.last_name.toLowerCase().includes(value.toLowerCase())
    )
    if (filteredPL) {
      handlePatientSelect(filteredPL)
      setSearchResults(filteredPL)
    }

    const exactMatch = patientList.find((patient) => `${patient.first_name} ${patient.last_name}`.toLowerCase() === value.toLowerCase())
    if (exactMatch) {
      setPatientSelect(exactMatch)
    } else {
      setPatientSelect(null)
    }
  }

  useEffect(() => {
    const fetchPatientsList = async () => {
      try {
        const res = await api.get('/patient/all')
        setPatientList(res.data)
      } catch (error) {
        setError(error)
      }
    }
    fetchPatientsList()
  }, [])

  const handleSearchSubmit = () => {
    if (!patientSelect || !patientSelect?._id) return alert('No patient selected')
    navigate('/vitals', { state: { patientId: patientSelect._id } })
  }

  if (error) return <div>{`An Error Occured ==> ${error}`}</div>

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
        <button type='button' onClick={handleSearchSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute -right-28 top-1/2 transform -translate-y-5 text-black' />
        </button>
      </div>
      <datalist id='patientlist'>
        {searchResults.map((res) => {
          // assuming patients cant have the same name
          return <option key={res._id} onClick={() => handlePatientSelect(res)} value={`${res.first_name} ${res.last_name}`} />
        })}
      </datalist>
    </div>
  )
}

// TODO: find way to handle patients with same names
