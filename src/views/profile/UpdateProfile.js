import { Fragment, useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, CardBody, CardText, Form, FormGroup, Label, Input, Button, Row, Col, Media, PopoverHeader, PopoverBody, Spinner, InputGroup, InputGroupText } from 'reactstrap'

import { OpenNotification } from '@src/views/components/Helper'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { Service, Storage } from '@src/services/Service'
import FileUpload from '@src/views/components/FileUpload'
import Cleave from 'cleave.js/react'
import { CiMail } from "react-icons/ci"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AlertCircle, User } from 'react-feather'
import Config from '@src/configs/config.json'
import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import InfoIcon from '@src/assets/images/logo/Info_icon.png'
import Avatar from "../../assets/images/avatars/avatar-blank.png"

const MySwal = withReactContent(Swal)

const UpdateProfile = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const ability = useContext(AbilityContext)
  const { register, errors, setValue, handleSubmit } = useForm()
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedLogo, setCroppedLogo] = useState(null)
  const optionsMask = { date: true, delimiter: '/', datePattern: ['m', 'd'] }
  const [data, setData] = useState(null)
  const [dob, setDob] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)

  // useEffect(() => {
  //   if (Storage.get('auth') === null) {
  //     history.push('/')
  //   } else {
  //     setData(Storage.get('auth'))
  //   }
  // }, [])

  // useEffect(() => {

  //   if (data) {
  //     setTimeout(() => {
  //       setValue('linkedin', data.linkedin_id)
  //       setValue('address1', data.address_1)
  //       setValue('address2', data.address_2)
  //       setValue('city', data.city)
  //       setValue('state', data.state)
  //       setValue('zip', data.zipcode)

  //       setDob(data.dob)
  //       setCroppedImage(data.avatar)
  //       setCroppedLogo(data.logo)
  //     }, 1000)
  //   }
  // }, [data])

  const onSubmit = (val) => {
    console.log("Profile")
    // const params = {
    //   dob: dob,
    //   linkedin_id: val.linkedin,
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
    //       history.push("/dashboard")
    //     }
    //   })
  }

  return (
    <>
      <h2 className='text-white mb-4'>Profile Settings</h2>
      <Row className='auth-inner'>
        <Col lg='12' sm='12'>
          <Card className='w-100 bg-menu'>
            <CardBody className='p-1'>
              <Row >
                <Col xl="8">
                  <h3 className='text-white'>Personal Information</h3>
                  <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col xl='12'>
                        <FormGroup>
                          <Label className='form-label dr-text-primary' htmlFor='firstname'>
                            Title
                          </Label>
                          <InputGroup className='input-group-merge'>
                            <InputGroupText className="input-left">
                              <User color="#d6b636" size={15} />
                            </InputGroupText>
                            <Input
                              type='text'
                              placeholder='Title'
                              id='firstname'
                              name='firstname'
                              className={classnames("input-left py-2", { 'is-invalid': errors['firstname'] })}
                              innerRef={register({ required: true, validate: value => value !== '' })}
                            />
                          </InputGroup>
                          <small className="text-danger">{errors.firstname?.message}</small>
                        </FormGroup>
                      </Col>
                      <Col xl='12'>
                        <FormGroup>
                          <Label className='form-label dr-text-primary' htmlFor='lastname'>
                            Name
                          </Label>
                          <InputGroup className='input-group-merge'>
                            <InputGroupText className="input-left">
                              <User color="#d6b636" size={15} />
                            </InputGroupText>
                            <Input
                              type='text'
                              placeholder='Name'
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
                        Email
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
                          placeholder='Email'
                          onChange={e => setEmail(e.target.value)}
                          className={classnames("input-left py-2", { 'is-invalid': errors['login-email'] })}
                          innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                      </InputGroup>
                      <small className="text-danger">{errors.loginEmail?.message}</small>
                    </FormGroup>
                    <FormGroup>
                      <Label className='form-label dr-text-primary' for='loginEmail'>
                        Company Name
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
                          placeholder='Company Name'
                          onChange={e => setEmail(e.target.value)}
                          className={classnames("input-left py-2", { 'is-invalid': errors['login-email'] })}
                          innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                      </InputGroup>
                      <small className="text-danger">{errors.loginEmail?.message}</small>
                    </FormGroup>
                    <FormGroup>
                      <Label className='form-label dr-text-primary' for='loginEmail'>
                        Phone Number
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
                          placeholder='Phone Number'
                          onChange={e => setEmail(e.target.value)}
                          className={classnames("input-left py-2", { 'is-invalid': errors['login-email'] })}
                          innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                      </InputGroup>
                      <small className="text-danger">{errors.loginEmail?.message}</small>
                    </FormGroup>
                  </Form>
                </Col>
                {/* <Col xl="6" className="px-3">

                  <h3 className='text-white'>Your Photo</h3>
                  <Media className="d-flex mt-3">
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={Avatar} alt='Generic placeholder image' height='80' width='80' />
                    </Media>
                    <Media className='mt-2 ml-1' body>
                      <h3 className='text-white'>Edit Your Photo</h3>
                      <Button.Ripple className="mt-0 mr-2 dr-text-primary" color='secondary' size='sm' outline>
                        Delete
                      </Button.Ripple>
                      <Button.Ripple tag={Label} className='mr-75 mb-0 text-yellow' size='sm' color='secondary' outline>
                        Update
                        <Input type='file' hidden accept='image/*' />
                      </Button.Ripple>
                      {/* <div className='d-flex'>
                        <h4 className=' mr-2'>
                          Delete
                        </h4>
                        <h4 className=''>
                          Update
                          <Input type='file' hidden accept='image/*' label='Update' />
                        </h4>
                      </div> */}
                {/* </Media>
            </Media>
        </Col> */}
              </Row>
            </CardBody>
          </Card >
        </Col >
      </Row >
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
export default UpdateProfile
