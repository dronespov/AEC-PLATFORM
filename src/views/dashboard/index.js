import React, { useState } from "react"
import Navbar from "../../components/Navbar"
import { Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import Sidebar from "../../components/sidebar"
import HeaderDashboard from "../../components/header_dashboard"
import CardCongratulations from "../ui-elements/cards/advance/CardCongratulations"

const Dashboard = () => {

    return (
        <>
            <Navbar />
            <div className="container py-2">
                <Row>
                    <Col lg="3" xl="3" xs="12" sm="12" md="3">
                        <Sidebar />
                    </Col>
                    <Col lg="9" xl="9" md="9" className="position-rel2 mt-4 mt-md-0">
                        <CardCongratulations />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard