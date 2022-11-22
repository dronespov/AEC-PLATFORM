import React from "react"
import { useHistory } from 'react-router-dom'

const Sidebar = () => {
    const history = useHistory()
    return (
        <>
            <div className="bg-left p-1 position-rel">
                <div className="d-flex align-items-center mb-3">
                    <img src={require('../../assets/images/drone-images/settings.png').default} className="mx-1" /><h4 className="mb-0 text-white">Settings</h4>
                </div>
                <div className={`cursor-pointer d-flex align-items-center p-1 ${(window.location.href.indexOf('/profile')) > -1 && 'input-left rounded-lg d-block'}`} onClick={() => history.push('/profile')}>
                    <h5 className="mb-0 text-white display-5">Profile Settings</h5>
                </div>
                <div className={`cursor-pointer d-flex align-items-center p-1 mb-2 ${((window.location.href.indexOf('/account-settings')) > -1) && 'input-left rounded-lg d-block'}`} onClick={() => history.push('/account-settings')}>
                    <h5 className="mb-0 text-white display-5">Account Settings</h5>
                </div>
            </div>
        </>)
}
export default Sidebar