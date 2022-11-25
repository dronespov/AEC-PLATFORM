import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { useForm } from 'react-hook-form'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, InputGroup, Button, Progress, Tooltip } from 'reactstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RiInformationLine } from "react-icons/ri"

import Config from '@src/configs/config.json'
import { Service } from '@src/services/Service'
import { OpenNotification } from '@src/views/components/Helper'
import PasswordStrengthBar from 'react-password-strength-bar'

import logo from '@src/assets/images/logo/logo.png'

import '@styles/base/pages/page-auth.scss'

const ResetPassword = ({ match }) => {


  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)

  const token = match.params.token
  const history = useHistory()
  const [skin, setSkin] = useSkin()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [score, setScore] = useState(0)
  const [strength, setStrength] = useState('')
  const [color, setColor] = useState('')
  const [buttonDisable, setButtonDisable] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [formVisible, setFormVisible] = useState(true)

  const LoginSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z\$A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, , and must be atleast 8 characters long without any spaces"
      ),
    cpassword: yup.string()
      .required('Please enter your confirm password')
      .oneOf([yup.ref('newPassword'), null], 'Password and confirm password do not match. Please try again')
  })

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(LoginSchema)
  })
  const hasLowerCase = (str) => {
    return str.toUpperCase !== str
  }

  const hasUpperCase = (str) => {
    return str.toLowerCase !== str
  }

  const hasNumber = (str) => {
    return /\d/.test(str)
  }

  const hasSymbols = (str) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    return format.test(str)
  }

  const handlePasswordChange = ({ target: { value } }) => {
    // 8 charaters, lower case, upper case, speacial charaters, number
    let temp_score = 0, temp_strength = '', temp_color = ''
    if (!value.length) {
      setScore(temp_score); setStrength(temp_strength)
      setNewPassword(value)
      return
    }
    if (value.length < 3) {
      temp_score = 15
      temp_strength = 'Too short'
      setScore(temp_score); setStrength(temp_strength)
      setNewPassword(value)
      setColor('danger')
      return
    }
    if (hasLowerCase(value) && hasUpperCase(value)) {
      temp_score = 25
      temp_strength = 'Weak'
      temp_color = 'danger'

    }
    if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value)) {
      temp_score = 50
      temp_strength = 'Good'
      temp_color = 'warning'
    }
    if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value) && hasSymbols(value)) {
      temp_score = 75
      temp_strength = 'Strong'
      temp_color = 'info'
    }
    if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value) && hasSymbols(value) && value.length >= 8) {
      temp_score = 100
      temp_strength = 'Excellent'
      temp_color = 'info'
    }
    setScore(temp_score); setStrength(temp_strength); setColor(temp_color)
    setNewPassword(value)
  }

  const onSubmit = (data) => {

    if (typeof token === 'undefined') {
      OpenNotification('error', 'Oops!', 'Invalid Token!')
      history.push('/login')
      return false
    }

    const params = {
      newPassword: data.newPassword,
      token: token
    }
    setButtonDisable(true)
    Service.post({
      url: 'user/updatePassword',
      body: JSON.stringify(params)
    })
      .then(response => {
        setButtonDisable(false)
        if (response.status === 'error') {
          OpenNotification('error', 'Oops!', response.data.message)
          setFormVisible(false)
          setInvalid(true)
          return false
        } else {
          setNewPassword('')
          setConfirmPassword('')
          OpenNotification('success', 'Success!', 'Your password has been changed successfully!')
          history.push('/login')
        }
      })
      .catch(err => {
        console.log(err)
        setButtonDisable(false)
        OpenNotification('error', 'Oops!', 'Something went wrong!')
      })
  }

  return (
    <div>
      <Row>
        <Col xl="5" lg="5" md="12" sm="12" xs="12" className="bg-left-auth d-flex justify-content-center align-items-center position-rel">
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
              {formVisible && <>
                <CardText className='dr-text-primary invisible'>
                  Enter your email and we'll send you instructions to
                </CardText>
                <Form className='auth-forgot-password-form' onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Label className='form-label dr-text-primary' for='password'>
                      New Password<span><RiInformationLine color="#d6b636" size={20} id="TooltipExample" /></span>
                    </Label>
                    <InputGroup className='input-group-merge mb-1'>
                      <InputPasswordToggle
                        id='newPassword'
                        name='newPassword'
                        className='input-left input-group-merge'
                        onChange={handlePasswordChange}
                        placeholder="Enter New Password"
                        inputClassName="input-left text-indent py-2"
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </InputGroup>
                    <Progress value={score} color={color} />
                    <div className='text-right'>
                      <span className={`text-right text-${color}`}>{strength}</span>
                    </div>
                    <small className="text-danger">{errors.newPassword?.message}</small>
                    <Tooltip
                      isOpen={tooltipOpen}
                      target="TooltipExample"
                      toggle={toggle}
                    >
                      Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, and must be atleast 8 characters long without any spaces
                    </Tooltip>
                  </FormGroup>
                  <FormGroup>
                    <Label className='form-label dr-text-primary' for='cpassword'>
                      Confirm New Password
                    </Label>
                    <InputPasswordToggle
                      id='cpassword'
                      name='cpassword'
                      placeholder='Enter Confirm Password'
                      // onChange={e => setConfirmPassword(e.target.value)}
                      inputClassName="input-left pl-0 text-indent py-2"
                      innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                    <small className="text-danger">{errors.cpassword?.message}</small>
                  </FormGroup>
                  <Button.Ripple type='submit' disabled={buttonDisable} block className="bg-btn py-1 mt-2">
                    Continue
                  </Button.Ripple>
                </Form>
              </>}
              {
                invalid && <h5 className='dr-text-primary mt-3'>This link is invalid or expired. Please <Link to="/forgot-password">click here</Link>  to reset your password.</h5>
              }
            </Col>
          </div>
          <footer className='dr-text-primary text-center position-abs3'>©2022. ALL RIGHTS RESERVED</footer>
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
