import { PatientSummary } from '../../components/Patient_Summary'
import Layout from '../../Layout'

export default function Report() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <PatientSummary />
        </div>
      </Layout>
    </div>
  )
}
