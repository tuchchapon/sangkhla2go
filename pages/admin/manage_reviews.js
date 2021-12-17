import {React,useState,useEffect} from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
import axios from 'axios';
export default function manage_reviews() {

    const [reviews, setReviews] = useState([])
    const router = useRouter()
    const editReview =(review)=>{
        console.log('edit');
        console.log(review);
        router.push(`/admin/review/${review.id}`)
    }
    const deleteReview =(review)=>{
        console.log('delete');
        console.log(review);
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล ${review.review_name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if (result.isConfirmed) {
                try {
                    let response  =await axios.delete(`${process.env.SERVER_API}/delete/review`,{data:review})
                    if (response.data.status === 200) {
                        Swal.fire({
                            title:'ลบข้อมูลเรียบร้อยแล้ว',
                            text:`ลบข้อมูล ${review.review_name} แล้ว`,
                            icon:'success'
                        }).then((result)=>{
                            if (result.isConfirmed) {
                                router.reload()
                            }
                        })
                    }
                } catch (error) {
                    
                }
            }
        })

    }
    useEffect(() => {
        const getReview = async()=>{
            let response = await axios.get(`${process.env.SERVER_API}/get/reviews`)
            console.log(response)
            setReviews(response.data.payload)
        }
        getReview()
    }, [])
    return (
        <div>
            <div className={styles['dis-f']} >
                <Header/>
                <div className={styles['box-component']} >
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']}>
                                    <p>รีวิว</p>
                                    <Button color="success" variant="contained" onClick={(e)=>router.push('/admin/review/create')}  >เพิ่มรีวิว</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {reviews.length !== 0 ? reviews.map((review)=>(
                                       <div key={review.id} className={styles['box-item']} >
                                           <span>{review.review_name}</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editReview(review))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteReview(review))} >
                                            <DeleteIcon/>
                                        </IconButton>
                                        </div>
                                       </div> 

                                    )):''}
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
