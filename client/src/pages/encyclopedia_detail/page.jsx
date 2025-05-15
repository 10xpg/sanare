import { OrthodoxDrugsDetail, TraditionalDrugsDetail } from '../../components/Encyclopedia'
import Layout from '../../Layout'

export function OrthodoxEncyclopediaDetail() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <OrthodoxDrugsDetail />
        </div>
      </Layout>
    </div>
  )
}

export function TraditionalEncyclopediaDetail() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <TraditionalDrugsDetail />
        </div>
      </Layout>
    </div>
  )
}
