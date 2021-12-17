import {React,useState,useEffect} from 'react'
import Popup from 'reactjs-popup'
import styles from '../styles/restaurant.module.scss'
export default function restaurantPopup({open,onClose,activeRestaurant}) {
    const [bigPhoto, setBigPhoto] = useState('')

    const changeImage=(image)=>{
        setBigPhoto(image)
    }
    const next=(photo,images)=>{
        let index = images.indexOf(photo)
        if (index <= images.length) {
            index = index +1 
            setBigPhoto(images[index])
            console.log('1 index',index);
        }
        if (index === images.length) {
            setBigPhoto(images[0])
        }
    }
    const prev=(photo,images)=>{
        let index = images.indexOf(photo)
        if (index === 0) {
            console.log(index);
            console.log(images.length);
            setBigPhoto(images[images.length-1])
        }
        if (index >= 1) {
            index = index -1 
            setBigPhoto(images[index])
            console.log('2 index',index);
        }

    }
    useEffect(() => {
        let first_image =''
        activeRestaurant.images.length ?  first_image =`${activeRestaurant.images[0]}`:''
        setBigPhoto(first_image)
        activeRestaurant.images.length > 0 ? first_image = (``):''
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
                    <div className="col-12">
                        <div className={styles['restaurant-popup']}>
                            <img draggable={false} className={styles['popup-close-icon']} src='/Quit.png' onClick={()=>onClose()}  alt="" />
                            <div>
                                <div className={styles['restaurant-flexbox']}>
                                    <div className={styles['popup-name-box']} >
                                        <span>{activeRestaurant.name}<br/></span>
                                        <span>{activeRestaurant.type}</span>
                                    </div>
                                        <div className={styles['location-box']} >
                                            <img src="/glass.png" alt="" />
                                            <span>{activeRestaurant.location}</span>
                                        </div>
                                        <div className={styles['row-box']}>
                                            <div className={styles['image-box']}>
                                            {activeRestaurant.images.length > 1 ? (<a  className={styles['prev']} onClick={(e)=>prev(bigPhoto,activeRestaurant.images)} >❮ </a>):''}
                                            {activeRestaurant.images.length > 1 ?(<a className={styles['next']} onClick={(e)=>next(bigPhoto,activeRestaurant.images)} >❯ </a>):''}
                                                {activeRestaurant.images.length > 0 ? (<img className={styles['big-image']} src={`/uploadImage/restaurant/${bigPhoto}`} alt="" />):
                                                (<img className={styles['no-image']} src="/no-image-big.png" alt="" />)}
                                                <div className={styles['image-list']}>
                                                    {activeRestaurant.images.length > 0 ? activeRestaurant.images.map((image)=>(
                                                        <img draggable={false} onClick={()=>changeImage(image)} key={image} src={`/uploadImage/restaurant/${image}`} alt="" />
                                                    )):''}
                                                </div>
                                                
                                            </div>
                                            <div className={styles['detail-box']}>
                                                <div className={styles['restaurant-detail']}>
                                                   <div className={styles['recommend-box']}>
                                                   <span><b style={{color:'#383838'}}>เมนูแนะนำ</b> :{activeRestaurant.recommend_menu} </span>
                                                   </div>
                                                    <div className={styles['food-price-box']}>
                                                        <span>ราคาอาหาร</span>
                                                        <span><b>{`${activeRestaurant.food_min_price}-${activeRestaurant.food_max_price} บาท`}</b> </span>
                                                    </div>
                                                    <div className={styles['drink-price-box']} >
                                                        <span>ราคาเครื่องดื่ม</span>
                                                        <span><b>{`${activeRestaurant.drink_min_price}-${activeRestaurant.drink_max_price} บาท`}</b></span>
                                                    </div>
                                                    <div className={styles['time-box']}>
                                                        <img src="/img/restaurant/clock-icon.png" alt="" />
                                                        <span><b>{`${activeRestaurant.open_time}-${activeRestaurant.close_time} น.`}</b></span>
                                                    </div>
                                                </div>
                                                <div className={styles['service-box']}>
                                                    { activeRestaurant.services.map((service)=>(
                                                        service === "บริการส่ง" ? (<div className={styles['icon-box']} key={service} >
                                                            <img src="/img/restaurant/Delivery-icon.png" alt="" />
                                                            <span>{service}</span>
                                                        </div>):
                                                        service === "ห้องแอร์"  ?  (<div className={styles['icon-box']} key={service}>
                                                            <img src="/img/restaurant/air-icon.png" alt="" />
                                                            <span>{service}</span>
                                                        </div>) :
                                                        service === "คาราโอเกะ" ? (<div className={styles['icon-box']} key={service} >
                                                            <img src="/img/restaurant/karaoke-icon.png" alt="" />
                                                            <span>{service}</span>
                                                        </div>):
                                                        service === "แอลกอฮอล์" ? (<div className={styles['icon-box']} key={service} >
                                                            <img src="/img/restaurant/alcohol-icon.png" alt="" />
                                                            <span>
                                                                {service}
                                                            </span>
                                                        </div>):
                                                        service === "เค้ก" ? (<div className={styles['icon-box']} key={service}>
                                                            <img src="/img/restaurant/cake-icon.png" alt="" />
                                                            <span>
                                                                {service}
                                                            </span>
                                                        </div>):''
                                                    ))} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles['contact-box']}>
                                            <div className={styles['contact-item']} >
                                            <img src="/img/restaurant/fb-icon.png" alt="" />
                                            <span>{activeRestaurant.fb_page}</span>
                                            </div>
                                            <div className={styles['contact-item']} >
                                            <img src="/img/restaurant/tel-icon.png" alt="" />
                                            <span>{activeRestaurant.tel}</span>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </Popup>  
        </>
    )
}
