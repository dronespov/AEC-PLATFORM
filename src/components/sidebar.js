import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useHistory } from 'react-router-dom'
import { handleLogout } from "../redux/actions/auth"
import { Tooltip } from "reactstrap"

const Sidebar = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const [openSettings, setOpenSettings] = useState(false)
    const [openTrash, setOpenTrash] = useState(false)
    const [openLogout, setOpenLogout] = useState(false)

    const toggleSet = () => setOpenSettings(!openSettings)
    const toggleTrash = () => setOpenTrash(!openTrash)
    const toggleLogout = () => setOpenLogout(!openLogout)

    return (
        <>
            <div className="bg-left p-1 position-rel">
                <div className={`cursor-pointer d-flex align-items-center p-1 mb-2 ${(window.location.href.indexOf('/dashboard')) > -1 && 'input-left rounded-lg d-block'}`} onClick={() => history.push('/dashboard')}>
                    <img src={require('../assets/images/drone-images/menu.png').default} />
                    <h4 className="ml-1 mb-0 text-white display-5">Dashboard</h4>
                </div>
                <div className={`cursor-pointer d-flex align-items-center p-1 mb-2 ${((window.location.href.indexOf('/projects')) > -1 || (window.location.href.indexOf('/folder')) > -1) && 'input-left rounded-lg d-block'}`} onClick={() => history.push('/projects')}>
                    <img src={require('../assets/images/drone-images/file.png').default} />
                    <h4 className="ml-1 mb-0 text-white display-5">Projects</h4>
                </div>
                <div className="position-abs px-2 my-3 w-100">
                    <div className="bg-actions rounded px-1 py-1 d-flex justify-content-center align-items-center">
                        <img src={require('../assets/images/drone-images/settings.png').default} className="mx-1" id="settings" />
                        <img src={require('../assets/images/drone-images/delete.png').default} className="mx-1" id="trash" />
                        <Link to='/login' >
                            <img src={require('../assets/images/drone-images/back.png').default} id="logout" className="mx-1 cursor-pointer" onClick={() => dispatch(handleLogout())} />
                        </Link>
                    </div>
                </div>
            </div>
            <Tooltip
                isOpen={openSettings}
                target="settings"
                toggle={toggleSet}
                placement="bottom"
            >
                Settings
            </Tooltip>
            <Tooltip
                isOpen={openTrash}
                target="trash"
                toggle={toggleTrash}
                placement="bottom"
            >
                Trash
            </Tooltip>
            <Tooltip
                isOpen={openLogout}
                target="logout"
                toggle={toggleLogout}
                placement="bottom"
            >
                Log Out
            </Tooltip>
        </>)
}
export default Sidebar