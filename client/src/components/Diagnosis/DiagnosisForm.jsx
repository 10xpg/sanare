import { faPaperclip, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export const DiagnosisForm = () => {
  return (
    <div className='bg-black text-white font-mono  px-32 '>
      <div className='font-medium uppercase text-2xl pb-6'>Diagnosis</div>
      <form className='text-[#999EA4] '>
        <div className='flex flex-col gap-10  py-3'>
          <label className='flex-1'>
            Medical History
            <br />
            <input type='text' placeholder='Type here' className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black' />
          </label>
          <label className='flex-1'>
            Allergies
            <br />
            <input type='text' placeholder='Type here' className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black' />
          </label>
          <label className='flex-1'>
            Symptoms
            <br />
            <input type='text' placeholder='Type here' className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black' />
          </label>
          <label className='flex-1'>
            Current Medications
            <br />
            <input type='text' placeholder='Type here' className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black' />
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
                  className='file:w-1/2 file:h-14 file:rounded-xl placeholder-[#999EA4] text-[#999EA4] pt-2 file:mr-4 file:py-2 file:pl-8  hover:file:bg-[#999EA4]
'
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
              />
            </label>
            <button>
              <FontAwesomeIcon icon={faPlus} className='text-[#999EA4] text-3xl ' />
            </button>
          </span>
        </div>
        <div className='flex justify-end py-20'>
          <button className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white '>
            <Link to='/recommend'>Submit</Link>
          </button>
        </div>
      </form>
    </div>
  )
}
