import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { User } from 'react-feather'
import { CiMail } from "react-icons/ci"
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText } from 'reactstrap'

import Config from '@src/configs/config.json'
import { Service } from '@src/services/Service'
import { OpenNotification } from '@src/views/components/Helper'

import logo from '@src/assets/images/logo/logo.png'

import '@styles/base/pages/page-auth.scss'

const Contact = () => {
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
                        OpenNotification('success', 'Success!', 'Link was successfully sent to your email address!')
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

    return (
        <div>
            <Row>
                <Col lg="4"></Col>
                <Col lg="4">
                    <div className='bg-contact my-3 p-3 mx-auto'>
                        <div>
                            <div className='mb-3 text-center'>
                                <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                                    <img src={require('../../../assets/images/drone-images/logo.png').default} />
                                </Link>
                            </div>
                            <CardTitle tag='h2' className='font-weight-bold mb-1 text-white'>
                                Header Text
                            </CardTitle>
                            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup>
                                    <Label className='form-label dr-text-primary' htmlFor='firstname'>
                                        Your Name<span className='text-danger'>*</span>
                                    </Label>
                                    <InputGroup className='input-group-merge mb-2'>
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
                                </FormGroup>
                                <FormGroup>
                                    <Label className='form-label dr-text-primary' for='login-email'>
                                        Your Email
                                    </Label>
                                    <InputGroup className='input-group-merge'>
                                        <InputGroupText className="input-left">
                                            <CiMail color="#d6b636" size={15} />
                                        </InputGroupText>
                                        <Input
                                            type='email'
                                            value={email}
                                            id='login-email'
                                            name='login-email'
                                            placeholder='example@site.com'
                                            onChange={e => setEmail(e.target.value)}
                                            className={classnames("input-left py-2", { 'is-invalid': errors['login-email'] })}
                                            innerRef={register({ required: true, validate: value => value !== '' })}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label className='form-label dr-text-primary' htmlFor='firstname'>
                                        Your Message<span className='text-danger'>*</span>
                                    </Label>
                                    <InputGroup className='input-group-merge mb-2'>
                                        <InputGroupText className="input-left align-items-start">
                                            <img src={require('../../../assets/images/drone-images/leaf.png').default} className="mt-1" />
                                        </InputGroupText>
                                        <Input
                                            type='textarea'
                                            placeholder='Write your text here...'
                                            id='firstname'
                                            name='firstname'
                                            className={classnames("input-left py-2", { 'is-invalid': errors['firstname'] })}
                                            innerRef={register({ required: true, validate: value => value !== '' })}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <Button.Ripple type='submit' block className="mt-2 bg-btn py-1">
                                    {(buttonDisable) ? <> <Spinner color='white' size='sm' /> </> : 'Submit'}
                                </Button.Ripple>
                            </Form>
                        </div>
                    </div>
                </Col>
                <Col lg="4"></Col>
            </Row>

        </div>
    )
}

export default Contact
