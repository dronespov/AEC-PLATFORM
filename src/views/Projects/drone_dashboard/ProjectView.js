import React, { useEffect, useState } from "react"
import Navbar from "../../../components/Navbar"
import { Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import { MoreVertical } from "react-feather"
import ShareProject from "./ShareProject"
import DeleteConfirmation from "../../components/DeleteConfirmation"
import { FcFolder } from 'react-icons/fc'
import { useHistory } from "react-router-dom"
import { Service } from '@src/services/Service'
import { OpenNotification } from '@src/views/components/Helper'
import HeaderDashboard from "../../../components/header_dashboard"
import { sortedLastIndex } from "lodash"

const ProjectView = () => {
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [activeView, setActiveView] = useState('grid')

    const toggleDelete = () => {
        setIsDelete(!isDelete)
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    // const getList = () => {

    //     Service.post({
    //         url: 'project/search',
    //         body: JSON.stringify({ limit: '10', page: "1" })
    //     })
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(err => {
    //             setButtonDisable(false)
    //             OpenNotification('error', 'Oops!', 'Something went wrong!')
    //         })
    // }
    // useEffect(() => {
    //     getList()
    // }, [])

    const images = [
        {
            image: <img src={require('../../../assets/images/drone-images/dashboard-project.png').default} className="img-fluid" onClick={() => history.push('/ACE_platform')} />,
            title: 'Project Name'
        },
        {
            image: <div className="folder-bg d-flex align-items-center justify-content-center cursor-pointer" onClick={() => history.push('/folder')}><FcFolder size={50} /></div>,
            title: 'Folder Name'
        },
        {
            image: <img src={require('../../../assets/images/drone-images/dashboard-project.png').default} className="img-fluid" onClick={() => history.push('/ACE_platform')} />,
            title: 'Project Name'
        },
        {
            image: <img src={require('../../../assets/images/drone-images/dashboard-project.png').default} className="img-fluid" onClick={() => history.push('/ACE_platform')} />,
            title: 'Project Name'
        },
        {
            image: <div className="folder-bg d-flex align-items-center justify-content-center" onClick={() => history.push('/folder')}><FcFolder size={50} /></div>,
            title: 'Folder Name'
        },
        {
            image: <img src={require('../../../assets/images/drone-images/dashboard-project.png').default} className="img-fluid" onClick={() => history.push('/ACE_platform')} />,
            title: 'Project Name'
        },
        {
            image: <div className="folder-bg d-flex align-items-center justify-content-center" onClick={() => history.push('/folder')}><FcFolder size={50} /></div>,
            title: 'Folder Name'
        },
        {
            image: <img src={require('../../../assets/images/drone-images/dashboard-project.png').default} className="img-fluid" onClick={() => history.push('/ACE_platform')} />,
            title: 'Project Name'
        }
    ]
    const listImages = [
        {
            image: <img src={require('../../../assets/images/drone-images/map1.png').default} className="img-fluid" onClick={() => history.push('/ACE_platform')} />,
            title: 'Project Name'
        },
        {
            image: <FcFolder size={40} />,
            title: 'Folder Name'
        },
        {
            image: <img src={require('../../../assets/images/drone-images/map1.png').default} className="img-fluid" />,
            title: 'Project Name'
        },
        {
            image: <img src={require('../../../assets/images/drone-images/map1.png').default} className="img-fluid" />,
            title: 'Project Name'
        },
        {
            image: <FcFolder size={40} />,
            title: 'Folder Name'
        },
        {
            image: <img src={require('../../../assets/images/drone-images/map1.png').default} className="img-fluid" />,
            title: 'Project Name'
        },
        {
            image: <FcFolder size={40} />,
            title: 'Folder Name'
        },
        {
            image: <img src={require('../../../assets/images/drone-images/map1.png').default} className="img-fluid" />,
            title: 'Project Name'
        }
    ]

    const VerticalDropDown = () => {
        return (
            <UncontrolledDropdown>
                <DropdownToggle tag='div' className='btn btn-sm p-0'>
                    <MoreVertical color={`${activeView === 'list' ? '#d6b636' : '#B7B7B3'}`} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu right className="bg-submenu">
                    <DropdownItem className='w-100' onClick={() => toggle()}>
                        <img src={require('../../../assets/images/drone-images/share.png').default} width={15} /> <span className='align-middle text-white ml-1'>Share Project</span>
                    </DropdownItem>
                    <DropdownItem className='w-100'>
                        <img src={require('../../../assets/images/drone-images/reports.png').default} width={15} /> <span className='align-middle text-white ml-1'>Reports</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => toggle()}>
                        <img src={require('../../../assets/images/drone-images/move-to-folder.png').default} width={15} /> <span className='align-middle text-white ml-1'>Move to Folder</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => toggleDelete()}>
                        <img src={require('../../../assets/images/drone-images/delete.png').default} width={15} /> <span className='align-middle text-white ml-1'>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    return (
        <>
            <HeaderDashboard activeView={activeView} setActiveView={setActiveView} />
            {activeView === 'grid' && <Row className="mt-3">
                {images && images.length > 0 && images.map((item) => (
                    <Col xxl="3" xl="4" lg="4" md="6" sm="6" className="mt-2 cursor-pointer">
                        <div className="bg-project p-1 position-rel1">
                            <div>{item.image}</div>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                                <div>
                                    <h4 className="mb-0 text-white">{item.title}</h4>
                                    <p>Created on Sep 24, 2022</p>
                                </div>
                                <VerticalDropDown />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>}
            {
                activeView === 'list' && <><Row className="bg-submenu rounded py-1 mr-1 align-items-center justify-content-center mt-3">
                    <Col xl="6">
                        <h4 className="text-white">Project Name</h4>
                    </Col>
                    <Col xl="6">
                        <h4 className="text-white">Created on</h4>
                    </Col>
                </Row>

                    {listImages && listImages.length > 0 ? listImages.map((item) => (
                        <Row className="bg-nav align-items-center justify-content-center rounded mr-1 py-1 mt-1">
                            <Col xl="6" className="d-flex align-items-center">
                                <span>{item.image}</span><h5 className="text-white mb-0 ml-1">{item.title}</h5>
                            </Col>
                            <Col xl="6" className="d-flex justify-content-between">
                                <p className="dr-text-primary mb-0">Created on Sep 24, 2022</p>
                                <VerticalDropDown />
                            </Col>
                        </Row>
                    )) : <h1 className="py-5 text-center align-middle text-white">No data found</h1>}
                </>

            }
            <ShareProject isOpen={isOpen} toggle={toggle} />
            <DeleteConfirmation isOpen={isDelete} toggle={toggleDelete} />
        </>
    )
}

export default ProjectView