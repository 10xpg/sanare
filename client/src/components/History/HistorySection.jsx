import { HistoryHeader } from './HistoryHeader'
import { HistoryItem } from './HistoryListCard'

export const HistorySection = () => {
  return (
    <div className='bg-black text-white font-mono pt-16 px-32'>
      <div className='font-medium uppercase text-2xl pb-6'>History</div>

      <table className='text-white text-center w-full border-collapse table-auto '>
        <thead className=''>
          <HistoryHeader />
        </thead>
        <tbody>
          <HistoryItem />
        </tbody>
      </table>
    </div>
  )
}
