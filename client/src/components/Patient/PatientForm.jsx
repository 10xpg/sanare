import { Link } from 'react-router-dom'

export const PatientForm = () => {
  return (
    <div className='bg-black text-white font-mono pt-32 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Patient&apos;s Form</div>
      <form className='text-[#999EA4]  space-y-10'>
        <div className='flex gap-16 items-center py-3'>
          <label className='flex-1'>
            First Name
            <br />
            <input
              type='text'
              placeholder='John'
              required
              className='w-full h-10 rounded placeholder:text-[#999EA4] text-black p-3 outline-black'
            />
          </label>
          <label className='flex-1'>
            Last Name
            <br />
            <input
              type='text'
              placeholder='Doe'
              required
              className='w-full h-10 rounded  placeholder-[#999EA4] text-black p-3 outline-black'
            />
          </label>
        </div>
        <div className='flex gap-10 items-center py-3'>
          <label className='flex-1'>
            Date of Birth
            <br />
            <input type='date' required className='w-full h-10 rounded  placeholder-[#999EA4] text-black p-3 outline-black' />
          </label>
          <label>
            Sex
            <br />
            <select required placeholder='Sex' className=' h-10 rounded placeholder:text-[#999EA4] text-black p-3 outline-black'>
              <option value='' disabled>
                Select Sex
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </label>
          <label className='flex-1'>
            Phone Number
            <br />
            <input type='tel' required className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black' />
          </label>
        </div>
        <div className='flex gap-10 items-center pt-3 pb-24'>
          <label className='flex-1'>
            Email
            <br />
            <input type='email' required className='w-10/12 h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black' />
          </label>
          <label className='flex-1'>
            Address
            <br />
            <input type='text' required className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black' />
          </label>
        </div>
        <div className='flex justify-end py-20'>
          <button className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white '>
            <Link to='/vitals'>Create</Link>
          </button>
        </div>
      </form>
    </div>
  )
}
