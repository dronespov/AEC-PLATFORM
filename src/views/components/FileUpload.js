import { Fragment, useState, useCallback, useRef, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, Button, Spinner, CustomInput } from 'reactstrap'
import { useForm } from 'react-hook-form'
import Cropper from 'react-easy-crop'
import getCroppedImg from './CropImage'
import './upload.css'

import Config from '@src/configs/config.json'
import { OpenNotification } from '@src/views/components/Helper'

const FileUpload = ({ setCroppedImage, aspectRatio, doCrop }) => {

  const { register, errors, handleSubmit, reset } = useForm()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [btnSubmitted, setBtnSubmitted] = useState(false)
  const [cropModal, setCropModal] = useState(false)
  const [imgSrc, setImgSrc] = useState("")
  const [imgObject, setImgObject] = useState(null)

  const onSelectFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result))
      reader.readAsDataURL(e.target.files[0])
      setImgObject(e.target.files[0])
      if (doCrop === false) {
        const formData = new FormData()
        formData.append("file", e.target.files[0])

        setBtnSubmitted(true)

        const header = {}
        const type = JSON.parse(localStorage.getItem('is_remember'))
        let token = localStorage.getItem('token')
        if (!type) {
          token = sessionStorage.getItem('token')
        }

        if (token) {
          header["Authorization"] = `Bearer ${token}`
        }

        const result = await fetch(`${Config.BASE_URL}/fileUpload`, {
          method: "POST",
          headers: header,
          body: formData
        })
        if (result) {
          const response = await result.json()

          if (response.status === 'error') {
            setBtnSubmitted(false)
            OpenNotification('error', 'Oops!', response.data.message)
          } else {
            setCroppedImage(response.data.file)
            setBtnSubmitted(false)
          }
        }
      } else {
        setCropModal(!cropModal)
      }
    }
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation,
        imgObject
      )

      const blobToFile = new File([croppedImage], croppedImage.name, { type: croppedImage.type })
      const formData = new FormData()
      formData.append("file", blobToFile)

      setBtnSubmitted(true)

      const header = {}

      const token = localStorage.getItem('token')
      if (token) {
        header["Authorization"] = `Bearer ${token}`
      }

      const result = await fetch(`${Config.BASE_URL}/fileUpload`, {
        method: "POST",
        headers: header,
        body: formData
      })
      if (result) {
        const response = await result.json()

        if (response.status === 'error') {
          setBtnSubmitted(false)
          OpenNotification('error', 'Oops!', response.data.message)
        } else {
          setCroppedImage(response.data.file)
          setBtnSubmitted(false)
          setCropModal(!cropModal)
        }
      }

    } catch (e) {
      console.error(e)
      console.log(e)
      setBtnSubmitted(false)
    }
  }, [croppedAreaPixels, rotation])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <Fragment>

      <CustomInput
        type='file'
        className='form-control'
        id='upload'
        name='upload'
        accept='image/*'
        innerRef={register({ required: false })}
        invalid={errors.upload && true}
        onChange={onSelectFile}
      />
      <Modal isOpen={cropModal} toggle={() => setCropModal(!cropModal)} className='modal-dialog-centered'>
        <ModalBody>
          <div className="crop-container">
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onRotationChange={setRotation}
              onZoomChange={setZoom}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple className='mr-1' outline color='secondary' type='button' onClick={() => setCropModal(!cropModal)}>
            Close
          </Button.Ripple>
          <Button color='primary' type='button' onClick={() => showCroppedImage()}>
            {(btnSubmitted) ? <> <Spinner color='white' size='sm' /> </> : 'Crop'}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}
export default FileUpload
