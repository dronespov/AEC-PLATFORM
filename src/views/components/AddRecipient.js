import { Fragment, useEffect, useState } from 'react'
import { Row, Col, Card, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Input, Button, Spinner, Form, FormGroup, Label, CustomInput } from 'reactstrap'
import { useForm } from 'react-hook-form'
import UploadImage from './UploadImage'
import { Link, useHistory, useParams } from 'react-router-dom'

import { Service } from '@src/services/Service'
import { OpenNotification, formatPhoneNumber } from '@src/views/components/Helper'

const AddRecipient = ({ source }) => {

  const history = useHistory()
  const { id } = useParams()
  const { register, errors, handleSubmit, setValue } = useForm()
  const [mode, setMode] = useState('Add')
  const [groupId, setGroupId] = useState(null)
  const [btnSubmitted, setBtnSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editInfo, setEditInfo] = useState([])
  const [croppedImage, setCroppedImage] = useState(null)
  const [validateModal, setValidateModal] = useState(false)
  const [btnValidated, setBtnValidated] = useState(false)
  const [data, setData] = useState(null)
  const [visible, setVisible] = useState(false)
  const [isError, setIsError] = useState(false)
  const [validated, setValidated] = useState([])

  const getRecipient = () => {
    Service.get({
      url: `/recipients/get/${id}`
    })
      .then(response => {
        setLoading(false)
        if (response.status === "success") {
          setEditInfo(response.data.recipient)
        }
      })
  }

  useEffect(() => {

    if (editInfo) {
      setTimeout(() => {
        setValue('title', editInfo.title)
        setValue('fname', editInfo.first_name)
        setValue('lname', editInfo.last_name)
        setValue('email', editInfo.email)
        setValue('company', editInfo.company_name)
        setValue('phone', formatPhoneNumber(editInfo.mobile))
        setValue('website', editInfo.website)
        setValue('business', editInfo.business)
        setValue('facebook', editInfo.fb_url)
        setValue('linkedin', editInfo.linkedin_url)
        setValue('instagram', editInfo.insta_url)
        setValue('address1', editInfo.address_1)
        setValue('address2', editInfo.address_2)
        setValue('city', editInfo.city)
        setValue('state', editInfo.state)
        setValue('zip', editInfo.zip)
        setValue('hobbies', editInfo.hobbies)
        setValue('gift', editInfo.gift)
        setValue('notes', editInfo.notes)

        //setAvatar(editInfo.upload_recipient_image)
      }, 500)
    }

  }, [editInfo])

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(decodeURIComponent(search))

    if (id) {
      setMode('Edit')
      getRecipient()
    }
    if (params.get('groupId')) {
      setGroupId(params.get('groupId'))
    }

  }, [])

  const handleChnage = (e, i) => {
    const newArr = [...validated]
    if (e.target.value === 'original') {
      newArr[i]['suggested'] = false
    } else {
      newArr[i]['suggested'] = true
    }
    setValidated(newArr)
  }

  const onSubmit1 = (data) => {
    const params = {
      recipients: [
        {
          title: data.title,
          first_name: data.fname,
          last_name: data.lname,
          email: data.email,
          company_name: data.company,
          website: data.website,
          address_1: data.address1,
          address_2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          mobile: data.phone.replace(/[^0-9]/g, ''),
          fb_url: data.facebook,
          linkedin_url: data.linkedin,
          insta_url: data.instagram,
          hobbies: data.hobbies,
          notes: data.notes
        }
      ]
    }

    if (validated && validated.length > 0 && validated[0].suggested === true && !validated[0].is_error) {
      params.recipients[0].address_1 = validated[0].opt.Address.Address2 ? validated[0].opt.Address.Address2 : ''
      params.recipients[0].address_2 = validated[0].opt.Address.Address1 ? validated[0].opt.Address.Address1 : ''
      params.recipients[0].city = validated[0].opt.Address.City
      params.recipients[0].state = validated[0].opt.Address.State
      params.recipients[0].zip = validated[0].opt.Address.Zip5
    } 

    if (croppedImage !== null) {
      params.recipients[0].upload_recipient_image = croppedImage
    } else {
      params.recipients[0].upload_recipient_image = null
    }

    if (mode === 'Add' && groupId && groupId !== null) {
      params['group_id'] = groupId
      params['type'] = 'manual'
    }

    setBtnSubmitted(true)

    if (mode === 'Edit') {
      Service.patch({
        url: `/recipients/${id}`,
        body: JSON.stringify(params.recipients[0])
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
          OpenNotification('success', 'Success!', 'Recipient updated successfully!')
        }

        if (source && source === 'campaign') {
          history.push(`/campaigns/recipients${(groupId && groupId !== null) ? `?groupId=${groupId}` : ''}`)
        } else {
          history.push(`/recipients`)
        }
      })
    } else {
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
        }

        if (source && source === 'campaign') {
          history.push(`/campaigns/recipients${(groupId && groupId !== null) ? `?groupId=${groupId}` : ''}`)
        } else {
          history.push(`/recipients`)
        }
      })
    }
  }

  const onSubmit = (value, type) => {

    const params = {
      recipients: [
        {
          address_1: (type === 'validate') ? value.val_address1 : value.address1,
          address_2: (type === 'validate') ? value.val_address2 : value.address2,
          city: (type === 'validate') ? value.val_city : value.city,
          state: (type === 'validate') ? value.val_state : value.state,
          zip: (type === 'validate') ? value.val_zip : value.zip
        }
      ]
    }

    setValidateModal(true)
    setData(value)
    setLoading(true)

    Service.post({
      url: `/campaign/address/verification`,
      body: JSON.stringify(params)
    }).then(response => {
      setLoading(false)
      if (response.status === 'success') {

        if (response && response.data && response.data.length > 0) {
          if (response.data[0].is_error === false) {
            setValidateModal(false)
            onSubmit1(value)
            return false
          }
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

  return (
    <Fragment>


      <Form>
        <Row>
          <Col md='12' className='mt-2'>
            <h5 style={{ color: '#333' }}>Basic Info</h5><hr />
          </Col>
          <Col md='4'>
            <FormGroup>
              <Label for='title'>Title (Recommended for Doctors)</Label>
              <Input
                id='title'
                name='title'
                innerRef={register({ required: false })}
                invalid={errors.title && true}
                placeholder='Title'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='fname'>First Name<span className='text-danger'>*</span></Label>
              <Input
                id='fname'
                name='fname'
                innerRef={register({ required: true })}
                invalid={errors.fname && true}
                placeholder='First Name'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='lname'>Last Name<span className='text-danger'>*</span></Label>
              <Input
                id='lname'
                name='lname'
                innerRef={register({ required: true })}
                invalid={errors.lname && true}
                placeholder='Last Name'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                innerRef={register({ required: false })}
                invalid={errors.email && true}
                placeholder='Email'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='company'>Company Name<span className='text-danger'>*</span></Label>
              <Input
                id='company'
                name='company'
                innerRef={register({ required: true })}
                invalid={errors.company && true}
                placeholder='Company Name'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='website'>Website URL</Label>
              <Input
                id='website'
                name='website'
                innerRef={register({ required: false })}
                invalid={errors.website && true}
                placeholder='Website URL'
              />
            </FormGroup>
          </ Col>

          <Col md='12' className='mt-2'>
            <h5 style={{ color: '#333' }}>Contact Info</h5><hr />
          </Col>

          <Col md='4'>
            <FormGroup>
              <Label for='address1'>Address Line 1<span className='text-danger'>*</span></Label>
              <Input
                id='address1'
                name='address1'
                innerRef={register({ required: true })}
                invalid={errors.address1 && true}
                placeholder='Address Line 1'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='address2'>Address Line 2</Label>
              <Input
                id='address2'
                name='address2'
                innerRef={register({ required: false })}
                invalid={errors.address2 && true}
                placeholder='Address Line 2'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='city'>City<span className='text-danger'>*</span></Label>
              <Input
                id='city'
                name='city'
                innerRef={register({ required: true })}
                invalid={errors.city && true}
                placeholder='City'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='state'>State<span className='text-danger'>*</span></Label>
              <Input
                id='state'
                name='state'
                innerRef={register({ required: true })}
                invalid={errors.state && true}
                placeholder='State'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='zip'>Zip<span className='text-danger'>*</span></Label>
              <Input
                id='zip'
                name='zip'
                innerRef={register({ required: true })}
                invalid={errors.zip && true}
                placeholder='Zip'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='phone'>Phone Number</Label>
              <Input
                id='phone'
                name='phone'
                onChange={(e) => setValue(`phone`, formatPhoneNumber(e.target.value))}
                innerRef={register({ required: false })}
                invalid={errors.phone && true}
                placeholder='Phone Number'
              />
            </FormGroup>
          </Col>

          <Col md='12' className='mt-2'>
            <h5 style={{ color: '#333' }}>Social</h5><hr />
          </Col>

          <Col md='4'>
            <FormGroup>
              <Label for='linkedin'>LinkedIn Profile URL (Recommended)</Label>
              <Input
                id='linkedin'
                name='linkedin'
                innerRef={register({ required: false })}
                invalid={errors.linkedin && true}
                placeholder='LinkedIn Profile URL'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='facebook'>Facebook Profile URL (Recommended)</Label>
              <Input
                id='facebook'
                name='facebook'
                innerRef={register({ required: false })}
                invalid={errors.facebook && true}
                placeholder='Facebook Profile URL'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <Label for='instagram'>Instagram Profile URL (Recommended)</Label>
              <Input
                id='instagram'
                name='instagram'
                innerRef={register({ required: false })}
                invalid={errors.instagram && true}
                placeholder='Instagram Profile URL'
              />
            </FormGroup>
          </ Col>

          <Col md='12' className='mt-2'>
            <h5 style={{ color: '#333' }}>Additional Info</h5><hr />
          </Col>

          <Col md='4'>
            <FormGroup>
              <Label for='hobbies'>Hobbies (optional)</Label>
              <Input
                id='hobbies'
                name='hobbies'
                innerRef={register({ required: false })}
                invalid={errors.hobbies && true}
                placeholder='Hobbies (optional)'
              />
            </FormGroup>
          </ Col>
          <Col md='4'>
            <FormGroup>
              <UploadImage setCroppedImage={setCroppedImage} hiddenLabel={false} labelName={'Upload Recipient Image'} />
            </FormGroup>
          </ Col>
        </Row>
        <Row>
          <Col md='8'>
            <FormGroup>
              <Label for='notes'>Notes</Label>
              <Input
                type='textarea'
                id='notes'
                rows="4"
                name='notes'
                innerRef={register({ required: false })}
                invalid={errors.notes && true}
                placeholder='Notes'
              />
            </FormGroup>
          </ Col>
          <Col md='12'>
            <FormGroup className='mt-3 mb-0'>
              <Button.Ripple className='mr-1' outline color='secondary' type='button' tag={Link} to={(source && source === 'campaign') ? `/campaigns/recipients${(groupId && groupId !== null) ? `?groupId=${groupId}` : ''}` : '/recipients'}>
                Back
              </Button.Ripple>
              <Button.Ripple color='primary' onClick={handleSubmit((d) => onSubmit(d, 'submit'))}>
                {(btnSubmitted) ? <> <Spinner color='white' size='sm' /> </> : 'Submit'}
              </Button.Ripple>
            </FormGroup>
          </Col>
        </Row>
      </Form>


      <Modal isOpen={validateModal} toggle={() => setValidateModal(!validateModal)} className='modal-dialog-centered' size={'lg'}>
        <Form>
          <ModalHeader toggle={() => setValidateModal(!validateModal)}></ModalHeader>
          <ModalBody className='mt-2'>
            <h2 className='address-title text-center mb-1'>Validate Shipping Addresses</h2>
            <p className='text-center mb-4address-subtitle text-center mb-2 pb-2' style={{ color: '#6e6b7b'}}>
              Please carefully review the USPS address recommendations based on the addresses you provided. If the recommendations are correct leave the address on the right selected, if USPS didn't get it right then select your original address on the left. 
            </p>
            <Row>
              {(loading) ? <Col md='12'><div className='d-flex align-items-center justify-content-center'><Spinner size='12' className='mr-1' type='grow' />Validating....</div></Col> : <>

                {validated && validated.length > 0 && validated.map((items, key) => (
                  <Row className='mb-3 d-flex align-items-center px-3 w-100'>
                    <Col md='3'>
                      <h5>{data && data.fname} {data && data.lname}</h5>
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
                              <span className="custom-option-item-title h5 fw-bolder mb-0">Suggested Address</span>
                            </span>
                            <span className="d-block">
                              {(items.is_error === 'suggested') && <>
                                {(items.opt.Address.Address2 && items.opt.Address.Address2.toLowerCase() !== 'null') ? items.opt.Address.Address2 : ''} {(items.opt.Address.Address1 && items.opt.Address.Address1.toLowerCase() !== 'null') ? items.opt.Address.Address1 : ''} {items.opt.Address.City} {items.opt.Address.State} {items.opt.Address.Zip5}
                              </>}
                              {(items.is_error === true) && <>
                                {(items.address_1 && items.address_1.toLowerCase() !== 'null') ? items.address_1 : ''} {(items.address_2 && items.address_2.toLowerCase() !== 'null') ? items.address_2 : ''} {items.city} {items.state} {items.zip}
                                <p className='text-danger mt-0 mb-0 font-size-xs'><small>*USPS not validate the address</small></p>
                              </>}
                            </span>
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))}

              </>
              }
            </Row>
          </ModalBody>
          <ModalFooter>
            {(!loading) &&
              <Button color='primary' onClick={handleSubmit((d) => onSubmit1(d, 'submit'))} disabled={btnSubmitted}>
                {(btnSubmitted) ? <> <Spinner color='white' size='sm' /> </> : 'Submit'}
              </Button>
            }
          </ModalFooter>
        </Form>
      </Modal>

    </Fragment >
  )
}
export default AddRecipient
