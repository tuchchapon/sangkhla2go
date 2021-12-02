import {React,useState,useEffect} from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'

export default function manages_officers() {
    const router = useRouter()
    const [officers, setOfficers] = useState([])
    const editOfficer =(officer)=>{
        console.log('edit')
        console.log(officer.officer);
        router.push(`/admin/officer/${officer.id}`)
    }
    const deleteOfficer =(officer)=>{
        console.log('delete');
        console.log(officer.id);
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${officer.name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete('http://localhost:8080/delete/officer',{data:officer})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${officer.name}แล้ว`,
                        icon:'success'
                       }).then((result)=>{
                           if (result.isConfirmed) {
                               router.reload()
                           }
                       })
                    }
                } catch (error) {
                    if(error){
                        Swal.fire(
                            'เกิดข้อผิดพลาด',
                            `${error}`,
                            'error'
                        )
                    }
                }

            }
        })
    }

    useEffect(() => {
        const getOfficer = async()=>{
            let response = await axios.get('http://localhost:8080/get/officers')
            console.log(response.data.payload)
            setOfficers(response.data.payload)
        }
        getOfficer()
    }, [])
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
                                    {officers.length !== 0 ? officers.map((officer)=>(
                                        <div key={officer.id} className={styles['box-item']} >
                                            <span>{officer.name}</span>
                                            <div>
                                                <IconButton  onClick={((e)=>editOfficer(officer))} >
                                                    <ModeEditIcon/>
                                                </IconButton>
                                                <IconButton  onClick={((e)=>deleteOfficer(officer))} >
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
