import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { CiMail } from "react-icons/ci"
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Input, FormGroup, Label, CustomInput, Button, Spinner, InputGroup, InputGroupText } from 'reactstrap'
import { Service } from '@src/services/Service'
import { OpenNotification } from '@src/views/components/Helper'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import '@styles/base/pages/page-auth.scss'

const Login = () => {

  const LoginSchema = yup.object().shape({
    loginEmail: yup.string().required('Please enter email').email('Please enter valid email'),
    loginPassword: yup
      .string()
      .required('Password is required')
  })
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(LoginSchema)
  })

  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [buttonDisable, setButtonDisable] = useState(false), [remember, setRemember] = useState(false)

  const onSubmit = data => {
    const params = {
      account: data.loginEmail,
      password: data.loginPassword
    }

    if (email !== '' && password !== '') {
      setButtonDisable(true)
      Service.post({
        url: 'user/signIn',
        body: JSON.stringify(params)
      })
        .then(response => {
          console.log(response)
          setButtonDisable(false)
          if (response && response.status && response.status === 'error') {
            OpenNotification('error', 'Oops!', response.data.message)
            return false
          } else {
            setButtonDisable(false)
            const result = {
              data: response.data,
              remember: remember
            }
            dispatch(handleLogin(result))
            ability.update([
              {
                action: 'manage',
                subject: 'all'
              }
            ])
            history.push("/projects")
            OpenNotification('success', `Welcome, ${response.data.user.first_name}`, 'You have successfully logged in as an user to Drones POV. Now you can start to explore. Enjoy!')
          }
        })
      // .catch(err => {
      //   setButtonDisable(false)
      //   OpenNotification('error', 'Oops!', 'Something went wrong!')
      // })
    }
  }


  const RememberMe = (event) => {
    console.log(event.target.checked)
    if (event.target.checked) {
      setRemember(!remember)
    } else {
      setRemember(!remember)
    }
  }

  return (
    <>
      <div>
        <Row>
          <Col xl="5" lg="5" md="12" sm="12" xs="12" className="bg-left-auth d-flex justify-content-center align-items-center">
            <div className="p-3 my-3">
              <Col className='px-xl-3 mx-auto' xs="12" sm='12' md='12' lg='12'>
                <div className='text-center mb-3'>
                  <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                    <img src={require('../../../assets/images/drone-images/logo.png').default} />
                  </Link>
                </div>
                <CardTitle tag='h2' className='font-weight-bold mb-1 text-white'>
                  Hi, Welcome Back!
                </CardTitle>
                <CardText className='mb-2 dr-text-primary'>Please login to your account and start the adventure</CardText>

                <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Label className='form-label dr-text-primary' for='login-email'>
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
                        placeholder='example@site.com'
                        onChange={e => setEmail(e.target.value)}
                        className="input-left text-indent py-2"
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </InputGroup>
                    <small className="text-danger">{errors.loginEmail?.message}</small>
                  </FormGroup>
                  <FormGroup className="mt-2 password-group">
                    <div className='d-flex justify-content-between'>
                      <Label className='form-label dr-text-primary' for='loginPassword'>
                        Password<span></span>
                      </Label>
                    </div>
                    <InputGroup className='input-group-merge'>
                      <InputPasswordToggle
                        value={password}
                        id='loginPassword'
                        name='loginPassword'
                        className='input-left'
                        onChange={e => setPassword(e.target.value)}
                        placeholder="........................."
                        inputClassName="input-left text-indent py-2"
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </InputGroup>
                    <small className="text-danger">{errors.loginPassword?.message}</small>
                  </FormGroup>

                  <div className='d-flex flex-column flex-sm-row justify-content-between mt-2'>
                    <FormGroup>
                      <CustomInput type='checkbox' className='dr-text-primary' id='remember-me' label='Keep me signed in' onClick={RememberMe} />
                    </FormGroup>
                    <Link to='/forgot-password' className='text-right'>
                      <span className='dr-text-primary '>Forgot Password?</span>
                    </Link>
                  </div>
                  <Button.Ripple type='submit' block className="mt-2 bg-btn py-1">
                    {(buttonDisable) ? <> <Spinner color='white' size='sm' /> </> : 'Sign In'}
                  </Button.Ripple>
                </Form>
                <p className='text-center mt-2'>
                  <span className='mr-25 dr-text-primary'>Don't have an account?</span>
                  <Link to='/register'>
                    <span className='dr-text-primary'>Sign Up</span>
                  </Link>
                </p>
              </Col>
            </div>
            <footer className='dr-text-primary text-center position-abs3'>©2022. ALL RIGHTS RESERVED</footer>
          </Col>
          <Col xl="7" lg="7" md="12" sm="12" xs="12" className="bg-right-signin d-none d-lg-block">
            <div className='p-1 my-3'>
              <h1 className='text-white'>Header Text</h1>
              <p className='dr-text-primary'>Sub Header Text</p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Login
