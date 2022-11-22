import { Fragment, useState, useCallback, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual
} from 'swiper'

import img1 from '@src/assets/images/slider/slider1.jpg'
import img2 from '@src/assets/images/slider/slider2.jpg'
import img3 from '@src/assets/images/slider/slider3.jpg'
import img4 from '@src/assets/images/slider/slider4.jpg'

import Spinners from '@components/spinner/Loading-spinner'
import { Service } from '@src/services/Service'
import Config from '@src/configs/config.json'

import '@styles/react/libs/swiper/swiper.scss'

const params = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    clickable: true
  },
  navigation: true
}

SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const CampaignSwiper = () => {

  const [loading, setLoading] = useState(false)
  const [bannerList, setBannerList] = useState([])

  // GET BANNERS
  const getBanners = () => {
    setLoading(true)
    Service.get({
      url: `/banners/list`
    }).then(response => {
      setLoading(false)
      if (response && response.status === "success") {
        setBannerList(response.data.banners)
      }
    })
  }

  useEffect(() => {
    getBanners()
  }, [])

  return (
    <Card>
      <CardBody>

        {(loading) && <>
          <div className='text-center mb-3'>
            <Spinners />
          </div>
        </>
        }

        {(!loading) && <>
          {(bannerList && bannerList.length > 0) ? <>
            <Swiper {...params}>
              {bannerList.map((item, key) => (
                <SwiperSlide>
                  <img src={`${Config.MEDIA_URL}${item.url}`} alt='Swiper' className='img-fluid w-100' />
                </SwiperSlide>
              ))}
            </Swiper>
          </> : <>
            <div className='text-center mb-3'>
              No Actors Found!
            </div>
          </>}
        </>
        }
      </CardBody>
    </Card>
  )
}

export default CampaignSwiper
