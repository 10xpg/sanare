import { faCircleCheck, faForward, faHospitalUser, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/client'
import { PropTypes } from 'prop-types'
import { parseISO } from 'date-fns'

export const Dashboard = ({ payload, doc }) => {
  const [totalPatients, setTotalPatients] = useState({})
  const [recommendationsMade, setRecommendationsMade] = useState({})
  const [seen, setSeen] = useState({})
  const [ods, setOds] = useState([])
  const [tds, setTds] = useState([])
  const [recentPatients, setRecentPatients] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!doc?._id) return
    const fetchInfo = async () => {
      const [patients, recommendations, lastSeen] = await Promise.all([
        api.get('/patient/count'),
        api.get('/recommendation/count', { params: { doctor_id: doc._id } }),
        api.get('/report/last-seen', { params: { doctor_id: doc._id } })
      ])
      setTotalPatients(patients.data)
      setRecommendationsMade(recommendations.data)
      setSeen(lastSeen.data)
      setError(null)
    }
    fetchInfo()
  }, [doc._id])

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const [ods, tds] = await Promise.all([
          api.get('/encyclopedia/orthodox/all', {
            params: {
              limit: 5,
              last_id: null
            }
          }),
          api.get('/encyclopedia/traditional/all', {
            params: {
              limit: 5
            }
          })
        ])
        setOds(ods.data.data)
        setTds(tds.data)
      } catch (err) {
        setError(err)
      }
    }
    fetchDrugs()
  }, [])

  useEffect(() => {
    const fetchRecentPatients = async () => {
      try {
        const reports = await api.get('/report/all')
        const transform = await Promise.all(
          reports.data.map(async (report) => {
            const [doctor, patient, diagnosis] = await Promise.all([
              api.get(`/user/${report.doctor}`),
              api.get(`/patient/${report.patient}`),
              api.get(`/diagnosis/${report.diagnosis}`)
            ])
            return { ...report, doctor: doctor.data, patient: patient.data, diagnosis: diagnosis.data }
          })
        )
        setRecentPatients(
          transform
            .toReversed()
            .slice(0, 5)
            .filter((r) => r.doctor.username === payload.sub)
        )
      } catch (error) {
        setError(error)
      }
    }
    fetchRecentPatients()
  }, [payload.sub])

  if (error) return <div>{`An Error Occured ==> ${error}`}</div>

  return (
    <div className='text-white px-10 py-2 w-full grid grid-cols-3 grid-rows-3 gap-6'>
      <div className='flex justify-center items-center gap-6 bg-[#181819] border border-[#212021] rounded-2xl p-10 w-11/12'>
        <div>
          <FontAwesomeIcon icon={faUser} className='text-[#4D9245] text-5xl' />
        </div>
        <div className='flex flex-col gap-2 tracking-widest'>
          <div className='text-3xl'>{totalPatients.patients}</div>
          <div className='text-xl text-[#A7A9AB] tracking-wider'>Total Patients</div>
        </div>
      </div>
      <div className='flex justify-center items-center gap-6 bg-[#181819] border border-[#212021] rounded-2xl p-10 w-11/12'>
        <div>
          <FontAwesomeIcon icon={faCircleCheck} className='text-[#4D9245] text-5xl' />
        </div>
        <div className='flex flex-col gap-2 tracking-widest '>
          <div className='text-3xl'>{recommendationsMade.recommendations}</div>
          <div className='text-xl text-[#A7A9AB]  w-1/2'>Recommendations Made</div>
        </div>
      </div>
      <div className='flex justify-center items-center gap-6 bg-[#181819] border border-[#212021] rounded-2xl p-10 w-11/12'>
        <div>
          <FontAwesomeIcon icon={faHospitalUser} className='text-[#4D9245] text-5xl' />
        </div>
        <div className='flex flex-col gap-2 tracking-widest '>
          <div className='text-3xl'>{seen.last_seen}</div>
          <div className='text-xl text-[#A7A9AB]  w-11/12'>Patient&apos;s Seen This Week</div>
        </div>
      </div>
      <div className='col-span-3 grid grid-cols-2 gap-8 tracking-wide mr-7'>
        <div className='p-10 bg-[#181819] border border-[#212021] rounded-2xl '>
          <div className='text-[#4D9245] font-bold flex justify-between'>
            <div className='uppercase pb-2'>Orthodox Drugs (15.2K)</div>
            <div className='text-base'>
              <Link to='/encyclopedia'>
                View All <FontAwesomeIcon icon={faForward} />
              </Link>
            </div>
          </div>
          {ods.map((drug) => (
            <div className='text-base text-[#A7A9AB] uppercase px-4 py-1' key={drug._id}>
              {drug.name}
            </div>
          ))}
        </div>
        <div className='p-10 bg-[#181819] border border-[#212021] rounded-2xl'>
          <div className='text-[#4D9245] font-bold flex justify-between'>
            <div className='uppercase pb-2'> Traditional Drugs (955)</div>
            <div className='text-base'>
              <Link to='/encyclopedia'>
                View All <FontAwesomeIcon icon={faForward} />
              </Link>
            </div>
          </div>
          {tds.map((drug) => (
            <div className='text-base text-[#A7A9AB] px-4 py-1' key={drug._id}>
              {drug.product_name}
            </div>
          ))}
        </div>
      </div>
      <div className='col-span-3 bg-[#181819] border border-[#212021] rounded-2xl p-10 mr-7'>
        <div className='text-[#4D9245] font-bold flex justify-between'>
          <div className='uppercase pb-2'> Patients Recently Attended To </div>
          <div className='text-base'>
            <Link to='/history'>
              View All <FontAwesomeIcon icon={faForward} />
            </Link>
          </div>
        </div>
        {recentPatients.map((record) => (
          <div key={record._id} className='grid grid-cols-4 text-[#A7A9AB] py-1'>
            <div>{`${record.patient.first_name} ${record.patient.last_name}`}</div>
            <div>{parseISO(record.created_at).toLocaleTimeString()}</div>
            <div>{parseISO(record.created_at).toLocaleDateString()}</div>
            <div className='text-[#4D9245] hover:underline'>
              <Link to={`/patient-summary/${record._id}`}>View Patient Summary</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  payload: PropTypes.object,
  doc: PropTypes.object
}
