import { PropTypes } from 'prop-types'

const START = 1

export const OrthodoxDrugsDetailItem = ({ drug }) => {
  console.log(drug)
  const drugSub = Object.entries(drug).slice(START)
  console.log(drugSub)

  return drugSub.map((d, index) => (
    <div className='grid grid-cols-[1fr, 3fr] justify-between text-lg' key={index}>
      <span className='flex gap-3 items-center'>{d[0]}:</span>
      <span className='flex gap-3 items-center'>{d[1]}</span>
    </div>
  ))
}

export const TraditionalDrugsDetailItem = ({ drug }) => {
  const drugSub = Object.entries(drug).slice(START)

  return drugSub.map((d, index) => (
    <div className='grid grid-cols-[1fr, 3fr] justify-between text-lg' key={index}>
      <span className='flex gap-3 items-center'>{d[0]}:</span>
      <span className='flex gap-3 items-center'>{d[1]}</span>
    </div>
  ))
}

TraditionalDrugsDetailItem.propTypes = {
  drug: PropTypes.object
}

OrthodoxDrugsDetailItem.propTypes = {
  drug: PropTypes.object
}
