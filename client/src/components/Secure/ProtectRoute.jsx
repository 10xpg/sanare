import { Navigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'

export default function ProtectRoute({ children }) {
  const access = localStorage.getItem('access')
  if (!access) return <Navigate to='/login' />
  return children
}

ProtectRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}
