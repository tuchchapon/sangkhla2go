import { React, useState, useEffect } from 'react'
import Head from 'next/head'
import styles from "../styles/accommodation.module.scss";
import axios from 'axios';
import AccommodationPopup from '../components/accommodationPopup';
import SubHeader from '../layouts/subHeader';
import Footer from '../layouts/footer'
export default function accommodation() {
    const [showHotel, setShowHotel] = useState([])
    const [remainHotel, setRemainHotel] = useState([])
    const [showBoatHouse, setShowBoatHouse] = useState([])
    const [remainBoatHouse, setRemainBoatHouse] = useState([])
    const [hotels, setHotels] = useState([])
    const [activeAcommodation, setActiveAcommodation] = useState({
        id: '', name: '', type: '', information: '', min_price: '', max_price: '',
        fb_page: '', images: [], services: [], tel: '', fb_link: ''
    })
    const [activeTab, setActiveTab] = useState('accom')
    const [openPopup, setOpenPopup] = useState(false)

    const showPopup = (e, accommodation) => {
        if (e) e.preventDefault()
        console.log('accommodation is', accommodation);
        setActiveAcommodation(accommodation)
        setOpenPopup(true)
    }

    const setNewHotel = (new_show_hotel) => {
        setShowHotel([...showHotel, ...new_show_hotel])
    }
    const showMoreHotel = (e) => {
        if (e) e.preventDefault()
        let new_show_hotel = []
        let new_remain_hotel = []
        if (remainHotel.length !== 0) {
            if (screen.availWidth > 1400) {
                for (let i = 0; i < 9; i++) {
                    if (remainHotel[i]) new_show_hotel.push(remainHotel[i])
                }
                new_remain_hotel = remainHotel.splice(0, 9)
            }
            else if (screen.availWidth >= 768) {
                for (let i = 0; i < 12; i++) {
                    if (remainHotel[i]) new_show_hotel.push(remainHotel[i])
                }
                new_remain_hotel = remainHotel.splice(0, 12)
            }
            else if (screen.availWidth < 768) {
                for (let i = 0; i < 6; i++) {
                    if (remainHotel[i]) new_show_hotel.push(remainHotel[i])
                }
                new_remain_hotel = remainHotel.splice(0, 6)
            }
        }
        // new_accom_arr = remainHotel.splice(0, 9)
        console.log('new show arr is', new_show_hotel);
        setNewHotel(new_show_hotel)
    }
    const setNewBoatHouse = (new_show_boathouse) => {
        setShowBoatHouse([...showBoatHouse, ...new_show_boathouse])
    }

    const showMoreBoatHouse = (e) => {
        if (e) e.preventDefault()
        let new_show_boathouse = []
        let new_remain_boathouse = []
        console.log(remainBoatHouse);
        if (remainBoatHouse.length !== 0) {
            if (screen.availWidth > 1400) {
                for (let i = 0; i < 9; i++) {
                    if (remainBoatHouse[i]) new_show_boathouse.push(remainBoatHouse[i])
                }
                new_remain_boathouse = remainBoatHouse.splice(0, 9)
            }
            else if (screen.availWidth >= 768) {
                for (let i = 0; i < 12; i++) {
                    if (remainBoatHouse[i]) new_show_boathouse.push(remainBoatHouse[i])
                }
                new_remain_boathouse = remainBoatHouse.splice(0, 12)
            }
            else if (screen.availWidth < 768) {
                for (let i = 0; i < 6; i++) {
                    if (remainBoatHouse[i]) new_show_boathouse.push(remainBoatHouse[i])
                }
                new_remain_boathouse = remainBoatHouse.splice(0, 6)
            }
        }
        // new_accom_arr = remainHotel.splice(0, 9)
        console.log('new show arr is', new_show_boathouse);
        setNewBoatHouse(new_show_boathouse)
    }

    useEffect(() => {
        const getAccommodation = async () => {
            const response = await axios.get(`${process.env.SERVER_API}/get/accommodation`)
            if (response.status === 200) {
                console.log(response.data);
                let data = response.data
                let hotel_arr = data.all_hotel
                let boathouse_arr = data.boat_house
                let init_hotel = []
                let init_boathouse = []
                console.log('hotel arr is', hotel_arr);
                if (screen.availWidth > 1400) {
                    for (let j = 0; j < 9; j++) {
                        if (hotel_arr[j] === 0 || hotel_arr[j]) init_hotel.push(hotel_arr[j])
                    }
                    hotel_arr.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let j = 0; j < 12; j++) {
                        if (hotel_arr[j] === 0 || hotel_arr[j]) init_hotel.push(hotel_arr[j])
                        console.log('768');
                    }
                    hotel_arr.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let j = 0; j < 6; j++) {
                        if (hotel_arr[j] === 0 || hotel_arr[j]) init_hotel.push(hotel_arr[j])
                    }
                    hotel_arr.splice(0, 6)
                }
                if (screen.availWidth > 1400) {
                    for (let j = 0; j < 9; j++) {
                        if (boathouse_arr[j] === 0 || boathouse_arr[j]) init_boathouse.push(boathouse_arr[j])
                    }
                    boathouse_arr.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let j = 0; j < 12; j++) {
                        if (boathouse_arr[j] === 0 || boathouse_arr[j]) init_boathouse.push(boathouse_arr[j])
                        console.log('768');
                    }
                    boathouse_arr.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let j = 0; j < 6; j++) {
                        if (boathouse_arr[j] === 0 || boathouse_arr[j]) init_boathouse.push(boathouse_arr[j])
                    }
                    boathouse_arr.splice(0, 6)
                }
                // data.splice(0, 9)

                setRemainHotel(hotel_arr)
                setShowHotel(init_hotel)
                setRemainBoatHouse(boathouse_arr)
                setShowBoatHouse(init_boathouse)
            }
            console.log(response.data.hotel);
            console.log(response.data.boat_house);
        }
        if (showHotel.length === 0) {
            getAccommodation()
        }
    }, [])
    return (
        <div className={styles['accommodation-page']} >
            <Head>
                <title>โรงแรม/แพพัก</title>
            </Head>
            <SubHeader first={'ที่พัก'} />
            <div className="container">
                <div className="col-12">
                    <div className={styles['page-title-box']}>
                        <img className={styles['bg-title']} src="/img/accommodation/title-bg-imag.png" alt="" />
                        <div className={styles['title-textbox']} >
                            <span>ที่พัก</span>
                        </div>

                    </div>

                    <div className={styles['accommodation-column']} >
                        <div className={styles['type-button']}>
                            <div onClick={(e) => setActiveTab('accom')} className={activeTab === "accom" ? styles['accom-tab-active'] : styles['accom-tab']}>
                                <span>ที่พัก</span>
                            </div>
                            <div onClick={(e) => setActiveTab('boat')} className={activeTab === 'boat' ? styles['boat-tab-active'] : styles['boat-tab']}>
                                <span>แพพัก</span>
                            </div>
                        </div>
                        {activeTab === "accom" ? (
                            <div className={styles['accom-column']}>
                                <div className={styles['accommodation-list']} >
                                    {showHotel.length > 0 ? showHotel.map((accommodation) => (
                                        <div onClick={(e) => showPopup(e, accommodation)} key={accommodation.id} className={styles['accommodation-item']} >
                                            <img src={accommodation.images.length > 0 ? `${accommodation.images[0]}` : '/accom-placeholder.png'} alt="" />
                                            {/* {accommodation.type === "แพพัก" ? (
                             <div className={styles['boat-house-tag']} >{accommodation.type}</div>
                            ) :''} */}
                                            <span className={styles['accommodation-name']} >{accommodation.name}<br /></span>
                                            {accommodation.min_price || accommodation.max_price ?
                                                <div className={styles['price-box']} >
                                                    {accommodation.min_price || accommodation.max_price ? <img className={styles['icon-b']} src="/img/accommodation/icon-B.png" alt="" /> : ''}
                                                    {accommodation.min_price && accommodation.max_price ? (
                                                        <span>{parseInt(accommodation.min_price) >= parseInt(accommodation.max_price) ? `${accommodation.min_price} บาท` :
                                                            `${accommodation.min_price}-${accommodation.max_price} บาท`}</span>
                                                    ) : accommodation.min_price || accommodation.max_price ? (
                                                        <span>{accommodation.min_price ? `${accommodation.min_price} บาท` : accommodation.max_price ? `${accommodation.max_price} บาท` : ''}</span>
                                                    ) : ''}
                                                </div> : ''}
                                        </div>
                                    )) : ''}

                                </div>
                                {remainHotel.length > 0 ? <span onClick={(e) => showMoreHotel(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> : null}
                            </div>
                        ) : ''}
                        {activeTab === "boat" ? (
                            <div className={styles['accom-column']}>
                                <div className={styles['accommodation-list']} >
                                    {showBoatHouse.length > 0 ? showBoatHouse.map((accommodation) => (
                                        <div onClick={(e) => showPopup(e, accommodation)} key={accommodation.id} className={styles['accommodation-item']} >
                                            <img src={accommodation.images.length > 0 ? `${accommodation.images[0]}` : '/accom-placeholder.png'} alt="" />
                                            {accommodation.type === "แพพัก" ? (
                                                <div className={styles['boat-house-tag']} >แพพัก</div>
                                            ) : ''}
                                            <span className={styles['accommodation-name']} >{accommodation.name}<br /></span>
                                            {accommodation.min_price || accommodation.max_price ?
                                                <div className={styles['price-box']} >
                                                    {accommodation.min_price || accommodation.max_price ? <img className={styles['icon-b']} src="/img/accommodation/icon-B.png" alt="" /> : ''}
                                                    {accommodation.min_price && accommodation.max_price ? (
                                                        <span>{parseInt(accommodation.min_price) >= parseInt(accommodation.max_price) ? `${accommodation.min_price} บาท` :
                                                            `${accommodation.min_price}-${accommodation.max_price} บาท`}</span>
                                                    ) : accommodation.min_price || accommodation.max_price ? (
                                                        <span>{accommodation.min_price ? `${accommodation.min_price} บาท` : accommodation.max_price ? `${accommodation.max_price} บาท` : ''}</span>
                                                    ) : ''}
                                                </div> : ''}
                                        </div>
                                    )) : ''}

                                </div>
                                {remainBoatHouse.length > 0 ? <span onClick={(e) => showMoreBoatHouse(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> : null}
                            </div>

                        ) : ''}

                    </div>

                </div>

            </div>
            <AccommodationPopup open={openPopup} onClose={() => setOpenPopup(false)} activeAcommodation={activeAcommodation} />
            <Footer />
        </div>
    )
}

