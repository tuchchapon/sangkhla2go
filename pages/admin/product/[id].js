import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import styles from '../../../styles/admin/create_edit.module.scss'
import Header from '../Header'

export default function product() {
    const router = useRouter()
    const id = router.query.id || []
    const [product, setProduct] = useState({
        id:'',
        product_name:'',
        product_detail:'',
        product_image :[],
        fb_page :'',
        tel:'',
        link :''
    })
    const createProduct=()=>{
        console.log('create');
        console.log(product)
        Swal.fire({
            title:'บันทึก',
            text:'เพิ่มข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_products')
            }
        }))
    }
    const editProduct=()=>{
        console.log('edit');
        console.log(product)
        Swal.fire({
            title:'บันทึก',
            text:'แก้ไขข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_products')
            }
        }))
    }
    useEffect(() => {
        console.log(id);
    }, [id,router.isReady])
    return (
        <div className={styles['dis-f']} >
            <Header/>
            <div className={styles['box-component']} >
            <div className="container">
            <div className={styles['edit-box']}>
                <h4 className={styles['center-item']} >{id === "create" ? 'เพิ่มข้อมูลผลิตภัณฑ์':'แก้ไขข้อมูลผลิตภัณฑ์'}</h4>
                <div className={styles['input-box']}>
                    <div className={styles['first-input']} >
                        <span>ชื่อผลิตภัณฑ์</span>
                        <input type="text" onChange={(e)=>setProduct({...product,product_name:e.target.value})} />    
                    </div>
                    <div className={styles['first-input']} >
                        <span>รายละเอียด<br/>ผลิตภัณฑ์</span>
                        <textarea name="" id="" cols="30" rows="10" onChange={(e)=>setProduct({...product,product_detail:e.target.value})} ></textarea>
                    </div>
                    <div className={styles['first-input']} >
                        <span>เพจเฟสบุ๊ค</span>
                        <input type="text" onChange={(e)=>setProduct({...product,fb_page:e.target.value})} />
                    </div>
                    <div className={styles['first-input']} >
                        <span>เบอร์ติดต่อ</span>
                        <InputMask mask="999 999 9999" maskChar={null} onChange={(e)=>setProduct({...product,tel:e.target.value})} />
                    </div>
                    <div className={styles['first-input']} >
                        <span>ลิ้งค์ข้อมูลเพิ่ม</span>
                        <input type="text" onChange={(e)=>setProduct({...product,link:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>รูปภาพ</span>
                        <input type="file" name="" id="" />
                    </div>
                    <div className={styles['button-group']}>
                         <Button onClick={id === 'create' ? createProduct : editProduct } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                         <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained" >ย้อนกลับ</Button>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
    )
}
