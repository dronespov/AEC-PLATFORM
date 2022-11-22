// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle, User } from 'react-feather'
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

import { Service } from '@src/services/Service'
import Config from '@src/configs/config.json'

// ** Utils
import { isUserLoggedIn, getprofileData } from '@utils'

// ** Store & Actions
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const NotificationDropdown = () => {

  const history = useHistory()

  // ** Store Vars
  const { userData } = useSelector(({ auth }) => auth)

  // ** Notification Array
  const [notifications, setNotifications] = useState([])
  const [profileData, setProfileData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setProfileData(JSON.parse(localStorage.getItem('auth')))
    }
  }, [userData])

  // GET NOTIFICATIONS
  const getNotifications = () => {

    Service.get({ url: '/notification/list' })
      .then(response => {
        if (response.status === "success") {
          setNotifications(response.data.audits)
        }
      })
  }

  useEffect(() => {
    getNotifications()
  }, [])

  const events = [
    {
      event: 'qrcode',
      data: 'QR Code Scanned'
    },
    {
      event: 'call to action',
      data: 'Clicked call to action'
    },
    {
      event: 'video_played',
      data: 'Played Video'
    },
    {
      event: 'schedule',
      data: 'Scheduled Call'
    }
  ]

  const handleAction = (val) => {
    const res = events.filter((item) => item.event === val)

    if (res && res.length > 0) {
      return res[0].data
    }
  }

  const handleNavigation = (item) => {

    Service.patch({ url: `/notification/update/${item.id}`})
      .then(response => {
        getNotifications()
        history.push(`/campaign/view/${item.group_id}`)
    })
  }

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {notifications.map((item, index) => {
          return (
            <div className='d-flex'>
              <Media
                className={classnames('cursor-pointer d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
                onClick={() => handleNavigation(item)}
              >
                <Fragment>
                  <Media left>
                    <Avatar
                      {...((profileData.avatar && profileData.avatar !== null && profileData.avatar !== '')
                        ? { img: `${Config.MEDIA_URL}${profileData.avatar}`, imgHeight: 32, imgWidth: 32 }
                        : {
                          icon: <User size='14' />,
                          color: 'light-secondary'
                        })}
                    />
                  </Media>
                  <Media body>
                    <Media tag='p' heading>
                      <span className='font-weight-bolder'>{item.campaign && item.campaign.name}</span> [{item.campaign && item.campaign.unique_id}]
                    </Media>
                    <small className='notification-text'>{handleAction(item.event_type)}</small>
                  </Media>
                </Fragment>
              </Media>
            </div>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
          {notifications.length}
        </Badge>
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {notifications.length} New
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
