import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';
import Header from '../Header'


export default function Restaurant() {
    const router = useRouter()
    const id = router.query.id || []
    const food_type = ["อาหารไทย","อาหารท้องถื่น","อาหารต่างชาติ","อาหารตามสั่ง","ข้าวต้ม","ประเภทเส้น","บุฟเฟต์","เครื่องดื่ม","ขนม/เบเกอรี่",]
    const service_options = ["บริการส่ง","ห้องแอร์","คาราโอเกะ","แอลกอฮอล์","เค้ก"]
    const createRestaurant =()=>{
        console.log('create restaurant')
    }
    const editRestaurant =()=>{
        console.log('edit restaurant')
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
                                <input type="text" />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ประเภทอาหาร</span>
                                <div className={styles['select-box']} >
                                    {food_type.map((type)=>(
                                        <label key={type} className={styles['add-checkbox']}>
                                            <input type="checkbox"  value={type}  />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={styles['first-input']} >
                                <span>ที่อยู่</span>
                                <textarea name="" id="" cols="30" rows="3"></textarea>
                            </div>
                            <div className={styles['first-input']} >
                                <span>เมนูแนะนำ</span>
                                <input type="text" />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ราคาอาหาร</span>
                                <input type="text" />
                                -
                                <input type="text" />
                            </div>
                            <div className={styles['first-input']} >
                                <span>ราคาเครื่องดื่ม</span>
                                <input type="text" />
                                -
                                <input type="text" />
                            </div>
                            <div className={styles['first-input']} >
                                <span>เวลาเปิด-ปิดร้าน</span>
                                <input type="time"  />
                                -
                                <input type="time"  />
                            </div>
                            <div className={styles['first-input']} >
                                <span>บริการ</span>
                                <div className={styles['select-box']} >
                                    {service_options.map((service)=>(
                                        <label key={service} className={styles['add-checkbox']} >
                                            <input type="checkbox" value={service} />
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
