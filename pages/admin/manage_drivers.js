import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Header from './Header';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
export default function manage_drivers() {
    const router = useRouter()
    const [drivers, setDrivers] = useState([])
    const editDriver =(driver)=>{
        console.log('one driver is',driver)
        console.log(driver.id)
        /router.push(`/admin/driver/${driver.id}`)
    }
    const deleteDriver =(driver)=>{
        console.log('deleteDriver',driver);
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${driver.driver_name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete('http://localhost:8080/delete/driver',{data:driver})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${driver.driver_name}แล้ว`,
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
        const getDrivers=async()=>{
            let response = await axios.get('http://localhost:8080/get/driver')
            console.log(response);
            setDrivers(response.data.payload)
        }
        getDrivers()
    }, [])
    return (
            <div className={styles['dis-f']}>
                <Header/>
                <div className={styles['box-component']}>
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']}>
                                    <p>วินมอเตอร์ไซต์</p>
                                    <Button onClick={(e)=>router.push('/admin/driver/create')} color="success" variant="contained"  >เพิ่มวินมอเตอร์ไซค์</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {drivers.length === 0 ?'':drivers.map((driver)=>(
                                    <div className={styles['box-item']} key={driver.id}> 
                                        <span>{driver.driver_name}</span>
                                        <span>{driver.contact}</span>
                                    <div>
                                    <IconButton  onClick={((e)=>editDriver(driver))} >
                                        <ModeEditIcon/>
                                    </IconButton>
                                    <IconButton  onClick={((e)=>deleteDriver(driver))} >
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
    )
}
