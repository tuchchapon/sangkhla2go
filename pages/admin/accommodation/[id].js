import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';
export default function officer() {
    const router = useRouter()
    const id = router.query.id || []
    const accommodation_type = ["โรงแรม","โฮมสเตย์","รีสอร์ท","เกสต์เฮ้าส์","เรือนรับรอง","โฮสเทล","แพพัก"]
    const service_options =["ลานจอดรถ","สระว่ายน้ำ",'WI-FI',"ห้องน้ำส่วนตัว","ร้านอาหาร","ห้องประชุม","เช่ารายเดือน","ลานกลางเต็นท์","บริการลากแพ","คาราโอเกะ"]
    const createAccommodation=()=>{
        console.log('create');

    }
    const editAccommodation = ()=>{
        console.log('edit');
    }
    useEffect(() => {

    }, [id,router.isReady])
    return (
        <div>
            <div className="container">
                <div className={styles['edit-box']} >
                    <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลรีวิว' :'แก้ไขข้อมูลรีวิว'}</h4>  
                    <div className={styles['input-box']} >
                        <div className={styles['first-input']} >
                            <span>ประเภทที่พัก</span>
                             <select name="" id="">
                                {accommodation_type.map((type)=>(
                                <option value="" key={type} >{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles['first-input']} >
                            <span>ชื่อที่พัก</span>
                            <input type="text" />
                        </div>
                        <div className={styles['first-input']} >
                            <span>รายละเอียด</span>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className={styles['first-input']} >
                            <span>เพจเฟสบุ๊ค</span>
                            <input type="text" />
                        </div>
                        <div className={styles['first-input']} >
                            <span>เบอร์ติดต่อ</span>
                            <InputMask mask="999 999 9999" maskChar={null}   />
                        </div>
                        <div className={styles['first-input']}>
                            <span>บริการ: </span>
                        <div className={styles['select-box']} >
                            {service_options.map((service)=>(
                            <label key={service} className={styles['add-checkbox']} >
                            <input type="checkbox" name="" value={service}   />
                            <span>{service}</span>
                            </label>
                            ))}
                        </div>
                       </div>
                        <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createAccommodation : editAccommodation } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>  
                </div>
            </div>   
        </div>
    )
}
