// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/client'
import { PatientSearch } from './PatientSearch'

export const PatientForm = () => {
  const init = {
    sex: 'male',
    emergency_contacts: [
      {
        name: '',
        relationship: '',
        phone: ''
      }
    ]
  }

  const navigate = useNavigate()
  const [patientForm, setPatientForm] = useState(init)

  const handleChange = (e) => {
    const { name, value } = e.target
    setPatientForm({ ...patientForm, [name]: value })
  }

  const handleEmergencyContactChange = (index, name, value) => {
    setPatientForm((prev) => {
      const updatedContacts = [...prev.emergency_contacts]
      updatedContacts[index] = {
        ...updatedContacts[index],
        [name]: value
      }
      return {
        ...prev,
        emergency_contacts: updatedContacts
      }
    })
  }

  const handlePatientFormSubmit = async (e) => {
    e.preventDefault()
    const res = await api.post('/patient', patientForm, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(res.data)
    navigate('/vitals', { state: { patientId: res.data._id } })
  }

  return (
    <div className='bg-black text-white font-mono pt-32 px-32'>
      <PatientSearch />
      <div className='font-medium uppercase text-2xl pb-6'>Patient&apos;s Form</div>
      <form className='text-[#999EA4]  space-y-10' onSubmit={handlePatientFormSubmit}>
        <fieldset>
          <legend className='uppercase underline'>Patient Information</legend>
          <div className='flex gap-16 items-center py-3'>
            <label className='flex-1'>
              First Name
              <br />
              <input
                name='first_name'
                type='text'
                placeholder='John'
                value={patientForm.first_name}
                onChange={handleChange}
                required
                className='w-full h-10 rounded placeholder:text-[#999EA4] text-black p-3 outline-black'
              />
            </label>
            <label className='flex-1'>
              Last Name
              <br />
              <input
                name='last_name'
                type='text'
                placeholder='Doe'
                value={patientForm.last_name}
                onChange={handleChange}
                required
                className='w-full h-10 rounded  placeholder-[#999EA4] text-black p-3 outline-black'
              />
            </label>
          </div>
          <div className='flex gap-10 items-center py-3'>
            <label className='flex-1'>
              Date of Birth
              <br />
              <input
                name='dob'
                type='date'
                value={patientForm.dob}
                onChange={handleChange}
                required
                className='w-full h-10 rounded  placeholder-[#999EA4] text-black p-3 outline-black'
              />
            </label>
            <label>
              Sex
              <br />
              <select
                name='sex'
                placeholder='Sex'
                value={patientForm.sex}
                onChange={handleChange}
                required
                className=' h-10 rounded placeholder:text-[#999EA4] text-black p-3 outline-black'
              >
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
              <input
                name='phone'
                type='tel'
                value={patientForm.phone}
                onChange={handleChange}
                required
                className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              />
            </label>
          </div>
          <div className='flex gap-10 items-center pt-3 pb-6'>
            <label className='flex-1'>
              Email
              <br />
              <input
                name='email'
                type='email'
                value={patientForm.email}
                onChange={handleChange}
                required
                className='w-10/12 h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              />
            </label>
            <label className='flex-1'>
              Address
              <br />
              <input
                name='address'
                type='text'
                value={patientForm.address}
                onChange={handleChange}
                required
                className='w-full h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
              />
            </label>
          </div>
        </fieldset>
        {patientForm.emergency_contacts.map((contact, index) => (
          <fieldset key={index}>
            <legend className='uppercase underline'>Emergency Contact(s)</legend>
            <div className='flex gap-16 items-center py-3 pb-6'>
              <label className='flex-1'>
                Full Name
                <br />
                <input
                  type='text'
                  required
                  className='w-10/12 h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
                  name='name'
                  value={contact.name}
                  onChange={(e) => {
                    handleEmergencyContactChange(index, e.target.name, e.target.value)
                  }}
                />
              </label>
              <label className='flex-1'>
                Relationship
                <br />
                <input
                  type='text'
                  required
                  className='w-10/12 h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
                  name='relationship'
                  value={contact.relationship}
                  onChange={(e) => {
                    handleEmergencyContactChange(index, e.target.name, e.target.value)
                  }}
                />
              </label>
              <label className='flex-1'>
                Phone Number
                <br />
                <input
                  type='tel'
                  required
                  className='w-10/12 h-10 rounded placeholder-[#999EA4] text-black p-3 outline-black'
                  name='phone'
                  value={contact.phone}
                  onChange={(e) => {
                    handleEmergencyContactChange(index, e.target.name, e.target.value)
                  }}
                />
              </label>
            </div>
            {/* <button type='button' className='text-white font-normal font-mono text-sm border rounded px-4 py-2 hover:bg-[#999EA4]'>
            <FontAwesomeIcon icon={faPlus} /> {' Add Contact'}
          </button> */}
          </fieldset>
        ))}

        <div className='flex justify-end py-20'>
          <button
            type='submit'
            className=' bg-white text-black w-2/12 px-4 py-2 rounded-3xl text-center  hover:bg-[#999EA4] hover:text-white '
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
