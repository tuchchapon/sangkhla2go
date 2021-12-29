import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/restaurant.module.scss'
import RestaurantPopup from '../components/restaurantPopup'
import SubHeader from '../layouts/subHeader'
import Footer from '../layouts/footer'
export default function restaurant() {
    const [restaurants, setrestaurants] = useState([])
    const [show_arr, setShow_arr] = useState([
    ])
    const [res_arr, setRes_arr] = useState([])
    const [showRestaurant, setShowRestaurant] = useState(false)
    const [activeRestaurant, setActiveRestaurant] = useState({
        id: '', name: '', location: '', recommend_menu: '', open_time: '',
        close_time: '', food_min_price: '', food_max_price: '',
        drink_min_price: '', drink_max_price: '', type: '', tel: '', fb_page: '',
        fb_link: '', line: '', images: [], services: []
    })
    const setNewRestaurant = (new_show_arr) => {
        setShow_arr([...show_arr, ...new_show_arr])
    }
    const showMore = () => {
        let new_show_arr = []
        let new_res_arr = []
        if (res_arr.length !== 0) {
            for (let i = 0; i < 9; i++) {
                if (res_arr[i]) new_show_arr.push(res_arr[i])
            }
        }
        new_res_arr = res_arr.splice(0, 9)
        console.log('new show arr is', new_show_arr);
        setNewRestaurant(new_show_arr)
    }
    const showPopup = (restaurent) => {
        console.log('restaurant is', restaurent);
        setActiveRestaurant(restaurent)
        setShowRestaurant(true)

    }

    useEffect(() => {
        const getRestaurant = async () => {
            let response = await axios.get(`${process.env.SERVER_API}/get/restaurant`)
            if (response.status === 200) {
                console.log(response.data.payload);
                let data = response.data.payload

                for (let i = 0; i < data.length; i++) {
                    let new_type = []
                    data[i].type.forEach(type => {
                        new_type.push(`${type} / `)
                    });
                    let arrToString = new_type.join(' ')
                    arrToString = arrToString.substring(0, arrToString.length - 3)
                    data[i].type = arrToString
                }
                // data
                let setarr = []
                for (let j = 0; j < 9; j++) {
                    if (data[j] === 0 || data[j]) setarr.push(data[j])
                }
                data.splice(0, 9)
                console.log('data is ', data);
                console.log('setarr is', setarr);
                setRes_arr(data)
                setShow_arr(setarr)

            }
        }
        if (show_arr.length === 0) getRestaurant()
        console.log(show_arr);
    }, [])
    return (
        <div className={styles['restaurant-page']}>
            <Head>
                <title>ร้านอาหาร</title>
            </Head>
            <SubHeader first={'ร้านอาหาร/กาแฟ'} />
            <div >
                <div className={styles['page-title-box']}>
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
                                {show_arr.map((restaurant) => (
                                    <div key={restaurant.id} onClick={(e) => { showPopup(restaurant) }} className={styles['restaurant-item']} >
                                        <img src={restaurant.images.length > 0 ? `${restaurant.images[0]}` : '/no-imge.png'} className={styles['restaurant-image']} alt="" />
                                        <span>{restaurant.name}<br /></span>
                                        <span>{restaurant.type}<br /></span>
                                        {restaurant.recommend_menu ? <span><b style={{ color: '#383838' }}>เมนูแนะนำ : </b>{restaurant.recommend_menu}</span> : ''}
                                    </div>
                                ))}
                            </div>
                            {res_arr.length > 0 ? (<div onClick={(e) => showMore(e)} className={styles['load-content-text']} ><span   >โหลดเพิ่ม</span></div>) : ''}
                        </div>
                    </div>
                </div>
            </div>
            <RestaurantPopup open={showRestaurant} onClose={() => setShowRestaurant(false)} activeRestaurant={activeRestaurant} />
            <Footer />
        </div>
    )
}