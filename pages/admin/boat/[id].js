import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Header from '../Header'
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';



export default function boat() {
    const router = useRouter()
    const id = router.query.id || []
    let boat_club =["ท่าเรือสะพานฝั่งไม้ไทย","สะพานไม้ฝั่งไทย","ท่าวัด"]
    const [boatProvider, setBoatProvider] = useState({
        id:'',
        club_name:'ท่าเรือสะพานฝั่งไม้ไทย',
        provider_name:'',
        owner_name:'',
        driver_name:'',
        boats_quantity:'',
        max_passenger :'',
        contact:'',

    })
    const createBoat =()=>{
        console.log('create boat');
        console.log(boatProvider)
            Swal.fire({
                title:'บันทึก',
                text:'เพิ่มข้อมูลสำเร็จแล้ว',
                icon :'success'
            }).then((result=>{
                if (result.isConfirmed) {
                    router.replace('/admin/manage_boats')
                }
            }))
        
    }
    const editBoat =()=>{
        console.log('edit boat');
        console.log(boatProvider)
            Swal.fire({
                title:'บันทึก',
                text:'แก้ไขข้อมูลสำเร็จแล้ว',
                icon :'success'
            }).then((result=>{
                if (result.isConfirmed) {
                    router.replace('/admin/manage_boats')
                }
            }))
    }
    useEffect(() => {
        
    }, [id,router.isReady])
    return (
        <div className={styles['dis-f']}>
            <Header/>
            <div className={styles['box-component']} >
            <div className="container">
                <div className={styles['edit-box']} >
                    <h4 className={styles['cente-item']}>{id === "create" ? 'เพิ่มข้อมูลเรือนำเที่ยว'  :'แก้ไขข้อมูลเรือนำเที่ยว'}</h4>
                    <div className={styles['input-box']} >
                    <div className={styles['first-input']}>
                        <span>ชื่อชมรม</span>
                        <select onChange={(e)=>setBoatProvider({...boatProvider,club_name:e.target.value})}>
                            {boat_club.map((club)=>(
                                <option value="" key={club} >{club}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles['first-input']} >
                        <span>ชื่อเรือนำเที่ยว</span>
                        <input type="text" value={boatProvider ? boatProvider.provider_name :''} onChange={(e)=>setBoatProvider({...boatProvider,provider_name:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>ชื่อเจ้าของเรือ</span>
                        <input type="text" value={boatProvider ? boatProvider.owner_name:''} onChange={(e)=>setBoatProvider({...boatProvider,owner_name:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>ชื่อคนขับเรือ</span>
                        <input type="text" value={boatProvider ? boatProvider.driver_name:''} onChange={(e)=>setBoatProvider({...boatProvider,driver_name:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>จำนวนเรือ</span>
                        <InputMask maskChar={null}  value={boatProvider ? boatProvider.boats_quantity:''} mask="99" onChange={(e)=>setBoatProvider({...boatProvider,boats_quantity:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>ผู้โดยสารสูงสุด</span>
                        <InputMask mask="99" maskChar={null} value={boatProvider ? boatProvider.max_passenger:''} onChange={(e)=>setBoatProvider({...boatProvider,max_passenger:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>เบอร์ติดต่อ</span>
                        <InputMask mask="999-999-9999" value={boatProvider ?boatProvider.contact:''} maskChar={null} onChange={(e)=>setBoatProvider({...boatProvider,contact:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>รูปเจ้าของเรือ</span>
                        <input type="file" name="" id="" />
                    </div>
                    <div className={styles['first-input']}>
                        <span>รูปเรือนำเที่ยว</span>
                        <input type="file" name="" id="" />
                    </div>
                    <div className={styles['button-group']}>
                        <Button onClick={id === 'create' ? createBoat : editBoat } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
