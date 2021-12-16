import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from '../Header'
import Image from 'next/image'
import 'animate.css';
import Button from '@mui/material/Button';

export default function officer() {
    const router = useRouter()
    const id = router.query.id || []
    let position_options = ["","หัวหน้าโครงการ","ที่ปรึกษา","ผู้ประสานงาน","บัณฑิตจบใหม่","ประชาชน","นักศึกษาฝึกงาน",]
    const [officer, setOfficer] = useState({
        id:'',
        name:'',
        position:'',
        detail:'',
        image:''
    })
    const createOfficer =()=>{
        console.log('create');
        console.log(officer)
        try {
            axios.post('http://localhost:8080/create/officer',officer)
            .then((res)=>{
                console.log(res)
                if (res.status === 201) {
                    Swal.fire({
                        title:'บันทึก',
                        text:'เพิ่มข้อมูลสำเร็จแล้ว',
                        icon :'success'
                    }).then((result=>{
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_officers')
                        }
                    }))
                }
            })
        } catch (error) {
            console.log(error)
        }

    }
    const editOfficer =()=>{
        console.log('edit');
        console.log(officer)
        try {
            axios.post('http://localhost:8080/edit/officer',officer)
            .then((res)=>{
                if (res.status === 200) {
                    Swal.fire({
                        title:'บันทึก',
                        text:'แก้ไขข้อมูลสำเร็จแล้ว',
                        icon :'success'
                    }).then((result=>{
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_officers')
                        }
                    }))
                }
            })
        } catch (error) {
            console.log('edit ',error)
        }
    }
    const uploadImage =async(e)=>{
        e.preventDefault();
        const files = e.target.files
        console.log('files is',files[0])
        let imageData = new FormData()
        imageData.append('officer',files[0])
        imageData.append('id',`officer${id}`)
        console.log('data is',imageData)
         await axios({
            method:'post',
            url:'http://localhost:8080/upload/officer-image',
            headers:{ 'Content-Type': 'multipart/form-data' },
            data:imageData
        })
          .then((res) => {
              if (res.data.status === 200) {
                setOfficer({...officer,image:res.data.image_name})
              }
            console.log(res);
            console.log(res.data);
          }).catch((err)=>{
              console.log(err)
          })

    }
    const deleteImg=(image)=>{
        Swal.fire({
        title:"ต้องการลบภาพคณะผู้จัดทำหรือไม่",
        imageUrl:`/uploadImage/officer/${officer.image}`,
        imageHeight: 500,
        imageWidth: 400,
        showCancelButton:true,
        confirmButtonText:'ยืนยัน',
        cancelButtonText:'ยกเลิก',
        width: 500,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        icon:'question'
        }).then((res)=>{
            if (res.isConfirmed) {
                setOfficer({...officer,image:''})
                Swal.fire('ลบภาพคณะผู้จัดทำแล้ว','กรุณากดบันทึกข้อมูลเพื่อยืนยันการลบ','success')
            }
        })
    }
    useEffect(() => {
        const getOfficer =async()=>{
            const response = await axios.post(`http://localhost:8080/get/officer/:${id}`,{id:id})
            console.log(response.data.payload)
            setOfficer(response.data.payload)

        }
        if (id !== "create" && router.isReady) {
            getOfficer()
        }
    }, [id,router.isReady])
    return (
        <div className={styles['dis-f']} >
            <Header/>
            <div className={styles['box-component']} >
            <div className="container">
                <div className={styles['edit-box']} >
                    <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลผู้จัดทำ' :'แก้ไขข้อมูลผู้จัดทำ'}</h4>  
                    <div className={styles['input-box']} >
                        <div className={styles['first-input']} >
                            <span>ชื่อเจ้าหน้าที่</span>
                            <input type="text" value={officer ? officer.name :''} onChange={(e)=>setOfficer({...officer,name:e.target.value})} />
                        </div>
                        <div className={styles['first-input']}>
                            <span>ตำแหน่ง</span>
                            <select value={officer ? officer.position:''} onChange={(e)=>setOfficer({...officer,position:e.target.value})} >
                                {position_options.map((position)=>(
                                    <option key={position} >{position}</option>
                                ))}
                            </select>
                        </div>
                        {officer.image && officer.image ?(
                             <div className={styles['photo-box']}>
                            <div className={styles['photo-item']}>
                            <Image  src={`/uploadImage/officer/${officer.image}`} alt="" width={200} height={250} />
                            <button className={styles['delete-button']} onClick={()=>deleteImg(officer.image)}>ลบ</button>
                            </div>
                        </div>
                        ):''}
                        <div className={styles['first-input']} >
                            <span>รูปถ่าย</span>
                            <input type="file"  name="" accept="image/png, image/jpeg, image/jpg" onChange={(e)=> uploadImage(e)} id="" />
                        </div>
                        <div className={styles['first-input']} >
                            <span>คำอธิบาย</span>
                            <textarea name="" id="" cols="30" rows="10"  value={officer ? officer.detail :''} onChange={(e)=>setOfficer({...officer,detail:e.target.value})} ></textarea>
                        </div>
                        <div className={styles['button-group']} >
                        <Button onClick={id === 'create' ? createOfficer : editOfficer } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                        <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                        </div>
                    </div>  
                </div>
            </div>   
            </div>
        </div>
    )
}