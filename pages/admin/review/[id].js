import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
 function review() {
     const router = useRouter()
     const id = router.query.id || []
     const [review, setReview] = useState({
         id:'',
         review_name:'',
         review_link:''
     })
     const createReview = ()=>{
        console.log('create');
     }
     const editReview = ()=>{
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
                            <span>ชื่อรีวิว</span>
                            <input type="text"  />
                        </div>
                        <div className={styles['first-input']} >
                            <span>ลิ้งค์รีวิว</span>
                            <input type="text" />
                        </div>
                        <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createReview : editReview } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>  
                </div>
            </div>   
        </div>
    )
}
export default review
