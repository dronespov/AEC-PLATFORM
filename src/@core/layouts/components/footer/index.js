// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0 footer-copyright'>
      <span className='float-md-left mt-25'>
        <a href='https://Drones POV.io/' className='text-primary' target='_blank' rel='noopener noreferrer'>
          Drones POV LLC.
        </a>{' '}
        <span> Copyright {new Date().getFullYear()}{' '}. All Rights Reserved.</span>
      </span>
    </p>
  )
}

export default Footer
