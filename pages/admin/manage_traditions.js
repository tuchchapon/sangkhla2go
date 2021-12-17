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

export default function manage_traditions() {
    const router = useRouter()
    const [karenTradition, setKarenTradition] = useState([])
    const [monTradition, setMonTradition] = useState([])
    const editTradition=(tradition)=>{
        console.log('edit')
        console.log(tradition.tradition)
        router.push(`/admin/tradition/${tradition.id}`)
    }
    const deleteTradition=(tradition)=>{
        console.log('delete')
        console.log(tradition.id)
        
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${tradition.name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete(`${process.env.SERVER_API}/delete/tradition`,{data:tradition})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${tradition.name}แล้ว`,
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
        const getTradition = async()=>{
            console.log('get traditions')
            let response = await axios.get(`${process.env.SERVER_API}/get/traditions`)
            console.log(response.data.payload)
            if (response.status === 200) {
                let res = response.data.payload
                setKarenTradition(res.karen_tradition)
                setMonTradition(res.mon_tradition)
            }
            
        }
        getTradition()
    }, [])
    return (
        <div className={styles['dis-f']}>
            <Header/>
            <div className={styles['box-component']} >
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']} >
                                    <p>ประเพณี</p>
                                    <Button variant="contained" color="success" onClick={(e)=>router.push('/admin/tradition/create')}>เพิ่มประเพณี</Button>
                            </div>
                            <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                <p>ประเพณีชาวกระเหรี่ยง</p>
                                {karenTradition.length > 0 ?  karenTradition.map((tradition)=>(
                                    <div className={styles['box-item']} key={tradition.id} >
                                        <span>{tradition.name}</span>
                                        
                                        <div>
                                    <IconButton  onClick={((e)=>editTradition(tradition))} >
                                        <ModeEditIcon/>
                                    </IconButton>
                                    <IconButton  onClick={((e)=>deleteTradition(tradition))} >
                                        <DeleteIcon/>
                                    </IconButton>
                                    </div> 

                                    </div>

                                )):''}
                            </Paper>
                            {monTradition.length > 0 ? 
                             <Paper sx={{p:2,display:'flex',flexDirection:'column',marginTop:'20px'}} >
                                 <p>ประเพณีชาวมอญ</p>
                                {monTradition.length > 0 ?  monTradition.map((tradition)=>(
                                    <div className={styles['box-item']} key={tradition.id} >
                                        <span>{tradition.name}</span>
                                        
                                        <div>
                                    <IconButton  onClick={((e)=>editTradition(tradition))} >
                                        <ModeEditIcon/>
                                    </IconButton>
                                    <IconButton  onClick={((e)=>deleteTradition(tradition))} >
                                        <DeleteIcon/>
                                    </IconButton>
                                    </div> 
                                    </div>

                                )):''}
                            </Paper>:''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
