import { DrugsDetail } from '../../components/Encyclopedia'
import Layout from '../../Layout'

export default function EncyclopediaDetail() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <DrugsDetail />
        </div>
      </Layout>
    </div>
  )
}
