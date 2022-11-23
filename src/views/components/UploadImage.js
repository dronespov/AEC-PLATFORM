import { useState, useEffect, useRef, Fragment } from 'react'
import { CustomInput, Row, Col, Label, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap'
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import Config from '@src/configs/config.json'
import { OpenNotification } from '@src/views/components/Helper'
import 'react-image-crop/dist/ReactCrop.css'

const UploadImage = ({ setCroppedImage, hiddenLabel, labelName }) => {

    const [imgSrc, setImgSrc] = useState('')
    const [imgObject, setImgObject] = useState(null)
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const [crop, setCrop] = useState(Crop)
    const [cropModal, setCropModal] = useState(false)
    const [completedCrop, setCompletedCrop] = useState(PixelCrop)
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(undefined)
    const [buttonDisable, setButtonDisable] = useState(false)

    const getBlobFromCanvas = (canvas, file) => new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) {
                blob.name = file.name
                blob.lastModified = file.lastModified
                resolve(blob)
                // const previewUrl = window.URL.createObjectURL(blob)
                // console.log(previewUrl)
            } else {
                reject(new Error("Canvas is empty"))
            }
        }, file.type) //"image/jpeg");
    })

    const finishCrop = async (canvas, crop) => {
        setButtonDisable(true)
        if (!crop || !canvas) {
            return
        }
        const response = await getBlobFromCanvas(canvas, imgObject)

        const blobToFile = new File([response], response.name, { type: response.type })
        const form = new FormData()
        form.append('file', blobToFile)
        const type = JSON.parse(localStorage.getItem('is_remember'))
        let token = localStorage.getItem('token')
        if (!type) {
            token = sessionStorage.getItem('token')
        }
        const header = {
            "x-access-token": token
        }

        const result = await fetch(`${Config.BASE_URL}/fileUpload`, {
            method: 'POST',
            headers: header,
            body: form
        })
        if (result) {
            const response = await result.json()
            if (response.status === 'success') {
                setButtonDisable(false)
                setCropModal(!cropModal)
                setImgObject(null)
                setImgSrc('')
                setCroppedImage(response.data.file)
            } else {
                setButtonDisable(false)
                OpenNotification('error', 'Oops!', response.data ? response.data.message : 'Upload Failed!')
            }
        }
    }

    const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
        return centerCrop(makeAspectCrop({ unit: '%', width: 100, height: 100 }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight)
    }

    const onSelectFile = (e) => {
        const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp']

        if (e.target.files && e.target.files.length > 0) {

            if (allowedExtension.indexOf(e.target.files[0].type) > -1) {
                setCrop(undefined) // Makes crop preview update between images.
                const reader = new FileReader()
                reader.addEventListener('load', () => setImgSrc(reader.result.toString() || ''))
                setImgObject(e.target.files[0])
                reader.readAsDataURL(e.target.files[0])
                setCropModal(!cropModal)
            } else {
                OpenNotification('error', 'Invalid File Type!', 'Photo only allows file types of GIF, PNG, JPG, JPEG and BMP', false)
            }
        }
    }

    const onImageLoad = (e) => {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(100, 100, aspect))
        } else {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(100, 100, 1))
        }
    }

    const cancelBtn = () => {
        setButtonDisable(false)
        setCropModal(!cropModal)
        setImgObject(null)
        setImgSrc('')
    }

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return
        }

        const image = imgRef.current
        const canvas = previewCanvasRef.current
        const crop = completedCrop

        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const ctx = canvas.getContext('2d')
        const pixelRatio = window.devicePixelRatio

        canvas.width = crop.width * pixelRatio * scaleX
        canvas.height = crop.height * pixelRatio * scaleY

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.imageSmoothingQuality = 'high'

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        )
    }, [completedCrop])

    return (
        <Fragment>
            <Row>
                <Col md='12'>
                    <FormGroup>
                        <Label className={(hiddenLabel && hiddenLabel === true) && 'd-none'} for='exampleCustomFileBrowser'>{labelName}</Label>
                        <CustomInput type='file' id='exampleCustomFileBrowser' accept="image/*" name='customFile' onChange={onSelectFile} />
                        <small className='mt-1 mb-1'>Note: Use the crop handles to crop your image if needed. Then click upload.</small>
                    </FormGroup>
                </Col>
            </Row>
            <Modal isOpen={cropModal} toggle={() => {
                setCropModal(!cropModal)
                setImgSrc('')
                setButtonDisable(false)
                setImgObject(null)
            }}>
                <ModalBody>
                    {
                        imgSrc !== "" && <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    }
                    <div style={{ display: 'none' }}>
                        {Boolean(completedCrop) && (
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    border: '1px solid black',
                                    objectFit: 'contain',
                                    width: completedCrop.width,
                                    height: completedCrop.height
                                }}
                            />
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => finishCrop(previewCanvasRef.current, completedCrop)} disabled={buttonDisable}>
                        {(buttonDisable) ? 'Uploading...' : 'Upload'}
                    </Button>
                    <Button color='secondary' outline onClick={cancelBtn}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default UploadImage