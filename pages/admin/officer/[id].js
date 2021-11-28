import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';

export default function officer() {
    const router = useRouter()
    const id = router.query.id || []
    const createOfficer =(officer)=>{
        console.log('create');
    }
    const editOfficer =(officer)=>{
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
                            <span>ชื่อเจ้าหน้าที่</span>
                            <input type="text"  />
                        </div>
                        <div className={styles['first-input']} >
                            <span>รูปถ่าย</span>
                            <input type="file" name="" id="" />
                        </div>
                        <div className={styles['first-input']} >
                            <span>คำอธิบาย</span>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createOfficer : editOfficer } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>  
                </div>
            </div>   
        </div>
    )
}
