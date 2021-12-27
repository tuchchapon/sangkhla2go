import { React, useState, useEffect } from 'react'
import styles from "../styles/accommodation.module.scss";
import Popup from 'reactjs-popup';


export default function accommodationPopup({ open, onClose, activeAcommodation }) {

    const [bigPhoto, setBigPhoto] = useState('')



    const next = (photo, images) => {
        let index = images.indexOf(photo)
        if (index <= images.length) {
            index = index + 1
            setBigPhoto(images[index])
            console.log('1 index', index);
        }
        if (index === images.length) {
            setBigPhoto(images[0])
        }
    }
    const prev = (photo, images) => {
        let index = images.indexOf(photo)
        if (index === 0) {
            console.log(index);
            console.log(images.length);
            setBigPhoto(images[images.length - 1])
        }
        if (index >= 1) {
            index = index - 1
            setBigPhoto(images[index])
            console.log('2 index', index);
        }

    }
    const changeImage = (image) => {

        setBigPhoto(image)
    }
    useEffect(() => {
        let first_image = ''
        activeAcommodation.images.length > 0 ? first_image = activeAcommodation.images[0] : ''
        if (first_image) setBigPhoto(first_image)
        console.log('accom', activeAcommodation);
    }, [activeAcommodation])
    return (
        <>
            <Popup
                open={open}
                closeOnDocumentClick={false}
                closeOnEscape={false}
                lockScroll
            >
                <div className={styles['backdrop']} ></div>
                <div className="col-12">
                    <div className={styles['accommodation-popup']} >
                        <img draggable={false} className={styles['popup-close-icon']} onClick={() => onClose()} src="/Quit.png" alt="" />
                        <div className={styles['accommodation-flexbox']} >
                            <div className={styles['popup-name-box']} >
                                <span>{activeAcommodation.name}</span>
                                <span>{activeAcommodation.type}</span>
                            </div>
                            <div className={styles['row-box']} >
                                <div className={styles['image-box']} >
                                    {activeAcommodation.images.length > 1 ? (<a className={styles['prev']} onClick={(e) => prev(bigPhoto, activeAcommodation.images)} >❮ </a>) : ''}
                                    {activeAcommodation.images.length > 1 ? (<a className={styles['next']} onClick={(e) => next(bigPhoto, activeAcommodation.images)} >❯ </a>) : ''}
                                    {activeAcommodation.images.length > 0 ? <img className={styles['big-image']} src={activeAcommodation.images.length > 0 ? `${bigPhoto}` : '/no-image-big.png'} alt="" />
                                        : <img className={styles['no-image']} src={'/no-image-big.png'} alt="" />}
                                    <div className={styles['image-list']} >
                                        {activeAcommodation.images.length > 0 ? activeAcommodation.images.map((image) => (
                                            <img onClick={() => changeImage(image)} key={image} src={`${image}`} alt="" />
                                        )) : ''}
                                    </div>
                                </div>
                                <div className={styles['detail-box']} >
                                    <div className={styles['information-box']} >
                                        <span>
                                            {activeAcommodation.information}
                                        </span>
                                    </div>
                                    {activeAcommodation.min_price || activeAcommodation.max_price ? (
                                        <div className={styles['popup-price-box']}>
                                            <img src="/img/accommodation/icon-b-big.png" alt="" />
                                            <span>{activeAcommodation.min_price >= activeAcommodation.max_price ? (
                                                `${activeAcommodation.min_price} บาท`
                                            ) : `${activeAcommodation.min_price} - ${activeAcommodation.max_price} บาท`}</span>
                                        </div>
                                    ) : ''}
                                    <div className={styles['breakfast-box']}>
                                        {activeAcommodation.services.includes("อาหารเช้า") ? (
                                            <div className={styles['breakfast']} >
                                                <img src="/img/accommodation/with-breakfast.png" alt="" />
                                                <span style={{ color: '#383838', marginLeft: '8px' }}>อาหารเช้า</span>
                                            </div>
                                        ) : (
                                            <div className={styles['breakfast']}>
                                                <img src="/img/accommodation/no-breakfast.png" alt="" />
                                                <span style={{ color: '#E1D3B6', marginLeft: '8px' }} >อาหารเช้า</span>
                                            </div>
                                        )}

                                    </div>
                                    <div className={styles['service-box']}>
                                        {activeAcommodation.services.map((service) => (
                                            service === "ลานจอดรถ" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/parking-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "สระว่ายน้ำ" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/pool-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "Wi-Fi" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/wifi-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "ห้องน้ำส่วนตัว" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/bath-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "ร้านอาหาร" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/restaurant-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "ห้องประชุม" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/meetting-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "เช่ารายเดือน" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/monthly.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "ลานกางเต็นท์" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/tent-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "บริการลากแพ" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/raft-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : service === "คาราโอเกะ" ? (
                                                <div key={service} className={styles['icon-box']}>
                                                    <img src="/img/accommodation/karaoke-icon.png" alt="" />
                                                    <span>{service}</span>
                                                </div>
                                            ) : ''
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={styles['contact-box']}>
                                <div className={styles['contact-item']}>
                                    {activeAcommodation.fb_page ? <img src="/img/restaurant/fb-icon.png" alt="" /> : ''}
                                    <span className={activeAcommodation.fb_link ? styles['fb-with-link'] : styles['fb-no-link']} onClick={activeAcommodation.fb_link ? () => window.open(`${activeAcommodation.fb_link}`) : null} >{activeAcommodation.fb_page}</span>
                                </div>
                                <div className={styles['contact-item']}>
                                    {activeAcommodation.tel ? <img src="/img/restaurant/tel-icon.png" alt="" /> : ''}
                                    <span>{activeAcommodation.tel} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
