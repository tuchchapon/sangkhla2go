import { React, useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Slider from 'react-slick'
import Popup from 'reactjs-popup'
import styles from '../styles/PublicTranspotation.module.scss'
import axios from 'axios'
import WinPopup from '../components/winPopup';
import BoatPopup from '../components/boatPopup';
import Footer from '../layouts/footer'
import SubHeader from '../layouts/subHeader'

export default function publicTransportation() {
    const [showWinPopup, setShowWinPopup] = useState(false)
    const [showBoatPopup, setShowBoatPopup] = useState(false)
    const [driverLocation, setDriverLocation] = useState([])
    const [remainLocation, setRemainLocation] = useState([])
    const [boats, setBoats] = useState([])
    const [remainBoat, setRemainBoat] = useState([])
    const [sc_width, setSc_Width] = useState(0)
    const [activeWin, setActiveWin] = useState({})
    const [activeBoat, setActiveBoat] = useState({
        id: '', club_name: '', driver_name: '', boat_quantity: '', contact: '', max_passenger: '',
        owner_name: '', provider_image: '', provider_image: '', boat_images: []
    })


    const OpenWinPopup = async (e, location) => {
        if (e) e.preventDefault()
        setShowWinPopup(true)
        setActiveWin(location)

        // console.log(winpop);
    }

    const closeWinPopup = (e) => {
        if (e) e.preventDefault()
        setShowWinPopup(false)
        setSideTow(false)
        setTriCycle(false)
    }
    const openBoatPopup = async (e, boat) => {
        if (e) e.preventDefault()
        setActiveBoat(boat)
        setShowBoatPopup(true)
        console.log('boat is', boat);
    }
    const setNewLocation = (new_show_arr) => {
        setDriverLocation([...driverLocation, ...new_show_arr])
    }
    const showMoreLocation = () => {
        let new_show_arr = []
        let new_res_arr = []
        if (remainLocation.length !== 0) {
            if (screen.availWidth >= 768) {
                for (let i = 0; i < 8; i++) {
                    if (remainLocation[i]) new_show_arr.push(remainLocation[i])
                }
                new_res_arr = remainLocation.splice(0, 8)
            }
            if (screen.availWidth < 768) {
                for (let i = 0; i < 6; i++) {
                    if (remainLocation[i]) new_show_arr.push(remainLocation[i])
                }
                new_res_arr = remainLocation.splice(0, 6)
            }
        }
        setNewLocation(new_show_arr)
        console.log('new show arr is', new_show_arr);
    }
    const setNewBoat = (new_show_arr) => {
        setBoats([...boats, ...new_show_arr])
    }
    const showMoreBoat = () => {
        let new_show_arr = []
        let new_res_arr = []
        if (remainBoat.length !== 0) {
            if (screen.availWidth >= 768) {
                for (let i = 0; i < 8; i++) {
                    if (remainBoat[i]) new_show_arr.push(remainBoat[i])
                }
                new_res_arr = remainBoat.splice(0, 8)
            }
            if (screen.availWidth <= 768) {
                for (let i = 0; i < 8; i++) {
                    if (remainBoat[i]) new_show_arr.push(remainBoat[i])
                }
                new_res_arr = remainBoat.splice(0, 8)
            }
        }
        setNewBoat(new_show_arr)
        console.log('new show arr is', new_show_arr);
    }

    useEffect(() => {
        let width = screen.availWidth
        setSc_Width(width)
        const getLocation = async () => {
            let driverResponse = await axios.get(`${process.env.SERVER_API}/get/driverLocation`)
            console.log(driverResponse);
            if (driverResponse.status === 200) {
                let location_arr = []
                if (width <= 768) {
                    let data = driverResponse.data.payload
                    for (let j = 0; j < 8; j++) {
                        if (data[j] === 0 || data[j]) location_arr.push(data[j])
                        console.log('768');
                    }
                    data.splice(0, 8)
                    setDriverLocation(location_arr)
                    setRemainLocation(data)
                }
                else {
                    setDriverLocation(driverResponse.data.payload)
                }
            }
        }
        const getBoatProvider = async () => {
            let boatResponse = await axios.get(`${process.env.SERVER_API}/get/boat-provider`)
            console.log(boatResponse.data.payload);
            let boat_data = boatResponse.data.payload
            if (width <= 768) {
                let boat_arr = []
                for (let k = 0; k < 8; k++) {
                    if (boat_data[k] === 0 || boat_data[k]) boat_arr.push(boat_data[k])
                    console.log('768');
                }
                boat_data.splice(0, 8)
                setBoats(boat_arr)
                setRemainBoat(boat_data)
            }
            else {
                setBoats(boat_data)
            }
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
                    <div className={styles['pt-column-box']}>
                        <div className={styles['win-box']}>
                            {!driverLocation ? null : driverLocation.map((location) => (
                                <div key={location.id} className={styles['win-items']} >
                                    <div className={styles['location-image-box']} onClick={(e) => OpenWinPopup(e, location)}>
                                        <div className={styles['win-name']} >{location.location_name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {remainLocation.length > 0 ? <span onClick={showMoreLocation} className={styles['load-content-text']}>แสดงเพิ่ม</span> : ''}
                    </div>
                </div>
                <div className="col-12">
                    <p className={styles['boat-title']} >เรือนำเที่ยว</p>
                    <div className={styles['pt-column-box']}>
                        <div className={styles['boat-box']} >
                            {boats.length > 0 ? boats.map((boat) => (
                                <div key={boat.id} className={styles['boat-items']} onClick={(e) => openBoatPopup(e, boat)} >
                                    <img className={styles['boat-image']} src={boat && boat.boat_images.length > 0 ? `${boat.boat_images[0]}` : "/boat-placeholder.png"} alt="" />
                                    <div className={styles['boat-textbox']} >
                                        <span className={styles['boat-club-name']} >{boat.club_name}</span>
                                        <span className={styles['boat-provider-name']}>{boat.provider_name} </span>
                                    </div>
                                </div>

                            )) : ''}
                        </div>
                        {remainBoat.length > 0 ? <span onClick={showMoreBoat} className={styles['load-content-text']}>แสดงเพิ่ม</span> : ''}
                    </div>
                </div>
            </div>
            <WinPopup open={showWinPopup} onClose={() => setShowWinPopup(false)} activeWin={activeWin} />
            <BoatPopup open={showBoatPopup} onClose={() => setShowBoatPopup(false)} activeBoat={activeBoat} />
            <Footer />
        </div>
    )
}
