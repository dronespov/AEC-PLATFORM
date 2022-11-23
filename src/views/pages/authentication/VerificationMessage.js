
import { isUserLoggedIn } from '@utils'
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText } from 'reactstrap'


import '@styles/base/pages/page-auth.scss'

const VerificationMessage = () => {

    if (!isUserLoggedIn()) {
        return (
            <div>
                <Row>
                    <Col xl="5" lg="5" md="12" sm="12" xs="12" className="bg-left-auth d-flex justify-content-center align-items-center position-rel">
                        <div className="p-1 my-3">
                            <Col className='px-xl-3 mx-auto' xs="12" sm='12' md='12' lg='12'>
                                <div className='text-center mb-3'>
                                    <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                                        <img src={require('../../../assets/images/drone-images/logo.png').default} />
                                    </Link>
                                </div>
                                <CardTitle tag='h2' className='font-weight-bold mb-1 text-white'>
                                    Forgot Your Password?
                                </CardTitle>

                                <p className='text-center mt-2'>
                                    <Link to='/login'>
                                        <span className='dr-text-primary align-middle'>Return to Sign In</span>
                                    </Link>
                                </p>
                            </Col>
                        </div>
                        <footer className='dr-text-primary text-center position-abs3'>©2022. ALL RIGHTS RESERVED</footer>
                    </Col>
                    <Col xl="7" lg="7" md="12" sm="12" xs="12" className="bg-right-signin d-none d-lg-block">
                        <div className='p-3 my-3'>
                            <h1 className='text-white'>Header Text</h1>
                            <p className='dr-text-primary'>Sub Header Text</p>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    } else {
        return <Redirect to='/' />
    }
}

export default VerificationMessage
