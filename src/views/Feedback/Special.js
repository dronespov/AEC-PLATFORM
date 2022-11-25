import React, { useState } from 'react'
import { Button, Input, Modal, ModalBody, CardTitle, Form, FormGroup, Label, InputGroup, InputGroupText, ModalHeader, Card } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'

const Special = ({ isOpen, toggle }) => {

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="mt-2">
            <ModalHeader toggle={toggle} className="mt-1 mr-2 d-flex align-items-center">
            </ModalHeader>
            <ModalBody className="py-1">
                <h5 className='text-white'>Click on the part of the page you would like to give feedback about</h5>
            </ModalBody>
        </Modal >
    )
}

export default Special