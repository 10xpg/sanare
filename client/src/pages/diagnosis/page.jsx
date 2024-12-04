import { DiagnosisForm } from '../../components/Diagnosis'
import { UserNPatient } from '../../components/Diagnosis/UserNPatient'
import Layout from '../../Layout'

export default function Diagnosis() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <UserNPatient />
          <DiagnosisForm />
        </div>
      </Layout>
    </div>
  )
}
