import React from 'react'
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import OwnerDropdown from './OwnerDropdown'

const ShareProject = ({ isOpen, toggle }) => {

    const { register, errors, handleSubmit } = useForm()
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="">
            <ModalHeader toggle={toggle} className="mt-1 mr-2 d-flex align-items-center">
                <h3 className='text-white'>Share Project Name</h3>
            </ModalHeader>
            <ModalBody>
                <Input
                    type='text'
                    placeholder='Enter email (or many, separated with commas)'
                    id='firstname'
                    name='firstname'
                    className={classnames("input-left py-2", { 'is-invalid': errors['firstname'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                />
                <div className='d-flex justify-content-between align-items-center mt-3'>
                    <h5 className='text-white'>People with access</h5>
                    <img src={require('../../../assets/images/drone-images/settings-gray.png').default} />
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                    <div className='d-flex align-items-center'>
                        <img src={require('../../../assets/images/avatars/avatar-blank.png').default} className="img-fluid rounded-circle" width={50} />
                        <div className='ml-1'>
                            <h5 className='text-white mb-0'>Micheal Jones</h5>
                            <small className='dr-text-primary'>micheal.jones@gmail.com</small>
                        </div>
                    </div>
                    <OwnerDropdown />
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                    <div className='d-flex align-items-center'>
                        <img src={require('../../../assets/images/avatars/avatar-blank.png').default} className="img-fluid rounded-circle" width={50} />
                        <div className='ml-1'>
                            <h5 className='text-white mb-0'>1 Project Member</h5>
                            <small className='dr-text-primary'>Individuals can edit all data in project</small>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex align-items-center folder py-1 px-1">
                        <img src={require('../../../assets/images/drone-images/link.png').default} className="img-fluid" />
                        <h5 className="text-secondary font-weight-bold ml-1 mb-0">Copy link</h5>
                    </div>
                    <div className="project py-1 px-3">
                        <h5 className="text-dark font-weight-bold mb-0">Done</h5>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="d-flex">

            </ModalFooter>
        </Modal>
    )
}

export default ShareProject