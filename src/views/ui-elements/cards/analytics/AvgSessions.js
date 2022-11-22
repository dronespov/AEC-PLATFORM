import { useEffect, useState } from 'react'
import axios from 'axios'
import { kFormatter } from '@utils'
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Button,
  Media,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Progress
} from 'reactstrap'
import Chart from 'react-apexcharts'
import sample from '@src/assets/images/icons/google-chrome.png'
import bengala from '@src/assets/images/logo/bengala.png'
import rams from '@src/assets/images/logo/rams.png'
import { getDashboardDetails } from '@src/redux/actions/page'
import { useDispatch, useSelector } from 'react-redux'
import gameOfGamesConfig from '../../../../configs/config'
import moment from 'moment'
import PricingCards from '../../../pages/pricing/PricingCards'

const AvgSessions = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const store = useSelector(state => state.User)

  useEffect(() => {
    dispatch(getDashboardDetails())
  }, [])

  useEffect(() => {
    if (store && store.dashboardData && data.length === 0) {
      setData(store.dashboardData)
    }
  }, [store.dashboardData])

  const predictComponent = (item, index) => {
    console.log(index)
    const random = Math.floor(Math.random() * (95 - 65 + 1)) + 65

    const randomDate = moment().add((index === 0 ? 1 : index <= 2 ? 3 : (index <= 3) ? 4 : (index <= 5) ? 6 : (index <= 8) ? 7 : 9), 'days').format('DD-MM-YYYY').toString()

    const randomTime = moment().add((index === 0 ? 1 : index <= 2 ? 3 : (index <= 3) ? 4 : (index <= 5) ? 6 : (index <= 8) ? 7 : 9), 'hours').format('h').toString()

    const randomHour = moment().add((index === 0 ? 1 : index <= 2 ? 3 : (index <= 3) ? 4 : (index <= 5) ? 6 : (index <= 8) ? 7 : 9), 'hours').format('a').toString()

    return <>
      <Row className='pb-50'>
        <Col
          sm={{ size: 6, order: 1 }}
          xs={{ order: 2 }}
          className='d-flex justify-content-between flex-column mt-lg-0 mt-2'
        >
          <div className='session-info mb-1 mb-lg-0'>
            <h5 className='font-weight-bold mb-25'>{randomDate}<span className='ml-5'>{randomTime}:00 {randomHour} Eastern</span></h5>
          </div>

        </Col>
      </Row>
      <hr />
      <Row className='pt-50'>
        <Col className='mb-2' lg='4' md='4' sm='12'>
          <Media>
            <img className='rounded mr-1' src={gameOfGamesConfig.MEDIA_URL + item.away_team_image} height='30' alt={''} />
            <h6 className='align-self-center mb-0'>{item.away_full_name}</h6>
          </Media>
        </Col>
        <Col lg='4' md='4' sm='12'>
          <div className='d-flex justify-content-between'><p className='mb-50 mr-1'>{(item.prediction === 1) ? 'Winning Probability' : 'Losing Probability'}</p><span className='ml-1'>{(item.prediction === 1) ? random : 100 - random}%</span></div>
          <Progress className={`avg-session-progress mt-25 ${(item.prediction === 1) ? 'progress-bar-success' : 'progress-bar-danger'}`} value={(item.prediction === 1) ? random : 100 - random} />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className='mb-2' lg='4' md='4' sm='12'>
          <Media>
            <img className='rounded mr-1' src={gameOfGamesConfig.MEDIA_URL + item.home_team_image} height='30' alt={''} />
            <h6 className='align-self-center mb-0'>{item.home_full_name}</h6>
          </Media>
        </Col>
        <Col lg='4' md='4' sm='12'>
          <div className='d-flex justify-content-between'><p className='mb-50 mr-1'>{(item.prediction !== 1) ? 'Winning Probability' : 'Losing Probability'}</p><span className='ml-1'>{(item.prediction !== 1) ? random : 100 - random}%</span></div>
          <Progress className={`avg-session-progress mt-25 ${(item.prediction !== 1) ? 'progress-bar-success' : 'progress-bar-danger'}`} value={item.prediction !== 1 ? random : 100 - random} />
        </Col>
      </Row>
    </>
  }

  return (
    <>
      {data && data.map((item, index) =>
        <Card>
          <CardBody>
            {predictComponent(item, index)}
          </CardBody>
        </Card>
      )}
    </>
  )
}


export default AvgSessions
