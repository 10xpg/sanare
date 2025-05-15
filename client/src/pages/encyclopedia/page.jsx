import { Drugs } from '../../components/Encyclopedia'
import Layout from '../../Layout'

export default function Encyclopedia() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <Drugs />
        </div>
      </Layout>
    </div>
  )
}
