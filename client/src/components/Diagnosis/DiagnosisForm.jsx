import { faPaperclip, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/client'

export const DiagnosisForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const patientId = location?.state?.patientId
  const vitalsId = location?.state?.vitalsId

  const tk = localStorage.getItem('access')
  const payload = tk && jwtDecode(tk)
  console.log(payload)

  const init = useMemo(
    () => ({
      patient: patientId,
      doctor: '',
      vitals: vitalsId
    }),
    [patientId, vitalsId]
  )

  const [doctor, setDoctor] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await api.get(`user/identification/${payload.sub}`)
        setDoctor(res.data)
        init.doctor = res.data._id
      } catch (error) {
        setError(error)
      }
    }
    fetchDoctorDetails()
  }, [payload.sub, init])

  const [diagnosisForm, setDiagnosisForm] = useState(init)
  const [uploads, setUploads] = useState([])

  const handleDiagnosisFormChange = (e) => {
    const { value, name } = e.target
    setDiagnosisForm({ ...diagnosisForm, [name]: value })
  }

  const handleFilesChange = (e) => {
    const { files, name } = e.target
    console.log(name)
    setUploads([...uploads, Array.from(files)])
  }

  const handleDiagnosisFormSubmit = async (e) => {
    e.preventDefault()
    const filesFormData = new FormData()
    uploads.flat().forEach((file) => {
      filesFormData.append('files', file)
    })

    const [form, files] = await Promise.all([
      (api.post(
        '/diagnosis',
        {
          ...diagnosisForm,
          condition: diagnosisForm.condition
            .split(',')
            .map((c) => c.trim())
            .filter((c) => c.length > 0)
        },
        {
          headers: { 'Content-Type': 'application/json' },
          params: {
            patient_id: patientId,
            doctor_id: diagnosisForm.doctor,
            vitals_id: vitalsId
          }
        }
      ),
      api.post('/diagnosis/files', filesFormData, { headers: { 'Content-Type': 'multipart/form-data' } }))
    ])
    console.log(files)

    navigate('/recommend', {
      state: {
        patientId: patientId,
        doctorId: diagnosisForm.doctor,
        vitalsId: vitalsId,
        diagnosisId: form.data._id
      }
    })
  }

  if (error) return <div>{`An Error Occured ==> ${error}`}</div>

  console.log(diagnosisForm)
  console.log('uploads: ', uploads)
  console.log(doctor)

  return (
    <div className='bg-black text-white font-mono  px-32 '>
      <div className='font-medium uppercase text-2xl pb-6'>Diagnosis</div>
      <form className='text-[#999EA4] ' onSubmit={handleDiagnosisFormSubmit}>
        <div className='flex flex-col gap-10  py-3'>
          <label className='flex-1'>
            Medical History
            <br />
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='medical_history'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.medical_history}
            />
          </label>
          <label className='flex-1'>
            Allergies
            <br />
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='allergies'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.allergies}
            />
          </label>
          <label className='flex-1'>
            Symptoms
            <br />
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='symptoms'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.symptoms}
            />
          </label>
          <label className='flex-1'>
            Current Medications
            <br />
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='current_medications'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.current_medications}
            />
          </label>

          <span className='flex gap-4 items-center'>
            <label className='flex-1'>
              Upload Diagnostic Tests | Images
              <br />
              <div className='relative flex items-center '>
                <FontAwesomeIcon icon={faPaperclip} className='absolute left-3 text-black ' size='lg' />
                <input
                  type='file'
                  multiple
                  className='file:w-1/2 file:h-14 file:rounded-xl placeholder-[#999EA4] text-[#999EA4] pt-2 file:mr-4 file:py-2 file:pl-8  hover:file:bg-[#999EA4]'
                  name='files'
                  onChange={handleFilesChange}
                />
              </div>
            </label>
          </span>

          <label className='flex-1'>
            Notes
            <br />
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-16 rounded placeholder-[#999EA4] text-black  p-3 outline-black'
              name='notes'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.notes}
            />
          </label>

          <span className='flex gap-4 items-center '>
            <label className='flex-1'>
              Condition(s)
              <br />
              <input
                type='text'
                placeholder='Type here'
                required
                className='w-full h-14 rounded placeholder-[#999EA4] text-black p-3 outline-black'
                name='condition'
                onChange={handleDiagnosisFormChange}
                value={diagnosisForm.condition}
              />
            </label>
            <button>
              <FontAwesomeIcon icon={faPlus} className='text-[#999EA4] text-3xl ' />
            </button>
          </span>
        </div>
        <div className='flex justify-end py-20'>
          <button
            className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white '
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
