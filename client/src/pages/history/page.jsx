import { HistorySection } from '../../components/History/HistorySection'
import { PatientSearch } from '../../components/Patient'
import Layout from '../../Layout'

export default function History() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <PatientSearch />
          <HistorySection />
        </div>
      </Layout>
    </div>
  )
}
