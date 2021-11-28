import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';


export default function product() {
    const router = useRouter()
    const id = router.query.id || []
    const [product, setProduct] = useState({
        id:'',
        product_name:'',
        product_type:'',
        product_image :[],
        fb_page :'',
        tel:'',
        link :''
    })
    const createProduct=()=>{
        console.log('create');
    }
    const editProduct=()=>{
        console.log('edit');
    }
    useEffect(() => {
        console.log(id);
    }, [id,router.isReady])
    return (
        <div className="container">
            <div className={styles['edit-box']}>
                <h4 className={styles['center-item']} >{id === "create" ? 'เพิ่มข้อมูลผลิตภัณฑ์':'แก้ไขข้อมูลผลิตภัณฑ์'}</h4>
                <div className={styles['input-box']}>
                    <div className={styles['first-input']} >
                        <span>ชื่อผลิตภัณฑ์</span>
                        <input type="text" />    
                    </div>
                    <div className={styles['first-input']} >
                        <span>รายละเอียด<br/>ผลิตภัณฑ์</span>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className={styles['first-input']} >
                        <span>เพจเฟสบุ๊ค</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']} >
                        <span>เบอร์ติดต่อ</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']} >
                        <span>ลิ้งค์ข้อมูลเพิ่ม</span>
                        <input type="text" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>รูปภาพ</span>
                        <input type="file" name="" id="" />
                    </div>
                    <div className={styles['button-group']}>
                        <Button onClick={id === 'create' ? createProduct : editProduct } className={styles['button-size']} color="info" variant="contained"   >บันทึกข้อมูล</Button>
                         <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
