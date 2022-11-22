// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components

// ** Styles
import '@styles/react/apps/app-users.scss'
import Sidebar from './Sidebar'
import UpdateProfile from './UpdateProfile'
import AccountSettings from './AccountSettings'

const UserView = () => {

  // ** Get suer on mount
  useEffect(() => {

  }, [])

  return (
    <>
      <Navbar />
      <div className='app-user-view container'>
        <Row className="my-2">
          <Col lg="3">
            <Sidebar />
          </Col>
          <Col lg="9">
            {window.location.href.indexOf('/profile') > -1 && <UpdateProfile />}
            {window.location.href.indexOf('/account-settings') > -1 && <AccountSettings />}
          </Col>
        </Row>
      </div>
    </>
  )
}
export default UserView
