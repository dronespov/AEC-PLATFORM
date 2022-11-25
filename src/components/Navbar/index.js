import React, { useState } from "react"
import { Row, Col, Container, Input, InputGroup, InputGroupText, FormGroup, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Popover, PopoverBody } from "reactstrap"
import { ChevronDown, Search, ChevronUp, X } from "react-feather"
import Feedback from "../../views/Feedback"
import { useHistory, Link } from "react-router-dom"
import Select from "react-select"
import { useDispatch } from "react-redux"
import UploadMap from "../../views/Projects/drone_dashboard/UploadMap"
import { handleLogout } from "../../redux/actions/auth"

const Navbar = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [feedbackOpen, setFeedbackOpen] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [openMapUpload, setOpenMapUpload] = useState(false)

    const toggleCalendar = () => setOpenCalendar(!openCalendar)
    const toggleUploadMap = () => setOpenMapUpload(!openMapUpload)

    const toggleFeedback = () => {
        setFeedbackOpen(!feedbackOpen)
    }
    const colourStyles = {
        option: () => {
            return {
                backgroundColor: '#151517',
                color: '#B1B5C3',
                padding: '10px',
                fontSize: '16px'
            }
        }
    }
    const options = [
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' },
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' },
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' },
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' },
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' },
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' },
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' },
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' },
        { value: '22 October 2022 | 04:00 PM', label: '22 October 2022 | 04:00 PM' }
    ]

    const VerticalDropDown = () => {
        return (
            <UncontrolledDropdown>
                <DropdownToggle tag='div' className='btn btn-sm p-0'>
                    <div className="px-2">
                        <img src={require('../../assets/images/drone-images/avatar-blank.png').default} className="img-fluid cursor-pointer" />
                    </div>
                </DropdownToggle>
                <DropdownMenu right className="bg-submenu">
                    <DropdownItem className='w-100' onClick={() => history.push('/profile')}>
                        <h4 className='align-middle text-white ml-1'>Profile</h4>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => dispatch(handleLogout())}>
                        <Link to='/login' ><h4 className='align-middle text-white ml-1'>Log Out</h4></Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )

    }

    return (
        <>
            <div className="bg-nav px-2">
                <Row className="d-flex justify-content-center align-items-center py-1">
                    <Col xl="3" lg="3" md="3" sm="12" xs="12">
                        <img src={require('../../assets/images/drone-images/logo.png').default} />
                    </Col>
                    {(window.location.pathname.includes('projects') || window.location.pathname.includes('folder')) ? <Col xl="6" lg="6" md="6" sm="6" xs="12" className="text-center">
                        <FormGroup className="mb-0 search-box">
                            <InputGroup className='input-group-merge px-md-5'>
                                <Input
                                    type='text'
                                    name='searchtext'
                                    placeholder='Search'
                                    className="input-left py-2"
                                />
                                <InputGroupText className="input-left">
                                    <Search color="#B1B5C3" size={15} />
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </Col> : <Col xl="6" lg="6" md="6" sm="6" xs="12" className="d-flex justify-content-center align-items-center">
                        <div className="d-flex border-right-nav align-items-center px-1">
                            <img src={require('../../assets/images/drone-images/upload.png').default} className="img-fluid mr-2" onClick={() => toggleUploadMap()} />

                        </div>
                        <div className="d-flex border-right-nav align-items-center px-1" id="controlledPopover">
                            <img src={require('../../assets/images/drone-images/calendar.png').default} className="img-fluid mr-1" />
                            {openCalendar ? <ChevronUp color="#d6b636" size={20} /> : <ChevronDown color="#d6b636" size={20} />}
                        </div>
                        <Popover
                            placement='top'
                            target='controlledPopover'
                            isOpen={openCalendar}
                            toggle={toggleCalendar}
                            className="bg-calendar mt-5 w-100"
                        >
                            <PopoverBody className="py-2">
                                <Row className="align-items-center justify-content-between">
                                    <Col lg="5">
                                        <Select className="mr-1 bg-select w-100" styles={colourStyles} options={options}>
                                        </Select>
                                    </Col>
                                    <Col lg="5">
                                        <Select className="mr-1 bg-select" styles={colourStyles} options={options}>
                                        </Select></Col>
                                    <Col lg="2">
                                        <X color="#d6b636" onClick={() => toggleCalendar()} /></Col>
                                </Row>
                            </PopoverBody>
                        </Popover>
                        <div className="d-flex align-items-center px-1">
                            <img src={require('../../assets/images/drone-images/map.png').default} className="img-fluid mr-2" />
                        </div>
                    </Col>}
                    {(window.location.pathname.includes('projects') || window.location.pathname.includes('folder')) ? <Col xl="3" lg="3" md="3" sm="6" xs="12" className="d-flex justify-content-end align-items-center">
                        <p className="text-yellow text-underline border-right-nav mb-0 px-2 py-1 cursor-pointer" onClick={() => toggleFeedback()}>Feedback</p>
                        <div className="border-right-nav px-2 d-flex align-items-center py-1">
                            <img src={require('../../assets/images/drone-images/notification.png').default} className="img-fluid" />
                        </div>
                        <VerticalDropDown />
                    </Col> : <Col xl="3" lg="3" md="3" sm="6" xs="12" className="d-flex justify-content-end align-items-center">
                        <p className="text-yellow text-underline border-right-nav mb-0 px-2 cursor-pointer" onClick={() => toggleFeedback()}>Feedback</p>
                        <div className="d-flex border-right-nav align-items-center px-1">
                            <img src={require('../../assets/images/drone-images/arrow-right.png').default} className="img-fluid mr-1" />

                        </div>
                        <div className="d-flex border-right-nav align-items-center px-1">
                            <img src={require('../../assets/images/drone-images/notification.png').default} className="img-fluid mx-1" />

                        </div>
                        <VerticalDropDown />
                    </Col>}
                </Row>
            </div>
            <Feedback isOpen={feedbackOpen} toggle={toggleFeedback} setFeedbackOpen={setFeedbackOpen} />
            <UploadMap isOpen={openMapUpload} toggle={toggleUploadMap} />
        </>
    )
}

export default Navbar