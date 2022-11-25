import React, { useState } from "react"
import HeaderDashboard from "../../components/header_dashboard"

const FolderView = () => {

    const [activeView, setActiveView] = useState('grid')

    return (
        <>
            <HeaderDashboard activeView={activeView} setActiveView={setActiveView} />
            <div className="position-abs-folder">
                <img src={require('../../assets/images/drone-images/empty-folder.png').default} />
                <h4 className="text-white">This folder is empty</h4>
            </div>
        </>
    )
}

export default FolderView