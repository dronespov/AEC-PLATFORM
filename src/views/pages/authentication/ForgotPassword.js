import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import { CiMail } from "react-icons/ci"
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText } from 'reactstrap'

import Config from '@src/configs/config.json'
import { Service } from '@src/services/Service'
import { OpenNotification } from '@src/views/components/Helper'

import logo from '@src/assets/images/logo/logo.png'

import '@styles/base/pages/page-auth.scss'

const ForgotPassword = () => {
  const [skin, setSkin] = useSkin()
  const [email, setEmail] = useState('')
  const [buttonDisable, setButtonDisable] = useState(false)

  const { register, errors, handleSubmit, setValue } = useForm()

  const onSubmit = (data) => {
    if (email !== '') {
      setButtonDisable(true)
      Service.post({
        url: '/forgotPassword',
        body: JSON.stringify({
          email: email
        })
      })
        .then(response => {
          setButtonDisable(false)
          if (response.status === 'error') {
            OpenNotification('error', 'Oops!', response.data.message)
          } else {
            OpenNotification('success', 'Success!', 'Please check your email for verification link. Please note that the verification link is valid for 15 mins after which it expires. Please make sure to check your spam or other folders in case you do not get it in your inbox.')
            setEmail('')
            setValue('email', '')
          }
        })
        .catch(err => {
          setButtonDisable(false)
          OpenNotification('error', 'Oops!', 'Something went wrong!')
        })

    } else {
      OpenNotification('error', 'Oops!', 'Please enter email address!')
    }
  }

  if (!isUserLoggedIn()) {
    return (
      <div>
        <Row>
          <Col xl="5" lg="5" md="12" sm="12" xs="12" className="bg-left-auth ">
            <div className='d-flex justify-content-center position-rel'>
              <div className="p-1 my-3">
                <Col className='px-xl-3 mx-auto' xs="12" sm='12' md='12' lg='12'>
                  <div className='text-center mb-3'>
                    <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                      <img src={require('../../../assets/images/drone-images/logo.png').default} />
                    </Link>
                  </div>
                  <CardTitle tag='h2' className='font-weight-bold mb-1 text-white'>
                    Forgot Your Password?
                  </CardTitle>
                  <CardText className='mb-2 dr-text-primary'>
                    Enter your email and we'll send you instructions to reset your password
                  </CardText>
                  <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="mb-2">
                      <Label className='form-label dr-text-primary' for='email'>
                        Email<span className='text-danger'>*</span>
                      </Label>
                      <InputGroup className='input-group-merge'>
                        <InputGroupText className="input-left">
                          <CiMail color="#d6b636" size={15} />
                        </InputGroupText>
                        <Input
                          type='email'
                          id='email'
                          name='email'
                          placeholder='example@site.com'
                          onChange={e => setEmail(e.target.value)}
                          className={classnames("input-left py-2 dr-text-primary", { 'is-invalid': errors['email'] })}
                          innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <Button.Ripple type='submit' disabled={buttonDisable} block className="bg-btn py-1">
                      Continue
                    </Button.Ripple>
                  </Form>
                  <p className='text-center mt-2'>
                    <Link to='/login'>
                      <span className='dr-text-primary align-middle'>Return to Sign In</span>
                    </Link>
                  </p>
                </Col>
              </div>
              <footer className='dr-text-primary text-center position-abs3'>©2022. ALL RIGHTS RESERVED</footer>
            </div>
          </Col>
          <Col xl="7" lg="7" md="12" sm="12" xs="12" className="bg-right-signin d-none d-lg-block">
            <div className='p-3 my-3'>
              <h1 className='text-white'>Header Text</h1>
              <p className='dr-text-primary'>Sub Header Text</p>
            </div>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default ForgotPassword
