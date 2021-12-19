import {React,useState,useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Slider from 'react-slick'
import Popup from 'reactjs-popup'
import styles from '../styles/PublicTranspotation.module.scss'
import axios from 'axios'
import WinPopup from '../components/winPopup';
import BoatPopup from '../components/boatPopup';
import SubHeader from '../layouts/subHeader'

export default function publicTransportation() {
    const [showWinPopup, setShowWinPopup] = useState(false)
    const [showBoatPopup, setShowBoatPopup] = useState(false)
    const [driverLocation, setDriverLocation] = useState([])
    
    const [boats, setBoats] = useState([])
    const [activeWin, setActiveWin] = useState({})
    const [activeBoat, setActiveBoat] = useState({
        id:'',club_name:'',driver_name:'',boat_quantity:'',contact:'',max_passenger:'',
        owner_name:'',provider_image:'',provider_image:'',boat_images:[]
    })


    const OpenWinPopup = async(e,location)=>{
        if (e) e.preventDefault()
        setShowWinPopup(true)
        setActiveWin(location)

        // console.log(winpop);
    }

    const closeWinPopup =(e)=>{
        if(e) e.preventDefault()
        setShowWinPopup(false)
        setSideTow(false)
        setTriCycle(false)
    }
    const openBoatPopup = async(e,boat)=>{
        if (e) e.preventDefault()
        setActiveBoat(boat)
        setShowBoatPopup(true)
        console.log('boat is',boat);
    }


    useEffect(() => {
        const getLocation = async()=>{
          let  driverResponse = await axios.get(`${process.env.SERVER_API}/get/driverLocation`)
            console.log(driverResponse);
            setDriverLocation(driverResponse.data.payload)
        }
        const getBoatProvider = async()=>{
            let boatResponse = await axios.get(`${process.env.SERVER_API}/get/boat-provider`)
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
            <SubHeader first={'ขนส่งสาธารณะ'} />
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
                <p  className={styles['boat-title']} >เรือนำเที่ยว</p>
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
                <WinPopup open={showWinPopup} onClose={()=>setShowWinPopup(false)} activeWin={activeWin} />
                <BoatPopup open={showBoatPopup} onClose={()=>setShowBoatPopup(false)} activeBoat={activeBoat} />
        </div>
    )
}
