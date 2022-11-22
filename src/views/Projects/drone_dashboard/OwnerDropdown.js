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
                <DropdownMenu className="bg-owner-dropdown" left>
                    <DropdownItem >
                        <div className='d-flex flex-column'>
                            <span className='dr-text-primary mb-0 order-2'>Amet minim mollit non deserunt ullamco est sit aliqua.</span>
                            <span className='align-middle text-white order-1'>Owner</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem onClick={(e) => setValue(e.target.innerText)}>
                        <div className='d-flex flex-column'>
                            <p className='dr-text-primary mb-0 order-2'>People can edit, delete, comment & add the files to their Dropbox</p>
                            <span className='align-middle text-white order-1'>View</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem onClick={(e) => setValue(e.target.innerText)}>
                        <div className='d-flex flex-column'>
                            <p className='dr-text-primary mb-0 order-2'>People can view, download & comment</p>
                            <span className='align-middle text-white order-1'>Can Edit</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem onClick={(e) => setValue(e.target.innerText)}>
                        <div className='d-flex flex-column'>
                            <p className='dr-text-primary mb-0 order-2'>Amet minim mollit non deserunt ullamco est sit aliqua.</p>
                            <span className='align-middle text-white order-1'>Can Upload Map</span>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </>

    )
}

export default OwnerDropdown