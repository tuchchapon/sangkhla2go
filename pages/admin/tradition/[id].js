import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from '../Header'
import Button from '@mui/material/Button';
export default function tradition() {
    const router = useRouter()
    let tradition_type = ["ประเพณีชาวกระเหรี่ยง","ประเพณีชาวมอญ"]
    let months =[{name:"มกราคม",num:1},{name:"กุมภาพันธ์",num:2},{name:"มีนาคม",num:3},
    {name:"เมษายน",num:4},{name:"พฤษภาคม",num:5},{name:"มิถุนายน",num:6},{name:"กรกฎาคม",num:7},
    {name:"สิงหาคม",num:8},{name:"กันยายน",num:9},{name:"ตุลาคม",num:10},{name:"พฤศจิกายน",num:11},{name:"ธันวาคม",num:12}]
    const [tradition, setTradition] = useState({
        id:'',
        type:'',
        month:'',
        name:'',
        detail:'',
        images:[]
    })
    const createTradition=()=>{
        console.log('create')
        console.log(tradition)
        // Swal.fire({
        //     title:'บันทึก',
        //     text:'เพิ่มข้อมูลสำเร็จแล้ว',
        //     icon :'success'
        // }).then((result=>{
        //     if (result.isConfirmed) {
        //         router.replace('/admin/manage_traditions')
        //     }
        // }))

    }
    const editTradition=()=>{
        console.log('edit')
        console.log(tradition)
        Swal.fire({
            title:'บันทึก',
            text:'แก้ไขข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_traditions')
            }
        }))
    }
    const id = router.query.id || []
    useEffect(() => {
        console.log(id)
    }, [id])
    return (
        <div className={styles['dis-f']}>
            <Header/>
            <div className={styles['box-component']} >
                <div className="container">
                    <div className={styles['edit-box']}>
                    <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลประเพณี' :'แก้ไขข้อมูลประเพณี'}</h4> 
                        <div className={styles['input-box']} >
                        <div className={styles['first-input']} >
                                <span>ชนเผ่า</span>
                                <select name="" id="" onChange={(e)=>setTradition({...tradition,type:e.target.value})} >
                                    {tradition_type.map((type_name)=>(
                                        <option key={type_name} >{type_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles['first-input']} >
                                <span>เดือน</span>
                                <select name=""  id="" onChange={(e)=>setTradition({...tradition,month:e.target.value})}>
                                    {months.map((month)=>(
                                        <option key={month.num} value={month.num}>{month.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles['first-input']} >
                                <span>ชื่อประเพณี</span>
                                <input type="text" value={tradition ? tradition.name :''} onChange={(e)=>setTradition({...tradition,name:e.target.value})} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>รายละเอียด</span>
                                <textarea name="" id="" cols="30" rows="5" value={tradition ? tradition.detail :''} onChange={(e)=>setTradition({...tradition,detail:e.target.value})} ></textarea>
                            </div>
                            <div className={styles['first-input']}>
                                <span>รูปประเพณี</span>
                                <input type="file" multiple={true} name="" id="" />
                            </div>
                            <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createTradition : editTradition } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
