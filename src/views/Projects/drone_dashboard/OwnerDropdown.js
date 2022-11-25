import { Link, useHistory } from 'react-router-dom'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import { useState } from 'react'

const OwnerDropdown = () => {
    const [value, setValue] = useState('Owner')

    const history = useHistory()

    return (
        <>
            <UncontrolledDropdown tag='li' className='dropdown-user nav-item mainTopMenu' onClick={(e) => console.log(e)} >
                <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link align-items-center text-white' onClick={e => e.preventDefault()} >
                    {value}&nbsp; <ChevronDown color='#ffffff' size='14' />
                </DropdownToggle>
                <DropdownMenu left className="bg-submenu">
                    <DropdownItem className={`${value === "Owner" ? "d-flex justify-content-between align-items-center bg-active-menu w-100" : "w-100"}`} onClick={() => setValue('Owner')}>
                        <span className='align-middle text-white'>Owner</span>
                        {value === "Owner" && <img src={require('../../../assets/images/drone-images/check.png').default} className="img-fluid" />}
                    </DropdownItem>
                    <DropdownItem className={`${value === "Can View" ? "d-flex justify-content-between align-items-center bg-active-menu w-100" : "w-100"}`} onClick={() => setValue('Can View')}>
                        <span className='align-middle text-white'>Can View</span>
                        {value === "Can View" && <img src={require('../../../assets/images/drone-images/check.png').default} className="img-fluid" />}
                    </DropdownItem>
                    <DropdownItem className={`${value === "Can Edit" ? "d-flex justify-content-between align-items-center bg-active-menu w-100" : "w-100"}`} onClick={() => setValue('Can Edit')}>
                        <span className='align-middle text-white'>Can Edit</span>
                        {value === "Can Edit" && <img src={require('../../../assets/images/drone-images/check.png').default} className="img-fluid" />}
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </>

    )
}

export default OwnerDropdown