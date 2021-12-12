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
    
    const [natureAttraction, setNatureAttraction] = useState([])
    const [traditionAttraction, seTtraditionAttraction] = useState([])
    const [agriAttraction, setAgriAttraction] = useState([])

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
                setNatureAttraction(response.data.payload.nature_attraction)
                seTtraditionAttraction(response.data.payload.tradition_attraction)
                setAgriAttraction(response.data.payload.agri_attraction)
                // setAttractions(response.data.payload)
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
                                    <p>สถานที่ท่องเที่ยวธรรมชาติ</p>
                                    { natureAttraction.length > 0 ? natureAttraction.map((nature)=>(
                                       <div key={nature.id} className={styles['box-item']} >
                                           <span>{nature.name}</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editAttraction(nature))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteAttraction(nature))} >
                                            <DeleteIcon/>
                                        </IconButton>
                                        </div>
                                       </div> 

                                    )):''}
                                </Paper>
                                {traditionAttraction.length > 0 ? 
                             <Paper sx={{p:2,display:'flex',flexDirection:'column',marginTop:'20px'}} >
                                 <p>สถานที่ท่องเที่ยววัฒนธรรม</p>
                                {traditionAttraction.length > 0 ?  traditionAttraction.map((tradition)=>(
                                    <div className={styles['box-item']} key={tradition.id} >
                                        <span>{tradition.name}</span>
                                        
                                        <div>
                                    <IconButton  onClick={((e)=>editAttraction(tradition))} >
                                        <ModeEditIcon/>
                                    </IconButton>
                                    <IconButton  onClick={((e)=>deleteAttraction(tradition))} >
                                        <DeleteIcon/>
                                    </IconButton>
                                    </div> 
                                    </div>

                                )):''}
                            </Paper>:''}
                            {agriAttraction.length > 0 ? 
                             <Paper sx={{p:2,display:'flex',flexDirection:'column',marginTop:'20px'}} >
                                 <p>สถานที่ท่องเที่ยวเกษตรกรรมและชุมชน</p>
                                {agriAttraction.length > 0 ?  agriAttraction.map((agri)=>(
                                    <div className={styles['box-item']} key={agri.id} >
                                        <span>{agri.name}</span>
                                        
                                        <div>
                                    <IconButton  onClick={((e)=>editAttraction(agri))} >
                                        <ModeEditIcon/>
                                    </IconButton>
                                    <IconButton  onClick={((e)=>deleteAttraction(agri))} >
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
        </div>
    )
}

