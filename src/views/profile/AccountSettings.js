// ** React Imports
import { Fragment, useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { Service, Storage } from '@src/services/Service'
import { OpenNotification, formatPhoneNumber } from '@src/views/components/Helper'
import moment from 'moment'
import UploadImage from '../components/UploadImage'
import Config from '@src/configs/config.json'
import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import Cleave from 'cleave.js/react'
import classnames from 'classnames'
import InputPasswordToggle from '@components/input-password-toggle'
import PasswordStrengthBar from 'react-password-strength-bar'

// ** Custom Components
import Avatar from '@components/avatar'
import Img5 from '@src/assets/images/avatars/avatar-blank.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import InfoIcon from '@src/assets/images/logo/Info_icon.png'


// ** Third Party Components
import { CustomInput, Card, CardBody, CardText, Form, FormGroup, Label, Progress, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledPopover, PopoverHeader, PopoverBody, Spinner, InputGroup, InputGroupText } from 'reactstrap'
import { User, Star, Globe, Phone, Calendar, Linkedin, Facebook, Twitter, MapPin, AlertCircle } from 'react-feather'

const AccountSettings = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const ability = useContext(AbilityContext)
  const { register, errors, setValue, handleSubmit } = useForm()
  const [avatar, setAvatar] = useState(null)
  const [userModal, setUserModal] = useState(false)
  const [dobPicker, setDobPicker] = useState(new Date())
  const [passwordModal, setPasswordModal] = useState(false)
  const [data, setData] = useState(null)
  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedLogo, setCroppedLogo] = useState(null)
  const optionsMask = { date: true, delimiter: '/', datePattern: ['m', 'd'] }
  const [dob, setDob] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [score, setScore] = useState(0)
  const [strength, setStrength] = useState('')
  const [color, setColor] = useState('')

  // useEffect(() => {
  //   if (Storage.get('auth') === null) {
  //     history.push('/')
  //   } else {
  //     setData(Storage.get('auth'))
  //   }
  // }, [])

  // useEffect(() => {
  //   setCroppedImage(data && data.avatar)
  //   setCroppedLogo(data && data.logo)
  //   setAvatar(data && data.avatar)
  // }, [data])

  const handleUserProfile = () => {
    setUserModal(!userModal)
    console.log('useProfile')

    // if (data !== null) {
    //   setTimeout(() => {
    //     setValue('fname', data.first_name)
    //     setValue('lname', data.last_name)
    //     setValue('email', data.email)
    //     setDob(data.dob)
    //     setValue('nphone', formatPhoneNumber(data.landing_phone))
    //     setValue('bphone', formatPhoneNumber(data.business_phone))
    //     setValue('website', data.website)
    //     setValue('business', data.business_name)
    //     setValue('fb_business', data.fb_business_page)
    //     setValue('facebook', data.fb_id)
    //     setValue('linkedin', data.linkedin_id)
    //     setValue('twitter', data.twitter_id)
    //     setValue('address1', data.address_1)
    //     setValue('city', data.city)
    //     setValue('state', data.state)
    //     setValue('zip', data.zipcode)
    //     setValue('address2', data.address_2)
    //   }, 1000)
    // }
  }

  // // ** render user img
  // const renderUserImg = () => {
  //   return (
  //     <>
  //       <img src={(avatar !== null) ? `${Config.MEDIA_URL}${avatar}` : Img5} alt='user-avatar' className='img-fluid rounded mb-2' height='115' width='115' />
  //     </>
  //   )
  // }

  const onSubmit = (val) => {
    console.log("Profile")

    // if (dob === null) {
    //   OpenNotification('error', 'Oops!', 'Please enter your Date of Birth!')
    //   return false
    // }

    // setLoading(true)
    // const params = {
    //   first_name: val.fname,
    //   last_name: val.lname,
    //   dob: dob,
    //   landing_phone: val.nphone.replace(/[^0-9]/g, ''),
    //   business_phone: val.bphone.replace(/[^0-9]/g, ''),
    //   fb_business_page: val.fb_business,
    //   fb_id: val.facebook,
    //   linkedin_id: val.linkedin,
    //   twitter_id: val.twitter,
    //   business_name: val.business,
    //   website: val.website,
    //   address_1: val.address1,
    //   address_2: val.address2,
    //   city: val.city,
    //   state: val.state,
    //   zipcode: val.zip
    // }

    // if (croppedImage !== null) {
    //   params.avatar = croppedImage
    // }

    // if (croppedLogo !== null) {
    //   params.logo = croppedLogo
    // }

    // setButtonDisable(true)
    // Service.patch({
    //   url: '/profile',
    //   body: JSON.stringify(params)
    // })
    //   .then(response => {
    //     setButtonDisable(false)
    //     setLoading(false)
    //     setUserModal(false)
    //     if (response.status === 'error') {
    //       OpenNotification('error', 'Oops!', response.data.message, '', false)
    //     } else {
    //       OpenNotification('success', 'Success!', 'Profile updated successfully', '', true)
    //       dispatch(handleLogin(response.data))

    //       ability.update([
    //         {
    //           action: 'manage',
    //           subject: 'all'
    //         }
    //       ])
    //       Storage.set('auth', (response.data.user))
    //       setData(response.data.user)
    //     }
    //   })
  }
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

  const onSubmitPassword = (val) => {

    if (val.npassword.length < 6) {
      OpenNotification('error', 'Oops!', 'Password length must be greater than 6 characters!')
      return false
    }

    if (val.npassword !== val.cpassword) {
      OpenNotification('error', 'Password Mismatch!', 'Both password should be same!')
      return false
    }

    setLoading(true)
    const params = {
      password: val.npassword
    }

    setButtonDisable(true)
    Service.patch({
      url: '/updatePassword',
      body: JSON.stringify(params)
    })
      .then(response => {
        setButtonDisable(false)
        setLoading(false)
        setPasswordModal(false)
        if (response.status === 'error') {
          OpenNotification('error', 'Oops!', response.data.message, '', false)
        } else {
          OpenNotification('success', 'Success!', 'Password changed successfully', '', true)
        }
      })
  }

  return (
    <>
      <h2 className='text-white mb-4'>Account Settings</h2>
      <Row className='auth-inner'>
        <Col lg='8' sm='12'>
          <Card className='w-100 bg-menu'>
            <CardBody className='p-1'>
              <Row className="justify-content-center">
                <Col xl="12">
                  <h3 className='text-white'>Password Reset</h3>
                  <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col xl="6">
                        <FormGroup>
                          <Label className='form-label dr-text-primary' for='password'>
                            Current Password
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
                          <small className="text-danger">{errors.newPassword?.message}</small>
                        </FormGroup>
                      </Col>
                    </Row><Row>
                      <Col xl="6">
                        <FormGroup>
                          <Label className='form-label dr-text-primary' for='password'>
                            New Password
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
                          <Progress value={score} color={color} />
                          <div className='text-right'>
                            <span className={`text-right text-${color}`}>{strength}</span>
                          </div>
                          <small className="text-danger">{errors.newPassword?.message}</small>
                        </FormGroup>
                      </Col>
                      <Col xl="6">
                        <FormGroup>
                          <Label className='form-label dr-text-primary' for='cpassword'>
                            Confirm New Password
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
                      </Col>
                    </Row>

                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='auth-inner'>
        <Col lg='8' sm='12'>
          <Card className='w-100 bg-menu'>
            <CardBody className='p-1'>
              <Row className="justify-content-center">
                <Col xl="12">
                  <h3 className='text-white'>Time Zone</h3>
                  <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row className="align-items-center">
                      <Col xl="6">
                        <FormGroup>
                          <Label className='form-label dr-text-primary' for='password'>
                            Timezone
                          </Label>
                          <InputGroup className='input-group-merge mb-1'>
                            <InputPasswordToggle
                              id='newPassword'
                              name='newPassword'
                              className='input-left input-group-merge'
                              onChange={e => setNewPassword(e.target.value)}
                              placeholder="Europe/Berlin"
                              inputClassName={classnames("input-left py-2", { 'is-invalid': errors['newPassword'] })}
                              innerRef={register({ required: true, validate: value => value !== '' })}
                            />
                          </InputGroup>
                          <small className="text-danger">{errors.newPassword?.message}</small>
                        </FormGroup>
                      </Col>
                      <Col xl="6">
                        <p className='dr-text-primary'>Current time 10.51 PM</p>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='auth-inner'>
        <Col lg='8' sm='12'>
          <Card className='w-100 bg-menu'>
            <CardBody className='p-1'>
              <Row className="justify-content-between align-items-center">
                <Col xl="6">
                  <h3 className='text-white'>Two Factor Authentication</h3>
                  <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <h5 className='text-white'>Two Factor Authentication</h5>
                    <p className='dr-text-primary'>A second logon step adds an extra layer of security to your account</p>

                  </Form>
                </Col>
                <Col xl="6" className="text-right">
                  <CustomInput
                    type='switch'
                    name='customSwitch'
                    inline
                    defaultChecked={true}
                    color="#d6b636"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='auth-inner'>
        <Col lg='8' sm='12'>
          <Card className='w-100 bg-menu'>
            <CardBody className='p-1'>
              <Row className="justify-content-center">
                <Col xl="12">
                  <h3 className='text-white'>Theme Style</h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='auth-inner'>
        <Col lg='8' sm='12'>
          <Card className='w-100 bg-menu'>
            <CardBody className='p-1'>
              <Row className="justify-content-center">
                <Col xl="12">
                  <h3 className='text-white'>Payment Method</h3>
                  <div className='d-flex align-items-center bg-nav py-1 mt-1'>
                    <img src={require('../../assets/images/drone-images/visa.png').default} className="img-fluid" />
                    <div className='d-flex flex-column ml-1'>
                      <h5 className='mb-0 text-white'>Visa Ending In 2254</h5>
                      <p className='dr-text-primary mb-0'>Expiry 06/2024</p>
                    </div>
                  </div>
                  <div className='d-flex align-items-center bg-nav py-1 mt-1'>
                    <img src={require('../../assets/images/drone-images/paypal.png').default} className="img-fluid" />
                    <div className='d-flex flex-column ml-1'>
                      <h5 className='mb-0 text-white'>Paypal Ending In 8563</h5>
                      <p className='dr-text-primary mb-0'>Expiry 06/2024</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='auth-inner'>
        <Col lg='8' sm='12'>
          <Card className='w-100 bg-menu'>
            <CardBody className='p-2'>
              <div className='d-flex'>
                <Button className="btn-export mr-1">Export Data</Button>
                <Button className="btn-pause-account mr-1 text-white">Pause Account</Button>
                <Button className="btn-delete-account">Delete Account</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className='d-flex'>
        <Button.Ripple type='submit' block className="mt-2 bg-save py-1">
          {(buttonDisable) ? <> <Spinner color='white' size='sm' /> </> : 'Save'}
        </Button.Ripple>
        <Button.Ripple type='submit' block className="mt-2 bg-transparent ml-2 py-1">
          {(buttonDisable) ? <> <Spinner color='white' size='sm' /> </> : 'Cancel'}
        </Button.Ripple>
      </div>
    </>
  )
}

export default AccountSettings
