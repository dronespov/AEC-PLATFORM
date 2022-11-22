import React, { useEffect, useState } from 'react'
import * as tus from 'tus-js-client'
import axios from 'axios'
import { Button, Progress, FormGroup, Label, Input } from 'reactstrap'

const accessToken = '31966c6e34c1574433f6aab8564b71f2'

const headerDelete = {
    Accept: 'application/vnd.vimeo.*+jsonversion=3.4',
    Authorization: `bearer ${accessToken}`,
    'Content-Type': 'application/x-www-form-urlencode'
}

const headerPatch = {
    'Tus-Resumable': '1.0.0',
    'Upload-Offset': 0,
    'Content-Type': 'application/offset+octet-stream',
    Accept: 'application/vnd.vimeo.*+jsonversion=3.4'
}

const headerPost = {
    Accept: 'application/vnd.vimeo.*+jsonversion=3.4',
    Authorization: `bearer ${accessToken}`,
    'Content-Type': 'application/json'
}

const VimeoUpload = ({ campaignId, setVimeoUrl, setBtnEnabled }) => {
    
    const [videoUrl, setVideoUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [progressData, setProgressData] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (progressData > progress) {
          setProgress(progressData)
        }
    }, [progressData])

    const handleChange = async eventObject => {
        // Get the selected file from the input element
        const file = eventObject.target.files[0]
        const fileName = `${file.name}_${new Date().getTime()}`
        const fileSize = file.size.toString()
        //console.log(file, fileName, fileSize)
        setLoading(true)
        const response = await axios({
            method: 'post',
            url: `https://api.vimeo.com/me/videos`,
            headers: headerPost,
            data: {
                upload: {
                    approach: 'tus',
                    size: fileSize
                },
                name: (campaignId) ? campaignId : "Campaign New"
            }
        })

        //console.log(response)

        // Create a new tus upload
        const upload = new tus.Upload(file, {
            endPoint: 'https://api.vimeo.com/me/videos',
            uploadUrl: response.data.upload.upload_link,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
                filename: `${file.name}_${new Date().getTime()}`,
                filetype: file.type
            },
            headers: {},
            onError: function (error) {
                console.log(error)
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
                setProgressData(Math.round(percentage))
               
                //console.log(`${bytesUploaded, bytesTotal, percentage}%`)
            },
            onSuccess: function () {
                //console.log('Download %s from %s', upload.file.name, upload.url)
                setVideoUrl(response.data.link)
                setVimeoUrl(response.data.link)
                setBtnEnabled(false)
            }
        })
        //console.log(upload)
        // Start the upload
        upload.start()
    }

    return (
        <>
            <FormGroup>
                <Label for='video'>Video</Label>
                <Input
                    type='file'
                    className='form-control'
                    id='video'
                    name='video'
                    onChange={handleChange}
                />
                <small>Allowed formats - mp4</small>
                {(loading) &&
                    <div className='mt-2 mb-2'>
                        <Progress value={progress}>{progress}%</Progress>
                    </div>
                }
            </FormGroup>
        </>
    )
}

export default VimeoUpload
