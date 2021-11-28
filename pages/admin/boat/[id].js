import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';



export default function boat() {
    const router = useRouter()
    const id = router.query.id || []
    const [boat, setBoat] = useState('')
    let boat_club =["-","ท่าเรือสะพานฝั่งไม้ไทย","สะพานไม้ฝั่งไทย","ท่าวัด"]
    const createBoat =()=>{
        console.log('create boat');
    }
    const editBoat =()=>{
        console.log('edit boat');
    }
    useEffect(() => {
        
    }, [id,router.isReady])
    return (
        <div>
            <div className="containert">
                <div className={styles['edit-box']} >
                    <h4 className={styles['cente-item']}>{id === "create" ? 'เพิ่มข้อมูลเรือนำเที่ยว'  :'แก้ไขข้อมูลเรือนำเที่ยว'}</h4>
                    <div className={styles['input-box']} >
                    <div className={styles['first-input']}>
                        <span>ชื่อชมรม</span>
                        <select name="" id="">
                            {boat_club.map((club)=>(
                                <option value="" key={club} >{club}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles['first-input']} >
                        <span>ชื่อเรือนำเที่ยว</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>ชื่อเจ้าของเรือ</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>ชื่อคนขับเรือ</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>จำนวนเรือ</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>จำนวนผู้โดยสารสูงสุด</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>เบอร์ติดต่อ</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>รูปเจ้าของเรือ</span>
                        <input type="file" name="" id="" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>รูปเรือนำเที่ยว</span>
                        <input type="file" name="" id="" />
                    </div>
                    <div className={styles['button-group']}>
                        <Button onClick={id === 'create' ? createBoat : editBoat } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
