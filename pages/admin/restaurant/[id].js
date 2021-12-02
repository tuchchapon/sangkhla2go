import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';
import Header from '../Header'


export default function Restaurant() {
    const router = useRouter()
    const id = router.query.id || []
    const food_type = ["อาหารไทย","อาหารท้องถื่น","อาหารต่างชาติ","อาหารตามสั่ง","ข้าวต้ม","ประเภทเส้น","บุฟเฟต์","เครื่องดื่ม","ขนม/เบเกอรี่",]
    const service_options = ["บริการส่ง","ห้องแอร์","คาราโอเกะ","แอลกอฮอล์","เค้ก"]
    const [typeArray, setTypeArray] = useState([])
    const [serviceArray, setServiceArray] = useState([])
    const [restaurant, setRestaurant] = useState({
        id:'',
        restaurant_name :'',
        restaurant_type:[],
        location:'',
        recommend_menu:'',
        food_lowest_price:'',
        food_highest_price:'',
        drink_lowest_price:'',
        drink_highest_price:'',
        open_time:0,
        close_time:0,
        service:[]
    })
    const setType=(e)=>{
        console.log(e.target.value)
        if (e.target.checked) {
           typeArray.push(e.target.value)
        }
        else {
            const removeType = typeArray.indexOf(e.target.value)
            if (removeType > -1) {
                console.log('remove')
                typeArray.splice(removeType,1)
            }
        }
        setRestaurant({...restaurant,restaurant_type:typeArray})
    }
    const setService =(e)=>{
        console.log(e.target.value)
       
        if (e.target.checked) {
            serviceArray.push(e.target.value)
        }
        else{
            const removeService = serviceArray.indexOf(e.target.value)
            if (removeService > -1) {
                console.log('remove')
                serviceArray.splice(removeService,1)
            }
        }
        setRestaurant({...restaurant,service:serviceArray})
    }

    const createRestaurant =()=>{
        console.log('create restaurant')
        console.log('open time',restaurant.open_time)
        console.log('close time is',restaurant.close_time)
        if (restaurant.open_time > restaurant.close_time) {
            console.log('time is wrong')
            setRestaurant({...restaurant,open_time:restaurant.close_time})
        }
        else {
            console.log(`${restaurant.open_time}-${restaurant.close_time}`)
        }
        console.log('restaurant is',restaurant)
        Swal.fire({
            title:'บันทึก',
            text:'เพิ่มข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_restaurants')
            }
        }))
    }
    const editRestaurant =()=>{
        console.log('edit restaurant')
        console.log(restaurant)
        Swal.fire({
            title:'บันทึก',
            text:'แก้ไขข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_restaurants')
            }
        }))
    }
    useEffect(() => {

    }, [id,router.isReady])

    return (
        <div className={styles['dis-f']}>
            <Header/>
            <div className={styles['box-component']} >
                <div className="container" >
                    <div className={styles['edit-box']}>
                    <h4 className={styles['center-item']}  >{id === "create" ? 'เพิ่มข้อมูลร้านอาหาร' :'แก้ไขข้อมูลร้านอาหาร'}</h4>
                        <div className={styles['input-box']} >
                            <div className={styles['first-input']} >
                                <span>ชื่อร้านอาหาร</span>
                                <input type="text" value={restaurant ? restaurant.restaurant_name:''} onChange={(e)=>setRestaurant({...restaurant,restaurant_name:e.target.value})} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ประเภทอาหาร</span>
                                <div className={styles['select-box']  } >
                                    {food_type.map((type)=>(
                                        <label key={type} className={styles['add-checkbox']} onChange={(e)=>setType(e)} >
                                            <input type="checkbox"  value={type}  />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={styles['first-input']} >
                                <span>ที่อยู่</span>
                                <textarea name="" id="" cols="30" rows="3" value={restaurant ? restaurant.location:''} onChange={(e)=>setRestaurant({...restaurant,location:e.target.value})} ></textarea>
                            </div>
                            <div className={styles['first-input']} >
                                <span>เมนูแนะนำ</span>
                                <input type="text" value={restaurant ? restaurant.recommend_menu:''} onChange={(e)=>setRestaurant({...restaurant,recommend_menu:e.target.value})} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ราคาอาหาร</span>
                                <InputMask mask="9999" maskChar={null} value={restaurant ? restaurant.food_lowest_price:''} onChange={(e)=>setRestaurant({...restaurant,food_lowest_price:e.target.value})} />
                                -
                                <InputMask mask="99999" maskChar={null} value={restaurant ? restaurant.food_highest_price:''} onChange={(e)=>setRestaurant({...restaurant,food_highest_price:e.target.value})} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ราคาเครื่องดื่ม</span>
                                <InputMask mask="9999" maskChar={null} value={restaurant ? restaurant.drink_lowest_price:''} onChange={(e)=>setRestaurant({...restaurant,drink_lowest_price:e.target.value})} />
                                -
                                <InputMask mask="99999" maskChar={null} value={restaurant ? restaurant.drink_highest_price:''} onChange={(e)=>setRestaurant({...restaurant,drink_highest_price:e.target.value})} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>เวลาเปิด-ปิดร้าน</span>
                                <input type="time" onChange={(e)=>setRestaurant({...restaurant,open_time:e.target.value})} />
                                -
                                <input type="time" onChange={(e)=>setRestaurant({...restaurant,close_time:e.target.value})} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>บริการ</span>
                                <div className={styles['select-box']} >
                                    {service_options.map((service)=>(
                                        <label key={service} className={styles['add-checkbox']} onChange={(e)=>setService(e)} >
                                            <input type="checkbox"  value={service}  />
                                            <span>{service}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createRestaurant : editRestaurant } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
