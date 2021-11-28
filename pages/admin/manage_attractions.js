import React from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'

export default function manage_attraction() {
    const router = useRouter()
    const editAttraction =(attraction)=>{
        console.log('edit');
        console.log(attraction.attraction);
        router.push(`/admin/attraction/${attraction.attraction}`)
    }
    const deleteAttraction =(attraction)=>{
        console.log('delete');
        console.log(attraction.attraction);
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
                                    <p>สถานที่ท่องเที่ยว</p>
                                    <Button color="success" variant="contained" onClick={(e)=>router.push('/admin/attraction/create')} >เพิ่มสถานที่ท่องเที่ยว</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {[1,2,3,4,5].map((attraction)=>(
                                       <div key={attraction} className={styles['box-item']} >
                                           <span>ชื่อ</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editAttraction({attraction}))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteAttraction({attraction}))} >
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

