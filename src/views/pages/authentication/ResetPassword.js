import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { useForm } from 'react-hook-form'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, InputGroup, Button } from 'reactstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Config from '@src/configs/config.json'
import { Service } from '@src/services/Service'
import { OpenNotification } from '@src/views/components/Helper'
import PasswordStrengthBar from 'react-password-strength-bar'

import logo from '@src/assets/images/logo/logo.png'

import '@styles/base/pages/page-auth.scss'

const ResetPassword = ({ match }) => {

  const token = match.params.token
  const history = useHistory()
  const [skin, setSkin] = useSkin()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [buttonDisable, setButtonDisable] = useState(false)

  const LoginSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, , and must be atleast 8 characters long without any spaces"
      ),
    cpassword: yup.string()
      .required('Please enter your confirm password')
      .oneOf([yup.ref('newPassword'), null], 'Password and confirm password do not match. Please try again')
  })

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(LoginSchema)
  })

  const onSubmit = (data) => {

    if (typeof token === 'undefined') {
      OpenNotification('error', 'Oops!', 'Invalid Token!')
      history.push('/login')
      return false
    }

    const params = {
      password: data.newPassword,
      reset_token: token
    }
    console.log(params)
    return
    setButtonDisable(true)
    Service.post({
      url: '/resetPassword',
      body: JSON.stringify(params)
    })
      .then(response => {
        setButtonDisable(false)
        if (response.status === 'error') {
          OpenNotification('error', 'Oops!', response.data.message)
          return false
        } else {
          setNewPassword('')
          setConfirmPassword('')
          setValue('password', '')
          setValue('cpassword', '')
          OpenNotification('success', 'Success!', 'Your password has been changed successfully!')
          history.push('/login')
        }
      })
      .catch(err => {
        setButtonDisable(false)
        OpenNotification('error', 'Oops!', 'Something went wrong!')
      })
  }

  return (
    <div>
      <Row>
        <Col xl="5" lg="5" md="12" sm="12" xs="12" className="bg-left-auth ">
          <div className='d-flex justify-content-center position-rel'>
            <div className="p-1 my-3">
              <Col className='px-xl-3 mx-auto' xs="12" sm='12' md='12' lg='12'>
                <div className='text-center mb-5'>
                  <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                    <img src={require('../../../assets/images/drone-images/logo.png').default} />
                  </Link>
                </div>
                <CardTitle tag='h2' className='mb-0 font-weight-bold text-white'>
                  Create New Password
                </CardTitle>
                <CardText className='dr-text-primary invisible'>
                  Enter your email and we'll send you instructions to
                </CardText>
                <Form className='auth-forgot-password-form' onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Label className='form-label dr-text-primary' for='password'>
                      New Password<span className='text-danger'>*</span>
                    </Label>
                    <InputGroup className='input-group-merge mb-1'>
                      <InputPasswordToggle
                        id='newPassword'
                        name='newPassword'
                        className='input-left input-group-merge'
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Enter New Password"
                        inputClassName={classnames("input-left py-2", { 'is-invalid': errors['newPassword'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </InputGroup>
                    <PasswordStrengthBar
                      password={newPassword}
                      scoreWords={['weak', 'okay', 'good', 'strong', 'Excellent']}
                      minScore={2}
                      minLength={5} />
                    <small className="text-danger">{errors.newPassword?.message}</small>
                  </FormGroup>
                  <FormGroup>
                    <Label className='form-label dr-text-primary' for='cpassword'>
                      Confirm New Password<span className='text-danger'>*</span>
                    </Label>
                    <InputPasswordToggle
                      id='cpassword'
                      name='cpassword'
                      placeholder='Enter Confirm Password'
                      // onChange={e => setConfirmPassword(e.target.value)}
                      inputClassName={classnames("input-left py-2", { 'is-invalid': errors['cpassword'] })}
                      innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                    <small className="text-danger">{errors.cpassword?.message}</small>
                  </FormGroup>
                  <Button.Ripple type='submit' disabled={buttonDisable} block className="bg-btn py-1 mt-2">
                    Continue
                  </Button.Ripple>
                </Form>
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
}

export default ResetPassword
