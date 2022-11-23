import React, { useState } from "react"
import { Row, Col, Container, Input, InputGroup, InputGroupText, FormGroup, Label } from "reactstrap"
import { Search } from "react-feather"
import Feedback from "../Feedback"
import { useHistory } from "react-router-dom"

const Navbar = () => {

    const history = useHistory()
    const [feedbackOpen, setFeedbackOpen] = useState(false)

    const toggleFeedback = () => {
        setFeedbackOpen(!feedbackOpen)
    }

    return (
        <>
            <div className="bg-nav">
                <Container>
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
                                <img src={require('../../assets/images/drone-images/upload.png').default} className="img-fluid mr-2" />

                            </div>
                            <div className="d-flex border-right-nav align-items-center px-1">
                                <img src={require('../../assets/images/drone-images/calendar.png').default} className="img-fluid mr-2" />

                            </div>
                            <div className="d-flex align-items-center px-1">
                                <img src={require('../../assets/images/drone-images/map.png').default} className="img-fluid mr-2" />

                            </div>
                        </Col>}
                        {(window.location.pathname.includes('projects') || window.location.pathname.includes('folder')) ? <Col xl="3" lg="3" md="3" sm="6" xs="12" className="d-flex justify-content-end align-items-center">
                            <p className="text-yellow text-underline border-right-nav mb-0 px-2 py-1 cursor-pointer" onClick={() => toggleFeedback()}>Feedback</p>
                            <div className="border-right-nav px-2 d-flex align-items-center py-1">
                                <img src={require('../../assets/images/drone-images/notification.png').default} className="img-fluid" />
                            </div>
                            <div className="px-2">
                                <img src={require('../../assets/images/drone-images/avatar-blank.png').default} className="img-fluid cursor-pointer" onClick={() => history.push('/profile')} />
                            </div>
                        </Col> : <Col xl="3" lg="3" md="3" sm="6" xs="12" className="d-flex justify-content-end align-items-center">
                            <div className="d-flex border-right-nav align-items-center px-1">
                                <img src={require('../../assets/images/drone-images/arrow-right.png').default} className="img-fluid mr-1" />

                            </div>
                            <div className="d-flex border-right-nav align-items-center px-1">
                                <img src={require('../../assets/images/drone-images/notification.png').default} className="img-fluid mx-1" />

                            </div>
                            <div className="d-flex align-items-center px-1">
                                <img src={require('../../assets/images/drone-images/avatar-blank.png').default} width={40} height={40} className="img-fluid cursor-pointer" onClick={() => history.push('/profile')} />

                            </div>
                        </Col>}
                    </Row>
                </Container>
            </div>
            <Feedback isOpen={feedbackOpen} toggle={toggleFeedback} />
        </>
    )
}

export default Navbar