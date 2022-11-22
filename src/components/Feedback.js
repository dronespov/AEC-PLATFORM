import React, { useState } from 'react'
import { Button, Input, Modal, ModalBody, CardTitle, Form, FormGroup, Label, InputGroup, InputGroupText, ModalHeader } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { User } from 'react-feather'
import { CiMail } from "react-icons/ci"

const Feedback = ({ isOpen, toggle }) => {

    const [buttonDisable, setButtonDisable] = useState(false)
    const [email, setEmail] = useState('')

    const { register, errors, handleSubmit } = useForm()
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="mt-5">
            <ModalBody>
                <div className='py-2'>
                    <div className='mb-3 text-center'>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <img src={require('@src/assets/images/drone-images/logo.png').default} />
                        </Link>
                    </div>
                    <CardTitle tag='h2' className='font-weight-bold mb-1 text-white'>
                        Header Text
                    </CardTitle>
                    <Form className='auth-login-form mt-2'>
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
                                    <img src={require('@src/assets/images/drone-images/leaf.png').default} className="mt-1" />
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
            </ModalBody>
        </Modal>
    )
}

export default Feedback