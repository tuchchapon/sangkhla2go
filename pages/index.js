import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Slider from 'react-slick';
import styles from '../styles/Home.module.scss'
import Link from "next/link";
import axios from 'axios';
import Popup from 'reactjs-popup'
import Footer from '../layouts/footer';
import ReactPlayer from 'react-player'
import AccommodationPopup from '../components/accommodationPopup'
import AttractionPopup from '../components/attractionPopup';
import SagePopup from '../components/sagePopup';
import LeaderPopup from '../components/leaderPopup';
import RestaurantPopup from '../components/restaurantPopup';
import WinPopup from '../components/winPopup'
import BoatProviderPopup from '../components/boatPopup'
import KarenPopup from '../components/karenTraditionPopup';
import MonPopup from '../components/monTraditionPopup';
import ProductPopup from '../components/productPopup';
import Header from '../layouts/header';
function RightArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img src="/right-arrow.png" style={{ ...style, width: '32px', height: '64px', right: '-57px', top: '50%' }} className={className} onClick={onClick} alt="" />
  );
}
function LeftArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img src="/left-arrow.png" alt="" style={{ ...style, width: '32px', height: '64px', left: '-57px', top: '50%' }} className={className} onClick={onClick} />
  )
}


export default function index() {

  const router = useRouter();
  const [accommodation, setAccommodation] = useState([])
  const [hotels, setHotels] = useState([])
  const [boatHouses, setBoatHouses] = useState([])
  const [attractions, setAttractions] = useState([])
  const [restaurants, setrestaurants] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  const [boatProviders, setBoatProviders] = useState([])
  const [karenTraditions, setKarenTraditions] = useState([])
  const [monTraditions, setMonTraditions] = useState([])
  const [products, setProducts] = useState([])
  const [showReview, setShowReview] = useState([])
  const [res_reviews, setRes_reviews] = useState([])

  const [openAccommodationPopup, setOpenAccommodationPopup] = useState(false)
  const [openSagePopup, setOpenSagePopup] = useState(false)
  const [openLeaderPopup, setOpenLeaderPopup] = useState(false)
  const [openRestaurantPopup, setOpenRestaurantPopup] = useState(false)
  const [openWinpopup, setOpenWinpopup] = useState(false)
  const [openBoatPopup, setOpenBoatPopup] = useState(false)

  const [openKarenPopup, setOpenKarenPopup] = useState(false)
  const [openMonPopup, setOpenMonPopup] = useState(false)
  const [openProductPopup, setOpenProductPopup] = useState(false)

  const [activeAcommodation, setActiveAcommodation] = useState({
    id: '', name: '', type: '', information: '', min_price: '', max_price: '',
    fb_page: '', images: [], services: [], tel: ''
  })
  const [activeRestarant, setActiveRestarant] = useState({
    id: '', name: '', location: '', recommend_menu: '', open_time: '',
    close_time: '', food_min_price: '', food_max_price: '',
    drink_min_price: '', drink_max_price: '', type: '', tel: '', fb_page: '',
    images: [], services: []
  })
  const [activeLocation, setActiveLocation] = useState({
    id: '', club_name: '', driver_name: '', boat_quantity: '', contact: '', max_passenger: '',
    owner_name: '', provider_image: '', provider_image: '', boat_images: []
  })
  const [activeWin, setActiveWin] = useState({})
  const [activeBoat, setActiveBoat] = useState({
    id: '', club_name: '', driver_name: '', boat_quantity: '', contact: '', max_passenger: '',
    owner_name: '', provider_image: '', provider_image: '', boat_images: []
  })
  const [activeKaren, setActiveKaren] = useState({
    id: '', type: '', name: '', local_name: '', month: '', detail: '', images: []
  })
  const [activeMon, setActiveMon] = useState({
    id: '', type: '', name: '', local_name: '', month: '', detail: '', images: []
  })
  const [activeProduct, setActiveProduct] = useState({
    id: '', name: '', fb_page: '', tel: '', link: '', images: [], detail: ''
  })
  const showAccommodationPopup = (accommodation) => {
    setActiveAcommodation(accommodation)
    setOpenAccommodationPopup(true)
  }
  const showSagePopup = () => {
    setOpenSagePopup(true)
  }
  const showLeaderPopup = () => {
    setOpenLeaderPopup(true)
  }
  const showRestaurantPopup = (restaurant) => {
    setActiveRestarant(restaurant)
    setOpenRestaurantPopup(true)
  }
  const showBoatPopup = (boat) => {
    setActiveBoat(boat)
    setOpenBoatPopup(true)
  }
  const ShowWinPopup = (e, location) => {
    if (e) e.preventDefault()
    setActiveWin(location)
    setOpenWinpopup(true)
  }
  const showKarenPopup = (tradition) => {
    setActiveKaren(tradition)
    setOpenKarenPopup(true)

  }
  const showMonPopup = (tradition) => {
    setActiveMon(tradition)
    setOpenMonPopup(true)
  }
  const showProductPopup = (product) => {
    setActiveProduct(product)
    setOpenProductPopup(true)
  }


  const settings = {
    infinite: true,
    speed: 1000,
    // fade:true,
    dot: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />

  }
  const videoSettings = {
    infinite: true,
    // speed: 1000,
    // fade:true,
    dot: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />

  }


  const showAllReview = () => {
    let new_show_review = []
    let new_res_review = []
    if (res_reviews.length !== 0) {
      for (let i = 0; i < res_reviews.length; i++) {
        if (res_reviews[i]) new_show_review.push(res_reviews[i])
      }
      setShowReview([...showReview, ...new_show_review])
      new_res_review = res_reviews.splice(0, res_reviews.length)
    }
  }
  // const showAccommodationPopup =(e,accommodation)=>{
  //     if(e) e.preventDefault()

  // }
  const getAccommodation = async () => {
    let accommodation_data = await axios.get(`${process.env.SERVER_API}/get/accommodation`)
    let fetch_accommodation = accommodation_data.data.payload
    setAccommodation(fetch_accommodation)
    for (let i = 0; i < fetch_accommodation.length; i++) {
      fetch_accommodation[i].type === "แพพัก" ? boatHouses.push(fetch_accommodation[i])
        : hotels.push(fetch_accommodation[i])
    }

  }
  const getBoatProvider = async () => {
    let boat_data = await axios.get(`${process.env.SERVER_API}/get/boat-provider`)

    setBoatProviders(boat_data.data.payload)
  }
  const getTradition = async () => {
    let tradition_data = await axios.get(`${process.env.SERVER_API}/get/traditions`)

    setKarenTraditions(tradition_data.data.payload.karen_tradition)
    setMonTraditions(tradition_data.data.payload.mon_tradition)
  }
  const getProduct = async () => {
    let product_data = await axios.get(`${process.env.SERVER_API}/get/products`)

    setProducts(product_data.data.payload)
  }
  const getRestaurant = async () => {
    let restaurant_data = await axios.get(`${process.env.SERVER_API}/get/restaurant`)

    let restaurant_payload = restaurant_data.data.payload
    if (restaurant_data.status === 200) {
      for (let i = 0; i < restaurant_payload.length; i++) {
        let new_type = []
        restaurant_payload[i].type.forEach(type => {
          new_type.push(`${type} / `)
        });
        let arrToString = new_type.join(' ')
        arrToString = arrToString.substring(0, arrToString.length - 3)
        restaurant_payload[i].type = arrToString
      }
      setrestaurants(restaurant_payload)
    }
  }
  const getWinlocation = async () => {
    let location_data = await axios.get(`${process.env.SERVER_API}/get/driverLocation`)
    let location_api = []
    if (location_data.status === 200) {
      let location_sort = location_data.data.payload
      console.log('location sorting is', location_sort);
      for (let i = 0; i < 8; i++) {

        console.log(`location  data is${i}`, location_data.data.payload[i])
        location_api.push(location_data.data.payload[i])
      }
      setLocations(location_api)
    }
  }
  const getReview = async () => {
    let review_data = await axios.get(`${process.env.SERVER_API}/get/reviews`)
    if (review_data.status === 200) {
      let reviews = review_data.data.payload
      let set_review = []
      for (let i = 0; i < 9; i++) {
        if (reviews[i] === 0 || reviews[i]) set_review.push(reviews[i])
      }
      reviews.splice(0, 9)
      setRes_reviews(reviews)
      setShowReview(set_review)
    }
  }
  useEffect(() => {


    if (loading) {
      const getData = async () => {
        hotels.length === 0 ? await getAccommodation() : null
        boatProviders.length === 0 ? await getBoatProvider() : null
        restaurants.length === 0 ? await getRestaurant() : null
        karenTraditions.length === 0 || monTraditions.length === 0 ? await getTradition() : null
        products.length === 0 ? await getProduct() : null
        showReview.length === 0 ? await getReview() : null
        getWinlocation()
        setLoading(false)
      }
    }
    loading ? getData() : ''

  }, [])

  return (
    <>
      {loading === true ? (
        <div>

        </div>
      ) : (
        <div>
          <Header />
          <div className={styles['intro-section']}>

            <div className="container">

              <div className="row">
                <div className="col-md-5">
                  <div className={styles['logo-box']}>
                    <img src="/LOGO.png" alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className={styles['intro-textbox']}>
                    <span>
                      <b>สังขละบุรี </b>เป็นอำเภอชายแดนตะวันตก<br /> รอยต่อด่านเจดีย์สามองค์ติดกับเมืองพญาตองซูของประเทศเมียนมา  มีตำบลหนองลูเป็นจุดศูนย์กลางการท่องเที่ยว <br /> โดยประกอบไปด้วยเส้นทางประวัติศาสตร์และแหล่งอารยธรรม <br />
                      <br /> จนปัจจุบันถือเป็นสถานที่ท่องเที่ยวสำคัญแห่งหนึ่งของจังหวัดกาญจนบุรี ด้วยความงดงามของธรรมชาติและความหลากหลายทางวัฒนธรรมของชนชาติพันธุ์ ทั้งไทย มอญ กะเหรี่ยง ลาว และพม่า <br /><br />
                      หนึ่งในสถานที่สำคัญอันเปรียบเสมือนสัญลักษณ์แห่งเมืองนทีสามประสบที่ดึงดูดนักท่องเที่ยวให้มาเยือนสังขละบุรี <br /> คือสะพานอุตตมานุสรณ์ หรือเรียกสั้นๆ ว่า สะพานมอญ <br /> ซึ่งเป็นสะพานไม้ที่ยาวที่สุดในประเทศไทย <br />และยาวเป็นอันดับสองของโลก
                    </span>
                  </div>
                </div>
              </div>
              <div>

              </div>
            </div>
            <div className={styles['page-banner']} style={{ backgroundImage: `url('/img/home/banner.png')` }}></div>
            <div className={styles['menu-bg-box']}>
              <div className={styles['menu-wrap']}>
                <div onClick={(e) => document.getElementById("accommodation-section").scrollIntoView({ behavior: 'smooth' })} className={styles['menu-box']}>
                  <img src="/img/home/house-icon.png" alt="" />
                  <span>ที่พัก</span>
                </div>
                <div onClick={(e) => document.getElementById("attraction-section").scrollIntoView({ behavior: 'smooth' })} className={styles['menu-box']}>
                  <img src="/img/home/attraction-icon.png" alt="" />
                  <span>ที่เที่ยว</span>
                </div>
                <div onClick={(e) => document.getElementById("restaurant-section").scrollIntoView({ behavior: 'smooth' })} className={styles['menu-box']}>
                  <img src="/img/home/restaurant-icon.png" alt="" />
                  <span>ร้านอาหาร/กาแฟ</span>
                </div>
                <div onClick={(e) => document.getElementById("transportation-section").scrollIntoView({ behavior: 'smooth' })} className={styles['menu-box']}>
                  <img src="/img/home/tradition-icon.png" alt="" />
                  <span>ขนส่งสาธารณะ</span>
                </div>

                <div onClick={(e) => document.getElementById("tradition-section").scrollIntoView({ behavior: 'smooth' })} className={styles['menu-box']}>
                  <img src="/img/home/tradition-icon.png" alt="" />
                  <span>วัฒนธรรม</span>
                </div>
                <div onClick={(e) => document.getElementById("product-section").scrollIntoView({ behavior: 'smooth' })} className={styles['menu-box']}>
                  <img src="/img/home/product-icon.png" alt="" />
                  <span>ผลิตภัณฑ์ชุมชน</span>
                </div>
                <div onClick={(e) => document.getElementById("review-section").scrollIntoView({ behavior: 'smooth' })} className={styles['menu-box']}>
                  <img src="/img/home/review-icon.png" alt="" />
                  <span>รีวิว</span>
                </div>
              </div>
            </div>
          </div>
          <div id='accommodation-section' className={styles['accommodation-section']}>
            <div className="container">
              <div className="col-12">
                <div className={styles['accommodation-flexbox']}>
                  <div className={styles['accommodation-title']}>
                    <span>ที่พัก</span>
                    <span>โรงแรม / โฮมสเตย์ / รีสอร์ท / แพพัก / เรือนรับรอง / โฮสเทล</span>
                  </div>
                  <div className={styles['accommodation-list']}>
                    {hotels.length > 0 ? hotels.map((hotel) => (
                      <div onClick={() => showAccommodationPopup(hotel)} key={hotel.id} className={styles['accommodation-item']} >
                        <img src={hotel.images.length > 0 ? `/uploadImage/accommodation/${hotel.images[0]}` : '/no-imge.png'} alt="" />
                        <span className={styles['accommodation-name']} >{hotel.name}<br /></span>
                        <div className={styles['price-box']} >
                          <img className={styles['icon-b']} src="/img/accommodation/icon-B.png" alt="" />
                          <span>{`${hotel.min_price} - ${hotel.max_price} บาท`}</span>
                        </div>
                      </div>
                    )) : ''}
                  </div>
                  <div className={styles['boat-house-list']}>
                    {boatHouses.length > 0 ? boatHouses.map((boatHouse) => (
                      <div onClick={() => showAccommodationPopup(boatHouse)} key={boatHouse.id} className={styles['boat-house-item']}>
                        <div className={styles['boat-image-box']} style={{ backgroundImage: `url('/img/home/boat-house-box.png')` }} >
                          <img src={boatHouse.images.length > 0 ? `/uploadImage/accommodation/${boatHouse.images[0]}` : '/no-image-big.png'} alt="" />
                        </div>
                        <div className={styles['boat-house-name-box']}>
                          <span className={styles['accommodation-name']} >{boatHouse.name}<br /></span>
                          <div className={styles['price-box']} >
                            <img className={styles['icon-b']} src="/img/accommodation/icon-B.png" alt="" />
                            <span>{`${boatHouse.min_price} - ${boatHouse.max_price} บาท`}</span>
                          </div>
                        </div>
                      </div>
                    )) : ''}

                  </div>
                  <Link href={'/accommodation'}><span className={styles['see-all-button']}>ดูทั้งหมด</span></Link>
                </div>
              </div>
            </div>

          </div>
          <div id='attraction-section' className={styles['attraction-section']}>
            <div className="container">
              <div className="col">
                <div className={styles['attraction-flexbox']}>

                  <div className={styles['attraction-map']}>
                    <div className={styles['attraction-title-box']}>
                      <span>สถานที่ท่องเที่ยว</span>
                      <span>
                        สัมผัสบรรยากาศธรรมชาติ วัฒนธรรม<br />
                        เกษตรกรรมและชุมชน แบบสังขละบุรี
                      </span>
                    </div>
                    <div className={`${styles['right-pin']} ${styles['right-pin-position1']}`}>
                      <div className={styles['attraction-name-box']}>
                        <div className={styles['sm-box']}>
                          <span>จุดล่องแพ</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles['left-pin']} ${styles['left-pin-position1']}`}>
                      <div className={styles['attraction-name-box']}>
                        <div className={styles['sm-box']}>
                          <span>ร.ร.ห้วยกบ</span>
                        </div>
                      </div>
                    </div>
                    {/* <div className={`${styles['left-pin']} ${styles['left-pin-position2']}`}>
                          <div className={styles['attraction-name-box']}>
                            <div className={styles['sm-box']}>บ้านห้วยกบ</div>
                          </div>
                    </div> */}
                    <div className={`${styles['left-pin']} ${styles['left-pin-position2']}`}>
                      <div className={styles['attraction-name-box']}>
                        <div className={styles['sm-box']}>
                          <span>แม่น้ำบีคลี่</span>
                        </div>
                      </div>
                    </div>

                    <div className={`${styles['left-pin']} ${styles['left-pin-position3']}`}>
                      <div className={styles['attraction-name-box']}>
                        <div className={styles['lg-box']}>
                          <span>เขตรักษาพันธุ์สัตว์ป่า<br />
                            <b>ทุ่งใหญ่นเรศวร</b></span>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles['left-pin']} ${styles['left-pin-position4']}`}>
                      <div className={styles['attraction-name-box']}>
                        <div className={styles['sm-box']}>
                          <span>สะพานมอญ</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles['right-pin']} ${styles['right-pin-position2']} `}>
                      <div className={styles['attraction-name-box']}>
                        <div className={styles['lg-box']}>
                          <span>วัดเจดีสามองค์</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles['temple-box']}>
                      <div className={styles['attraction-name-box']}>
                        <div className={styles['lg-box']}>
                          <span>วัดจมน้ำ</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  <span onClick={(e) => router.push('/attraction')} className={styles['see-all-button']}>ดูทั้งหมด</span>
                  <div className={styles['leader-box']}>
                    <div className="container">
                      <div className="col-12">
                        <div className={styles['leader-row-box']}>
                          <div className={styles['leader-left-box']}>
                            <div className={styles['leader-tag']}>ปราชญ์ชุมชนและผู้มีความโดดเด่น</div>
                            <div onClick={(e) => setOpenSagePopup(true)} className={styles['leader-item']}>
                              <div className={styles['leader-image-box']} style={{ backgroundImage: '/frame.png' }}>
                                <div className={styles['leader-img']} style={{ backgroundImage: `url('/Uttamarambho.png')` }} ></div>
                              </div>
                              <span>หลวงพ่ออุตมะ</span>
                            </div>
                          </div>
                          <div className={styles['leader-right-box']}>
                            <div className={styles['leader-tag']}>ผู้นำชุมชน</div>
                            <div onClick={(e) => setOpenLeaderPopup(true)} className={styles['leader-item']}>
                              <div className={styles['leader-image-box']}>
                                <div className={styles['leader-img']} style={{ backgroundImage: `url('/srisuwankeeree.jpeg')` }}></div>
                              </div>
                              <span>เจ้าศรีสุวรรณคีรี</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div id='restaurant-section' className={styles['restaurant-section']}>
            <div className={styles['restaurant-flexbox']}>
              <div className={styles['restaurant-title']}>
                <span>ร้านอาหาร/กาแฟ</span>
              </div>
              <div className={styles['slider']}>
                <Slider {...settings}>
                  {restaurants.length > 0 ? restaurants.map((restaurant) => (
                    <div key={restaurant.id} className={styles['slider-box']}>
                      <div onClick={(e) => showRestaurantPopup(restaurant)} className={styles['restaurant-item']}>
                        <img className={styles['restaurant-image']} src={restaurant.images.length > 0 ? `/uploadImage/restaurant/${restaurant.images[0]}` : '/no-imge.png'} alt="" />
                        <span>{restaurant.name}</span>
                        <span>{restaurant.type}</span>
                        <span><b style={{ color: '#383838' }}>เมนูแนะนำ : </b>{restaurant.recommend_menu}</span>
                      </div>
                    </div>
                  )) : ''}
                </Slider>
              </div>
              <div onClick={(e) => router.push('/restaurant')} className={styles['see-all-box']}> <span className={styles['see-all-button']}>ดูทั้งหมด</span></div>
              <div className={styles['restaurant-bg-image-box']}>
                <img src="/img/restaurant/title-bottom-left.png" alt="" />
                <img src="/img/restaurant/title-bottom-right.png" alt="" />
              </div>
            </div>
          </div>
          <div id='transportation-section' className={styles['public-transportation-section']}>
            <div className="container">
              <div className={styles['transportation-flexbox']}>
                <span className={styles['transportation-title']}>ขนส่งสาธารณะ</span>
                <div className={styles['location-map-box']}>
                  <span className={styles['win-title']}>วินมอเตอร์ไซค์</span>
                  {locations.map((location, i) => (
                    <div onClick={(e) => ShowWinPopup(e, location)} key={location.location_name} className={`${styles['location-box-name']} ${styles[`locationbox${i}`]}`}>
                      <span>{location.location_name}</span>
                    </div>
                  ))}
                </div>
                <span onClick={(e) => router.push('/publicTransportation#วิน')} className={styles['see-all-button']}>ดูทั้งหมด</span>
                <div className={styles['boat-tour-box']}>
                  <span className={styles['boat-title']}>เรือนำเที่ยว</span>
                  <div className={styles['slider']}>
                    <Slider {...settings}>
                      {boatProviders.length > 0 ? boatProviders.map((boatProvider) => (
                        <div key={boatProvider.id} className={styles['boat-slider-box']}>
                          <div onClick={() => showBoatPopup(boatProvider)} className={styles['boat-provider-item']}>
                            <img className={styles['boat-provider-image']} src={boatProvider.boat_images.length > 0 ? `/uploadImage/boatProvider/${boatProvider.boat_images[0]}` : '/no-imge.png'} alt="" />
                            <div className={styles['boat-textbox']} >
                              <p className={styles['boat-club-name']} >{boatProvider.club_name}</p>
                              <p className={styles['boat-provider-name']}>{boatProvider.provider_name} </p>
                            </div>
                          </div>
                        </div>
                      )) : ''}
                    </Slider>
                  </div>
                  <span onClick={(e) => router.push('/publicTransportation#boat')} className={styles['see-all-button']}>ดูทั้งหมด</span>
                </div>
              </div>
            </div>
          </div>
          <div id='tradition-section' className={styles['tradition-section']}>
            <div className="container">
              <div className="col">
                <div className={styles['tradition-flexbox']}>
                  <div className={styles['tradition-title-box']}>
                    <span>ประเพณี </span>
                    <div className={styles['tradition-title']}>
                      ประเพณีชาวกระเหรี่ยง
                    </div>
                    <div className={styles['black-line']}></div>
                  </div>
                  <div className={styles['tradition-list-box']}>
                    {karenTraditions.length > 0 ? karenTraditions.map((karen) => (
                      <div onClick={() => showKarenPopup(karen)} key={karen.id} className={styles['tradition-item']}>
                        <div className={styles['image-box-size']}>

                          <div className={styles['tradition-image-box']} style={{ backgroundImage: `url('/img/tradition/tradition-frame.png')}` }}>
                            <div style={{ backgroundImage: `url(${karen.images.length > 0 ? `/uploadImage/tradition/${karen.images[0]}` : '/img/tradition/traditionPlaceholder.png'})` }} className={styles['tradition-image']}></div>

                          </div>
                        </div>
                        <div className={styles['month-name-box']}>{karen.month}</div>
                      </div>
                    )) : ''}
                  </div>
                  <div className={styles['tradition-title-box']}>
                    <div className={styles['black-line']}></div>
                    <div className={styles['tradition-title']}>
                      ประเพณีชาวมอญ
                    </div>
                  </div>
                  <div className={styles['tradition-list-box']}>
                    {monTraditions.length > 0 ? monTraditions.map((mon) => (
                      <div onClick={() => showMonPopup(mon)} key={mon.id} className={styles['tradition-item']}>
                        <div className={styles['image-box-size']}>

                          <div className={styles['tradition-image-box']} >
                            <div style={{ backgroundImage: `url(${mon.images.length > 0 ? `/uploadImage/tradition/${mon.images[0]}` : '/img/tradition/traditionPlaceholder.png'})` }} className={styles['tradition-image']}></div>

                          </div>
                        </div>
                        <div className={styles['month-name-box']}>{mon.month}</div>
                      </div>
                    )) : ''}
                  </div>
                  <span onClick={(e) => router.push('/traditions')} className={styles['see-all-button']}>ดูทั้งหมด</span>
                </div>
              </div>
            </div>
          </div>
          <div id='product-section' className={styles['product-section']}>
            <div className="container">
              <div className="col">
                <div className={styles['product-flexbox']}>
                  <span className={styles['product-title']}>ผลิตภัณฑ์ชุมชน</span>
                  <div className={styles['product-list']}>
                    {products.length > 0 ? products.map((product) => (
                      <div onClick={() => showProductPopup(product)} key={product.id} className={styles['product-item']}>
                        <div className={styles['product-image-box']}>
                          <div style={{ backgroundImage: `url(${product.images.length > 0 ? `/uploadImage/product/${product.images[0]}` : '/no-imge.png'})` }}></div>
                        </div>
                        <span>{product.name}</span>
                      </div>
                    )) : ''}
                  </div>
                  <span onClick={(e) => router.push('/product')} className={styles['see-all-button']}>ดูทั้งหมด</span>
                </div>
              </div>
            </div>
          </div>
          <div id='review-section' className={styles['review-section']}>
            <div className="container">
              <div className="col">
                <div className={styles['review-flexbox']}>

                  <div className="container">
                    <div className="row">
                      <div className="col-md-8">
                        <div className={styles['review-slider-box']}>
                          <Slider {...videoSettings}>
                            <div className={styles['video-item']}>
                              <iframe width="577" height="315" src="https://www.youtube.com/embed/36iD3HmGt8g" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/7myqazGs5_Y" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/MKJZ3Jdsucg" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/jD7vUEytFdw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/Wr1PBrBZkQw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/BHFVD2hJ7KA" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/B7ync4odCJk" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/v_ulqJa2Jpw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>

                          </Slider>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className={styles['review-title-box']}>
                          <span>สังขละรีวิว</span>
                          <span>นอกจากสะพานมอญ ที่เป็นไฮไลท์
                            ของสังขละบุรีแล้ว มีที่ไหนน่าไปอีกบ้าง
                            ตามดูในรีวิวกันได้เลย
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles['review-list-box']}>
                  <span>ลิงค์รีวิวสังขละเพิ่มเติม</span>
                  <div className={styles['review-list']}>
                    {showReview.length > 0 ? showReview.map((review) => (
                      <div key={review.review_name} className={styles['review-item']}>
                        <div className={styles['link-icon']}></div>
                        <span><a target="_blank" href={review.review_link}>{review.review_name}</a></span>
                      </div>
                    )) : ''}
                  </div>
                  {res_reviews.length > 0 ? (<span onClick={(e) => showAllReview(e)} className={styles['see-all-button']}>แสดงทั้งหมด</span>) : ''}
                </div>

              </div>
            </div>
            <AccommodationPopup open={openAccommodationPopup} onClose={() => setOpenAccommodationPopup(false)} activeAcommodation={activeAcommodation} />
            <SagePopup open={openSagePopup} onClose={() => setOpenSagePopup(false)} />
            <LeaderPopup open={openLeaderPopup} onClose={() => setOpenLeaderPopup(false)} />
            <BoatProviderPopup open={openBoatPopup} onClose={() => setOpenBoatPopup(false)} activeBoat={activeBoat} />
            <RestaurantPopup open={openRestaurantPopup} onClose={() => setOpenRestaurantPopup(false)} activeRestaurant={activeRestarant} />
            <WinPopup open={openWinpopup} onClose={() => setOpenWinpopup(false)} activeWin={activeWin} />
            <KarenPopup open={openKarenPopup} onClose={() => setOpenKarenPopup(false)} activeKarenTradition={activeKaren} />
            <MonPopup open={openMonPopup} onClose={() => setOpenMonPopup(false)} activeMonTradition={activeMon} />
            <ProductPopup open={openProductPopup} onClose={() => setOpenProductPopup(false)} activeProduct={activeProduct} />
            <Footer />
          </div>


        </div>

      )}
    </>
  )
}
