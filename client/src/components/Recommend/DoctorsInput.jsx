import { PropTypes } from 'prop-types'

export const DoctorsRecommendation = ({ rec }) => {
  return (
    <div className='text-xl'>
      <label className='flex items-center justify-between pr-10'>
        Doctor&apos;s Recommendation:
        <input
          type='text'
          className='p-3 w-8/12 h-24 rounded-xl placeholder-[#999EA4] text-black  outline-black'
          placeholder='Type here'
          name='recommended_by_doctor'
          onChange={rec.handleDocRec}
          value={rec.docRec}
        />
      </label>
    </div>
  )
}

DoctorsRecommendation.propTypes = {
  rec: PropTypes.object
}
