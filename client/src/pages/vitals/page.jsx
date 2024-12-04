import { VitalsForm } from '../../components/Vitals/VitalsForm'
import Layout from '../../Layout'

export default function Vitals() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <VitalsForm />
        </div>
      </Layout>
    </div>
  )
}
