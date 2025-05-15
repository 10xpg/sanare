import { useParams } from 'react-router-dom'
import { OrthodoxDrugsDetailItem, TraditionalDrugsDetailItem } from './DrugsDetailCard'
import { useEffect, useState } from 'react'
import api from '../../api/client'

export const OrthodoxDrugsDetail = () => {
  const { id } = useParams()
  const orthodoxDrugId = id

  const [drug, setDrug] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOd = async () => {
      try {
        const res = await api.get(`/encyclopedia/orthodox/${orthodoxDrugId}`)
        setDrug(res.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOd()
  }, [orthodoxDrugId])

  if (error) return <div>An Error Occured := {error}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>{drug.name}</div>
      <hr />
      <div className='text-white flex flex-col gap-10'>
        <hr />
        <OrthodoxDrugsDetailItem drug={drug} />
        <hr />
      </div>
    </div>
  )
}

export const TraditionalDrugsDetail = () => {
  const { id } = useParams()
  const traditionalDrugId = id

  const [drug, setDrug] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTd = async () => {
      try {
        const res = await api.get(`/encyclopedia/traditional/${traditionalDrugId}`)
        setDrug(res.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTd()
  }, [traditionalDrugId])

  if (error) return <div>An Error Occured := {error}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>{drug.product_name}</div>
      <hr />
      <div className='text-white flex flex-col gap-10'>
        <hr />
        <TraditionalDrugsDetailItem drug={drug} />
        <hr />
      </div>
    </div>
  )
}
