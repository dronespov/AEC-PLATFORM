import { Fragment, useEffect, useState } from 'react'
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Button, Spinner } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Service } from '@src/services/Service'
import Config from '@src/configs/config.json'
import { OpenNotification } from '@src/views/components/Helper'

const UploadCSV = ({ setUploadModal, uploadModal, handleUploadCSV }) => {

  const history = useHistory()
  const { register, errors, handleSubmit } = useForm()
  const [groupId, setGroupId] = useState(null)
  const [btnSubmitted, setBtnSubmitted] = useState(false)

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(decodeURIComponent(search))

    if (params.get('groupId')) {
      setGroupId(params.get('groupId'))
    }
  }, [])

  const onSubmit = (data) => {
    
    const formData = new FormData()
    formData.append("file", data.uploadCsv[0])
   
    if (groupId !== null) {
      formData.append("group_id", groupId)
    }
    formData.append("upload_recipient_image", '')
    
    setBtnSubmitted(true)

    const header = {}

    const token = localStorage.getItem('token')
    if (token) {
        header["Authorization"] = `Bearer ${token}`
    }

    fetch(`${Config.BASE_URL}/recipients/upload`, {
      method: "POST",
      headers: header,
      body: formData
    }).then(res => {
      const response = res.json()
      if (response.status === 'error') {
        setBtnSubmitted(false)
        OpenNotification('error', 'Oops!', response.data.message)
      } else {
        setBtnSubmitted(false)
        OpenNotification('success', 'Success!', 'Recipient uploaded successfully!')
        handleUploadCSV()
        setUploadModal(!uploadModal)
      }
    })

  }

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result
    const columnDelimiter = ','
    
    result = ''
    array.forEach(item => {
      result += item
      result += columnDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV() {
    const link = document.createElement('a')
    const array = ['title', 'first_name', 'last_name', 'email', 'company_name', 'website', 'address_1', 'address_2', 'city', 'state', 'zip', 'mobile', 'fb_url', 'linkedin_url', 'insta_url', 'hobbies', 'notes']
    let csv = convertArrayOfObjectsToCSV(array)
   
    if (csv === null) return

    const filename = 'sample.xlsx'

    if (!csv.match(/^data:text\/xlsx/i)) {
      csv = `data:text/xlsx;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={() => setUploadModal(!uploadModal)}>Upload CSV
          <span className='downloadsample cursor-pointer' onClick={() => downloadCSV()}>Download Sample</span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md='12 mt-2'>
              <FormGroup>
                <Input
                  type='file'
                  className='form-control'
                  id='uploadCsv'
                  name='uploadCsv'
                  innerRef={register({ required: true })}
                  invalid={errors.uploadCsv && true}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple className='mr-1' outline color='secondary' type='button' onClick={() => setUploadModal(!uploadModal)}>
              Close
            </Button.Ripple>
          <Button color='primary' type='submit'>
            {(btnSubmitted) ? <> <Spinner color='white' size='sm' /> </> : 'Submit'}
          </Button>
        </ModalFooter>
      </Form>
    </>
  )
}
export default UploadCSV
