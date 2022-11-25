import React from 'react'
import { Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import OwnerDropdown from './OwnerDropdown'

const CreateProject = ({ isOpen, toggle }) => {

    const { register, errors, handleSubmit } = useForm()
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle} className="mt-1 mr-2 d-flex align-items-center">
                <h3 className='text-white'>Create Project</h3>
            </ModalHeader>
            <ModalBody>
                <Input
                    type='text'
                    placeholder='Project Name'
                    id='firstname'
                    name='firstname'
                    className={classnames("input-left py-2", { 'is-invalid': errors['firstname'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                />
                <div className='search-box'>
                    <InputGroup className="mt-2">
                        <Input
                            type='text'
                            placeholder='Share with email'
                            id='firstname'
                            name='firstname'
                            className={classnames("input-left py-2", { 'is-invalid': errors['firstname'] })}
                            innerRef={register({ required: true, validate: value => value !== '' })}
                        />
                        <InputGroupText><OwnerDropdown /></InputGroupText>
                    </InputGroup>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex align-items-center folder mr-2 px-1">
                        <img src={require('../../../assets/images/drone-images/link.png').default} className="img-fluid" />
                        <h5 className="text-secondary font-weight-bold ml-1 mb-0">Copy [access] link</h5>
                    </div>
                    <div className="project py-1 px-3">
                        <h5 className="text-dark font-weight-bold ml-1 mb-0">Create</h5>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default CreateProject