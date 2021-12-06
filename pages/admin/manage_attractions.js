import {React,useState,useEffect} from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
import axios from 'axios';

export default function manage_attraction() {
    const router = useRouter()
    const [attractions, setAttractions] = useState([])

    const editAttraction =(attraction)=>{
        console.log('edit');
        console.log(attraction.id);
        router.push(`/admin/attraction/${attraction.id}`)
    }
    const deleteAttraction =(attraction)=>{
        console.log('delete');
        console.log(attraction.id);
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${attraction.name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete('http://localhost:8080/delete/attraction',{data:attraction})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${attraction.name}แล้ว`,
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
        const getAttractions =async()=>{
            let response = await axios.get('http://localhost:8080/get/attractions')
            console.log(response.data)
            if (response.status === 200) {
                setAttractions(response.data.payload)
            }
        }
        getAttractions()
    }, [])
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
                                    { attractions.length > 0 ? attractions.map((attraction)=>(
                                       <div key={attraction.id} className={styles['box-item']} >
                                           <span>{attraction.name}</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editAttraction(attraction))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteAttraction(attraction))} >
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

