import { HistoryHeader } from './HistoryHeader'
import { HistoryItem } from './HistoryListCard'

export const HistorySection = () => {
  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>History</div>
      <hr />
      <div className='text-white flex flex-col gap-10'>
        <hr />
        <HistoryHeader />
        <hr />
        <HistoryItem />
        <hr />
      </div>
    </div>
  )
}
