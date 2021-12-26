import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';
import Header from '../Header'
import { storage } from '../../../configs/firebaseConfig'

export default function Restaurant() {
    const router = useRouter()
    const id = router.query.id || []
    const [galleryImages, setGalleryImages] = useState([])
    const food_type = ["อาหารไทย", "อาหารท้องถิ่น", "อาหารต่างชาติ", "อาหารตามสั่ง", "ข้าวต้ม", "ประเภทเส้น", "บุฟเฟต์", "เครื่องดื่ม", "ขนม/เบเกอรี่",]
    const service_options = ["บริการส่ง", "ห้องแอร์", "คาราโอเกะ", "แอลกอฮอล์", "เค้ก"]
    const [typeArray, setTypeArray] = useState([])
    const [serviceArray, setServiceArray] = useState([])
    const [restaurant, setRestaurant] = useState({
        id: '',
        name: '',
        type: [],
        location: '',
        recommend_menu: '',
        food_min_price: '',
        food_max_price: '',
        drink_min_price: '',
        drink_max_price: '',
        open_time: '',
        close_time: '',
        services: [],
        fb_page: '',
        fb_link: '',
        line: '',
        tel: '',
        images: []
    })
    const setType = (e) => {
        console.log(e.target.value)
        if (e.target.checked) {
            typeArray.push(e.target.value)
        }
        else {
            const removeType = typeArray.indexOf(e.target.value)
            if (removeType > -1) {
                console.log('remove')
                typeArray.splice(removeType, 1)
            }
        }
        setRestaurant({ ...restaurant, type: typeArray })
    }
    const setService = (e) => {
        console.log(e.target.value)

        if (e.target.checked) {
            serviceArray.push(e.target.value)
        }
        else {
            const removeService = serviceArray.indexOf(e.target.value)
            if (removeService > -1) {
                console.log('remove')
                serviceArray.splice(removeService, 1)
            }
        }
        setRestaurant({ ...restaurant, services: serviceArray })
    }
    const createRestaurant = () => {
        console.log('create restaurant')

        if (parseInt(restaurant.food_min_price) > parseInt(restaurant.food_max_price)) {
            Swal.fire({
                title: 'ราคาอาหารไม่ถูกต้อง',
                html: `${restaurant.food_min_price}-${restaurant.food_max_price}<br/>
                ในกรณีที่มีราคาเดียว ให้ใส่ทั้งสองช่องเท่ากัน`,
                icon: 'error'
            })
            return false
        }
        if (parseInt(restaurant.drink_min_price) > parseInt(restaurant.drink_max_price)) {
            Swal.fire({
                title: 'ราคาเครื่องดื่มไม่ถูกต้อง',
                html: `${restaurant.drink_min_price}-${restaurant.drink_max_price}<br/>
                ในกรณีที่มีราคาเดียว ให้ใส่ทั้งสองช่องเท่ากัน`,
                icon: 'error'
            })
            return false
        }
        if (parseInt(restaurant.open_time) > parseInt(restaurant.close_time)) {
            Swal.fire({
                title: 'เวลาเปิด-ปิดร้านไม่ถูกต้อง',
                html: `${restaurant.open_time}-${restaurant.close_time}<br/>
                ในกรณีที่เวลาเปิด-ปิดมีข้อมูลเดียว ให้ใส่ทั้งสองช่องเท่ากัน`,
                icon: 'error'
            })
            setRestaurant({ ...restaurant, open_time: restaurant.close_time })
            return false
        }
        console.log('restaurant is', restaurant)
        axios.post(`${process.env.SERVER_API}/create/restaurant`, restaurant)
            .then((res) => {
                if (res.status === 201) {
                    Swal.fire({
                        title: 'บันทึก',
                        text: 'เพิ่มข้อมูลสำเร็จแล้ว',
                        icon: 'success'
                    }).then((result => {
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_restaurants')
                        }
                    }))
                }
            })

    }
    const editRestaurant = () => {
        console.log('edit restaurant')
        console.log(restaurant)
        console.log('gal is', galleryImages);
        if (parseInt(restaurant.food_min_price) > parseInt(restaurant.food_max_price)) {
            Swal.fire({
                title: 'ราคาอาหารไม่ถูกต้อง',
                html: `${restaurant.food_min_price}-${restaurant.food_max_price}<br/>
                ในกรณีที่มีราคาเดียว ให้ใส่ทั้งสองช่องเท่ากัน`,
                icon: 'error'
            })
            return false
        }
        if (parseInt(restaurant.drink_min_price) > parseInt(restaurant.drink_max_price)) {
            Swal.fire({
                title: 'ราคาเครื่องดื่มไม่ถูกต้อง',
                html: `${restaurant.drink_min_price}-${restaurant.drink_max_price}<br/>
                ในกรณีที่มีราคาเดียว ให้ใส่ทั้งสองช่องเท่ากัน`,
                icon: 'error'
            })
            return false
        }
        // if (parseInt(restaurant.open_time) > parseInt(restaurant.close_time)) {
        //     Swal.fire({
        //         title:'เวลาเปิด-ปิดร้านไม่ถูกต้อง',
        //         html:`${restaurant.open_time}-${restaurant.close_time}<br/>
        //         ในกรณีที่เวลาเปิด-ปิดมีข้อมูลเดียว ให้ใส่ทั้งสองช่องเท่ากัน`,
        //         icon:'error'
        //     })
        //     setRestaurant({...restaurant,open_time:restaurant.close_time})
        //     return false

        // } 
        let uniq = [...new Set(restaurant.services)]
        let uniq2 = [...new Set(restaurant.type)]
        console.log('1 is', uniq);
        console.log('2 is', uniq2);
        axios.post(`${process.env.SERVER_API}/edit/restaurant`, restaurant)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        title: 'บันทึก',
                        text: 'แก้ไขข้อมูลสำเร็จแล้ว',
                        icon: 'success'
                    }).then((result => {
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_restaurants')
                        }
                    }))
                }
            })

    }
    const priceControl = (e, price) => {
        e.preventDefault
        let value = e.target.value
        if (price === "food_min_price") {
            if (value.charAt(0) === '0') {
                return false
            }
            setRestaurant({ ...restaurant, food_min_price: value })
        }
        if (price === "food_max_price") {
            if (value.charAt(0) === '0') {
                return false
            }
            setRestaurant({ ...restaurant, food_max_price: value })
        }
        if (price === "drink_min_price") {
            if (value.charAt(0) === '0') {
                return false
            }
            setRestaurant({ ...restaurant, drink_min_price: value })
        }
        if (price === 'drink_max_price') {
            if (value.charAt(0) === '0') {
                return false
            }
            setRestaurant({ ...restaurant, drink_max_price: value })
        }
    }
    const uploadImage = async (e) => {
        e.preventDefault();
        const files = e.target.files
        console.log('files is', files)
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                uploadImageAsPromise(files[i], i)
            }

        }
    }
    function uploadImageAsPromise(imageFile, i) {
        return new Promise(function (resolve, reject) {
            let imageName = Date.now() + i + '.jpg'
            var storageRef = storage.ref("restaurant-image/" + imageName);
            //Upload file
            var task = storageRef.put(imageFile);

            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                },
                function error(err) {
                },
                async function complete(url) {
                    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        galleryImages.push(downloadURL)
                        setRestaurant({ ...restaurant, images: galleryImages })
                    });
                }
            );
        });
    }
    const deleteImg = (index) => {
        let new_image = restaurant.images
        new_image.splice(index, 1)
        setRestaurant({ ...restaurant, images: new_image })

    }
    useEffect(() => {
        const getRestaurant = async () => {
            console.log('get one restaurant');
            const response = await axios.post(`${process.env.SERVER_API}/get/restaurant/:${id}`, { id: id })
            console.log('response restaurant is', response.data.payload);
            if (response.status === 200) {
                let imageResponse = response.data.payload.images
                setRestaurant(response.data.payload)
                let serviceAPI = response.data.payload.services
                let typeAPI = response.data.payload.type
                for (let i = 0; i < serviceAPI.length; i++) {
                    let setService = document.getElementById(`${serviceAPI[i]}`)
                    serviceArray.push(serviceAPI[i])
                    setService.checked = true
                }
                for (let j = 0; j < typeAPI.length; j++) {
                    let setType = document.getElementById(`${typeAPI[j]}`)
                    typeArray.push(typeAPI[j])
                    setType.checked = true
                }
                setGalleryImages(imageResponse)

            }
        }
        if (id !== 'create' && router.isReady) getRestaurant()

    }, [id, router.isReady])

    return (
        <div className={styles['dis-f']}>
            <Header />
            <div className={styles['box-component']} >
                <div className="container" >
                    <div className={styles['edit-box']}>
                        <h4 className={styles['center-item']}  >{id === "create" ? 'เพิ่มข้อมูลร้านอาหาร' : 'แก้ไขข้อมูลร้านอาหาร'}</h4>
                        <div className={styles['input-box']} >
                            <div className={styles['first-input']} >
                                <span>ชื่อร้านอาหาร</span>
                                <input type="text" value={restaurant ? restaurant.name : ''} onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ประเภทอาหาร</span>
                                <div className={styles['select-box']} >
                                    {food_type.map((type) => (
                                        <label key={type} className={styles['add-checkbox']} onChange={(e) => setType(e)} >
                                            <input type="checkbox" id={type} value={type} />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={styles['first-input']} >
                                <span>ที่อยู่</span>
                                <input type="text" value={restaurant ? restaurant.location : ''} onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })} ></input>
                            </div>
                            <div className={styles['first-input']} >
                                <span>เมนูแนะนำ</span>
                                <input type="text" value={restaurant ? restaurant.recommend_menu : ''} onChange={(e) => setRestaurant({ ...restaurant, recommend_menu: e.target.value })} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ราคาอาหาร</span>
                                <InputMask mask="9999" maskChar={null} value={restaurant ? restaurant.food_min_price : ''} onChange={(e) => priceControl(e, "food_min_price")} />
                                -
                                <InputMask mask="99999" maskChar={null} value={restaurant ? restaurant.food_max_price : ''} onChange={(e) => priceControl(e, "food_max_price")} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ราคาเครื่องดื่ม</span>
                                <InputMask mask="9999" maskChar={null} value={restaurant ? restaurant.drink_min_price : ''} onChange={(e) => priceControl(e, "drink_min_price")} />
                                -
                                <InputMask mask="99999" id="drinkMaxPrice" maskChar={null} value={restaurant ? restaurant.drink_max_price : ''} onChange={(e) => priceControl(e, "drink_max_price")} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>เวลาเปิด-ปิดร้าน</span>
                                <input type="time" value={restaurant ? restaurant.open_time : ''} onChange={(e) => { e.preventDefault(), setRestaurant({ ...restaurant, open_time: e.target.value }) }} />
                                {"-"}
                                <input type="time" value={restaurant ? restaurant.close_time : ''} onChange={(e) => { e.preventDefault(), setRestaurant({ ...restaurant, close_time: e.target.value }) }} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ชื่อเพจเฟสบุ๊ค</span>
                                <input type="text" value={restaurant ? restaurant.fb_page : ''} onChange={(e) => setRestaurant({ ...restaurant, fb_page: e.target.value })} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ลิ๊งเฟสบุ๊ค</span>
                                <input type="text" value={restaurant ? restaurant.fb_link : ''} onChange={(e) => setRestaurant({ ...restaurant, fb_link: e.target.value })} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>เบอร์ติดต่อ</span>
                                <InputMask mask="999-999-9999" maskChar={null} value={restaurant ? restaurant.tel : ''} onChange={(e) => setRestaurant({ ...restaurant, tel: e.target.value })} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>LINE</span>
                                <input type="text" value={restaurant ? restaurant.line : ''} onChange={(e) => setRestaurant({ ...restaurant, line: e.target.value })} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>บริการของร้าน</span>
                                <div className={styles['select-box']} >
                                    {service_options.map((service) => (
                                        <label key={service} className={styles['add-checkbox']} onChange={(e) => setService(e)} >
                                            <input type="checkbox" id={service} value={service} />
                                            <span>{service}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {restaurant && restaurant.images ? (
                                <div className={styles['photo-box']}  >
                                    {restaurant.images.map((image, index) => (
                                        <div key={index} className={styles['photo-item']} >
                                            <div className={styles['img-button-box']} >
                                                <img src={`${image}`} alt="" width={200} height={250} />
                                                <button className={styles['delete-button']} onClick={() => deleteImg(index)}>ลบ</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                                : ''}
                            <div className={styles['first-input']} >
                                <span>รูปภาพ</span>
                                <input type="file" multiple={true} accept="image/png, image/jpeg, image/jpg ,image/webp" onChange={(e) => uploadImage(e)} name="" id="" />
                            </div>
                            <div className={styles['button-group']} >
                                <Button onClick={id === 'create' ? createRestaurant : editRestaurant} className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                                <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
