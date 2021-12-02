import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask'
import Header from '../Header'
import Button from '@mui/material/Button';
export default function officer() {
    const router = useRouter()
    const id = router.query.id || []
    const accommodation_options = ["โรงแรม","โฮมสเตย์","รีสอร์ท","เกสต์เฮ้าส์","เรือนรับรอง","โฮสเทล","แพพัก"]
    const service_options =["ลานจอดรถ","สระว่ายน้ำ",'WI-FI',"ห้องน้ำส่วนตัว","ร้านอาหาร","ห้องประชุม","เช่ารายเดือน","ลานกลางเต็นท์","บริการลากแพ","คาราโอเกะ"]
    const [serviceArrray, setServiceArrray] = useState([])
    const [accommodation, setAccommodation] = useState({
        id:'',
        accommodation_type:'',
        accommodation_name:'',
        lowest_price:'',
        highest_price:'',
        information:'',
        fb_page:'',
        contact:'',
        services:[]
    })
    const setService =(e)=>{
        console.log('value is',e.target.value)
        if(e.target.checked){
            serviceArrray.push(e.target.value)
        }
        else{
            const removeService = serviceArrray.indexOf(e.target.value)
            if(removeService > -1){
                console.log('remove')
                serviceArrray.splice(removeService,1)
            }
        }
        setAccommodation({...accommodation,services:serviceArrray})
        
    }
    const createAccommodation=()=>{
        console.log('create');
        console.log(accommodation)
        Swal.fire({
            title:'บันทึก',
            text:'เพิ่มข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_accommodations')
            }
        }))

    }
    const editAccommodation = ()=>{
        console.log('edit');
        console.log(accommodation)
        Swal.fire({
            title:'บันทึก',
            text:'แก้ไขข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_accommodations')
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
                    <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลที่พัก' :'แก้ไขข้อมูลที่พัก'}</h4>  
                    <div className={styles['input-box']} >
                        <div className={styles['first-input']} >
                            <span>ประเภทที่พัก</span>
                             <select  onChange={(e)=>setAccommodation({...accommodation,accommodation_type:e.target.value})}>
                                {accommodation_options.map((type)=>(
                                <option value={accommodation.accommodation_type ? accommodation.accommodation_type:''} key={type} >{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles['first-input']} >
                            <span>ชื่อที่พัก</span>
                            <input type="text" value={accommodation ? accommodation.accommodation_name:''} onChange={(e)=>setAccommodation({...accommodation,accommodation_name:e.target.value})} />
                        </div>
                        <div className={styles['first-input']} >
                            <span>ช่วงราคา</span>
                            <InputMask mask="9999" maskChar={null} value={accommodation ? accommodation.lowest_price:''} onChange={(e)=>setAccommodation({...accommodation,lowest_price:e.target.value})} />
                            -
                            <InputMask mask="99999" maskChar={null} value={accommodation ? accommodation.highest_price:''} onChange={(e)=>setAccommodation({...accommodation,highest_price:e.target.value})} />
                        </div>
                        <div className={styles['first-input']} >
                            <span>รายละเอียด</span>
                            <textarea name="" id="" cols="30" rows="10" value={accommodation ? accommodation.information :''} onChange={(e)=>setAccommodation({...accommodation,information:e.target.value})} ></textarea>
                        </div>
                        <div className={styles['first-input']} >
                            <span>เพจเฟสบุ๊ค</span>
                            <input type="text" value={accommodation ? accommodation.fb_page:''} onChange={(e)=>setAccommodation({...accommodation,fb_page:e.target.value})} />
                        </div>
                        <div className={styles['first-input']} >
                            <span>เบอร์ติดต่อ</span>
                            <InputMask mask="999-999-9999" maskChar={null} value={accommodation ? accommodation.contact:''} onChange={(e)=>setAccommodation({...accommodation,contact:e.target.value})}  />
                        </div>
                        <div className={styles['first-input']}>
                            <span>บริการ: </span>
                        <div className={styles['select-box']} >
                            {service_options.map((service)=>(
                            <label key={service} className={styles['add-checkbox']} >
                            <input type="checkbox" name="" value={service} onChange={(e)=>setService(e)}  />
                            <span>{service}</span>
                            </label>
                            ))}
                        </div>
                       </div>
                       <div className={styles['first-input']} >
                            <span>รูปภาพที่พัก</span>
                            <input type="file" name="" id="" />
                       </div>
                        <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createAccommodation : editAccommodation } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>  
                </div>
            </div>   
           </div>
        </div>
    )
}
