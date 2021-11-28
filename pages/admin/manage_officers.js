import React from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'

export default function manages_officers() {
    const router = useRouter()
    const editOfficer =(officer)=>{
        console.log('edit')
        console.log(officer.officer);
        router.push(`/admin/officer/${officer.officer}`)
    }
    const deleteOfficer =(officer)=>{
        console.log('edit');
        console.log(officer.officer);
    }
    return (
        <div>
            <div className={styles['dis-f']}>
                <Header/>
                <div className={styles['box-component']}>
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']} >
                                    <p>คณะผู้จัดทำ</p>
                                    <Button variant="contained" color="success" onClick={(e)=>router.push('/admin/officer/create')} >เพิ่มผู้จัดทำ</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {[1,2,3,4,5].map((officer)=>(
                                        <div key={officer} className={styles['box-item']} >
                                            <span>{officer}</span>
                                            <div>
                                                <IconButton  onClick={((e)=>editOfficer({officer}))} >
                                                    <ModeEditIcon/>
                                                </IconButton>
                                                <IconButton  onClick={((e)=>deleteOfficer({officer}))} >
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
