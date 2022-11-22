import { Fragment, useState, useCallback, useRef, useEffect } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { Button, Spinner } from 'reactstrap'

const GetVideoStatus = ({ url }) => {

  const [status, setStatus] = useState(false)
  let intervalID

  const getvideoStatus = async (url) => {
 
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
  
    if (response && response.data.transcode.status && response.data.transcode.status === 'complete') {
      setStatus(true)
      clearInterval(intervalID)
    }
    
  }

  useEffect(() => {
    getvideoStatus(url)

    intervalID = setInterval(() => {
      getvideoStatus(url)
    }, 30000)
  }, [])

  return (
    <Fragment>
      {(!status) ? <div className='d-flex align-items-center'><Spinner size='sm' type='grow' />&nbsp; <span>Video is being processed</span></div> : <ReactPlayer
          url={url}
          className='react-player-video'
          width='100%'
          controls={true}
        />
      }
    </Fragment>
  )
}
export default GetVideoStatus
