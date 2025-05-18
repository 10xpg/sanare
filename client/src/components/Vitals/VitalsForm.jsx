import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/client'

export const VitalsForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.state.patientId)

  const init = { patient: location.state.patientId, pulse_rhythm: 'regular', pulse_strength: 'weak', breathing_difficulty: false }
  const [vitalsForm, setVitalsForm] = useState(init)

  const handleVitalsFormSubmit = async (e) => {
    e.preventDefault()
    const res = await api.post('/vitals', vitalsForm, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: { patient_id: location.state.patientId }
    })
    console.log(res.data)
    navigate('/diagnosis', { state: { patientId: res.data.patient, vitalsId: res.data._id } })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setVitalsForm({ ...vitalsForm, [name]: value })
  }

  console.log(vitalsForm)

  return (
    <div className='bg-black text-white font-mono pt-44 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Vitals Collection</div>
      <form className='text-[#999EA4] space-y-10' onSubmit={handleVitalsFormSubmit}>
        <div className='flex gap-16 items-center py-3'>
          <label className='flex-1'>
            Temperature
            <br />
            <input
              type='number'
              required
              placeholder='Celcius'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='temperature'
              value={vitalsForm.temperature}
              onChange={handleChange}
            />
          </label>
          <label className='flex-1'>
            Heart Rate
            <br />
            <input
              type='number'
              required
              placeholder='beats/min'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='heart_rate'
              value={vitalsForm.heart_rate}
              onChange={handleChange}
            />
          </label>
          <label className='flex-1'>
            Weight
            <br />
            <input
              type='number'
              required
              placeholder='Kg'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='weight'
              value={vitalsForm.weight}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='flex gap-10 items-center py-3'>
          <label className='flex-1'>
            Systolic BP
            <br />
            <input
              type='number'
              required
              placeholder='mmHg'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='systolic_bp'
              value={vitalsForm.systolic_bp}
              onChange={handleChange}
            />
          </label>
          <label className='flex-1'>
            Diastolic BP
            <br />
            <input
              type='number'
              required
              placeholder='mmHg'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='diastolic_bp'
              value={vitalsForm.diastolic_bp}
              onChange={handleChange}
            />
          </label>
          <label className='flex-1'>
            Pulse Rhythm
            <br />
            <select
              type='text'
              required
              className='w-full h-10 rounded placeholder-[#999EA4] text-black pl-3 outline-black'
              name='pulse_rhythm'
              value={vitalsForm.pulse_rhythm}
              onChange={handleChange}
            >
              <option value='' disabled>
                Select
              </option>
              <option value='regular'>Regular</option>
              <option value='irregular'>Irregular</option>
            </select>
          </label>
          <label className='flex-1'>
            Pulse Strength
            <br />
            <select
              type='text'
              required
              className='w-full h-10 rounded placeholder-[#999EA4]  text-black pl-3 outline-black'
              name='pulse_strength'
              value={vitalsForm.pulse_strength}
              onChange={handleChange}
            >
              <option value='' disabled>
                Select
              </option>
              <option value='weak'>Weak</option>
              <option value='moderate'>Moderate</option>
              <option value='strong'>Strong</option>
            </select>
          </label>
        </div>
        <div className='flex gap-10 items-center pt-3 pb-24'>
          <label className='flex-1'>
            Respiratory Rate
            <br />
            <input
              type='number'
              required
              placeholder='breaths/min'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='respiratory_rate'
              value={vitalsForm.respiratory_rate}
              onChange={handleChange}
            />
          </label>
          <label className='flex-1'>
            Oxygen Saturation
            <br />
            <input
              type='number'
              required
              placeholder='%'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              name='oxygen_saturation'
              value={vitalsForm.oxygen_saturation}
              onChange={handleChange}
            />
          </label>
          <label className='flex-1'>
            Breathing Difficulty
            <br />
            <select
              type='text'
              required
              className='w-full h-10 rounded placeholder-[#999EA4] text-black pl-3 outline-black'
              name='breathing_difficulty'
              value={vitalsForm.breathing_difficulty}
              onChange={handleChange}
            >
              <option value='' disabled>
                Select
              </option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </label>
        </div>
        <div className='flex justify-end py-20'>
          <button
            className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#4D9245] hover:text-white '
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
