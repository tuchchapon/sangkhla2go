import { React, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import styles from '../styles/restaurant.module.scss'
export default function restaurantPopup({ open, onClose, activeRestaurant }) {
    const [bigPhoto, setBigPhoto] = useState('')
    const [sc_width, setSc_width] = useState(0)
    const changeImage = (image) => {
        setBigPhoto(image)
    }
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
    useEffect(() => {
        let width = screen.availWidth
        setSc_width(width)
        let first_image = ''
        activeRestaurant.images.length ? first_image = `${activeRestaurant.images[0]}` : ''
        setBigPhoto(first_image)
        activeRestaurant.images.length > 0 ? first_image = (``) : ''
    }, [activeRestaurant])

    return (
        <>
            <Popup
                open={open}
                closeOnDocumentClick={false}
                closeOnEscape={false}
                lockScroll
            >
                <div className={styles['backdrop']}></div>
                <div className={styles['popup-fixed-box']}>
                    <div className={styles['restaurant-popup']}>
                        <img draggable={false} className={styles['popup-close-icon']} src='/Quit.png' onClick={() => onClose()} alt="" />
                        <div>
                            <div className={styles['restaurant-flexbox']}>
                                <div className={styles['popup-name-box']} >
                                    <span>{activeRestaurant.name}<br /></span>
                                    <span>{activeRestaurant.type}</span>
                                </div>
                                <div className={styles['location-box']} >
                                    <img src="/glass.png" alt="" />
                                    <span>{activeRestaurant.location}</span>
                                </div>
                                <div className={styles['row-box']}>
                                    <div className={styles['image-box']}>
                                        {activeRestaurant.images.length > 1 ? (<a className={styles['prev']} onClick={(e) => prev(bigPhoto, activeRestaurant.images)} >❮ </a>) : ''}
                                        {activeRestaurant.images.length > 1 ? (<a className={styles['next']} onClick={(e) => next(bigPhoto, activeRestaurant.images)} >❯ </a>) : ''}
                                        {activeRestaurant.images.length > 0 ? (<img className={styles['big-image']} src={`${bigPhoto}`} alt="" />) :
                                            (<img className={styles['no-image']} src="/restaurant-placeholder.png" alt="" />)}
                                        <div className={styles['dots-list']}>
                                            {activeRestaurant.images.length > 0 ? activeRestaurant.images.map((image) => (
                                                <div className={image === bigPhoto ? styles['active-dot'] : styles['dot']} onClick={() => changeImage(image)} key={image}></div>
                                            )) : ''}
                                        </div>
                                        <div className={styles['image-list']}>
                                            {activeRestaurant.images.length > 0 ? activeRestaurant.images.map((image) => (
                                                <img draggable={false} onClick={() => changeImage(image)} key={image} src={`${image}`} alt="" />
                                            )) : ''}
                                        </div>

                                    </div>
                                    <div className={styles['detail-box']}>
                                        <div className={styles['restaurant-detail']}>
                                            <div className={styles['recommend-box']}>
                                                <span><b style={{ color: '#383838' }}>{activeRestaurant.recommend_menu ? 'เมนูแนะนำ :' : ''}</b> {activeRestaurant.recommend_menu} </span>
                                            </div>
                                            <div className={styles['food-price-box']}>
                                                <span>ราคาอาหาร</span>
                                                <span><b>{activeRestaurant.food_min_price && activeRestaurant.food_max_price ? (
                                                    `${activeRestaurant.food_min_price}-${activeRestaurant.food_max_price} บาท`
                                                ) : `${activeRestaurant.food_min_price ? `${activeRestaurant.food_min_price}บาท` : activeRestaurant.food_max_price ? `${activeRestaurant.food_max_price} บาท` : '-'}`}</b> </span>
                                            </div>
                                            <div className={styles['drink-price-box']} >
                                                <span>ราคาเครื่องดื่ม</span>
                                                <span><b>{activeRestaurant.drink_min_price && activeRestaurant.drink_max_price ? (
                                                    `${activeRestaurant.drink_min_price}-${activeRestaurant.drink_max_price} บาท`
                                                ) : `${activeRestaurant.drink_min_price ? `${activeRestaurant.drink_min_price}บาท` : activeRestaurant.drink_max_price ? `${activeRestaurant.drink_max_price} บาท` : '-'}`}</b> </span>
                                            </div>
                                            <div className={styles['time-box']}>
                                                <img src="/img/restaurant/clock-icon.png" alt="" />
                                                <span><b>{`${activeRestaurant.open_time}-${activeRestaurant.close_time} น.`}</b></span>
                                            </div>
                                        </div>
                                        {sc_width > 1300 ? (
                                            <div className={styles['service-box']}>
                                                {activeRestaurant.services.map((service) => (
                                                    service === "บริการส่ง" ? (<div className={styles['icon-box']} key={service} >
                                                        <img src="/img/restaurant/Delivery-icon.png" alt="" />
                                                        <span>{service}</span>
                                                    </div>) :
                                                        service === "ห้องแอร์" ? (<div className={styles['icon-box']} key={service}>
                                                            <img src="/img/restaurant/air-icon.png" alt="" />
                                                            <span>{service}</span>
                                                        </div>) :
                                                            service === "คาราโอเกะ" ? (<div className={styles['icon-box']} key={service} >
                                                                <img src="/img/restaurant/karaoke-icon.png" alt="" />
                                                                <span>{service}</span>
                                                            </div>) :
                                                                service === "แอลกอฮอล์" ? (<div className={styles['icon-box']} key={service} >
                                                                    <img src="/img/restaurant/alcohol-icon.png" alt="" />
                                                                    <span>
                                                                        {service}
                                                                    </span>
                                                                </div>) :
                                                                    service === "เค้ก" ? (<div className={styles['icon-box']} key={service}>
                                                                        <img src="/img/restaurant/cake-icon.png" alt="" />
                                                                        <span>
                                                                            {service}
                                                                        </span>
                                                                    </div>) : ''
                                                ))}
                                            </div>
                                        ) : sc_width < 1300 && activeRestaurant.services.length >= 1 ? (
                                            <div className={styles['service-box']}>
                                                {activeRestaurant.services.map((service) => (
                                                    service === "บริการส่ง" ? (<div className={styles['icon-box']} key={service} >
                                                        <img src="/img/restaurant/Delivery-icon.png" alt="" />
                                                        <span>{service}</span>
                                                    </div>) :
                                                        service === "ห้องแอร์" ? (<div className={styles['icon-box']} key={service}>
                                                            <img src="/img/restaurant/air-icon.png" alt="" />
                                                            <span>{service}</span>
                                                        </div>) :
                                                            service === "คาราโอเกะ" ? (<div className={styles['icon-box']} key={service} >
                                                                <img src="/img/restaurant/karaoke-icon.png" alt="" />
                                                                <span>{service}</span>
                                                            </div>) :
                                                                service === "แอลกอฮอล์" ? (<div className={styles['icon-box']} key={service} >
                                                                    <img src="/img/restaurant/alcohol-icon.png" alt="" />
                                                                    <span>
                                                                        {service}
                                                                    </span>
                                                                </div>) :
                                                                    service === "เค้ก" ? (<div className={styles['icon-box']} key={service}>
                                                                        <img src="/img/restaurant/cake-icon.png" alt="" />
                                                                        <span>
                                                                            {service}
                                                                        </span>
                                                                    </div>) : ''
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className={styles['contact-box']}>
                                    {activeRestaurant.fb_page ? (
                                        <div className={styles['contact-item']} >
                                            {activeRestaurant.fb_page ? <img src="/img/restaurant/fb-icon.png" alt="" /> : ''}
                                            <span className={activeRestaurant.fb_link ? styles['fb-with-link'] : styles['fb-no-link']} onClick={activeRestaurant.fb_link ? () => window.open(`${activeRestaurant.fb_link}`) : null}>{activeRestaurant.fb_page}</span>
                                        </div>
                                    ) : null}
                                    {activeRestaurant.line ? (
                                        <div className={styles['contact-item']} >
                                            {activeRestaurant.line ? <img src="/line-icon.png" alt="" /> : ''}
                                            <span>{activeRestaurant.line}</span>
                                        </div>
                                    ) : null}
                                    {activeRestaurant.tel ? (
                                        <div className={styles['contact-item']} >
                                            {activeRestaurant.tel ? <img src="/img/restaurant/tel-icon.png" alt="" /> : ''}
                                            <span>{activeRestaurant.tel}</span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Popup>
        </>
    )
}
