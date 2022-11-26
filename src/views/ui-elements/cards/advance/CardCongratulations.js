import { useEffect, useState } from 'react'
import { Award } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'
// ** Utils
import { isUserLoggedIn } from '@utils'

const CardCongratulations = () => {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const type = JSON.parse(localStorage.getItem('is_remember'))
      if (type) {
        setUserData(JSON.parse(localStorage.getItem('auth')))
      } else {
        setUserData(JSON.parse(sessionStorage.getItem('auth')))
      }

    }
  }, [])

  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Welcome {userData && userData.first_name}</h1>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
