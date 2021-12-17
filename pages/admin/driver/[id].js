import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';
import styles from '../../../styles/admin/create_edit.module.scss'
import Swal from 'sweetalert2'
import Image from 'next/image'
import Header from '../Header'
import 'animate.css';

 function Driver() {
    const router = useRouter()
    const id = router.query.id || []
    let service_option = ["รถพ่วงข้าง","รถสามล้อ"]
    // let service_option = [{name:'รถพ่วงข้าง',checked :false},{name:'รถสามล้อ',checked:false}]
    const [driver_image, setDriver_image] = useState('')
    const [loading, setLoading] = useState(false)
    const [driver, setDriver] = useState({
        id :'',
        location_id:'',
        driver_name:'',
        contact:'',
        services:[],
        image:''
    })
    const [serviceArray, setserviceArray] = useState([])
    const [locations, setLocations] = useState([])
    const createDriver = ()=>{
        console.log(driver);
        if (!driver.driver_name && !driver.contact  && !driver.location_id ) {
            Swal.fire({
                title:'เกิดข้อผิดพลาด',
                text:'ข้อมูลจำเป็นไม่ครบถ้วน',
                icon:'error'
            })
            return false
        }
        axios.post(`${process.env.SERVER_API}/create/driver`,driver)
        Swal.fire({
            title:'บันทึก',
            text:'เพิ่มข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_drivers')
            }
        }))

    }
    const editDriver = ()=>{
        console.log('edit')
        if(driver.location_id === '')console.log('err')
        console.log(driver)
        axios.post(`${process.env.SERVER_API}/edit/driver`,driver)
        Swal.fire({
            title:'บันทึก',
            text:'แก้ไขข้อมูลสำเร็จแล้ว',
            icon :'success'
        }).then((result=>{
            if (result.isConfirmed) {
                router.replace('/admin/manage_drivers')
            }
        }))
    }
    const uploadImage =async(e)=>{
        e.preventDefault();
        const files = e.target.files
        console.log('files is',files[0])
        let imageData = new FormData()
        imageData.append('driver',files[0])
        imageData.append('id',`driver${id}`)
        console.log('data is',imageData)
         await axios({
            method:'post',
            url:`${process.env.SERVER_API}/upload/driver-image`,
            headers:{ 'Content-Type': 'multipart/form-data' },
            data:imageData
        })
          .then((res) => {
              if (res.data.status === 200) {
                setDriver({...driver,image:res.data.image_name})
              }
            console.log(res);
            console.log(res.data);
          }).catch((err)=>{
              console.log(err)
          })

    }
    const setService =(e)=>{
        console.log(e.target.value);
        if (e.target.checked) {
            serviceArray.push(e.target.value);
        }
        else {
            const removeService = serviceArray.indexOf(e.target.value)
            if (removeService > -1) {
                console.log('remove');
                serviceArray.splice(removeService,1)
            }
        }
        setDriver({...driver,services:serviceArray})
    }
    const deleteImg=(image)=>{
        Swal.fire({
        title:"ต้องการลบภาพคนขับหรือไม่",
        imageUrl:`/uploadImage/driver/${driver.image}`,
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
                setDriver({...driver,image:''})
                Swal.fire('ลบภาพคนขับแล้ว','กรุณากดบันทึกข้อมูลเพื่อยืนยันการลบ','success')
            }
        })
    }
    useEffect(() => {
        console.log('page is',router.query);
        const getLocation =async()=>{
            const response = await axios.get(`${process.env.SERVER_API}/get/driverLocation`)
            console.log('response is',response);
            setLocations(response.data.payload)
        }
        const getDriver = async()=>{
            console.log('get one driver')
            const response = await axios.post(`${process.env.SERVER_API}/get/driver/:${id}`,{id:id})
            console.log('response driver is',response.data)
            if (response.status === 200){
                setDriver(response.data.payload)
                if(response.data.sidetow === true){
                    let checkbox_service1 = document.getElementById("รถพ่วงข้าง")
                    checkbox_service1.checked = true
                    serviceArray.push("รถพ่วงข้าง")
                }
                if (response.data.triCycle === true){
                    let checkbox_service2 = document.getElementById("รถสามล้อ")
                    checkbox_service2.checked = true
                    serviceArray.push("รถสามล้อ")
                }
            }
        }
            getLocation()
        if(id !== 'create' && router.isReady)getDriver()
    }, [id,router.isReady])
    return (
        <div className={styles['dis-f']} >
            <Header/>
            <div className={styles['box-component']}>
            <div className="container">
            <div className={styles['edit-box']}>
            <h4 className={styles['center-item']}  >{id === "create" ? 'เพิ่มข้อมูลวินมอเตอร์ไซค์' :'แก้ไขข้อมูลวินมอเตอร์ไซค์'}</h4>
            <div className={styles['input-box']} >
            <div className={styles['first-input']}>
                <span>ที่ตั้ง<span style={{color:'red'}}>*</span>: </span>
                <select name="location" onChange={(e)=>setDriver({...driver,location_id:e.target.value})} value={driver ? driver.location_id :location.id} >
                    <option  value=""></option>
                    {locations ? locations.map((location)=>(
                        <option key={location.id} value={location.id}>{location.location_name}</option>
                    )):''}
                </select>
            </div>
            <div className={styles['first-input']}>
                <span>ชื่อคนขับ<span style={{color:'red'}}>*</span>: </span>
                <input type="text" value={driver ? driver.driver_name :'' } onChange={(e)=>setDriver({...driver,driver_name:e.target.value})}  />
            </div>
            <div className={styles['first-input']}>
                <span>เบอร์ติดต่อ<span style={{color:'red'}}>*</span>: </span>
                <InputMask mask="999-999-9999" maskChar={null}  value={driver.contact}  onChange={(e)=>setDriver({...driver,contact:e.target.value})} />
            </div>
            <div className={styles['first-input']}>
                <span>บริการ: </span>
                <div className={styles['select-box']}>
                {service_option.map((service)=>(
                    <label key={service} className={styles['add-checkbox']} >
                        <input type="checkbox"  name="" id={service}   value={service} onChange={(e)=> setService(e)}  />
                        <span>{service}</span>
                    </label>
                ))}
                </div>
            </div>
            {driver.image && driver.image ?(
                <div className={styles['photo-box']}>
                    <div className={styles['photo-item']}>
                    <Image  src={`/uploadImage/driver/${driver.image}`} alt="" width={200} height={250} />
                    <button className={styles['delete-button']} onClick={()=>deleteImg(driver.image)}>ลบ</button>
                    </div>
                </div>
            ):''}
            <div className={styles['first-input']} >
                <span>รูปภาพ</span>
                <input type="file"  name="" accept="image/png, image/jpeg, image/jpg" onChange={(e)=> uploadImage(e)} id="" />
            </div>

            <div className={styles['button-group']}>
            <Button onClick={id === 'create' ? createDriver : editDriver } className={styles['button-size']} color="info" variant="contained"   >บันทึกข้อมูล</Button>
            <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
            </div>
            </div>
            </div>
        </div>
            </div>
        </div>
    )
}
export default Driver