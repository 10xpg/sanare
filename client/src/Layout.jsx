import { PropTypes } from 'prop-types'
import { Footer, Header, SideBar } from './components/Layout'

export default function Layout({ children }) {
  return (
    <div className='bg-[#A7A9AB]'>
      <Header />
      <div className='flex'>
        <SideBar />
        <main className='flex-1'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element.isRequired])
}
