import { Fragment, useState, useContext, useEffect } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { AbilityContext } from '@src/utility/context/Can'
import { handleLogin } from '@store/actions/auth'
import InputPasswordToggle from '@components/input-password-toggle'
import { User } from 'react-feather'
import { CiMail } from "react-icons/ci"
import { RiInformationLine } from "react-icons/ri"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Tooltip, Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Progress, InputGroup, Input, InputGroupText, CustomInput, Spinner, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

import Spinners from '@components/spinner/Loading-spinner'

import { Service } from '@src/services/Service'
import { OpenNotification, formatPhoneNumber } from '@src/views/components/Helper'
import PasswordStrengthBar from 'react-password-strength-bar'

import logo from '@src/assets/images/logo/logo.png'
import InfoIcon from '@src/assets/images/logo/Info_icon.png'

import '@styles/base/pages/page-auth.scss'

const Register = () => {

  const ability = useContext(AbilityContext)
  const history = useHistory()
  const dispatch = useDispatch()

  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [score, setScore] = useState(0)
  const [strength, setStrength] = useState('')
  const [color, setColor] = useState('')
  const [terms, setTerms] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false)

  const LoginSchema = yup.object().shape({
    firstname: yup.string().required("Enter first name").matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, 'Name must contain only alphabets. Please enter valid name').max(40),
    lastname: yup.string().required('Enter last name').matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, 'Name must contain only alphabets. Please enter valid name').max(40),
    loginEmail: yup.string().required('Please enter email').email('Please enter valid email'),
    loginPassword: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, , and must be atleast 8 characters long without any spaces"
      )
  })

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(LoginSchema)
  })


  // const Terms = () => {
  //   return (
  //     <Fragment>
  //       I accept
  //       <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
  //         Terms & Conditions
  //       </a>
  //       <span className='ml-25'>and</span>
  //       <a className='ml-25' href='https://bluebow.io/privacy-policy-2/' target='_blank'>
  //         Privacy Policy
  //       </a>
  //     </Fragment>
  //   )
  // }

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
      setPassword(value)
      return
    }
    if (value.length < 3) {
      temp_score = 15
      temp_strength = 'too short'
      setScore(temp_score); setStrength(temp_strength)
      setPassword(value)
      setColor('danger')
      return
    }
    if (hasLowerCase(value) && hasUpperCase(value)) {
      temp_score = 25
      temp_strength = 'weak'
      temp_color = 'danger'

    }
    if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value)) {
      temp_score = 50
      temp_strength = 'good'
      temp_color = 'warning'
    }
    if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value) && hasSymbols(value)) {
      temp_score = 75
      temp_strength = 'strong'
      temp_color = 'info'
    }
    if (hasLowerCase(value) && hasUpperCase(value) && hasNumber(value) && hasSymbols(value) && value.length >= 8) {
      temp_score = 100
      temp_strength = 'excellent'
      temp_color = 'success'
    }
    setScore(temp_score); setStrength(temp_strength); setColor(temp_color)
    setPassword(value)
  }

  const onSubmit = data => {
    if (!terms) {
      OpenNotification('error', 'Missing selection!', 'Please accept the Terms & Conditions and Privacy Policy!', '', true)
      return false
    }
    return

    const params = {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.loginEmail,
      password: data.loginPassword
    }

    setButtonDisable(true)
    Service.post({
      url: 'user/signUp',
      body: JSON.stringify(params)
    })
      .then(response => {
        console.log(response)
        setButtonDisable(false)
        if (response && response.status && response.status === 'error') {
          OpenNotification('error', 'Oops!', response.data.message)
        } else {
          dispatch(handleLogin(response.data))
          ability.update([
            {
              action: 'manage',
              subject: 'all'
            }
          ])
          history.push("/login")
          OpenNotification('success', `Welcome, ${response.data.user.firstName}`, 'You have successfully signed up in as an user to DronePOV and verification email has been sent to your email')
        }
      })
      .catch(err => {
        setButtonDisable(false)
        OpenNotification('error', 'Oops!', 'Something went wrong. Please try later!')
      })
  }

  return (

    <div>
      <Row>
        <Col xl="5" lg="5" md="12" sm="12" xs="12" className="d-flex justify-content-center bg-left-auth ">
          <div className="p-1">
            <Col className='px-xl-3 mx-auto' xs="12" sm='12' md='12' lg='12'>
              <div className='text-center mb-2'>
                <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                  <img src={require('../../../assets/images/drone-images/logo.png').default} />
                </Link>
              </div>
              <CardTitle tag='h2' className='font-weight-bold mb-1 text-white'>
                Welcome!
              </CardTitle>
              <CardText className='mb-2 dr-text-primary'>Please signup and start the adventure</CardText>

              <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md='6'>
                    <FormGroup>
                      <Label className='form-label dr-text-primary' htmlFor='firstname'>
                        First Name<span className='text-danger'>*</span>
                      </Label>
                      <InputGroup className='input-group-merge'>
                        <InputGroupText className="input-left">
                          <User color="#d6b636" size={15} />
                        </InputGroupText>
                        <Input
                          type='text'
                          placeholder='John'
                          id='firstname'
                          name='firstname'
                          className={classnames("input-left py-2", { 'is-invalid': errors['firstname'] })}
                          innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                      </InputGroup>
                      <small className="text-danger">{errors.firstname?.message}</small>
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <FormGroup>
                      <Label className='form-label dr-text-primary' htmlFor='lastname'>
                        Last Name<span className='text-danger'>*</span>
                      </Label>
                      <InputGroup className='input-group-merge'>
                        <InputGroupText className="input-left">
                          <User color="#d6b636" size={15} />
                        </InputGroupText>
                        <Input
                          type='text'
                          placeholder='Doe'
                          id='lastname'
                          name='lastname'
                          className={classnames("input-left py-2", { 'is-invalid': errors['lastname'] })}
                          innerRef={register({ required: true, validate: value => value !== '' })}
                        /></InputGroup>
                      <small className="text-danger">{errors.lastname?.message}</small>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label className='form-label dr-text-primary' for='loginEmail'>
                    Email<span className='text-danger'>*</span>
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText className="input-left">
                      <CiMail color="#d6b636" size={15} />
                    </InputGroupText>
                    <Input
                      type='email'
                      value={email}
                      id='loginEmail'
                      name='loginEmail'
                      placeholder='example@site.com'
                      onChange={e => setEmail(e.target.value)}
                      className={classnames("input-left py-2", { 'is-invalid': errors['login-email'] })}
                      innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                  </InputGroup>
                  <small className="text-danger">{errors.loginEmail?.message}</small>
                </FormGroup>
                <FormGroup className="mt-2 password-group">
                  <div className='d-flex justify-content-between'>
                    <Label className='form-label dr-text-primary' for='loginPassword'>
                      Create Password<span><span className='text-danger'>*</span><RiInformationLine color="#d6b636" size={20} id="TooltipExample" /></span>
                    </Label>
                  </div>
                  <InputGroup className='input-group-merge mb-1'>
                    <InputPasswordToggle
                      value={password}
                      id='loginPassword'
                      name='loginPassword'
                      className='input-left input-group-merge'
                      onChange={handlePasswordChange}
                      placeholder="........................."
                      inputClassName={classnames("input-left py-2", { 'is-invalid': errors['login-password'] })}
                      innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                  </InputGroup>
                  <Progress value={score} color={color} />
                  <div className='text-right'>
                    <span className={`text-right text-${color}`}>{strength}</span>
                  </div>

                  {/* <PasswordStrengthBar
                    password={password}
                    scoreWords={['weak', 'okay', 'good', 'strong', 'Excellent']}
                    minLength={3}
                  // onChangeScore={ScoreChange}
                  /> */}
                  <small className="text-danger">{errors.loginPassword?.message}</small>
                  <Tooltip
                    isOpen={tooltipOpen}
                    target="TooltipExample"
                    toggle={toggle}
                  >
                    Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, , and must be atleast 8 characters long without any spaces
                  </Tooltip>
                </FormGroup>
                <FormGroup className="d-flex">
                  <CustomInput
                    type='checkbox'
                    id='terms'
                    name='terms'
                    value={terms}
                    onChange={e => setTerms(e.target.checked)}
                    className='custom-checkbox' />
                  <Label className="dr-text-primary form-label">
                    By creating an account, you agree to our <Link to="/terms" className='font-weight-bold text-white'>Terms of Service</Link> and <Link to="/privacy-policy" className='font-weight-bold text-white'>Privacy</Link> & Cookies Statement.</Label>
                </FormGroup>
                <Button.Ripple type='submit' block className="mt-2 bg-btn py-1">
                  {(buttonDisable) ? 'Processing...' : 'Sign Up'}
                </Button.Ripple>
              </Form>
              <p className='text-center mt-1'>
                <span className='mr-25 dr-text-primary'>Already have an account?</span>
                <Link to='/login'>
                  <span className='dr-text-primary'>Sign In</span>
                </Link>
              </p>
              <footer className='dr-text-primary text-center'>©2022. ALL RIGHTS RESERVED</footer>
            </Col>
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

export default Register
