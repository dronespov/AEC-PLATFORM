import { useEffect, useState } from 'react'
import { Award } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

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
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Welcome {userData && userData.first_name}</h1>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
