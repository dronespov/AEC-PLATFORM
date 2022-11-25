import React, { useState } from 'react'
import { FiMapPin } from "react-icons/fi"
import { useHistory } from 'react-router-dom'
import CreateProject from '../views/Projects/drone_dashboard/CreateProject'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

const HeaderDashboard = ({ activeView, setActiveView }) => {

    const [openProject, setOpenProject] = useState(false)

    const toggleProject = () => setOpenProject(!openProject)

    return (
        <>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                <div>
                    {window.location.pathname.includes('folder') && <Breadcrumb>
                        <BreadcrumbItem><h2 className='text-white'>All Project</h2></BreadcrumbItem>
                        <BreadcrumbItem active><h2 className='text-white'>Folder Name</h2></BreadcrumbItem>
                    </Breadcrumb>}
                    {window.location.pathname.includes('projects') && <Breadcrumb>
                        <BreadcrumbItem><h2 className='text-white'>All Project</h2></BreadcrumbItem>
                    </Breadcrumb>}
                </div>

                <div className="d-flex order-1 order-sm-1">
                    <div className="d-flex align-items-center folder mr-2 py-1 px-1 px-lg-2 cursor-pointer" >
                        <img src={require('../assets/images/drone-images/add-project.png').default} className="img-fluid" />
                        <h3 className="text-secondary font-weight-bold ml-1 mb-0">Folder</h3>
                    </div>
                    <div className="d-flex align-items-center folder py-1 px-1 px-lg-2 cursor-pointer" onClick={() => toggleProject()}>
                        <FiMapPin color="#d6b636" size={25} />
                        <h3 className="text-secondary font-weight-bold ml-1 mb-0">Project</h3>
                    </div>
                    {activeView === 'grid' && <div className="bg-menu py-1 px-1 ml-2 cursor-pointer" onClick={() => setActiveView('list')}>
                        <img src={require('../assets/images/drone-images/menu.png').default} className="img-fluid" />
                    </div>}
                    {activeView === 'list' && <div className="bg-menu py-1 px-1 ml-2 cursor-pointer" onClick={() => setActiveView('grid')}>
                        <img src={require('../assets/images/drone-images/list-icon.png').default} className="img-fluid" />
                    </div>}
                </div>
            </div>
            <CreateProject isOpen={openProject} toggle={toggleProject} />
        </>
    )
}

export default HeaderDashboard