// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import * as Icon from 'react-feather'
import classnames from 'classnames'
import Autocomplete from '@components/autocomplete'
import {
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getBookmarks, updateBookmarked, handleSearchQuery } from '@store/actions/navbar'

const NavbarBookmarks = props => {
  // ** Props
  const { setMenuVisibility } = props

  // ** State
  const [value, setValue] = useState('')
  const [openSearch, setOpenSearch] = useState(false)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.navbar)

  // ** If user has more than 10 bookmarks then add the extra Bookmarks to a dropdown
  const renderExtraBookmarksDropdown = () => {
    if (store.bookmarks.length && store.bookmarks.length >= 11) {
      return (
        <NavItem className='d-none d-lg-block'>
          <NavLink tag='span'>
            <UncontrolledDropdown>
              <DropdownToggle tag='span'>
                <Icon.ChevronDown className='ficon' />
              </DropdownToggle>
              <DropdownMenu right>
                {store.bookmarks
                  .map(item => {
                    const IconTag = Icon[item.icon]
                    return (
                      <DropdownItem tag={Link} to={item.link} key={item.id}>
                        <IconTag className='mr-50' size={14} />
                        <span className='align-middle'>{item.title}</span>
                      </DropdownItem>
                    )
                  })
                  .slice(10)}
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavLink>
        </NavItem>
      )
    } else {
      return null
    }
  }

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(''))

  // ** Loops through Bookmarks Array to return Bookmarks
  const onKeyDown = e => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setOpenSearch(false)
        handleClearQueryInStore()
      }, 1)
    }
  }

  // ** Function to toggle Bookmarks
  const handleBookmarkUpdate = id => dispatch(updateBookmarked(id))

  // ** Function to handle Bookmarks visibility
  const handleBookmarkVisibility = () => {
    setOpenSearch(!openSearch)
    setValue('')
    handleClearQueryInStore()
  }

  // ** Function to handle Input change
  const handleInputChange = e => {
    setValue(e.target.value)
    dispatch(handleSearchQuery(e.target.value))
  }

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (openSearch === true) {
      setOpenSearch(false)
      handleClearQueryInStore()
    }
  }

  // ** Function to clear input value
  const handleClearInput = setUserInput => {
    if (!openSearch) {
      setUserInput('')
      handleClearQueryInStore()
    }
  }

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <ul className='nav navbar-nav bookmark-icons'>
        <NavItem key={'dashboard'} className='d-none d-lg-block'>
          <NavLink tag={Link} to={'/'} id={'dashboard'}>
            <Icon.Home className='ficon' />
            <UncontrolledTooltip target={'dashboard'}>Dashboard</UncontrolledTooltip>
          </NavLink>
        </NavItem>
        <NavItem key={'campaign'} className='d-none d-lg-block'>
          <NavLink tag={Link} to='/campaigns' id={'campaign'}>
            <Icon.Grid className='ficon' />
            <UncontrolledTooltip target={'campaign'}>Create Campaign</UncontrolledTooltip>
          </NavLink>
        </NavItem>
        <NavItem key={'recipient'} className='d-none d-lg-block'>
          <NavLink tag={Link} to='/recipients' id={'recipient'}>
            <Icon.UserCheck className='ficon' />
            <UncontrolledTooltip target={'recipient'}>Recipients</UncontrolledTooltip>
          </NavLink>
        </NavItem>
        <NavItem key={'profile'} className='d-none d-lg-block'>
          <NavLink tag={Link} to='/profile' id={'profile'}>
            <Icon.User className='ficon' />
            <UncontrolledTooltip target={'profile'}>Profile</UncontrolledTooltip>
          </NavLink>
        </NavItem>
      </ul>
    </Fragment>
  )
}

export default NavbarBookmarks
