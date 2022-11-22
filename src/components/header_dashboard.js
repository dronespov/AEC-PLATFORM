import React, { useState } from 'react'
import { FiMapPin } from "react-icons/fi"
import { useHistory } from 'react-router-dom'
import CreateProject from '../views/Projects/drone_dashboard/CreateProject'
import ProjectView from '../views/Projects/drone_dashboard/ProjectView'

const HeaderDashboard = () => {

    const [openProject, setOpenProject] = useState(false)
    const [activeView, setActiveView] = useState('grid')

    const toggleProject = () => setOpenProject(!openProject)

    const history = useHistory()
    return (
        <>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                <h2 className="text-white mt-3 mt-sm-0 mb-0 order-2 order-sm-1">All Project</h2>
                <div className="d-flex order-1 order-sm-1">
                    <div className="d-flex align-items-center folder mr-2 py-1 px-1 px-lg-3 cursor-pointer" >
                        <img src={require('../assets/images/drone-images/add-project.png').default} className="img-fluid" />
                        <h3 className="text-secondary font-weight-bold ml-1 mb-0">Folder</h3>
                    </div>
                    <div className="d-flex align-items-center folder py-1 px-1 px-lg-3 cursor-pointer" onClick={() => toggleProject()}>
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
            <ProjectView activeView={activeView} />
            <CreateProject isOpen={openProject} toggle={toggleProject} />
        </>
    )
}

export default HeaderDashboard