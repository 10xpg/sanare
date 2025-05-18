import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/client'
import { suppressor } from '../../utils/helpers'

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
      api.post(
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
      api.post('/diagnosis/files', filesFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
    ])

    suppressor(files)
    suppressor(doctor)

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

  return (
    <div className='bg-black text-white font-mono px-20 py-12'>
      <div className='font-medium uppercase text-2xl pb-8'>Diagnosis</div>

      <form className='text-[#999EA4]' onSubmit={handleDiagnosisFormSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Column 1 */}
          <label>
            Medical History
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-16 mt-1 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='medical_history'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.medical_history}
            />
          </label>

          <label>
            Allergies
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-16 mt-1 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='allergies'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.allergies}
            />
          </label>

          <label>
            Symptoms
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-16 mt-1 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='symptoms'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.symptoms}
            />
          </label>

          <label>
            Current Medications
            <input
              type='text'
              placeholder='Type here'
              className='w-full h-16 mt-1 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='current_medications'
              onChange={handleDiagnosisFormChange}
              value={diagnosisForm.current_medications}
            />
          </label>

          {/* Full-width row */}
          <div className='col-span-2 md:col-span-2'>
            <label>
              Upload Diagnostic Tests | Images
              <div className='relative flex items-center mt-1'>
                <FontAwesomeIcon icon={faPaperclip} className='absolute left-3 text-black' size='lg' />
                <input
                  type='file'
                  multiple
                  className='file:w-2/3 file:h-14 file:rounded-xl placeholder-[#999EA4] text-[#999EA4] pt-2 file:mr-4 file:py-2 file:px-8 hover:file:bg-[#999EA4]'
                  name='files'
                  onChange={handleFilesChange}
                />
              </div>
            </label>
          </div>

          <div className='col-span-1 md:col-span-2'>
            <label>
              Notes
              <input
                type='text'
                placeholder='Type here'
                className='w-full h-24 mt-1 rounded placeholder-[#999EA4] text-black p-3 outline-black'
                name='notes'
                onChange={handleDiagnosisFormChange}
                value={diagnosisForm.notes}
              />
            </label>
          </div>

          <div className='col-span-1 md:col-span-2 flex items-end gap-4'>
            <label className='flex-grow'>
              Condition(s)
              <input
                type='text'
                placeholder='Type here'
                required
                className='w-full h-16 mt-1 rounded placeholder-[#999EA4] text-black p-3 outline-black'
                name='condition'
                onChange={handleDiagnosisFormChange}
                value={diagnosisForm.condition}
              />
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className='flex justify-end pt-16'>
          <button
            type='submit'
            className='bg-white text-black w-1/5  px-4 py-2 rounded-3xl hover:bg-[#4D9245] hover:text-white outline-black'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

// TODO: restrict allowable file types
