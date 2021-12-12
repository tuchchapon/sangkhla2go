import {React,useState,useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/PublicTranspotation.module.scss'
import axios from 'axios'
import Popup from 'reactjs-popup'
import Slider from 'react-slick'


function RightArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img src="/right-arrow.png" style={{...style,width:'32px',height:'64px',right:'-57px',top:'50%'}} className={className} onClick={onClick} alt="" />
    );
}
function LeftArrow(props){
    const {className , style , onClick} = props;
    return(
        <img src="/left-arrow.png" alt=""  style={{...style,width:'32px',height:'64px',left:'-57px',top:'50%'}} className={className}  onClick={onClick} />
    )
}

export default function publicTransportation() {
    const [showWinPopup, setShowWinPopup] = useState(false)
    const [showBoatPopup, setShowBoatPopup] = useState(false)
    const [driverLocation, setDriverLocation] = useState([])
    const [drivers, setDrivers] = useState([])
    const [boats, setBoats] = useState([])
    const [activeWin, setActiveWin] = useState({})
    const [activeBoat, setActiveBoat] = useState({
        id:'',club_name:'',driver_name:'',boat_quantity:'',contact:'',max_passenger:'',
        owner_name:'',provider_image:'',provider_image:'',boat_images:[]
    })
    const [sideTow, setSideTow] = useState(false)
    const [triCycle, setTriCycle] = useState(false)
    const settings = {
        infinite: true,
        speed: 200,
        fade:true,
        dot:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow:<RightArrow/>,
        prevArrow: <LeftArrow/>
        
    }
    const OpenWinPopup = async(e,location)=>{
        if (e) e.preventDefault()
        getDriverFromLocation(location)
        setActiveWin(location)

        // console.log(winpop);
    }

    const closeWinPopup =(e)=>{
        if(e) e.preventDefault()
        setShowWinPopup(false)
        setDrivers([])
        setSideTow(false)
        setTriCycle(false)
    }
    const openBoatPopup = async(e,boat)=>{
        if (e) e.preventDefault()
        setActiveBoat(boat)
        setShowBoatPopup(true)
        console.log('boat is',boat);
    }
    const closeBoatPopup =(e)=>{
        if(e)e.preventDefault()
        setShowBoatPopup(false)
        
    }
    const scrollTop =()=>{
        document.getElementById("วิน").scrollIntoView({behavior:'smooth'})
    }
    const getDriverFromLocation  = async(location)=>{
        console.log('get driver from location');
        console.log('location in function is',location);
        const response = await axios.post('http://localhost:8080/get/driverfromlocation',location)
        console.log('res data is',response.data);
        setDrivers(response.data.payload)
        response.data.sidetow ? setSideTow(true):false
        response.data.triCycle ? setTriCycle(true):false
        console.log('sidetow is',response.data.sidetow);
        setShowWinPopup(true)
    }
    useEffect(() => {
        const getLocation = async()=>{
          let  driverResponse = await axios.get('http://localhost:8080/get/driverLocation')
            console.log(driverResponse);
            setDriverLocation(driverResponse.data.payload)
        }
        const getBoatProvider = async()=>{
            let boatResponse = await axios.get('http://localhost:8080/get/boat-provider')
            console.log(boatResponse.data.payload);
            setBoats(boatResponse.data.payload)
        }
        if (driverLocation.length === 0) getLocation()
        if (boats.length === 0) getBoatProvider()
        console.log(driverLocation);

    }, [])
    return (

        <div className={styles['transpotation-page']}>
            <Head>
                <title>
                ขนส่งสาธารณะ
                </title>
            </Head>
            <div className="container">
            {/* <h1>publicTranspotation</h1> */}
            <div className="col-12" >
            <p className={styles.title} id="วิน" >วินมอเตอร์ไซค์</p>
            <div className={styles['win-box']}>
            {!driverLocation ? null: driverLocation.map((location)=>(
                <div key={location.id} className={styles['win-items']} >
                    <div  className={styles['location-image-box']}  onClick={(e)=>OpenWinPopup(e,location)}>
                        <div className={styles['win-name']} >{location.location_name}</div>
                    </div>
                    </div>
            ))}
            </div>
            </div>
                <div className="col-12">
                <p className={styles['boat-title']} >เรือนำเที่ยว</p>
            <div className={styles['boat-box']} >
                {boats.length > 0 ? boats.map((boat)=>(
                    <div  key={boat.id} className={styles['boat-items']} onClick={(e)=>openBoatPopup(e,boat)} >
                        <img className={styles['boat-image']} src={boat && boat.boat_images.length > 0  ? `/uploadImage/boatProvider/${boat.boat_images[0]}` :"/img/publictranspotation/boatPlaceholder.png"} alt="" />
                        <div className={styles['boat-textbox']} >
                        <p className={styles['boat-club-name']} >{boat.club_name}</p>
                        <p className={styles['boat-provider-name']}>{boat.provider_name} </p>
                        </div>
                    </div>
                    
                )):''}
            </div>
                </div>
            </div>
                <Popup 
                open={showWinPopup}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
                
                >
                    <div >
                        <div className={styles['backdrop']} ></div>
                        <div className="col-12" style={{backgroundColor:'white'}} >
                           <div className={styles['win-popup']} >
                           <img className={styles['popup-close-icon']} onClick={(e)=> closeWinPopup(e)} src='/Quit.png' alt="" />
                            <span className={styles['location-name']}>{activeWin ? activeWin.location_name :''}</span>
                            {activeWin && activeWin.location_detail ? <label className={styles['location-detail']} ><img style={{marginRight:'16px'}} src="/glass.png" alt="" />{activeWin ? activeWin.location_detail:''}</label>:''}
                            <div className={styles['popup-win-box']}>
                                {drivers ? drivers.map((driver)=>(
                                    <div key={driver.id}>
                                       <div  className={styles['popup-win-item']}>
                                           <img className={styles['driver-image']} style={{backgroundImage:`url(${driver.image  ? `/uploadImage/driver/${driver.image}`:'/img/publictranspotation/winCoverPlaceholder.png'})`}} src={driver.image ? '/img/publictranspotation/driver-img-frame.png':'/img/publictranspotation/winCoverPlaceholder.png'}  alt="" />
                                       {/* <Image style src={driver.image ? '/img/publictranspotation/driver-img-frame.png':'/img/publictranspotation/winCoverPlaceholder.png'} width={134} height={134} /> */}
                                        <span className={styles['popup-win-name']} >{driver.name}</span>
                                        <span className={styles['popup-win-tel']} >{driver.contact}</span>
                                       </div>
                                    </div>
                                )):''}

                            </div>
                                    {drivers.length > 0 ? (
                                    <div className={styles['popup-service-text']}  >
                                    <div style={{marginRight:'24px'}} > 
                                    <img style={{marginRight:'16px'}} src={sideTow === true ? "/img/publictranspotation/circle-true.png":"/img/publictranspotation/circle.png"} alt="" /> <span>วินมอเตอร์ไซต์พ่วงข้าง</span></div>
                                    <div> <img style={{marginRight:'16px'}} src={triCycle === true ? "/img/publictranspotation/circle-true.png":"/img/publictranspotation/circle.png"} alt="" /> <span>รถสามล้อเครื่อง</span></div>
                                    </div>
                                    ):''}
                           </div>
                        </div>
                    </div>
                </Popup>
                <Popup 
                    open={showBoatPopup}
                    closeOnEscape={false}
                    closeOnDocumentClick={false}
                    lockScroll>
                    <div>
                        <div className={styles['backdrop']} ></div>
                        <div className="col-12">
                            <div className={styles['boat-popup']}>
                            <img className={styles['popup-close-icon']} src='/Quit.png' onClick={(e)=>closeBoatPopup(e)} alt="" />
                            <span className={styles['popup-club-name']} >ชมรม : {activeBoat.club_name}</span>
                            <span className={styles['popup-boat-name']}>เรือ {activeBoat.provider_name}</span>
                            <div className={styles['boat-d-flex']} >
                                    <div className={styles['provider-detail-box']} >
                                        <img className={styles['boat-provider-image']} style={{backgroundImage:`url(${activeBoat.provider_image  ? `/uploadImage/boatProvider/${activeBoat.provider_image}`:'/img/publictranspotation/provider-img-frame.png'})`}} src={activeBoat.provider_image ? '/img/publictranspotation/provider-img-frame.png':'/img/publictranspotation/boatProviderPlaceholder.png'} alt="" />
                                        <div className={styles['provider-name-box']} >
                                        <p >เจ้าของเรือ</p>
                                        <span>{activeBoat.provider_name}</span>
                                        </div>
                                    </div>
                                    <div className={styles['boat-detail-box']} >
                                        <div className={styles['boat-driver-box']}>
                                            <span style={{fontWeight:'bold'}} >ผู้ขับเรือ : </span>
                                            <span>{activeBoat.driver_name}</span>
                                        </div>
                                        <div className={styles['text-column-box']}>
                                            <span className={styles['boat-left-text']}>จำนวนเรือ : </span>
                                            <span className={styles['boat-right-text']} >{activeBoat.boat_quantity} ลำ</span>
                                        </div>
                                        <div className={styles['text-column-box']}>
                                            <span className={styles['boat-left-text']} >จำนวนผู้โดยสารสูงสุด : </span>
                                            <span className={styles['boat-right-text']} >{activeBoat.max_passenger} คน</span>
                                        </div>
                                        <div className={styles['text-column-box']}>
                                            <span className={styles['boat-left-text']}>อุปกรณ์ความปลอดภัย : </span>
                                            <span className={styles['boat-right-text']} >มี</span>
                                        </div>
                                        <div className={styles['text-column-box']}>
                                            <span  className={styles['boat-left-text']} >โทร :</span>
                                            <span className={styles['boat-right-text']} >{activeBoat.contact}</span>
                                        </div>
                                    </div>
                                    
                            </div>
                                <div className="col">
                                {activeBoat.boat_images.length > 0 ?(
                                        <div className={styles['boat-image-box']} >
                                        <div className={styles['slider']}>
                                        <Slider {...settings} >
                                                {activeBoat.boat_images ? activeBoat.boat_images.map((image)=>(
                                                <div key={image} className={styles['slider-box']}  ><div className={styles['slider-image']} style={{backgroundImage:`url(${image ? `/uploadImage/boatProvider/${image}`:'' })`}}></div></div>
                                                )):''}        
                                        </Slider>
                                    </div>
                                </div>
                                ):''}
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
                <button onClick={scrollTop} > </button>
        </div>
    )
}
