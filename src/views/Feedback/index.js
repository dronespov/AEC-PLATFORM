import React, { useState } from 'react'
import { Button, Input, Modal, ModalBody, CardTitle, Form, FormGroup, Label, InputGroup, InputGroupText, ModalHeader, Card } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import Generic from './Generic'
import Special from './Special'

const Feedback = ({ isOpen, toggle, setFeedbackOpen }) => {

    const [openSpecial, setOpenSpecial] = useState(false)
    const [openGeneric, setOpenGeneric] = useState(false)

    const toggleGeneric = () => {
        setFeedbackOpen(false)
        setOpenGeneric(!openGeneric)
    }
    const toggleSpecial = () => {
        setFeedbackOpen(false)
        setOpenSpecial(!openSpecial)
    }
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} className="mt-5">
                <ModalHeader toggle={toggle} className="mt-1 mr-2 d-flex align-items-center">
                    <img src={require('@src/assets/images/drone-images/logo.png').default} className="img-fluid" />
                </ModalHeader>
                <ModalBody>
                    <div className='d-flex'>
                        <Card className="input-left rounded p-1 mr-1 cursor-pointer" onClick={() => toggleSpecial()}>
                            <img src={require('@src/assets/images/drone-images/special.png').default} className="img-fluid" width={80} />
                            <h3 className='text-white w-75'>Specific Feedback</h3>
                            <p className='dr-text-primary w-75'>I'd like to give feedback on a specific part of this page.</p>
                        </Card>
                        <Card className="input-left rounded p-1 cursor-pointer" onClick={() => toggleGeneric()}>
                            <img src={require('@src/assets/images/drone-images/general.png').default} className="img-fluid" width={80} />
                            <h3 className='text-white w-75'>Generic Feedback</h3>
                            <p className='dr-text-primary w-75'>I'd like to give general feedback on the entire website.</p>
                        </Card>
                    </div>
                </ModalBody>
            </Modal>
            <Generic isOpen={openGeneric} toggle={toggleGeneric} />
            <Special isOpen={openSpecial} toggle={toggleSpecial} />
        </>
    )
}

export default Feedback