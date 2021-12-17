import {React,useState,useEffect} from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
import axios from 'axios';
export default function boats_manage() {
    const router = useRouter()
    const [boats, setBoats] = useState([])
    const editBoat =(boat)=>{
        console.log('edit')
        console.log(boat.id)
        router.push(`/admin/boat/${boat.id}`)
    }
    const deleteBoat =(boat)=>{
        console.log('delete')
        console.log(boat.id)
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${boat.provider_name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete(`${process.env.SERVER_API}/delete/boat-provider`,{data:boat})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${boat.provider_name}แล้ว`,
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
        const getBoatProvider= async()=>{
            const response = await axios.get(`${process.env.SERVER_API}/get/boat-provider`)
            console.log(response.data)
            setBoats(response.data.payload)
            
        }
        getBoatProvider()

    }, [])
    return (
            <div className={styles['dis-f']}>
                <Header />
                <div className={styles['box-component']} >
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']}>
                                    <p>เรือนำเที่ยว</p>
                                    <Button variant="contained" color="success" onClick={(e)=>router.push('/admin/boat/create')} >เพิ่มเรือนำเที่ยว</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {boats.length > 0  ?  boats.map((boat)=>(
                                        <div key={boat.id} className={styles['box-item']} >
                                            <span>{boat.provider_name}</span>
                                        <div>
                                        <IconButton  onClick={((e)=>editBoat(boat))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteBoat(boat))} >
                                            <DeleteIcon/>
                                        </IconButton>
                                        </div>
                                        </div>
                                )):null}
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
