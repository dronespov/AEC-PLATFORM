import { useState } from 'react'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { Card, CardHeader, CardTitle, CardBody, CardText, Modal } from 'reactstrap'

const UploadMap = (isOpen, toggle) => {
    const [previewArr, setPreviewArr] = useState([])

    const uppy = new Uppy({
        meta: { type: 'avatar' },
        autoProceed: true,
        restrictions: { maxNumberOfFiles: 2, allowedFileTypes: ['image/*'] }
    })

    uppy.use(thumbnailGenerator)

    uppy.on('thumbnail:generated', (file, preview) => {
        const arr = previewArr
        arr.push(preview)
        setPreviewArr([...arr])
    })

    const renderPreview = () => {
        if (previewArr.length) {
            return previewArr.map((src, index) => <img key={index} className='rounded mt-2 mr-1' src={src} alt='avatar' />)
        } else {
            return null
        }
    }

    return (
        <Modal isOpen={false} toggle={toggle}>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'> Restrictions</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>
                        Use prop <code>restrictions</code> add upload restrictions like <code>maxNumberOfFiles</code> &
                        <code>allowedFileTypes</code>. Refer this{' '}
                        <a href='https://uppy.io/docs/uppy/#restrictions' target='_blank' rel='noopener noreferrer'>
                            link
                        </a>{' '}
                        for more info.
                    </CardText>
                    <DragDrop uppy={uppy} />
                    {renderPreview()}
                </CardBody>
            </Card>
        </Modal>
    )
}

export default UploadMap
