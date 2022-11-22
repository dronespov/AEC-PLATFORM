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
            <div className='w-100'>
              <h2 className='mb-3'>Verify Your Email Address</h2>
              <h5 className='mb-2'>
                Before proceeding, please check your email for a verification link. 
              </h5>
              <p>If didn't receive the verification email? <span className='btn-link' onClick={resendEmail}>Click here</span> and we will send another one your way. </p>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default NotVerified
