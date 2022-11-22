import { Card, CardBody, CardText, Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import ceo from '@src/assets/images/avatars/Ball.jpg'


const CardMedal = ({ item }) => {

  const history = useHistory()

  const navigate = (item) => {
    history.push(`/package/${item.package_id}`)
  }
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Explore new Packages!</h5>
        <CardText className='font-small-3'>Includes Featured Matches & Tips</CardText>
        <h3 className='mb-75 mt-2 pt-50'>
          <a href='/' onClick={e => e.preventDefault()}>
            <small>Starting from</small> {item && item.pack_amount && `$${item.pack_amount}` || ''}
          </a>
        </h3>
        <Button.Ripple color='primary' onClick={() => navigate(item)} >Explore</Button.Ripple>
        <img className='congratulation-medal' src={ceo} alt='Medal Pic' height={150} width={150} />
      </CardBody>
    </Card>
  )
}

export default CardMedal
