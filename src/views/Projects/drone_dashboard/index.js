import React, { useState } from "react"
import Navbar from "../../../components/Navbar"
import { Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import { MoreVertical } from "react-feather"
import ShareProject from "./ShareProject"
import DeleteConfirmation from "../../components/DeleteConfirmation"
import ProjectView from "./ProjectView"
import Sidebar from "../../../components/sidebar"

const Drones = () => {

    return (
        <>
            <Navbar />
            <div className="p-2">
                <Row>
                    <Col lg="3" xl="2" xs="12" sm="12" md="3">
                        <Sidebar />
                    </Col>
                    <Col lg="9" xl="10" md="9" className="position-rel2 mt-4 mt-md-0">
                        <ProjectView />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Drones 