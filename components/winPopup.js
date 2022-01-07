import { React, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import axios from 'axios'
import styles from '../styles/PublicTranspotation.module.scss'
export default function winPopup({ open, onClose, activeWin }) {

    const [drivers, setDrivers] = useState([])
    const [sideTow, setSideTow] = useState(false)
    const [triCycle, setTriCycle] = useState(false)
    const [load, setLoad] = useState(true)
    const [check_data, setcheck_data] = useState(false)

    const getDriverFromLocation = async (location) => {
        console.log('get driver from location');
        console.log('location in function is', location);
        const response = await axios.post(`${process.env.SERVER_API}/get/driverfromlocation`, location)
        console.log('res data is', response.data);
        if (response.status === 200) {
            setDrivers(response.data.payload)
            response.data.sidetow ? setSideTow(true) : false
            response.data.triCycle ? setTriCycle(true) : false
            console.log('sidetow is', response.data.sidetow);
            setcheck_data(true)
            setLoad(false)
        }
        // setShowWinPopup(true)
    }
    const closeWinPopup = () => {
        setSideTow(false)
        setTriCycle(false)
        onClose()
    }
    useEffect(() => {
        setLoad(true)
        activeWin ? getDriverFromLocation(activeWin) : null


    }, [activeWin])
    return (
        <>
            {!load ? (
                <Popup
                    open={open}
                    closeOnEscape={false}
                    closeOnDocumentClick={false}
                    lockScroll
                    activeWin
                >
                    <div >
                        <div className={styles['backdrop']} ></div>
                        <div className={styles['popup-fixed-box']}  >
                            <div className={styles['win-popup']} >
                                <div className={styles['win-flexbox']}>
                                    <img className={styles['popup-close-icon']} onClick={() => closeWinPopup()} src='/Quit.png' alt="" />
                                    <span className={styles['location-name']}>{activeWin ? activeWin.location_name : ''}</span>
                                    {activeWin && activeWin.location_detail ? <label className={styles['location-detail']} ><img src="/glass.png" alt="" />{activeWin ? activeWin.location_detail : ''}</label> : ''}
                                    <div className={styles['popup-win-box']}>
                                        {drivers ? drivers.map((driver) => (
                                            <div className={styles['popup-win-item']} key={driver.id}>
                                                <img className={styles['driver-image']} style={{ backgroundImage: `url(${driver.image ? `${driver.image}` : '/img/publictranspotation/winCoverPlaceholder.png'})` }} src={driver.image ? '/img/publictranspotation/driver-img-frame.png' : '/img/publictranspotation/winCoverPlaceholder.png'} alt="" />
                                                {/* <Image style src={driver.image ? '/img/publictranspotation/driver-img-frame.png':'/img/publictranspotation/winCoverPlaceholder.png'} width={134} height={134} /> */}
                                                <span className={styles['popup-win-name']} >{driver.name}</span>
                                                <span className={styles['popup-win-tel']} >{driver.contact}</span>
                                            </div>
                                        )) : ''}

                                    </div>
                                    {drivers.length > 0 ? (
                                        <div className={styles['popup-service-box']}  >
                                            <div   > <img src={sideTow === true ? "/img/publictranspotation/circle-true.png" : "/img/publictranspotation/circle.png"} alt="" /> <span>วินมอเตอร์ไซต์พ่วงข้าง</span></div>
                                            <div> <img src={triCycle === true ? "/img/publictranspotation/circle-true.png" : "/img/publictranspotation/circle.png"} alt="" /> <span>รถสามล้อเครื่อง</span></div>
                                        </div>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            ) : ''}
        </>
    )
}
