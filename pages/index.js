import { React, useState, useEffect, useCallback } from 'react'
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
import SagePopup from '../components/sagePopup';
import LeaderPopup from '../components/leaderPopup';
import RestaurantPopup from '../components/restaurantPopup';
import AttractionPopup from '../components/attractionPopup';
import WinPopup from '../components/winPopup'
import BoatProviderPopup from '../components/boatPopup'
import KarenPopup from '../components/karenTraditionPopup';
import MonPopup from '../components/monTraditionPopup';
import ProductPopup from '../components/productPopup';
import Header from '../layouts/header';
import FixedHeader from '../layouts/fixedHeader';
import Script from 'next/script';
import Swal from 'sweetalert2';
import CommentPopup from '../components/commentPopup';
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
const MDRightArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img src="/right-arrow.png" style={{ ...style, width: '16px', height: '32px', right: '-24px', top: '40%' }} className={className} onClick={onClick} alt="" />
  );
}
const MDLeftArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img src="/left-arrow.png" alt="" style={{ ...style, width: '16px', height: '32px', left: '-24px', top: '40%' }} className={className} onClick={onClick} />
  )
}
const SMRightArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img src="/right-arrow.png" style={{ ...style, width: '12px', height: '24px', right: '-16px', top: '40%' }} className={className} onClick={onClick} alt="" />
  );
}
const SMLeftArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img src="/left-arrow.png" alt="" style={{ ...style, width: '12px', height: '24px', left: '-16px', top: '40%' }} className={className} onClick={onClick} />
  )
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export default function index() {

  const router = useRouter();
  const [nowDots, setNowDots] = useState(0)
  const [accommodation, setAccommodation] = useState([])
  const [hotels, setHotels] = useState([])
  const [boatHouses, setBoatHouses] = useState([])
  const [attractions, setAttractions] = useState([])
  const [mobileAttraction, setMobileAttraction] = useState([])
  const [restaurants, setrestaurants] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  const [boatProviders, setBoatProviders] = useState([])
  const [karenTraditions, setKarenTraditions] = useState([])
  const [monTraditions, setMonTraditions] = useState([])
  const [products, setProducts] = useState([])
  const [showReview, setShowReview] = useState([])
  const [res_reviews, setRes_reviews] = useState([])
  const [newComment, setNewComment] = useState({
    commentator_name: '', commentator_email: '', comment_text: ''
  });
  const [openAccommodationPopup, setOpenAccommodationPopup] = useState(false)
  const [openSagePopup, setOpenSagePopup] = useState(false)
  const [openLeaderPopup, setOpenLeaderPopup] = useState(false)
  const [openRestaurantPopup, setOpenRestaurantPopup] = useState(false)
  const [openAttractionpopup, setopenAttractionpopup] = useState(false)
  const [openWinpopup, setOpenWinpopup] = useState(false)
  const [openBoatPopup, setOpenBoatPopup] = useState(false)
  const [comments, setComments] = useState([]);
  const [openKarenPopup, setOpenKarenPopup] = useState(false)
  const [openMonPopup, setOpenMonPopup] = useState(false)
  const [openProductPopup, setOpenProductPopup] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [showCommentPopup, setShowCommentPopup] = useState(false);
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
  const [activeAttraction, setActiveAttraction] = useState({
    id: '', type: '', name: '', detail: '', images: []
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

  const showSagePopup = (e) => {
    if (e) e.preventDefault()
    setOpenSagePopup(true)
  }
  const showLeaderPopup = () => {

    setOpenLeaderPopup(true)
  }
  const showAccommodationPopup = useCallback(
    (e, accommodation) => {
      if (e) e.preventDefault()

      if (dragging) {
        e.stopPropagation()

      }
      else if (!dragging) {
        setActiveAcommodation(accommodation)
        setOpenAccommodationPopup(true)
        console.log('drag is ', dragging)
      }
    },
    [dragging],
  )
  const showRestaurantPopup = useCallback(
    (e, restaurant) => {
      if (e) e.preventDefault()
      if (dragging) e.stopPropagation()
      else if (!dragging) {
        setActiveRestarant(restaurant)
        setOpenRestaurantPopup(true)
      }

    },
    [dragging],
  )
  const showAttractionPopup = (e, attraction) => {
    if (e) e.preventDefault()
    setopenAttractionpopup(true)
    setActiveAttraction(attraction)
  }
  const showBoatPopup = useCallback(
    (e, boat) => {
      if (e) e.preventDefault()
      if (dragging) e.stopPropagation()
      else if (!dragging) {
        setActiveBoat(boat)
        setOpenBoatPopup(true)
      }
    },
    [dragging],
  )
  const ShowWinPopup = (e, location) => {
    if (e) e.preventDefault()
    setActiveWin(location)
    setOpenWinpopup(true)
  }
  const showKarenPopup = (e, tradition) => {
    if (e) e.preventDefault()
    setActiveKaren(tradition)
    setOpenKarenPopup(true)

  }
  const showMonPopup = (e, tradition) => {
    if (e) e.preventDefault()
    setActiveMon(tradition)
    setOpenMonPopup(true)
  }
  const showProductPopup = useCallback(
    (e, product) => {
      if (e) e.preventDefault()
      if (dragging) e.stopPropagation()
      else if (!dragging) {
        setActiveProduct(product)
        setOpenProductPopup(true)
      }
    },
    [dragging],
  )


  const BFChange = useCallback(
    () => {
      setDragging(true)
      console.log('bf drag is ', dragging)
    },
    [setDragging],
  )
  const AFChange = useCallback(
    () => {
      setDragging(false)
      console.log('at drag is ', dragging)
    },
    [setDragging],
  )

  const settings = {
    infinite: true,
    speed: 1000,
    // fade:true,
    dot: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    // autoplay: true,
    autoplay: false,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    beforeChange: () => {
      BFChange()
    },
    afterChange: () => {
      AFChange()
    },
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          arrows: true,
          speed: 1000,

        }
      },
      {
        breakpoint: 1024,
        settings: {

          slidesToScroll: 3,
          slidesToShow: 3,
          dots: false,
          nextArrow: <MDRightArrow />,
          prevArrow: <MDLeftArrow />,
        }
      },
      {
        breakpoint: 767,
        settings: {

          slidesToScroll: 2,
          slidesToShow: 2,
          dots: false,
          nextArrow: <SMRightArrow />,
          prevArrow: <SMLeftArrow />,
        }
      },
    ]

  }
  const BoatSettings = {
    infinite: true,
    speed: 1000,
    // fade:true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    // autoplay: true,
    autoplay: false,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    beforeChange: () => {
      BFChange()
    },
    afterChange: () => {
      AFChange()
    },
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          arrows: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          speed: 1000,
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
          nextArrow: <MDRightArrow />,
          prevArrow: <MDLeftArrow />,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
          nextArrow: <SMRightArrow />,
          prevArrow: <SMLeftArrow />,
        }
      },
    ]
  }
  const videoSettings = {
    infinite: true,
    speed: 1000,
    // fade:true,
    dots: true,
    customPaging: i => (
      <div
        className={styles['review-dots']}
      >
        {i + 1}
      </div>
    ),
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          arrows: true,
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          beforeChange: (prev, next) => {

            setNowDots(next)
          },
          customPaging: (i) => (
            <div
              style={{
                position: "relative",
                top: '20px',
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                color: "#383838",
                border: '2px solid #383838',
                backgroundColor: `${i === nowDots ? '#E1D3B6' : '#FBF6E9'}`,
              }}

            >
              {`${i + 1}`}
            </div>
          ),
        }
      },
    ]

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
    setHotels(accommodation_data.data.hotel)
    setBoatHouses(accommodation_data.data.boat_house)
    // for (let i = 0; i < fetch_accommodation.length; i++) {
    //   fetch_accommodation[i].type === "แพพัก" ? boatHouses.push(fetch_accommodation[i])
    //     : hotels.push(fetch_accommodation[i])
    // }

  }
  const getAttraction = async () => {
    let attraction_data = await axios.get(`${process.env.SERVER_API}/get/init-attraction`)
    console.log('attraction is', attraction_data.data.payload);
    setAttractions(attraction_data.data.payload)
  }
  const getMobileAttraction = async () => {
    let mobile_attraction_data = await axios.get(`${process.env.SERVER_API}/get/init-attraction-mobile`)
    console.log('mobile attraction is', mobile_attraction_data.data.payload);
    setMobileAttraction(mobile_attraction_data.data.payload)
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
    console.log(restaurant_data.data.payload.length);
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
    if (screen.availWidth <= 767) {
      if (location_data.status === 200) {
        for (let i = 0; i < 4; i++) {

          location_api.push(location_data.data.payload[i])
        }
        setLocations(location_api)
      }
    }
    else {
      if (location_data.status === 200) {
        for (let i = 0; i < 8; i++) {

          location_api.push(location_data.data.payload[i])
        }
        setLocations(location_api)
      }
    }
  }
  const getReview = async () => {
    let review_data = await axios.get(`${process.env.SERVER_API}/get/reviews`)
    if (review_data.status === 200) {
      let reviews = review_data.data.payload
      let set_review = []
      if (screen.availWidth >= 1300) {
        for (let i = 0; i < 9; i++) {
          if (reviews[i] === 0 || reviews[i]) set_review.push(reviews[i])
        }
        reviews.splice(0, 9)
      } else if (screen.availWidth >= 768) {
        for (let i = 0; i < 8; i++) {
          if (reviews[i] === 0 || reviews[i]) set_review.push(reviews[i])
        }
        reviews.splice(0, 8)
      } else {
        for (let i = 0; i < 4; i++) {
          if (reviews[i] === 0 || reviews[i]) set_review.push(reviews[i])
        }
        reviews.splice(0, 4)
      }



      setRes_reviews(reviews)
      setShowReview(set_review)
    }
  }
  const submitComment = (e) => {
    if (e) e.preventDefault()
    if (!newComment.comment_text || !newComment.commentator_email) {
      Swal.fire({
        title: 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน',
        icon: 'warning',
        confirmButtonColor: '#D7886F',
        confirmButtonText: 'ตกลง'

      })
      return false
    }
    if (validateEmail(newComment.commentator_email)) {
      axios.post(`${process.env.SERVER_API}/create/comment`, newComment).then((res) => {
        // console.log('response is ', res.data.payload);
        if (res.data.status === 200) {
          console.log('res data is', res.data);
          setShowCommentPopup(true)
        }
      })
    }
    else if (!validateEmail(newComment.commentator_email)) {
      Swal.fire({
        title: 'กรุณากรอกอีเมลล์ให้ถูกต้อง',
        icon: 'warning',
        confirmButtonColor: '#D7886F',
        confirmButtonText: 'ตกลง'

      })
      return false
    }

    console.log(newComment);
  }
  const getCommnet = async () => {
    const response = await axios.get(`${process.env.SERVER_API}/get/comment`)
    console.log(response.data);
    setComments(response.data.payload.approve)
    // setComments(response.data.payload.pending)
  }
  useEffect(() => {

    console.log('wide is', screen.availWidth);
    if (loading) {
      const getData = async () => {
        hotels.length === 0 ? await getAccommodation() : null
        attractions.length === 0 ? await getAttraction() : null
        mobileAttraction.length === 0 ? await getMobileAttraction() : null
        boatProviders.length === 0 ? await getBoatProvider() : null
        restaurants.length === 0 ? await getRestaurant() : null
        karenTraditions.length === 0 || monTraditions.length === 0 ? await getTradition() : null
        products.length === 0 ? await getProduct() : null
        showReview.length === 0 ? await getReview() : null
        comments.length === 0 ? await getCommnet() : null
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
          <Head>
            <title>Sangkhla2go</title>
          </Head>
          <FixedHeader />
          <Header />
          <div className={styles['intro-section']}>
            <div className="container">

              <div className="row">
                <div className="col-xxl-5">
                  <div className={styles['logo-box']}>
                    <img src="/LOGO.png" alt="" />
                  </div>
                </div>
                <div className="col-xxl-7">
                  {/* <div className={styles['md-intro-textbox']}>
                    <span>
                      <b>สังขละบุรี </b>เป็นอำเภอชายแดนตะวันตก<br /> รอยต่อด่านเจดีย์สามองค์ติดกับเมืองพญาตองซูของประเทศเมียนมา  มีตำบลหนองลูเป็นจุดศูนย์กลางการท่องเที่ยว <br /> โดยประกอบไปด้วยเส้นทางประวัติศาสตร์และแหล่งอารยธรรม <br />
                      <br /> จนปัจจุบันถือเป็นสถานที่ท่องเที่ยวสำคัญแห่งหนึ่งของจังหวัดกาญจนบุรี ด้วยความงดงามของธรรมชาติและความหลากหลายทางวัฒนธรรมของชนชาติพันธุ์ ทั้งไทย มอญ กะเหรี่ยง ลาว และพม่า <br /><br />
                      หนึ่งในสถานที่สำคัญอันเปรียบเสมือนสัญลักษณ์แห่งเมืองนทีสามประสบที่ดึงดูดนักท่องเที่ยวให้มาเยือนสังขละบุรี <br /> คือสะพานอุตตมานุสรณ์ หรือเรียกสั้นๆ ว่า สะพานมอญ <br /> ซึ่งเป็นสะพานไม้ที่ยาวที่สุดในประเทศไทย <br />และยาวเป็นอันดับสองของโลก
                    </span>
                  </div> */}
                  <div className={styles['intro-textbox']}>
                    <span>
                      <b>สังขละบุรี </b>เป็นอำเภอชายแดนตะวันตก รอยต่อด่านเจดีย์สามองค์ติดกับเมืองพญาตองซูของประเทศเมียนมา  มีตำบลหนองลูเป็นจุดศูนย์กลางการท่องเที่ยว  โดยประกอบไปด้วยเส้นทางประวัติศาสตร์และแหล่งอารยธรรม<br /><br />
                    </span>
                    <span>

                      จนปัจจุบันถือเป็นสถานที่ท่องเที่ยวสำคัญแห่งหนึ่งของจังหวัดกาญจนบุรี ด้วยความงดงามของธรรมชาติและความหลากหลายทางวัฒนธรรมของชนชาติพันธุ์ ทั้งไทย มอญ กะเหรี่ยง ลาว และพม่า <br /><br />

                    </span>
                    <span>หนึ่งในสถานที่สำคัญอันเปรียบเสมือนสัญลักษณ์แห่งเมืองนทีสามประสบที่ดึงดูดนักท่องเที่ยวให้มาเยือนสังขละบุรี คือสะพานอุตตมานุสรณ์ หรือเรียกสั้นๆ ว่า สะพานมอญ  ซึ่งเป็นสะพานไม้ที่ยาวที่สุดในประเทศไทย และยาวเป็นอันดับสองของโลก</span>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
            <div className={styles['page-banner']} style={{ backgroundImage: `url('/img/home/banner.png')` }}></div>
            <div className={styles['menu-bg-box']}>
              <div className={styles['sm-menu-wrap']}>
                <div onClick={(e) => document.getElementById("accommodation-section").scrollIntoView({ behavior: 'smooth' })} className={styles['sm-menu-box']}>
                  <img src="/img/menu/sm-accom-icon.png" alt="" />
                  <span>ที่พัก</span>
                </div>
                <div onClick={(e) => document.getElementById("attraction-section").scrollIntoView({ behavior: 'smooth' })} className={styles['sm-menu-box']}>
                  <img src="/img/menu/sm-attraction-icon.png" alt="" />
                  <span>ที่เที่ยว</span>
                </div>
                <div onClick={(e) => document.getElementById("restaurant-section").scrollIntoView({ behavior: 'smooth' })} className={styles['sm-menu-box']}>
                  <img src="/img/menu/sm-restaurant-icon.png" alt="" />
                  <span>ร้านอาหาร/กาแฟ</span>
                </div>
                <div onClick={(e) => document.getElementById("transportation-section").scrollIntoView({ behavior: 'smooth' })} className={styles['sm-menu-box']}>
                  <img src="/img/menu/sm-pt-icon.png" alt="" />
                  <span>ขนส่งสาธารณะ</span>
                </div>
                <div onClick={(e) => document.getElementById("tradition-section").scrollIntoView({ behavior: 'smooth' })} className={styles['sm-menu-box']}>
                  <img src="/img/menu/sm-tradition-icon.png" alt="" />
                  <span>วัฒนธรรม</span>
                </div>
                <div onClick={(e) => document.getElementById("product-section").scrollIntoView({ behavior: 'smooth' })} className={styles['sm-menu-box']}>
                  <img src="/img/menu/sm-product-icon.png" alt="" />
                  <span>ผลิตภัณฑ์ชุมชน</span>
                </div>
                <div onClick={(e) => document.getElementById("review-section").scrollIntoView({ behavior: 'smooth' })} className={styles['sm-menu-box']}>
                  <img src="/img/menu/sm-review-icon.png" alt="" />
                  <span>รีวิว</span>
                </div>
              </div>
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
                  <img src="/img/home/transportation-icon.png" alt="" />
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
                  <div className={styles['slider']}>
                    <Slider  {...settings}>
                      {hotels.length > 0 ? hotels.map((hotel) => (
                        <div key={hotel.id} className={styles['slider-box']}>
                          <div onClickCapture={(e) => showAccommodationPopup(e, hotel)} key={hotel.id} className={styles['accommodation-item']} >
                            <img src={hotel.images.length > 0 ? `${hotel.images[0]}` : '/accom-placeholder.png'} alt="" />
                            <span className={styles['accommodation-name']} >{hotel.name}<br /></span>
                            <div className={styles['price-box']} >
                              <img className={styles['icon-b']} src="/img/accommodation/icon-B.png" alt="" />
                              <span>{`${hotel.min_price} - ${hotel.max_price} บาท`}</span>
                            </div>
                          </div>
                        </div>
                      )) : ''}
                    </Slider>
                  </div>
                  <div className={styles['slider']}>
                    <Slider {...BoatSettings}>
                      {boatHouses.length > 0 ? boatHouses.map((boatHouse) => (
                        <div className={styles['boat-house-slider-box']} key={boatHouse.id}>
                          <div onClickCapture={(e) => showAccommodationPopup(e, boatHouse)} className={styles['boat-house-item']}>
                            <div className={styles['boat-image-box']} >
                              <img src={boatHouse.images.length > 0 ? `${boatHouse.images[0]}` : '/accom-placeholder.png'} alt="" />
                            </div>
                            <div className={styles['boat-house-name-box']}>
                              <span className={styles['accommodation-name']} >{boatHouse.name}<br /></span>
                              <div className={styles['price-box']} >
                                <img className={styles['icon-b']} src="/img/accommodation/icon-B.png" alt="" />
                                <span>{`${boatHouse.min_price} - ${boatHouse.max_price} บาท`}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )) : ''}
                    </Slider>
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
                  <div className={styles['attraction-title-box']}>
                    <span>สถานที่ท่องเที่ยว</span>
                    <span>
                      สัมผัสบรรยากาศ ธรรมชาติ วัฒนธรรม<br />
                      เกษตรกรรมและชุมชน แบบสังขละบุรี
                    </span>
                  </div>
                  <div className={styles['sm-attraction-map-box']}>
                    <div className={styles['sm-attraction-map']}>

                    </div>
                    <div className={styles['sm-attraction-list']}>
                      {mobileAttraction.length > 0 ? mobileAttraction.map((mbAttraction, i) => (
                        <div className={styles['sm-attraction-item']} onClick={(e) => showAttractionPopup(e, mbAttraction)} key={mbAttraction.id}>
                          <div className={styles['attraction-number']}>{i + 1}</div>
                          <span>{mbAttraction.name}</span>
                        </div>
                      )) : ''}
                    </div>
                  </div>
                  <div className={styles['attraction-map']}>
                    {attractions.length > 0 ? attractions.map((attraction, i) => (
                      <div onClick={(e) => showAttractionPopup(e, attraction)} key={attraction.id} className={`${styles[`pin${i}`]} ${styles[`pin-position${i}`]}`}>
                        <div className={`${styles['text-box']} ${styles[`text-box${i}`]}`}></div>
                      </div>
                    )) : ''}
                  </div>
                  <span onClick={(e) => router.push('/attraction')} className={styles['see-all-button']}>{screen.availWidth > 800 ? "ดูทั้งหมด" : "ดูข้อมูลสถานที่ทั้งหมด"}</span>
                  <div className={styles['leader-box']}>
                    <div className="container-fluid">
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
                      <div onClickCapture={(e) => showRestaurantPopup(e, restaurant)} className={styles['restaurant-item']}>
                        <img className={styles['restaurant-image']} src={restaurant.images.length > 0 ? `${restaurant.images[0]}` : '/restaurant-placeholder.png'} alt="" />
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
                {/* <img src="/img/restaurant/title-bottom-left.png" alt="" /> */}
                <div></div>
                <div></div>
                {/* <img src="/img/restaurant/title-bottom-right.png" alt="" /> */}
              </div>
            </div>
          </div>
          <div id='transportation-section' className={styles['public-transportation-section']}>
            <div className="container">
              <div className={styles['transportation-flexbox']}>
                <span className={styles['transportation-title']}>ขนส่งสาธารณะ</span>
                <span className={styles['sm-win-title']}>วินมอเตอร์ไซค์</span>
                <div className={styles['sm-location-list']}>
                  {locations.map((location) => (
                    <div onClick={(e) => ShowWinPopup(e, location)} key={location.id} className={styles['sm-location-item']}>
                      <span>{location.location_name}</span>
                    </div>
                  ))}
                </div>
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
                          <div onClickCapture={(e) => showBoatPopup(e, boatProvider)} className={styles['boat-provider-item']}>
                            <img className={styles['boat-provider-image']} src={boatProvider.boat_images.length > 0 ? `${boatProvider.boat_images[0]}` : '/boat-placeholder.png'} alt="" />
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
                      ประเพณีชาวกะเหรี่ยง
                    </div>
                    <div className={styles['black-line']}></div>

                  </div>
                  <span className={styles['sm-tradition-title']}>ประเพณี</span>
                  <div className={styles['sm-karen-title']}></div>
                  <div className={styles['tradition-list-box']}>
                    {karenTraditions.length > 0 ? karenTraditions.map((karen, i) => (
                      <div onClick={(e) => showKarenPopup(e, karen)} key={karen.id} className={styles['tradition-item']}>
                        <div className={styles['image-box-size']}>

                          <div className={styles['tradition-image-box']} style={{ backgroundImage: `url('/img/tradition/tradition-frame.png')}` }}>
                            <div style={{ backgroundImage: `url(${karen.images.length > 0 ? `${karen.images[0]}` : '/img/tradition/traditionPlaceholder.png'})` }} className={styles['tradition-image']}></div>

                          </div>
                        </div>
                        <div className={styles['month-name-box']}>{screen.availWidth < 1400 ? i === 0 ? "มกราคม" : i === 1 ? "กุมภาพันธ์" : i === 2 ? "มีนาคม" : i === 3 ? "เมษายน" : '' : karen.month}</div>
                      </div>
                    )) : ''}
                  </div>
                  <div className={styles['tradition-title-box']}>
                    <div className={styles['black-line']}></div>
                    <div className={styles['tradition-title']}>
                      ประเพณีชาวมอญ
                    </div>
                  </div>
                  <div className={styles['sm-mon-title']}></div>
                  <div className={styles['tradition-list-box']}>
                    {monTraditions.length > 0 ? monTraditions.map((mon, i) => (
                      <div onClick={(e) => showMonPopup(e, mon)} key={mon.id} className={styles['tradition-item']}>
                        <div className={styles['image-box-size']}>

                          <div className={styles['tradition-image-box']} >
                            <div style={{ backgroundImage: `url(${mon.images.length > 0 ? `${mon.images[0]}` : '/img/tradition/traditionPlaceholder.png'})` }} className={styles['tradition-image']}></div>

                          </div>
                        </div>
                        <div className={styles['month-name-box']}>{screen.availWidth < 1400 ? i === 0 ? "มกราคม" : i === 1 ? "กุมภาพันธ์" : i === 2 ? "มีนาคม" : i === 3 ? "เมษายน" : '' : mon.month}</div>
                      </div>
                    )) : ''}
                  </div>
                  <div onClick={(e) => router.push('/traditions')} className={styles['see-all-box']}><span className={styles['see-all-button']}>ดูทั้งหมด</span></div>
                </div>
              </div>
            </div>
          </div>
          <div id='product-section' className={styles['product-section']}>
            <div className="container">
              <div className="col">
                <div className={styles['product-flexbox']}>
                  <span className={styles['product-title']}>ผลิตภัณฑ์ชุมชน</span>
                  <div className={styles['slider']}>
                    <Slider {...BoatSettings}>
                      {products.length > 0 ? products.map((product) => (
                        <div className={styles['slider-box']} key={product.id}>
                          <div onClickCapture={(e) => showProductPopup(e, product)} key={product.id} className={styles['product-item']}>
                            <div className={styles['product-image-box']}>
                              <div style={{ backgroundImage: `url(${product.images.length > 0 ? `${product.images[0]}` : '/no-imge.png'})` }}></div>
                            </div>
                            <span>{product.name}</span>
                          </div>
                        </div>
                      )) : ''}
                    </Slider>
                  </div>
                  <span onClick={(e) => router.push('/product')} className={styles['see-all-button']}>ดูทั้งหมด</span>
                </div>
              </div>
            </div>
          </div>
          <div id='review-section' className={styles['review-section']}>
            <span className={styles['sm-review-head']}>สังขละรีวิว</span>
            <div className="container">
              <div className="col">
                <div className={styles['review-flexbox']}>

                  <div className="container">
                    <div className="row">
                      <div className="col-xxl-8">
                        <div className={styles['review-slider-box']}>
                          {screen.availWidth > 1300 ? (
                            <Slider {...videoSettings}>
                              <div className={styles['video-item']}>
                                <iframe width="577" height="310" src="https://www.youtube.com/embed/36iD3HmGt8g" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="577" height="310" src="https://www.youtube.com/embed/7myqazGs5_Y" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="577" height="310" src="https://www.youtube.com/embed/MKJZ3Jdsucg" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="577" height="310" src="https://www.youtube.com/embed/jD7vUEytFdw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="577" height="310" src="https://www.youtube.com/embed/Wr1PBrBZkQw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="577" height="310" src="https://www.youtube.com/embed/BHFVD2hJ7KA" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="577" height="310" src="https://www.youtube.com/embed/B7ync4odCJk" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="577" height="310" src="https://www.youtube.com/embed/v_ulqJa2Jpw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>

                            </Slider>
                          ) : screen.availWidth > 767 ? <Slider {...videoSettings}>
                            <div className={styles['video-item']}>
                              <iframe width="478" height="280" src="https://www.youtube.com/embed/36iD3HmGt8g" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="478" height="280" src="https://www.youtube.com/embed/7myqazGs5_Y" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="478" height="280" src="https://www.youtube.com/embed/MKJZ3Jdsucg" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="478" height="280" src="https://www.youtube.com/embed/jD7vUEytFdw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="478" height="280" src="https://www.youtube.com/embed/Wr1PBrBZkQw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="478" height="280" src="https://www.youtube.com/embed/BHFVD2hJ7KA" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="478" height="280" src="https://www.youtube.com/embed/B7ync4odCJk" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className={styles['video-item']}>
                              <iframe width="478" height="280" src="https://www.youtube.com/embed/v_ulqJa2Jpw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>

                          </Slider> :
                            <Slider {...videoSettings}>
                              <div className={styles['video-item']}>
                                <iframe width="288" height="168" src="https://www.youtube.com/embed/36iD3HmGt8g" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="280" height="168" src="https://www.youtube.com/embed/7myqazGs5_Y" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="280" height="168" src="https://www.youtube.com/embed/MKJZ3Jdsucg" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="280" height="168" src="https://www.youtube.com/embed/jD7vUEytFdw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="280" height="168" src="https://www.youtube.com/embed/Wr1PBrBZkQw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="280" height="168" src="https://www.youtube.com/embed/BHFVD2hJ7KA" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="280" height="168" src="https://www.youtube.com/embed/B7ync4odCJk" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                              <div className={styles['video-item']}>
                                <iframe width="280" height="168" src="https://www.youtube.com/embed/v_ulqJa2Jpw" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>

                            </Slider>}
                        </div>
                      </div>
                      <div className="col-xxl-4">
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
            <div className={styles['comment-section']}>
              <div className={styles['comment-top-box']}>
                <div className={styles['comment-form-box']}>
                  <div className={styles['form-left-box']}>
                    <div className={styles['comment-input']}>
                      <label >ข้อความประทับใจ<span>*</span></label>
                      <textarea onChange={(e) => setNewComment({ ...newComment, comment_text: e.target.value })} name="" id="" cols="30" rows="10"></textarea>
                    </div>
                  </div>
                  <div className={styles['form-right-box']}>
                    <div className={styles['comment-input']}>
                      <label>ชื่อ</label>
                      <input type="text" onChange={(e) => setNewComment({ ...newComment, commentator_name: e.target.value })} />
                    </div>
                    <div className={styles['comment-input']}>
                      <label >E-mail<span>*</span></label>
                      <input type="text" onChange={(e) => setNewComment({ ...newComment, commentator_email: e.target.value })} />
                    </div>
                    <button onClick={(e) => submitComment(e)} className={styles['submit-button']}>
                      <span>ส่ง</span>
                    </button>
                  </div>

                </div>
              </div>
              <div className={styles['comment-bottom-box']}>
                <div className={styles['comment-list-box']}>
                  <div className={styles['comment-title']}>
                    <span>รีวิว</span>
                  </div>
                  <div className={styles['comment-list']}>
                    {comments && comments.length > 0 ? comments.map((comment) => (
                      <div key={comment.id} className={styles['comment-item']}>
                        <span className={styles['commentator-name']}>{comment.commentator_name ? comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
                        <span className={styles['comment-text']}>{comment.comment_text}</span>
                      </div>
                    )) : null}

                  </div>
                  {comments.length > 5 ? <span style={{ marginTop: '16px' }} onClick={(e) => router.push('/comment')} className={styles['see-all-button']}>ดูทั้งหมด</span> : null}
                </div>
              </div>
            </div>
            <CommentPopup open={showCommentPopup} onClose={() => setShowCommentPopup(false)} />
            <AccommodationPopup open={openAccommodationPopup} onClose={() => setOpenAccommodationPopup(false)} activeAcommodation={activeAcommodation} />
            <SagePopup open={openSagePopup} onClose={() => setOpenSagePopup(false)} />
            <LeaderPopup open={openLeaderPopup} onClose={() => setOpenLeaderPopup(false)} />
            <BoatProviderPopup open={openBoatPopup} onClose={() => setOpenBoatPopup(false)} activeBoat={activeBoat} />
            <AttractionPopup open={openAttractionpopup} onClose={() => setopenAttractionpopup(false)} activeAttraction={activeAttraction} />
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
