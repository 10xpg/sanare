import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

export const OrthodoxDrugsItem = ({ results, err }) => {
  if (results?._id) {
    return (
      <div className='justify-between text-lg grid grid-cols-[1fr,3fr]'>
        <span className='items-center hover:text-xl hover:text-[#7DD3FC]'>
          <Link to={`/encyclopedia-od-detail/${results._id}`}>{results.name}</Link>
        </span>
        <span className='items-center truncate'>{results.description}</span>
      </div>
    )
  }

  if (err) {
    return (
      <div className='justify-between text-lg grid grid-cols-[1fr,3fr]'>
        <span className='flex gap-3 items-center hover:text-xl hover:text-[#7DD3FC]'>Status</span>
        <span className='flex gap-3 items-center text-red-600'>Drug not found </span>
      </div>
    )
  }

  if (results.length < 1) {
    return (
      <div className='justify-between text-lg grid grid-cols-[1fr,3fr]'>
        <span className='flex gap-3 items-center hover:text-xl hover:text-[#7DD3FC]'>Status</span>
        <span className='flex gap-3 items-center'>search to get results</span>
      </div>
    )
  }
}

export const TraditionalDrugsItem = ({ results, err }) => {
  if (results?._id) {
    return (
      <div className=' justify-between text-lg grid grid-cols-[1fr,3fr] '>
        <span className=' items-center hover:text-xl hover:text-[#7DD3FC] '>
          <Link to={`/encyclopedia-td-detail/${results._id}`}>{results.product_name} </Link>
        </span>
        <span className='items-center truncate'>{results.disease_indications}</span>
      </div>
    )
  }

  if (err) {
    return (
      <div className='justify-between text-lg grid grid-cols-[1fr,3fr]'>
        <span className='flex gap-3 items-center hover:text-xl hover:text-[#7DD3FC]'>Status</span>
        <span className='flex gap-3 items-center text-red-600'>Drug not found </span>
      </div>
    )
  }

  return (
    <div className='justify-between text-lg grid grid-cols-[1fr,3fr]'>
      <span className='flex gap-3 items-center hover:text-xl hover:text-[#7DD3FC]'>Status</span>
      <span className='flex gap-3 items-center'>search to get results</span>
    </div>
  )
}

OrthodoxDrugsItem.propTypes = {
  results: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  err: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

TraditionalDrugsItem.propTypes = {
  results: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  err: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}
