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
export default function manage_restaurants() {
    const router = useRouter()
    const [restaurants, setRestaurants] = useState([])
    const editRestaurant =(restaurant)=>{
        console.log('edit')
        console.log(restaurant.id)
        router.push(`/admin/restaurant/${restaurant.id}`)
    }
    const deleteRestaurant =(restaurant)=>{
        console.log('delete')
        console.log(restaurant.id)
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${restaurant.name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete('http://localhost:8080/delete/restaurant',{data:restaurant})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${restaurant.name}แล้ว`,
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
        const getRestaurant = async()=>{
            let response = await axios.get('http://localhost:8080/get/restaurant')
            console.log(response.data.payload);
            setRestaurants(response.data.payload)
        }
        getRestaurant()
    }, [])
    return (
            <div className={styles['dis-f']} >
                <Header/>
                <div className={styles['box-component']} >
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']}>
                                    <p>ร้านอาหาร</p>
                                    <Button color="success" variant="contained" onClick={(e)=>router.push('/admin/restaurant/create')}  >เพิ่มร้านอาหาร</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {restaurants ?  restaurants.map((restaurant)=>(
                                       <div key={restaurant.id} className={styles['box-item']} >
                                           <span>{restaurant.name}</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editRestaurant(restaurant))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteRestaurant(restaurant))} >
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
