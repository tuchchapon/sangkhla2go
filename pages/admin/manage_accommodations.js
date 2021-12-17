import {React,useState,useEffect} from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
import axios from 'axios';
import Swal from 'sweetalert2'
export default function manage_accommodation() {

    const router = useRouter()
    const [accommodations, setAccommodations] = useState([])
    const editAccommodation =(accommodation)=>{
        console.log('edit');
        console.log(accommodation.accommodation);
        router.push(`/admin/accommodation/${accommodation.id}`)
    }
    const deleteAcommodation = (accommodation)=>{
        console.log('delete');
        console.log(accommodation.id);
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${accommodation.name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete(`${process.env.SERVER_API}/delete/accommodation`,{data:accommodation})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${accommodation.name}แล้ว`,
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
        const getAccomodation = async()=>{
            let response = await axios.get(`${process.env.SERVER_API}/get/accommodation`)
            console.log(response.data.payload);
            setAccommodations(response.data.payload)
        }
        getAccomodation()
    }, [])
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
                                    {accommodations.length >0 ? accommodations.map((accommodation)=>(
                                        <div key={accommodation.id} className={styles['box-item']} >
                                            <span>{accommodation.name}</span>
                                            <div>
                                        <IconButton  onClick={((e)=>editAccommodation(accommodation))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteAcommodation(accommodation))} >
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
