import React from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
export default function boats_manage() {
    const router = useRouter()
    const editBoat =(boat)=>{
        console.log('edit')
        console.log(boat.boat)
        router.push(`/admin/boat/${boat.boat}`)
    }
    const deleteBoat =(boat)=>{
        console.log('delete')
        console.log(boat.boat)
    }
    return (
        <div>
            <div className={styles['dis-f']}>
                <Header />
                <div className={styles['box-component']} >
                    <div className={styles['data-container']} >
                        <div className="containers">
                            <div className="col-12">
                                <div className={styles['add-button']}>
                                    <p>เรือนำเที่ยว</p>
                                    <Button variant="contained" color="success" onClick={(e)=>router.push('/admin/boat/create')} >เพิ่มเรือนำเที่ยว</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {[1,2,3,4,5].map((boat)=>(
                                        <div key={boat} className={styles['box-item']} >
                                            <span>{boat}</span>
                                        <div>
                                        <IconButton  onClick={((e)=>editBoat({boat}))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteBoat({boat}))} >
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
