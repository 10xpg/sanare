import { PropTypes } from 'prop-types'

export const TraditionalRecommender = ({ getDrugs, drugs, state }) => {
  const handleChange = (e) => {
    const { name, selectedOptions } = e.target
    const vals = Array.from(selectedOptions).map((drug) => drug.value)
    state.setTds({ ...state.tds, [name]: vals })
  }

  const handleGetDrugs = () => {
    getDrugs()
  }

  return (
    <div className='text-xl pb-10'>
      <label htmlFor='recommended-td' className='flex items-center justify-between pr-10'>
        Traditional Drugs:
        {drugs.length > 0 ? (
          <>
            <select
              id='recommended-td'
              name='recommended_traditional_drug'
              value={state.tds.recommended_traditional_drug}
              onChange={handleChange}
              multiple
              className='p-3 w-8/12 h-auto rounded-xl placeholder-[#999EA4] text-center text-black  outline-black'
            >
              <option value='' disabled className='border-b-2 '>
                ---Traditional Drugs---
              </option>

              {[...new Map(drugs.flat().map((d) => [d.product_name, d])).values()].map((d) => (
                <option key={d._id} value={d.product_name} className='p-2'>
                  {d.product_name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <button
            className='bg-[#1ED345] w-8/12 h-14 rounded-lg  hover:bg-[#589304] duration-300 hover:font-medium'
            type='button'
            onClick={handleGetDrugs}
          >
            Get Recommendations
          </button>
        )}
      </label>
    </div>
  )
}

TraditionalRecommender.propTypes = {
  getDrugs: PropTypes.func,
  drugs: PropTypes.array,
  state: PropTypes.object
}
