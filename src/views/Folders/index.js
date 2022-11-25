import { useState } from "react"
import Navbar from "@src/components/Navbar"
import { Row, Col } from "reactstrap"
import HeaderDashboard from "@src/components/header_dashboard"
import Sidebar from "@src/components/sidebar"
import FolderView from "./FolderView"

const Folders = (props) => {
    console.log(props)
    console.log('component loaded')
    return (
        <>
            <Navbar />
            <div className="p-2">
                <Row>
                    <Col lg="3" xl="2" xs="12" sm="12" md="3">
                        <Sidebar />
                    </Col>
                    <Col lg="9" xl="10" md="9" className="position-rel2 mt-4 mt-md-0">
                        <FolderView />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Folders 