import { PropTypes } from 'prop-types'

export const OrthodoxRecommender = ({ getDrugs, drugs, state }) => {
  const handleChange = (e) => {
    const { name, selectedOptions } = e.target
    const vals = Array.from(selectedOptions).map((drug) => drug.value)
    state.setOds({ ...state.ods, [name]: vals })
  }

  const handleGetDrugs = () => {
    getDrugs()
  }

  console.log(state.ods)
  console.log(drugs)

  console.dir(`drugs length: ${drugs}`, { depth: null })

  return (
    <div className='text-xl pt-10'>
      <label className='flex items-center justify-between pr-10'>
        Orthodox Drugs:
        {drugs.length > 0 ? (
          <select
            id='recommended-td'
            name='recommended_orthodox_drug'
            value={state.ods.recommended_orthodox_drug}
            onChange={handleChange}
            multiple
            className='p-3 w-8/12 h-auto rounded-xl placeholder-[#999EA4] text-center text-black  outline-black'
          >
            <option value='' disabled className='border-b-2'>
              ---Orthodox Drugs---
            </option>

            {drugs
              .flat()
              .filter((d) => d !== null)
              .map((d) => (
                <option key={d._id} value={d.drug_name} className='p-2'>
                  {d.drug_name}
                </option>
              ))}
          </select>
        ) : (
          <button
            className='bg-[#1ED345] w-8/12 h-14 rounded-lg  hover:bg-[#589304] duration-300 hover:font-medium '
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

OrthodoxRecommender.propTypes = {
  getDrugs: PropTypes.func,
  drugs: PropTypes.array,
  state: PropTypes.object
}
