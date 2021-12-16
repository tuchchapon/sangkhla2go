import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from '../Header'
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
        console.log('create review');
        console.log(review)
        try {
            axios.post('http://localhost:8080/create/review',review)
            .then((res)=>{
                console.log(res)
                if (res.status === 201) {
                    Swal.fire({
                        title:'บันทึก',
                        text:'เพิ่มข้อมูลสำเร็จแล้ว',
                        icon :'success'
                    }).then((result=>{
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_reviews')
                        }
                    }))
                }
            })
        } catch (error) {
            Swal.fire(
                'เกิดข้อผิดพลาด',
                `${error}`,
                'error'
            )
        }

        
     }
     const editReview = ()=>{
        console.log('edit review');
        console.log(id)
        console.log(review)
        try {
            axios.post('http://localhost:8080/edit/review',review)
            .then((res)=>{
                if (res.data.status === 200) {
                    Swal.fire({
                        title:'บันทึก',
                        text:'แก้ไขข้อมูลสำเร็จแล้ว',
                        icon :'success'
                    }).then((result=>{
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_reviews')
                        }
                    }))
                }
            })

        } catch (error) {
            console.log('err is',error)
        }
     }

     useEffect(() => {
         const getReview =async()=>{
             const response = await axios.post(`http://localhost:8080/get/review/:${id}`,{id:id})
             console.log('response is ', response.data.payload)
             setReview(response.data.payload)
         }
        if(id !== 'create' && router.isReady) getReview()
     }, [id,router.isReady])
    return (
        <div className={styles['dis-f']} >
            <Header/>
            <div className={styles['box-component']} >
            <div className="container">
                <div className={styles['edit-box']} >
                    <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลรีวิว' :'แก้ไขข้อมูลรีวิว'}</h4>  
                    <div className={styles['input-box']} >
                        <div className={styles['first-input']} >
                            <span>ชื่อรีวิว</span>
                            <input type="text" value={review ? review.review_name:''} onChange={(e)=>setReview({...review,review_name:e.target.value})} />
                        </div>
                        <div className={styles['first-input']} >
                            <span>ลิ้งค์รีวิว</span>
                            <input type="text" value={review ? review.review_link:''} onChange={(e)=>setReview({...review,review_link:e.target.value})} />
                        </div>
                        <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createReview : editReview } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>  
                </div>
            </div>   
            </div>
        </div>
    )
}
export default review
