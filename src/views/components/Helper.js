import { Fragment } from 'react'
import Avatar from '@components/avatar'
import { CheckCircle, X } from 'react-feather'
import { toast } from 'react-toastify'
import moment from 'moment'
import axios from 'axios'
import ReactPlayer from 'react-player'

const OpenToast = ({ color, title, message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={(color === 'success') ? <CheckCircle size={12} /> : <X size={12} />} />
        <h6 className='toast-title'>{title}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const OpenNotification = (type, title, message) => {
  toast[type](<OpenToast color={(type === 'error') ? 'danger' : type} title={title} message={message} />, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: true
  })
}

const formatPhoneNumber = (value) => {

  if (!value) return value

  const phoneNumber = value.replace(/[^\d]/g, '')
  const phoneNumberLength = phoneNumber.length
  if (phoneNumberLength < 4) return phoneNumber

  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`
  }

  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
}

const checkStatus = async (url) => {
  const accessToken = '31966c6e34c1574433f6aab8564b71f2'

  const videoId = url.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i)

  const headerPost = {
    Accept: 'application/vnd.vimeo.*+jsonversion=3.4',
    Authorization: `bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }

  const response = await axios({
    method: 'get',
    url: `https://api.vimeo.com/videos/${videoId[1]}?fields=uri,upload.status,transcode.status`,
    headers: headerPost
  })

  return response
}

const getvideoStatus = async (url) => {
  const data = await checkStatus(url)
  console.log(data)
}

export { OpenNotification, formatPhoneNumber, getvideoStatus }