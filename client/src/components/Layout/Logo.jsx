import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Logo = () => {
  return (
    <div className='text-white uppercase font-medium font-mono text-3xl tracking-widest '>
      Sanare
      <FontAwesomeIcon icon={faLeaf} className='px-2 text-[#589304]' />
    </div>
  )
}
