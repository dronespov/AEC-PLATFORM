import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardHeader, CardBody, CardTitle, Button, FormGroup, Input, Row, Col, Badge, Spinner, CardText, Table, Form, Label, Modal, ModalHeader, ModalText, ModalBody, ModalFooter } from 'reactstrap'
import './uploadparse.css'

import { Service } from '@src/services/Service'
import { OpenNotification, formatPhoneNumber } from '@src/views/components/Helper'

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize
} from 'react-papaparse'
import { useHistory, Link } from 'react-router-dom'

const DEFAULT_REMOVE_HOVER_COLOR = '#A01919'
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
)
const GREY_DIM = '#686868'

const CSVReader = () => {

  const { register, errors, handleSubmit, setValue } = useForm()

  const requiredField = ['first_name', 'last_name', 'company_name', 'address_1', 'city', 'state', 'zip']
  const history = useHistory()
  const { CSVReader } = useCSVReader()
  const [zoneHover, setZoneHover] = useState(false)
  const [columns, setColumns] = useState([])
  const [options, setOptions] = useState([])
  const [recipients, setRecipients] = useState([])
  const [mappingEnabled, setMappingEnabled] = useState(false)
  const [removeHoverColor, setRemoveHoverColor] = useState('#A01919')
  const [btnSubmitted, setBtnSubmitted] = useState(false)
  const [groupId, setGroupId] = useState(null)
  const [validateModal, setValidateModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState([])
  const [btnValidated, setBtnValidated] = useState(false)

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(decodeURIComponent(search))

    if (params.get('groupId') && params.get('groupId') !== '') {
      setGroupId(params.get('groupId'))
    }
  }, [])

  const handleUploaded = (res) => {
    if (res.data) {
      setColumns(res.data)
      setMappingEnabled(true)
    }
  }

  const handleRemove = () => {
    setColumns([])
    setMappingEnabled(true)
  }

  const handleSelection = (val, index) => {
    const newArr = [...options]
    newArr[index] = val
    setOptions(newArr)
  }

  const handleChnage = (e, i) => {
    const newArr = [...validated]
    if (e.target.value === 'original') {
      newArr[i]['suggested'] = false
    } else {
      newArr[i]['suggested'] = true
    }
    setValidated(newArr)
  }

  const onSubmit = async (val) => {

    if (columns.length <= 1) {
      OpenNotification('error', 'Missing Recipients!', 'Please add recipients!')
      return false
    }

    const intersection = requiredField.filter(element => options.includes(element))

    if (requiredField.length !== intersection.length) {
      OpenNotification('error', 'Missing Selection!', 'Please select all required fields!')
      return false
    }

    const data = []

    await columns.forEach((item, key) => {

      const temp = {}

      if (key !== 0 && item.length > 1) {
        for (let i = 0; i < item.length; i++) {
          if (options[i] && options[i] !== "") {
            temp[options[i]] = item[i]
          }
        }
        data.push(temp)
      }
    })

    const params = {
      recipients: data
    }

    setValidateModal(true)
    setRecipients(data)
    setLoading(true)

    Service.post({
      url: `/campaign/address/verification`,
      body: JSON.stringify(params)
    }).then(response => {
      setLoading(false)
      if (response.status === 'success') {

        if (response && response.data && response.data.length > 0) {
          const tempData = []
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].suggested = true
            tempData.push(response.data[i])
          }
          setValidated(tempData)
        }

      } else {
        setValidateModal(!validateModal)
      }

    })

  }
  
  const onSubmit1 = (value) => {

    const params = {
      type: 'csv'
    }
    
    for (let i = 0; i < recipients.length; i++) {
      if (validated[i].suggested === true && !validated[i].is_error) {
        recipients[i].address_1 = validated[i].opt.Address.Address2 ? validated[i].opt.Address.Address2 : ''
        recipients[i].address_2 = validated[i].opt.Address.Address1 ? validated[i].opt.Address.Address1 : ''
        recipients[i].city = validated[i].opt.Address.City
        recipients[i].state = validated[i].opt.Address.State
        recipients[i].zip = validated[i].opt.Address.Zip5
      } else {
        recipients[i].address_1 = validated[i].address_1
        recipients[i].address_2 = validated[i].address_2
        recipients[i].city = validated[i].city
        recipients[i].state = validated[i].state
        recipients[i].zip = validated[i].zip
      }
    }
   
    params.recipients = recipients
  
    if (groupId && groupId !== null) {
      params.group_id = groupId
    }

    setBtnSubmitted(true)

    Service.post({
      url: `/recipients`,
      body: JSON.stringify(params)
    }).then(response => {
      if (response.status === 'error') {
        setBtnSubmitted(false)
        if (response.data.message.includes('Integrity constraint violation: 1062 Duplicate entry')) {
          OpenNotification('error', 'Oops!', 'Duplicate email entry!')
        } else {
          OpenNotification('error', 'Oops!', response.data.message)
        }
      } else {
        setBtnSubmitted(false)
        OpenNotification('success', 'Success!', 'Recipient added successfully!')
        if (groupId && groupId !== null) {
          history.push(`/campaigns/recipients?groupId=${groupId}`)
        } else {
          history.push(`/recipients`)
        }
      }
    })
  }

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result
    const columnDelimiter = ','

    result = ''
    array.forEach((item, i) => {
      result += item
      if (i < array.length - 1) {
        result += columnDelimiter
      }
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV() {
    const link = document.createElement('a')
    const array = ['Title', 'First Name', 'Last Name', 'Email', 'Company Name', 'Website', 'Address Line 1', 'Address Line 2', 'City', 'State', 'Zip Code', 'Phone Number', 'Facebook Url', 'Linkedin Url', 'Instagram Url', 'Hobbies', 'Notes']
    let csv = convertArrayOfObjectsToCSV(array)

    if (csv === null) return

    const filename = 'sample.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/xlsx;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <>
      <Row>
        <Col md='12'>

          {(!mappingEnabled) &&
            <Card>
              <CardHeader className='flex-md-row flex-column justify-content-between align-items-center border-bottom'>
                <CardTitle tag='h3'>Upload Recipients</CardTitle>
              </CardHeader>
              <CardBody>
                
                <Row className="mt-1">
                  <Col md='12' className='mb-2'>
                    <CardText>Save time and bulk upload your list of recipients</CardText>
                  </Col>
                  <Col md='3'>
                    <div>
                      <h5>Required Fields:</h5>
                      <ul style={{ padding: '5px 15px' }}>
                        <li>First Name</li>
                        <li>Last Name</li>
                        <li>Company Name</li>
                        <li>Address Line 1</li>
                        <li>City</li>
                        <li>State</li>
                        <li>Zip</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md='6'>
                    <div>
                      <h5>File Requirements:</h5>
                      <ul style={{ padding: '5px 15px' }}>
                        <li>Only .csv files are accepted</li>
                        <li>File size cannot exceed 10 MB</li>
                        <li>First row of file must be the header row</li>
                      </ul>
                    </div>
                    <div className='mt-1'>
                      For blank template <span className='cursor-pointer' style={{ textDecoration: 'underline' }} onClick={() => downloadCSV()}>click here</span>
                    </div>
                  </Col>
                  
                </Row>

                <div className='mt-3'>
                  <CSVReader
                    onUploadAccepted={(results) => {
                      handleUploaded(results)
                      setZoneHover(false)
                    }}
                    onDragOver={(event) => {
                      event.preventDefault()
                      setZoneHover(true)
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault()
                      setZoneHover(false)
                    }}
                  >
                    {({
                      getRootProps,
                      acceptedFile,
                      ProgressBar,
                      getRemoveFileProps,
                      Remove
                    }) => (
                      <>
                        <div {...getRootProps()}
                          className='parser-zone'
                        >
                          {acceptedFile ? (
                            <>
                              <div className='parser-file'>
                                <div className='parser-info'>
                                  <span className='parser-size'>
                                    {formatFileSize(acceptedFile.size)}
                                  </span>
                                  <span className='parser-name'>{acceptedFile.name}</span>
                                </div>
                                <div className='parser-progressBar'>
                                  <ProgressBar />
                                </div>
                                <div
                                  {...getRemoveFileProps()}
                                  className='parser-remove'
                                  onMouseOver={(event) => {
                                    event.preventDefault()
                                    setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT)
                                  }}
                                  onMouseOut={(event) => {
                                    event.preventDefault()
                                    setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR)
                                  }}
                                >
                                  <Remove onClick={handleRemove} color={removeHoverColor} />
                                </div>
                              </div>
                            </>
                          ) : (
                            'Drop CSV file here or click to upload'
                          )}
                        </div>
                      </>
                    )}
                  </CSVReader>
                </div>

                <Row className="mt-3">
                  <Col md='12' className='text-center'>
                    <Button.Ripple color='secondary' tag={Link} to={(groupId && groupId !== null) ? `/campaigns/recipients?groupId=${groupId}` : `/recipients`} outline type='button'>Back</Button.Ripple>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          }

          {(mappingEnabled) &&
            <Card>
              <CardHeader className='flex-column align-md-items-center align-items-start border-bottom'>
                <CardTitle tag='h3'>Select Fields to Map</CardTitle>
                <CardText className='mt-1'>Select which fields you wish to synchronize to their destinations.</CardText>
              </CardHeader>
              <CardBody className='mt-3'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Column To Import</th>
                        <th className='text-center'>Map Into Field</th>
                      </tr>
                    </thead>
                    <tbody>
                      {columns[0].map((item, i) => (
                        <>
                          <tr>
                            <td>{item}</td>
                            <td className='d-flex justify-content-end align-items-right'>
                              <div className='map-field'>
                                <Input
                                  type='select'
                                  id={`field_${i}`}
                                  name={`field_${i}`}
                                  onChange={(e) => handleSelection(e.target.value, i)}
                                  innerRef={register({ required: false })}
                                >
                                  <option value="">Do Not Import This Field</option>
                                  <option value="title">Title</option>
                                  <option value="first_name">First Name</option>
                                  <option value="last_name">Last Name</option>
                                  <option value="email">Email</option>
                                  <option value="company_name">Company Name</option>
                                  <option value="website">Website</option>
                                  <option value="address_1">Address Line 1</option>
                                  <option value="address_2">Address Line 2</option>
                                  <option value="city">City</option>
                                  <option value="state">State</option>
                                  <option value="zip">Zip Code</option>
                                  <option value="mobile">Phone Number</option>
                                  <option value="fb_url">Facebook Url</option>
                                  <option value="linkedin_url">LinkedIn Url</option>
                                  <option value="insta_url">Instagram Url</option>
                                  <option value="hobbies">Hobbies </option>
                                  <option value="notes">Notes </option>
                                </Input>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>

                  <Row>
                    <Col md='12'>
                      <FormGroup className='actions-right text-right my-5'>
                        <Button.Ripple color='primary' type='submit'>
                          Submit
                        </Button.Ripple>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          }

        </Col>
      </Row>

      <Modal isOpen={validateModal} toggle={() => setValidateModal(!validateModal)} className='modal-dialog-centered' size={'lg'}>
        <Form>
          <ModalHeader toggle={() => setValidateModal(!validateModal)}></ModalHeader>
          
          <ModalBody className='mt-0'>
            <h2 className='address-title text-center mb-1'>Validate Shipping Addresses</h2>
            <p className='text-center mb-4address-subtitle text-center mb-2 pb-2' style={{ color: '#6e6b7b'}}>
              Please carefully review the USPS address recommendations based on the addresses you provided. If the recommendations are correct leave the address on the right selected, if USPS didn't get it right then select your original address on the left. 
            </p>

            <Row>
              {(loading) ? <Col md='12'><div className='d-flex align-items-center justify-content-center'><Spinner size='12' className='mr-1' type='grow' />Validating....</div></Col> : <> </>}
            </Row>
            
            {!loading && validated && validated.length > 0 && validated.map((items, key) => (
              <Row className='mb-3 d-flex align-items-center px-3'>
                <Col md='3'>
                  <h5>{items.first_name} {items.last_name}</h5>
                </Col>
                <Col md='9'>
                  <div className="custom-options-checkable row">
                    <div className="mb-md-0 mb-2 col-md-6 text-center">
                        <input id={`homeAddress_${key}`} name={`shipAddress_${key}`} type="radio" onChange={(e) => handleChnage(e, key)} className="custom-option-item-check form-check-input" value="original" defaultChecked={(items.suggested === false)} />
                        <label className="custom-option-item px-2 py-1" for={`homeAddress_${key}`}>
                          <span className="d-flex align-items-center justify-content-center mb-50">
                              <span className="custom-option-item-title h5 fw-bolder mb-0">Original Address</span>
                          </span>
                          <span className="d-block">
                          {(items.address_1 && items.address_1.toLowerCase() !== 'null') ? items.address_1 : ''} {(items.address_2 && items.address_2.toLowerCase() !== 'null') ? items.address_2 : ''} {items.city} {items.state} {items.zip}
                          </span>
                        </label>
                    </div>
                    <div className="mb-md-0 mb-2 col-md-6 text-center">
                        <input id={`officeAddress_${key}`} name={`shipAddress_${key}`} type="radio" onChange={(e) => handleChnage(e, key)} className="custom-option-item-check form-check-input" value="suggested" defaultChecked={(items.suggested === true)} />
                        <label className="custom-option-item px-2 py-1" for={`officeAddress_${key}`}>
                          <span className="d-flex align-items-center justify-content-center mb-50">
                              <span className="custom-option-item-title h5 fw-bolder mb-0">{(!items.is_error) ? 'Suggested Address' : 'Original Address'}</span>
                          </span>
                          <span className="d-block">
                            {(!items.is_error) ? <>
                              {(items.opt.Address.Address2 && items.opt.Address.Address2.toLowerCase() !== 'null') ? items.opt.Address.Address2 : ''} {(items.opt.Address.Address1 && items.opt.Address.Address1.toLowerCase() !== 'null') ? items.opt.Address.Address1 : ''} {items.opt.Address.City} {items.opt.Address.State} {items.opt.Address.Zip5}
                            </> : <>
                              {(items.address_1 && items.address_1.toLowerCase() !== 'null') ? items.address_1 : ''} {(items.address_2 && items.address_2.toLowerCase() !== 'null') ? items.address_2 : ''} {items.city} {items.state} {items.zip}
                              <p className='text-danger mt-0 mb-0 font-size-xs'><small>*USPS was not able to validate</small></p>
                            </> }
                          </span>
                        </label>
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
          
          </ModalBody>
          <ModalFooter>
              <Button color='primary' onClick={handleSubmit((d) => onSubmit1(d, 'submit'))} disabled={btnValidated}>
                {(btnSubmitted) ? <> <Spinner color='white' size='sm' /> </> : 'Submit'}
              </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>

  )
}

export default CSVReader