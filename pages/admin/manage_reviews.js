import React from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
export default function manage_reviews() {
    const router = useRouter()
    const editReview =(review)=>{
        console.log('edit');
        console.log(review);
        router.push(`/admin/review/${review.review}`)
    }
    const deleteReview =(review)=>{
        console.log('delete');
        console.log(review);
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล ${review.review} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        })
    }
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
                                    {[1,2,3,4,5].map((review)=>(
                                       <div key={review} className={styles['box-item']} >
                                           <span>ชื่อ</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editReview({review}))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteReview({review}))} >
                                            <DeleteIcon/>
                                        </IconButton>
                                        </div>
                                       </div> 

                                    ))}
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
