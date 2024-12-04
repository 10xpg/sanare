import { DrugsHeader } from './DrugsHeader'
import { DrugsItem } from './DrugsListCard'

export const Drugs = () => {
  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>Drugs Encyclopedia</div>
      <hr />
      <div className='text-white flex flex-col gap-10'>
        <hr />
        <DrugsHeader />
        <hr />
        <DrugsItem />
        <hr />
      </div>
    </div>
  )
}
