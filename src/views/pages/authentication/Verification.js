import { useState, useEffect, Fragment } from 'react'
import classnames from 'classnames'
import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, CardBody, Card, Form, FormGroup, Label, Input, Spinner } from 'reactstrap'

import Config from '@src/configs/config.json'
import { Service } from '@src/services/Service'
import { OpenNotification } from '@src/views/components/Helper'

import logo from '../../../assets/images/drone-images/logo.png'

import '@styles/base/pages/page-auth.scss'

const Verification = () => {

  const { token } = useParams()
  const history = useHistory()
  const [buttonDisable, setButtonDisable] = useState(false)

  const { register, errors, handleSubmit } = useForm()

  const processRequest = () => {

    if (typeof token === undefined) {
      OpenNotification('error', 'Oops!', 'Invalid Token!')
      history.push('/')
      return false
    }

    if (token !== '') {
      setButtonDisable(true)
      Service.post({
        url: 'user/verifyEmail',
        body: JSON.stringify({
          code: token
        })
      })
        .then(response => {
          setButtonDisable(false)
          if (response.status === 'error') {
            OpenNotification('error', 'Oops!', response.data.message)

          } else {
            OpenNotification('success', 'Success!', 'Account has ben verified successfully. Please login and start to explore!')
          }
          history.push('/')
        })
        .catch(err => {
          setButtonDisable(false)
          OpenNotification('error', 'Oops!', 'Something went wrong!')
          history.push('/')
        })

    } else {
      OpenNotification('error', 'Oops!', 'Invalid Token!')
      history.push('/')
    }
  }

  useEffect(() => {
    processRequest()
  }, [])

  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
          <Col className='d-flex align-items-center px-5 py-5' lg='12' sm='12'>
            <Card className='w-100 h-100 text-center'>
              <CardBody className='d-flex flex-column align-items-center justify-content-center'>
                <div>
                  <img src={logo} width={200} />
                </div>
                <h4 className='mt-3 mb-3'>Please wait while we are processing your request..</h4>
                <Spinner />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default Verification
