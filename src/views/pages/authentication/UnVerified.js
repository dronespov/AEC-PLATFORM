import { Link } from 'react-router-dom'
import { Row, Col, CardBody, Card, Label, Input, Spinner } from 'reactstrap'

import { OpenNotification } from '@src/views/components/Helper'

import { Service } from '@src/services/Service'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const NotVerified = () => {

  const resendEmail = () => {
    return MySwal.fire({
      title: 'Resend verification email?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Resend',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {

        //Api call
        Service.post({
          url: `/email/verification`
        })
          .then((response) => {
            if (response.status === "error") {
              OpenNotification("error", "Oops", response.message)
              return false
            } else {
              OpenNotification("success", "Success!", 'Email resent. please check your email for a verification link!')
            }
          })
      }
    })
  }

  return (
    <Row className='auth-inner'>
      <Col lg='12' sm='12'>
        <Card className='w-100'>
          <CardBody className='px-5 py-5'>
            <div className='text-center mb-3'>
              <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                <img src={require('../../../assets/images/drone-images/logo.png').default} />
              </Link>
            </div>
            <div className='w-100'>
              <h2 className='mb-3'>This link in invalid or expired. Please click here to reset your password.</h2>
            </div>
          </CardBody>
        </Card>
      </Col >
    </Row >
  )
}
export default NotVerified
