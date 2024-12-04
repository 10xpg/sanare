import { DrugsDetailItem } from './DrugsDetailCard'

export const DrugsDetail = () => {
  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Some Drug Name</div>
      <hr />
      <div className='text-white flex flex-col gap-10'>
        <hr />
        <DrugsDetailItem />
        <hr />
      </div>
    </div>
  )
}
