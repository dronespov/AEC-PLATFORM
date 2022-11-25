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


import { Service } from '@src/services/Service'
import { OpenNotification, formatPhoneNumber } from '@src/views/components/Helper'
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
  const [formVisible, setFormVisible] = useState(true)
  const [successMessage, setSuccessMessage] = useState(false)

  const LoginSchema = yup.object().shape({
    firstname: yup.string().required("Enter first name").matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, 'Name must contain only alphabets').max(40),
    lastname: yup.string().required('Enter last name').matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, 'Name must contain only alphabets').max(40),
    loginEmail: yup.string().required('Please enter email').email('Please enter valid email'),
    loginPassword: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z\$A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, , and must be atleast 8 characters long without any spaces"
      )
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
      setPassword(value)
      return
    }
    if (value.length < 3) {
      temp_score = 15
      temp_strength = 'Too short'
      setScore(temp_score); setStrength(temp_strength)
      setPassword(value)
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
    setPassword(value)
  }

  const onSubmit = data => {
    if (!terms) {
      OpenNotification('error', 'Missing selection!', 'Please accept the Terms & Conditions and Privacy Policy!', '', true)
      return false
    }
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
        setButtonDisable(false)
        if (response && response.status && response.status === 'error') {
          OpenNotification('error', 'Oops!', response.data.message)
        } else {
          setFormVisible(false)
          setSuccessMessage(true)
        }
      })
      .catch(err => {
        console.log(err)
        setButtonDisable(false)
        OpenNotification('error', 'Oops!', 'Something went wrong. Please try later!')
      })
  }

  return (

    <div>
      <Row>
        <Col xl="5" lg="12" md="12" sm="12" xs="12" className="bg-left-auth d-flex justify-content-center align-items-center position-rel">
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
              <CardText className='mb-2 dr-text-primary'>Please Sign Up and start the adventure</CardText>
              {formVisible && <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md='6'>
                    <FormGroup>
                      <Label className='form-label dr-text-primary' htmlFor='firstname'>
                        First Name
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
                          className="input-left text-indent py-2"
                          innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                      </InputGroup>
                      <small className="text-danger">{errors.firstname?.message}</small>
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <FormGroup>
                      <Label className='form-label dr-text-primary' htmlFor='lastname'>
                        Last Name
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
                          className="input-left text-indent py-2"
                          innerRef={register({ required: true, validate: value => value !== '' })}
                        /></InputGroup>
                      <small className="text-danger">{errors.lastname?.message}</small>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label className='form-label dr-text-primary' for='loginEmail'>
                    Email
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText className="input-left">
                      <CiMail color="#d6b636" size={15} />
                    </InputGroupText>
                    <Input
                      type='text'
                      id='loginEmail'
                      name='loginEmail'
                      placeholder='example@site.com'
                      className="input-left text-indent py-2"
                      innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                  </InputGroup>
                  <small className="text-danger">{errors.loginEmail?.message}</small>
                </FormGroup>
                <FormGroup className="mt-2 password-group">
                  <div className='d-flex justify-content-between'>
                    <Label className='form-label dr-text-primary' for='loginPassword'>
                      Create Password<span><RiInformationLine color="#d6b636" size={20} id="TooltipExample" /></span>
                    </Label>
                  </div>
                  <InputGroup className='input-group-merge mb-1'>
                    <InputPasswordToggle
                      value={password}
                      id='loginPassword'
                      name='loginPassword'
                      className='input-left'
                      onChange={handlePasswordChange}
                      placeholder="........................."
                      inputClassName="input-left text-indent py-2"
                      innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                  </InputGroup>
                  <Progress value={score} color={color} />
                  <div className='text-right'>
                    <span className={`text-right text-${color}`}>{strength}</span>
                  </div>
                  <small className="text-danger">{errors.loginPassword?.message}</small>
                  <Tooltip
                    isOpen={tooltipOpen}
                    target="TooltipExample"
                    toggle={toggle}
                  >
                    Password must contain a combination of small or capital alphabets, numerals, special characters #, $, @, !, %, *, -, and must be atleast 8 characters long without any spaces
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
                    Please accept the <Link to="/terms" target={'_blank'} className='font-weight-bold text-white'>Terms of Service</Link> and <Link to="/privacy-policy" target={'_blank'} className='font-weight-bold text-white'>Privacy & Cookie</Link> Statement.</Label>
                </FormGroup>
                <Button.Ripple type='submit' block className="mt-2 bg-btn py-1">
                  {(buttonDisable) ? 'Processing...' : 'Sign Up'}
                </Button.Ripple>
              </Form>}
              {successMessage && <p className='dr-text-primary'>Thank you for signing up with Drones POV. You are one step away to enjoy our services. We have sent a verification email to your email. Please check your email (make sure to check your spam/other folders in case you do not see it in your inbox) and complete your email verification. Thank you!</p>}
              <p className='text-center mt-1'>
                <span className='mr-25 dr-text-primary'>Already have an account?</span>
                <Link to='/login'>
                  <span className='dr-text-primary text-underline'>Sign In</span>
                </Link>
              </p>
            </Col>
          </div>
          <footer className='dr-text-primary text-center position-abs3'>©2022. ALL RIGHTS RESERVED</footer>
        </Col>
        <Col xl="7" className="bg-right-signin d-none d-xl-block">
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
