import React from 'react'
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import classnames from 'classnames'

const DeleteConfirmation = ({ isOpen, toggle }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-abs" size="sm">
            <ModalHeader toggle={toggle} className="mt-1 mr-2 d-flex align-items-center">
                <h3 className='text-white'>Are you sure you want to delete this project?</h3>
            </ModalHeader>
            <ModalBody>
                <div className="d-flex justify-content-between mt-3">
                    <button className="folder mr-2 py-1 px-3">
                        <h5 className="text-secondary font-weight-bold ml-1 mb-0">Yes</h5>
                    </button>
                    <button className="project py-1 px-3" onClick={toggle}>
                        <h5 className="text-dark font-weight-bold ml-1 mb-0">No</h5>
                    </button>
                </div>
            </ModalBody>
            <ModalFooter className="d-flex">

            </ModalFooter>
        </Modal>

    )
}

export default DeleteConfirmation