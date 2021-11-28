import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';


function location() {
    const router = useRouter()
    const id = router.query.id || []
    const [location, setLocation] = useState({
        id :'',
        location_name :'',
        location_detail:''
    })
    const createLocation =()=>{
        console.log('create location');
        axios.post('http://localhost:8080/create/driverLocation' ,location)
        .then((res)=>{
            console.log(res);
            if (res.status === 201) {
                Swal.fire({
                    title:'บันทึก',
                    text:'เพิ่มข้อมูลสำเร็จแล้ว',
                    icon :'success'
                }).then((result=>{
                    if (result.isConfirmed) {
                        router.replace('/admin/driverlocation')
                    }
                }))
            }
        })
    }
    const editLocation =()=>{
        console.log('save location');
        try {
            axios.post('http://localhost:8080/edit/driverLocation',location)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    Swal.fire({
                       title: 'บันทึก',
                        text:'แก้ไข้อมูลสำเร็จแล้ว',
                        icon:'success',
                    }).then((result)=>{
                        if (result.isConfirmed) {
                            router.replace('/admin/driverlocation')
                        }
                    })
                }               
              })
        } catch (error) {
            console.log('error is',error);
        }
    }
    useEffect(() => {
        console.log('page is ',router.query);
        const getLocation =async()=>{
            const response = await axios.post(`http://localhost:8080/get/location/:${id}`,{id:id})
            console.log('response is',response);
            setLocation(response.data.payload)
        }
       if (id !== "create") {
        getLocation()
       }
    }, [id,router.isReady])
    return (
        <div className="container">
            <div className={styles['edit-box']}>
            <h4 className={styles['center-item']}  >{id === "create" ? 'เพิ่มข้อมูลสถานที่ตั้งวินมอเตอร์ไซค์' :'แก้ไขข้อมูลสถานที่ตั้งวินมอเตอร์ไซค์'}</h4>
            <div className={styles['input-box']} >
            <div className={styles['first-input']}>
                <span>ชื่อสถานที่ตั้ง: </span>
                <input type="text" value={location ?location.location_name :''} onChange={(e)=>setLocation({...location,location_name:e.target.value})}  />
            </div>
             <div className={styles['first-input']}>
            <span>ตำแหน่งที่ตั้ง: </span>
            <textarea name="" id="" cols="30" value={location ? location.location_detail:''} onChange={(e)=>setLocation({...location,location_detail:e.target.value})} rows="5"></textarea>
            </div>
            <div className={styles['button-group']}>
            <Button onClick={id === 'create' ? createLocation : editLocation } className={styles['button-size']} color="info" variant="contained"   >บันทึกข้อมูล</Button>
            <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
            </div>
            </div>
            </div>
        </div>
    )
    }

export default location