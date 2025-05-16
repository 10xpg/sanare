import { DrugsHeader } from './DrugsHeader'
import { OrthodoxDrugsItem } from './DrugsListCard'
import { DrugsSearch } from '../../components/Encyclopedia/DrugsSearch'
import { useState } from 'react'
import api from '../../api/client'

export const OrthodoxEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState(null)

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleOrthodoxDrugSearch = async () => {
    try {
      const res = await api.get(`/encyclopedia/orthodox/name/${searchTerm}`)
      setSearchResults(res.data)
      setError(null)
    } catch (error) {
      setSearchResults([])
      setError(error)
    }
  }

  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <DrugsSearch
        placeholder={'Orthodox Drug Search'}
        onChange={handleSearchTermChange}
        value={searchTerm}
        search={handleOrthodoxDrugSearch}
      />
      <div className='font-medium uppercase text-2xl pb-6'>Orthodox Drugs Encyclopedia</div>
      <hr />
      <div className='text-white flex flex-col gap-10'>
        <hr />
        <DrugsHeader />
        <hr />
        <OrthodoxDrugsItem results={searchResults} err={error} />
        <hr />
      </div>
    </div>
  )
}
