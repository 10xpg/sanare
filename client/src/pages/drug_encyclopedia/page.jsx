import { Drugs } from '../../components/Encyclopedia'
import { DrugsSearch } from '../../components/Encyclopedia/DrugsSearch'
import Layout from '../../Layout'

export default function Encyclopedia() {
  return (
    <div>
      <Layout>
        <div className='bg-black min-h-screen'>
          <DrugsSearch />
          <Drugs />
        </div>
      </Layout>
    </div>
  )
}
