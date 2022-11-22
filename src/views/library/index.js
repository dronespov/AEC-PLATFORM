import { Fragment, useEffect, useState } from 'react'
import BreadCrumbsPage from '@components/breadcrumbs'
import { Row, Col, Card, CardText, CardHeader, CardBody, CardTitle, CardImg, Input, Button } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'

const Library = () => {

  const history = useHistory()

  return (
    <Fragment>
      <BreadCrumbsPage breadCrumbTitle='Library' breadCrumbParent='Library' breadCrumbActive='Video Library' />

      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Video Library </CardTitle>

              <div className='action-right'>
                <Button.Ripple className='mr-1' color='primary' type='button' tag={Link} to='/account/record-screen/1'>
                  Start Record Video
                </Button.Ripple>
                <Button color='primary' type='button' tag={Link} to='/library/upload-video'>
                  Upload New Video
                </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}
export default Library
