import { WelcomeMessage } from '../../components/Home/Greeting'
import Layout from '../../Layout'

export default function Home() {
  return (
    <div>
      <Layout>
        <div className='min-h-screen bg-black'>
          <WelcomeMessage />
        </div>
      </Layout>
    </div>
  )
}
