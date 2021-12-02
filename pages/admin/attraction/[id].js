import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Header from '../Header'

export default function attraction() {
    const router = useRouter()
    const id = router.query.id || []
    let attraction_type = ['ธรรมชาติ','วัฒนธรรม','เกษตรกรรมและชุมชน']
    const [attraction, setAttraction] = useState({
        id:'',
        name :'',
        type:'ธรรมชาติ',
        detail:'',
        Image:[]
    })
    const createAttraction=()=>{
        console.log('create');
        console.log(attraction)
        Swal.fire({
            title:'บันทึก',
            text:'เพิ่มข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_attractions')
            }
        }))
    }
    const editAttraction =()=>{
        console.log('edit');
        console.log(attraction)
        Swal.fire({
            title:'บันทึก',
            text:'แก้ไขข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_attractions')
            }
        }))
    }
    useEffect(() => {
        
    }, [id,router.isReady])
    return (
        <div className={styles['dis-f']} >
                <Header/>
            <div className={styles['box-component']}>
            <div className="container">
                <div className={styles['edit-box']} >
                    <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลสถานที่ท่องเที่ยว' :'แก้ไขข้อมูลสถานที่ท่องเที่ยว'}</h4>  
                    <div className={styles['input-box']} >
                        <div className={styles['first-input']} >
                            <span>ประเภท</span>
                            <select name="" id="" onChange={(e)=>setAttraction({...attraction,type:e.target.value})}>
                                {attraction_type.map((attraction)=>(
                                    <option value="" key={attraction} value={attraction}  >{attraction} </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles['first-input']} >
                            <span>ชื่อสถานที่</span>
                            <input type="text" onChange={(e)=>setAttraction({...attraction,name:e.target.value})} />
                        </div>
                        <div className={styles['first-input']} >
                            <span>รายละเอียด</span>
                            <textarea name="" id="" cols="30" rows="10" onChange={(e)=>setAttraction({...attraction,detail:e.target.value})} ></textarea>
                        </div>
                        <div className={styles['first-input']} >
                            <span>รูปสถานที่</span>
                            <input type="file" name="" id="" />
                        </div>
                        <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createAttraction : editAttraction } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>  
                </div>
            </div>   
            </div>
        </div>
    )
}
