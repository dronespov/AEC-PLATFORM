import React, { useState } from 'react'
import { Button, Input, Modal, ModalBody, CardTitle, Form, FormGroup, Label, InputGroup, InputGroupText, ModalHeader, Card } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'

const Generic = ({ isOpen, toggle }) => {

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="mt-2">
            <ModalHeader toggle={toggle} className="mt-1 mr-2 d-flex align-items-center">
                <img src={require('@src/assets/images/drone-images/logo.png').default} className="img-fluid" />
            </ModalHeader>
            <ModalBody className="py-1">
                <div>
                    <p className='text-white'>What do you think of this?</p>
                    <div className='d-flex'>
                        <img src={require('@src/assets/images/drone-images/pouting-smily.png').default} className="img-fluid mr-1" />
                        <img src={require('@src/assets/images/drone-images/worried-smily.png').default} className="img-fluid mr-1" />
                        <img src={require('@src/assets/images/drone-images/neutral-smily.png').default} className="img-fluid mr-1" />
                        <img src={require('@src/assets/images/drone-images/smile-smily.png').default} className="img-fluid mr-1" />
                        <img src={require('@src/assets/images/drone-images/star-smily.png').default} className="img-fluid" />
                    </div>
                </div>
                <div className='mt-1'>
                    <p className='text-white'>What would you like to share with us?</p>
                    <Input type="textarea" className="input-left text-area-border" />
                </div>
                <div className='mt-1'>
                    <p className='text-white'>How likely are you recommend us to your friends & colleagues?</p>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <span className='number border-white'>{item}</span>
                    ))}
                </div>
                <div className='mt-1'>
                    <p className='text-white'>May we contact you if we need additional feedback? If yes, please add your email</p>
                    <Input type="text" className="input-left" placeholder='Your email' />
                </div>
                <div className="submit-feedback text-right py-1 px-3 mt-2">
                    <h5 className="text-dark font-weight-bold mb-0">Submit</h5>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default Generic