import { Link } from 'react-router-dom'

export const VitalsForm = () => {
  return (
    <div className='bg-black text-white font-mono pt-44 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Vitals Collection</div>
      <form className='text-[#999EA4] space-y-10'>
        <div className='flex gap-16 items-center py-3'>
          <label className='flex-1'>
            Temperature
            <br />
            <input
              type='text'
              required
              placeholder='Celcius'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
            />
          </label>
          <label className='flex-1'>
            Heart Rate
            <br />
            <input
              type='text'
              required
              placeholder='beats/min'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
            />
          </label>
          <label className='flex-1'>
            Weight
            <br />
            <input
              type='text'
              required
              placeholder='Kg'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
            />
          </label>
        </div>
        <div className='flex gap-10 items-center py-3'>
          <label className='flex-1'>
            Systolic BP
            <br />
            <input
              type='text'
              required
              placeholder='mmHg'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
            />
          </label>
          <label className='flex-1'>
            Diastolic BP
            <br />
            <input type='' required placeholder='mmHg' className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black' />
          </label>
          <label className='flex-1'>
            Pulse Rhythm
            <br />
            <select type='text' required className='w-full h-10 rounded placeholder-[#999EA4] text-black pl-3 outline-black'>
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
            <select type='text' required className='w-full h-10 rounded placeholder-[#999EA4]  text-black pl-3 outline-black'>
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
              type='text'
              required
              placeholder='breaths/min'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
            />
          </label>
          <label className='flex-1'>
            Oxygen Saturation
            <br />
            <input
              type='text'
              required
              placeholder='%'
              className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
            />
          </label>
          <label className='flex-1'>
            Breathing Difficulty
            <br />
            <select type='text' required className='w-full h-10 rounded placeholder-[#999EA4] text-black pl-3 outline-black'>
              <option value='' disabled>
                Select
              </option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </label>
        </div>
        <div className='flex justify-end py-20'>
          <button className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white '>
            <Link to='/diagnosis'>Submit</Link>
          </button>
        </div>
      </form>
    </div>
  )
}
