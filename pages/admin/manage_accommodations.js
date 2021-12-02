import React from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
export default function manage_accommodation() {

    const router = useRouter()
    const editAccommodation =(accommodation)=>{
        console.log('edit');
        console.log(accommodation.accommodation);
        router.push(`/admin/accommodation/${accommodation.accommodation}`)
    }
    const deleteAcommodation = (accommodation)=>{
        console.log('delete');
        console.log(accommodation.accommodation);
    }
    return (
        <div>
            <div className={styles['dis-f']} >
                <Header/>
                <div className={styles['box-component']} >
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']} >
                                <p>ที่พัก/แพพัก</p>
                                <Button variant="contained" color="success" onClick={(e)=>router.push('/admin/accommodation/create')} >เพิ่มที่พัก</Button>
                            </div>
                            <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {[1,2,3,4,5,6].map((accommodation)=>(
                                        <div key={accommodation} className={styles['box-item']} >
                                            <span>{accommodation}</span>
                                            <div>
                                        <IconButton  onClick={((e)=>editAccommodation({accommodation}))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteAcommodation({accommodation}))} >
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
