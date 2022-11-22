import { Fragment, useEffect, useState } from 'react'
import { Row, Col, Card, CardFooter, CardHeader, CardBody, CardTitle, Form, FormGroup, Input, Button } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const UploadVideo = () => {

  const history = useHistory()
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = data => {

  }

  return (
    <Fragment>
      
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Upload Video</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md='4 mt-2'>
                    <FormGroup>
                      <Input
                        type='file'
                        className='form-control'
                        id='uploadVideo'
                        name='uploadVideo'
                        innerRef={register({ required: false })}
                        invalid={errors.uploadVideo && true}
                      />
                    </FormGroup>
                    <p><small>Allowed formats - Mp4 </small></p>
                    <p><small>Max. file size 250MB </small></p>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button.Ripple className='mr-1' outline color='secondary' type='button' onClick={() => history.goBack()}>
                Cancel
              </Button.Ripple>
              <Button color='primary'>
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}
export default UploadVideo
