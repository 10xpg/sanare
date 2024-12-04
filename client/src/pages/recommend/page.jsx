import { RecommendationTool } from '../../components/Recommend'
import Layout from '../../Layout'

export default function Recommend() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <RecommendationTool />
        </div>
      </Layout>
    </div>
  )
}
