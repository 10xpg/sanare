export const PatientInfo = () => {
  return (
    <div>
      <form className='space-y-10'>
        <span className='flex justify-between'>
          <label>
            Patient id:
            <div></div>
          </label>
          <label>
            First Name:
            <div></div>
          </label>
          <label>
            Last Name:
            <div></div>
          </label>
        </span>
        <span className='flex justify-between'>
          <label>
            Sex:
            <div></div>
          </label>
          <label>
            Age:
            <div></div>
          </label>
          <label>
            Phone:
            <div></div>
          </label>
        </span>
        <span className='flex justify-between'>
          <label>
            Email:
            <div></div>
          </label>
          <label>
            Address:
            <div></div>
          </label>
        </span>
      </form>
    </div>
  )
}
