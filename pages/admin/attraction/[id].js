import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

export default function attraction() {
    const router = useRouter()
    const id = router.query.id || []
    let attraction_type = ['ธรรมชาติ','วัฒนธรรม','เกษตรกรรมและชุมชน']
    const createAttraction=()=>{
        console.log('create');
    }
    const editAttraction =()=>{
        console.log('edit');
    }
    useEffect(() => {
        
    }, [id,router.isReady])
    return (
        <div>
            <div className="container">
                <div className={styles['edit-box']} >
                    <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลสถานที่ท่องเที่ยว' :'แก้ไขข้อมูลสถานที่ท่องเที่ยว'}</h4>  
                    <div className={styles['input-box']} >
                        <div className={styles['first-input']} >
                            <span>ประเภท</span>
                            <select name="" id="">
                                {attraction_type.map((attraction)=>(
                                    <option value="" key={attraction} value={attraction} >{attraction} </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles['first-input']} >
                            <span>ชื่อสถานที่</span>
                            <input type="text"  />
                        </div>
                        <div className={styles['first-input']} >
                            <span>รายละเอียด</span>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className={styles['first-input']} >
                            <span>รูปสถานที่</span>
                            <input type="file" name="" id="" />
                        </div>
                        <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createAttraction : editAttraction } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>  
                </div>
            </div>   
        </div>
    )
}
