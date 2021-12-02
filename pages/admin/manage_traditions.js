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
    const [traditions, setTraditions] = useState([])
    const editTradition=(tradition)=>{
        console.log('edit')
        console.log(tradition.tradition)
        router.push(`/admin/tradition/${tradition.id}`)
    }
    const deleteTradition=(tradition)=>{
        console.log('delete')
        console.log(tradition.tradition)
    }
    useEffect(() => {
        const getTradition = async()=>{
            let response = await axios.get('http://localhost:8080/get/traditions')
            console.log(response.data.payload)
            setTraditions(response.data.payload)
            
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
                                {traditions.length !== 0 ?  traditions.map((tradition)=>(
                                    <div className={styles['box-item']} key={tradition} >
                                        <span>{tradition}</span>
                                        
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
