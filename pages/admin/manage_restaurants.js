import React from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
export default function manage_restaurants() {
    const router = useRouter()
    const editRestaurant =(restaurant)=>{
        console.log('edit')
        console.log(restaurant)
    }
    const deleteRestaurant =(restaurant)=>{
        console.log('delete')
        console.log(restaurant)
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
                                    <p>ร้านอาหาร</p>
                                    <Button color="success" variant="contained" onClick={(e)=>router.push('/admin/restaurant/create')}  >เพิ่มร้านอาหาร</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {[1,2,3,4,5].map((restaurant)=>(
                                       <div key={restaurant} className={styles['box-item']} >
                                           <span>ชื่อ</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editRestaurant({restaurant}))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteRestaurant({restaurant}))} >
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
