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
    const [showGestHouse, setShowGestHouse] = useState([])
    const [remainGestHouse, setRemainGestHouse] = useState([])
    const [showHomeStay, setShowHomeStay] = useState([])
    const [remainHomeStay, setRemainHomeStay] = useState([])
    const [showHouse, setShowHouse] = useState([])
    const [remainHouse, setRemainHouse] = useState([])
    const [showHosttel, setShowHosttel] = useState([])
    const [remainHosttel, setRemainHosttel] = useState([])
    const [showResort, setShowResort] = useState([])
    const [remainResort, setRemainResort] = useState([])
    const [showingAccommodation, setShowingAccommodation] = useState([])
    const accommodation_options = ["โรงแรม", "โฮมสเตย์", "รีสอร์ท", "เกสต์เฮ้าส์", "เรือนรับรอง", "โฮสเทล", "แพพัก"]
    const [activeAcommodation, setActiveAcommodation] = useState({
        id: '', name: '', type: '', information: '', min_price: '', max_price: '',
        fb_page: '', images: [], services: [], tel: '', fb_link: ''
    })

    const [activeTab, setActiveTab] = useState('โรงแรม')
    const [openPopup, setOpenPopup] = useState(false)

    const showPopup = (e, accommodation) => {
        if (e) e.preventDefault()
        console.log('active accommodation is', accommodation);
        setActiveAcommodation(accommodation)
        setOpenPopup(true)
    }

    const setNewAccommodation = (update_accommodation) => {
        if (activeTab === "โรงแรม") {
            setShowHotel([...showHotel, ...update_accommodation])
            setShowingAccommodation([...showHotel, ...update_accommodation])
        }
        if (activeTab === "โฮมสเตย์") {
            setShowHomeStay([...showHomeStay, ...update_accommodation])
            setShowingAccommodation([...showHomeStay, ...update_accommodation])
        }
        if (activeTab === "รีสอร์ท") {
            setShowResort([...showResort, ...update_accommodation])
            setShowingAccommodation([...showResort, ...update_accommodation])
        }
        if (activeTab === "เกสต์เฮ้าส์") {
            setShowGestHouse([...showGestHouse, ...update_accommodation])
            setShowingAccommodation([...showGestHouse, ...update_accommodation])
        }
        if (activeTab === "เรือนรับรอง") {
            setShowHouse([...showHouse, ...update_accommodation])
            setShowingAccommodation([...showHouse, ...update_accommodation])
        }
        if (activeTab === "โฮสเทล") {
            setShowHosttel([...showHosttel, ...update_accommodation])
            setShowingAccommodation([...showHosttel, ...update_accommodation])
        }
        if (activeTab === "แพพัก") {
            setShowBoatHouse([...showBoatHouse, ...update_accommodation])
            setShowingAccommodation([...showBoatHouse, ...update_accommodation])
        }

    }
    const showMoreAccommodation = (e) => {
        if (e) e.preventDefault()
        console.log('type is', activeTab)
        let new_show_hotel = []
        let new_show_homestay = []
        let new_show_resort = []
        let new_show_gesthouse = []
        let new_show_house = []
        let new_show_hosttel = []
        let new_show_boathouse = []

        let new_remain_hotel = []
        let new_remain_homestay = []
        let new_remain_resort = []
        let new_remain_gesthouse = []
        let new_remain_house = []
        let new_remain_hosttel = []
        let new_remain_boathouse = []

        if (activeTab === "โรงแรม") {

            if (remainHotel.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let hotel_index = 0; hotel_index < 9; hotel_index++) {
                        if (remainHotel[hotel_index]) new_show_hotel.push(remainHotel[hotel_index])
                    }
                    new_remain_hotel = remainHotel.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let hotel_index = 0; hotel_index < 12; hotel_index++) {
                        if (remainHotel[hotel_index]) new_show_hotel.push(remainHotel[hotel_index])
                    }
                    new_remain_hotel = remainHotel.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let hotel_index = 0; hotel_index < 6; hotel_index++) {
                        if (remainHotel[hotel_index]) new_show_hotel.push(remainHotel[hotel_index])
                    }
                    new_remain_hotel = remainHotel.splice(0, 6)
                }
            }
            console.log('1', showHotel)
            console.log('2', remainHotel)
            console.log('3', new_show_hotel)
            console.log('4', new_remain_hotel)
            setNewAccommodation(new_show_hotel)

        }
        if (activeTab === "โฮมสเตย์") {
            if (remainHomeStay.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (remainHomeStay[i]) new_show_homestay.push(remainHomeStay[i])
                    }
                    new_remain_homestay = remainHomeStay.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let i = 0; i < 12; i++) {
                        if (remainHomeStay[i]) new_show_homestay.push(remainHomeStay[i])
                    }
                    new_remain_homestay = remainHomeStay.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (remainHomeStay[i]) new_show_homestay.push(remainHomeStay[i])
                    }
                    new_remain_homestay = remainHomeStay.splice(0, 6)
                }
            }
            setNewAccommodation(new_show_homestay)

        }
        if (activeTab === "รีสอร์ท") {
            console.log('1', showResort)
            console.log('2', remainResort)
            console.log('3', new_show_resort)
            console.log('4', new_remain_resort)
            if (remainResort.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (remainResort[i]) new_show_resort.push(remainResort[i])
                    }
                    new_remain_resort = remainResort.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let i = 0; i < 12; i++) {
                        if (remainResort[i]) new_show_resort.push(remainResort[i])
                    }
                    new_remain_resort = remainResort.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (remainResort[i]) new_show_resort.push(remainResort[i])
                    }
                    new_remain_resort = remainResort.splice(0, 6)
                }

            }

            console.log('1', showResort)
            console.log('2', remainResort)
            console.log('3', new_show_resort)
            console.log('4', new_remain_resort)
            setNewAccommodation(new_show_resort)
        }
        if (activeTab === "เกสต์เฮ้าส์") {
            if (remainGestHouse.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (remainGestHouse[i]) new_show_gesthouse.push(remainGestHouse[i])
                    }
                    new_remain_gesthouse = remainGestHouse.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let i = 0; i < 12; i++) {
                        if (remainGestHouse[i]) new_show_gesthouse.push(remainGestHouse[i])
                    }
                    new_remain_gesthouse = remainGestHouse.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (remainGestHouse[i]) new_show_gesthouse.push(remainGestHouse[i])
                    }
                    new_remain_gesthouse = remainGestHouse.splice(0, 6)
                }
            }
            setNewAccommodation(new_show_gesthouse)

        }
        if (activeTab === "เรือนรับรอง") {
            if (remainHouse.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (remainHouse[i]) new_show_house.push(remainHouse[i])
                    }
                    new_remain_house = remainHouse.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let i = 0; i < 12; i++) {
                        if (remainHouse[i]) new_show_house.push(remainHouse[i])
                    }
                    new_remain_house = remainHouse.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (remainHouse[i]) new_show_house.push(remainHouse[i])
                    }
                    new_remain_house = remainHouse.splice(0, 6)
                }
            }
            setNewAccommodation(new_show_house)

        }
        if (activeTab === "โฮสเทล") {
            if (remainHosttel.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (remainHosttel[i]) new_show_hosttel.push(remainHosttel[i])
                    }
                    new_remain_hosttel = remainHosttel.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let i = 0; i < 12; i++) {
                        if (remainHosttel[i]) new_show_hosttel.push(remainHosttel[i])
                    }
                    new_remain_hosttel = remainHosttel.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (remainHosttel[i]) new_show_hosttel.push(remainHosttel[i])
                    }
                    new_remain_hosttel = remainHosttel.splice(0, 6)
                }
            }
            setNewAccommodation(new_show_hosttel)

        }
        if (activeTab === "แพพัก") {
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
                setNewAccommodation(new_show_boathouse)
            }
        }
        // new_accom_arr = remainHotel.splice(0, 9)
        console.log('new show arr is', new_show_hotel);

    }




    const changeType = (e) => {
        e.preventDefault()
        setActiveTab(e.target.value)
        console.log(activeTab)
        setShowingData(e.target.value)
    }
    const setShowingData = (type) => {
        console.log('cb')
        // console.log(type)
        if (type === "โรงแรม") {
            setShowingAccommodation(showHotel)
        }
        if (type === "โฮมสเตย์") {
            setShowingAccommodation(showHomeStay)
        }
        if (type === "รีสอร์ท") {
            setShowingAccommodation(showResort)
        }
        if (type === "เกสต์เฮ้าส์") {
            setShowingAccommodation(showGestHouse)
            console.log('remain gest house is', remainGestHouse)
            console.log('remain hotel is', remainHotel)
            console.log(showGestHouse)
        }
        if (type === "เรือนรับรอง") {
            setShowingAccommodation(showHouse)
        }
        if (type === "โฮสเทล") {
            setShowingAccommodation(showHosttel)
            console.log('show host tel is', showHosttel)
        }
        if (type === "แพพัก") {
            setShowingAccommodation(showBoatHouse)
        }
    }
    useEffect(() => {
        const getAccommodation = async () => {
            // const response = await axios.get(`${process.env.SERVER_API}/get/accommodation`)
            const response = await axios.get(`${process.env.SERVER_API}/get/accom-sort`)
            if (response.status === 200) {
                console.log(response.data);
                let data = response.data.payload
                let hotel_arr = data.hotel
                let gest_house_arr = data.gesthouse
                let resort_arr = data.resort
                let house_arr = data.house
                let host_tel_arr = data.hosttel
                let home_stay_arr = data.homestay
                let boathouse_arr = data.boat_house
                let init_hotel = []
                let init_boathouse = []
                let init_gesthouse = []
                let init_resort = []
                let init_house = []
                let init_host_tel = []
                let init_home_stay = []
                console.log(hotel_arr)
                console.log('gest house arr is', gest_house_arr)
                console.log(resort_arr)
                console.log(house_arr)
                console.log(host_tel_arr)
                console.log(home_stay_arr)
                console.log(boathouse_arr)


                if (screen.availWidth > 1400) {
                    for (let j = 0; j < 9; j++) {
                        if (hotel_arr[j] === 0 || hotel_arr[j]) init_hotel.push(hotel_arr[j])
                        if (boathouse_arr[j] === 0 || boathouse_arr[j]) init_boathouse.push(boathouse_arr[j])
                        if (gest_house_arr[j] === 0 || gest_house_arr[j]) init_gesthouse.push(gest_house_arr[j])
                        if (home_stay_arr[j] === 0 || home_stay_arr[j]) init_home_stay.push(home_stay_arr[j])
                        if (resort_arr[j] === 0 || resort_arr[j]) init_resort.push(resort_arr[j])
                        if (host_tel_arr[j] === 0 || host_tel_arr[j]) init_host_tel.push(host_tel_arr[j])
                        if (house_arr[j] === 0 || house_arr[j]) init_house.push(house_arr[j])
                    }
                    hotel_arr.splice(0, 9)
                    boathouse_arr.splice(0, 9)
                    gest_house_arr.splice(0, 9)
                    home_stay_arr.splice(0, 9)
                    resort_arr.splice(0, 9)
                    host_tel_arr.splice(0, 9)
                    house_arr.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let j = 0; j < 12; j++) {
                        if (hotel_arr[j] === 0 || hotel_arr[j]) init_hotel.push(hotel_arr[j])
                        if (boathouse_arr[j] === 0 || boathouse_arr[j]) init_boathouse.push(boathouse_arr[j])
                        if (gest_house_arr[j] === 0 || gest_house_arr[j]) init_gesthouse.push(gest_house_arr[j])
                        if (home_stay_arr[j] === 0 || home_stay_arr[j]) init_home_stay.push(home_stay_arr[j])
                        if (resort_arr[j] === 0 || resort_arr[j]) init_resort.push(resort_arr[j])
                        if (host_tel_arr[j] === 0 || host_tel_arr[j]) init_host_tel.push(host_tel_arr[j])
                        if (house_arr[j] === 0 || house_arr[j]) init_house.push(house_arr[j])
                    }
                    hotel_arr.splice(0, 12)
                    boathouse_arr.splice(0, 12)
                    gest_house_arr.splice(0, 12)
                    home_stay_arr.splice(0, 12)
                    resort_arr.splice(0, 12)
                    host_tel_arr.splice(0, 12)
                    house_arr.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let j = 0; j < 6; j++) {
                        if (hotel_arr[j] === 0 || hotel_arr[j]) init_hotel.push(hotel_arr[j])
                        if (boathouse_arr[j] === 0 || boathouse_arr[j]) init_boathouse.push(boathouse_arr[j])
                        if (gest_house_arr[j] === 0 || gest_house_arr[j]) init_gesthouse.push(gest_house_arr[j])
                        if (home_stay_arr[j] === 0 || home_stay_arr[j]) init_home_stay.push(home_stay_arr[j])
                        if (resort_arr[j] === 0 || resort_arr[j]) init_resort.push(resort_arr[j])
                        if (host_tel_arr[j] === 0 || host_tel_arr[j]) init_host_tel.push(host_tel_arr[j])
                        if (house_arr[j] === 0 || house_arr[j]) init_house.push(house_arr[j])
                    }
                    hotel_arr.splice(0, 6)
                    boathouse_arr.splice(0, 6)
                    gest_house_arr.splice(0, 6)
                    home_stay_arr.splice(0, 6)
                    resort_arr.splice(0, 6)
                    host_tel_arr.splice(0, 6)
                    house_arr.splice(0, 6)
                }
                setShowHotel(init_hotel)
                setShowGestHouse(init_gesthouse)
                setShowHomeStay(init_home_stay)
                setShowHouse(init_house)
                setShowHosttel(init_host_tel)
                setShowResort(init_resort)
                setShowBoatHouse(init_boathouse)
                setRemainHotel(hotel_arr)
                setRemainGestHouse(gest_house_arr)
                setRemainHomeStay(home_stay_arr)
                setRemainHouse(house_arr)
                setRemainResort(resort_arr)
                setRemainHosttel(host_tel_arr)
                setRemainBoatHouse(boathouse_arr)
                setShowingAccommodation(init_hotel)
            }
        }
        if (showHotel.length === 0) {
            getAccommodation()
        }
    }, [])
    return (
        <div className={styles['accommodation-page']} >
            <Head>
                <title>ที่พัก</title>
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
                            <div className={styles['catagory']}>รูปแบบที่พัก</div>
                            <div className={styles['select-box']}>
                                <select className={styles['catagory-select']} onChange={(e) => changeType(e)}>
                                    {accommodation_options.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            {/* <div onClick={(e) => setActiveTab('accom')} className={activeTab === "accom" ? styles['accom-tab-active'] : styles['accom-tab']}>
                                <span>ที่พัก</span>
                            </div>
                            <div onClick={(e) => setActiveTab('boat')} className={activeTab === 'boat' ? styles['boat-tab-active'] : styles['boat-tab']}>
                                <span>แพพัก</span>
                            </div> */}
                        </div>
                        <div className={styles['accom-column-box']}>
                            <div className={styles['accommodation-list']} >
                                {showingAccommodation.map((accommodation) => (
                                    <div onClick={(e) => showPopup(e, accommodation)} key={accommodation.id} className={styles['accommodation-item']} >
                                        <img src={accommodation.images && accommodation.images.length > 0 ? accommodation.images[0] : '/accom-placeholder.png'} alt="" />
                                        {accommodation.type === "แพพัก" ? (
                                            <div className={styles['boat-house-tag']} >{accommodation.type}</div>
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
                                ))}

                            </div>
                            {activeTab === "โรงแรม" && remainHotel.length > 0 ? <span onClick={(e) => showMoreAccommodation(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> :
                                activeTab === "โฮมสเตย์" && remainHomeStay.length > 0 ? <span onClick={(e) => showMoreAccommodation(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> :
                                    activeTab === "รีสอร์ท" && remainResort.length > 0 ? <span onClick={(e) => showMoreAccommodation(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> :
                                        activeTab === "เกสต์เฮ้าส์" && remainGestHouse.length > 0 ? <span onClick={(e) => showMoreAccommodation(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> :
                                            activeTab === "เรือนรับรอง" && remainHouse.length > 0 ? <span onClick={(e) => showMoreAccommodation(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> :
                                                activeTab === "โฮสเทล" && remainHosttel.length > 0 ? <span onClick={(e) => showMoreAccommodation(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> :
                                                    activeTab === "แพพัก" && remainBoatHouse.length > 0 ? <span onClick={(e) => showMoreAccommodation(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> : null}
                        </div>

                        {/* {activeTab === "boat" ? (
                            <div className={styles['accom-column-box']}>
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

                        ) : ''} */}

                    </div>

                </div>

            </div>
            <AccommodationPopup open={openPopup} onClose={() => setOpenPopup(false)} activeAcommodation={activeAcommodation} />
            <Footer />
        </div>
    )
}

