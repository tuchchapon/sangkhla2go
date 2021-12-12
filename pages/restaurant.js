import {React,useState,useEffect} from 'react'
import axios from 'axios'
import Head from 'next/head'
import Popup from 'reactjs-popup'
import styles from '../styles/restaurant.module.scss'
export default function restaurant() {
    const [restaurants, setrestaurants] = useState([])
    const [show_arr, setShow_arr] = useState([
    ])
    const [res_arr, setRes_arr] = useState([])
    const [showRestaurant, setShowRestaurant] = useState(false)
    const [activeRestaurant, setActiveRestaurant] = useState(        {
        id:'',name:'',location:'',recommend_menu:'',open_time:'',
        close_time:'',food_min_price:'',food_max_price:'',
        drink_min_price:'',drink_max_price:'',type:'',tel:'',fb_page:'',
        images:[],services:[]
    })
    const [bigPhoto, setBigPhoto] = useState('')
    const setNewRestaurant=(new_show_arr)=>{
        setShow_arr([...show_arr,...new_show_arr])
    }
    const showMore=()=>{
        let new_show_arr =[]
        let new_res_arr = []
        if (res_arr.length !== 0) {
            for (let i = 0; i < 9; i++) {
           if(res_arr[i])new_show_arr.push(res_arr[i])     
        }
    }
        new_res_arr = res_arr.splice(0,9)
        console.log('new show arr is',new_show_arr);
        setNewRestaurant(new_show_arr)
    }
    const showPopup = (restaurent)=>{
        console.log('restaurant is',restaurent);
        setActiveRestaurant(restaurent)
        setShowRestaurant(true)
        setBigPhoto(restaurent.images[0])
        
    }
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
    const closePopup=(e)=>{
        if(e) e.preventDefault()
        setShowRestaurant(false)
    }
    useEffect(() => {
        const getRestaurant =async()=>{
            let response = await axios.get('http://localhost:8080/get/restaurant')
            if (response.status === 200) {
                console.log(response.data.payload);
                let data = response.data.payload 
                
                for (let i = 0; i < data.length; i++) {
                    let new_type =[]
                    data[i].type.forEach(type => {
                        new_type.push(`${type} / `)
                    });
                    let arrToString = new_type.join(' ')
                    arrToString = arrToString.substring(0,arrToString.length -3)
                    data[i].type = arrToString
                }
                // data
                let setarr = []
                    for (let j = 0; j < 9; j++) {
                        if(data[j] === 0 || data[j])setarr.push(data[j])
                   }
                   data.splice(0,9)
                   console.log('data is ',data);
                   console.log('setarr is',setarr);
                   setRes_arr(data)
                   setShow_arr(setarr)
                
            }
        }
        if(show_arr.length === 0) getRestaurant()
        console.log(show_arr);
    }, [])
    return (
        <div className={styles['restaurant-page']}>
            <Head>
                <title>ร้านอาหาร</title>
            </Head>
            <div >
            <div className={styles['page-title-box']}>
                <div className={styles['header-line']}></div>
                       <img className={styles['title-top-left']} src="/img/restaurant/title-top-left.png" alt="" />
                       <img className={styles['title-top-right']} src="/img/restaurant/title-top-right.png" alt="" />
                        <span>ร้านอาหาร/กาแฟ</span>
                       <img className={styles['title-bottom-left']} src="/img/restaurant/title-bottom-left.png" alt="" />
                       <img className={styles['title-bottom-right']} src="/img/restaurant/title-bottom-right.png" alt="" />
                    </div>
                <div className="container">
                    <div className="col-12">
                        {/* <div className={styles['restaurant-list']} >
                            {restaurants.map((restaurant)=>(
                                <div className={styles['restaurant-item']} key={restaurant.id}>
                                   <img src="" alt="" /> 
                                   <span>ชื่อร้าน<br/></span>
                                   <span>{restaurant.type}</span>
                                </div>
                            ))}
                        </div> */}
                        <div className={styles['restaurant-column']}>
                            <div className={styles['restaurant-list']} >
                                { show_arr.map((restaurant)=>(
                                    <div key={restaurant.id} onClick={(e)=>{showPopup(restaurant)}}  className={styles['restaurant-item']} >
                                        <img src={restaurant.images.length >0  ? `/uploadImage/restaurant/${restaurant.images[0]}` :'/no-imge.png'} className={styles['restaurant-image']} alt="" />
                                        <span>{restaurant.name}<br/></span>
                                        <span>{restaurant.type}<br/></span>
                                        <span><b style={{color:'#383838'}}>เมนูแนะนำ : </b>{restaurant.recommend_menu}</span>
                                 </div>
                             ))}   
                            </div>
                        {res_arr.length > 0 ? ( <div onClick={(e)=>showMore(e)} className={styles['load-content-text']} ><span   >โหลดเพิ่ม</span></div>):''}
                        </div>
                    </div>
                </div>
            </div>
            <Popup
            open={showRestaurant}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            lockScroll
            >
                    <div className={styles['backdrop']}></div>
                    <div className="col-12">
                        <div className={styles['restaurant-popup']}>
                            <img draggable={false} className={styles['popup-close-icon']} src='/Quit.png' onClick={(e)=>closePopup(e)}  alt="" />
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
        </div>
    )
}