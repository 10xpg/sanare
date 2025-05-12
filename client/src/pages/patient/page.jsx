import { PatientForm } from '../../components/Patient'
import Layout from '../../Layout'

export default function Patient() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          {/* <PatientSearch /> */}
          <PatientForm />
        </div>
      </Layout>
    </div>
  )
}
