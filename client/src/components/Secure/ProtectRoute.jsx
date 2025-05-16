import { Navigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { jwtDecode } from 'jwt-decode'

export default function ProtectRoute({ children }) {
  // console.log(jwtDecode('a.b.c'))
  const access = jwtDecode(localStorage.getItem('access'))
  if (!access) return <Navigate to='/login' />
  return children
}

ProtectRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}
