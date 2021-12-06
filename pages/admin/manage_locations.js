import {React, useState,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from './Header'
import link from 'next/link'
import { useRouter, } from 'next/router'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from '../../styles/admin/admin.module.scss'

export default function driverlocation() {

    const router = useRouter()
    // const [driverlocation, setDriverlocation] = useState({
    //     location_name:'',location_detail:''
    // })
    const [selectedLocation, setSelectedLocation] = useState([])
    const [driverLocation, setDriverLocation] = useState([])
    const submitLocation = async ()=>{
        console.log(driverlocation);
       await axios.post('http://localhost:8080/create/driverLocation',driverlocation).then((res)=>{
            console.log(res);
        })
    }
    const editDriverLocation =({location})=>{
        
        console.log('location is',location.id);
        router.push(`/admin/location/${location.id}`)

    }
    const deleteDriverLocation =  ({location})=>{
        console.log('location id is',location.id);
        if(location)
         Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${location.location_name} หรือไม่
            <br/>การลบข้อมูลสถานที่ตั้งวินจะทำให้วินที่อยู่ในจุดนั้นไม่แสดงผลด้วย`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete('http://localhost:8080/delete/driver-location',{data:location})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${location.location_name}แล้ว`,
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
        const getDriverlocation = async()=>{
            let response = await axios.get('http://localhost:8080/get/driverLocation')
            console.log(response);
            setDriverLocation(response.data.payload)
        }
        getDriverlocation()
    }, [])
    return (
        <div >
            <div className={styles['dis-f']}>
            <Header/>
            <div className={styles['box-component']}>
                <div className={styles['data-container']} >
                    <div className="container" >
                        <div className="col-12"  >
                            <div className={styles['add-button']} >
                                <p>สถานที่ตั้งวินมอเตอร์ไซต์</p>
                                <Button   onClick={(e)=>router.push('/admin/location/create')} color="success" variant="contained">เพิ่มสถานที่</Button>
                            </div>
                            <Paper  sx={{ p: 2, display: 'flex', flexDirection: 'column'  }}>
                                {driverLocation.length === 0 ? '': driverLocation.map((location)=>(
                                <div className={styles['box-item']} key={location.id}>
                                    <span  >{location.location_name}</span>
                                <div>
                                <IconButton  onClick={((e)=>editDriverLocation({location}))} >
                                    <ModeEditIcon/>
                                </IconButton>
                                <IconButton  onClick={((e)=>deleteDriverLocation({location}))} >
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
