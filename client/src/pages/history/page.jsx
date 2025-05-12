import { HistorySection } from '../../components/History/HistorySection'
import Layout from '../../Layout'

export default function History() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <HistorySection />
        </div>
      </Layout>
    </div>
  )
}
