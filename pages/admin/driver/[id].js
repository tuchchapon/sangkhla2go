import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';

 function Driver() {
    const router = useRouter()
    const id = router.query.id || []
    let serviceOption = ["รถพ่วงข้าง","รถสามล้อ"]
    const [driver, setDriver] = useState({
        location_id:'',
        driver_name:'',
        contact:'',
        service:[]
    })
    const [serviceArray, setserviceArray] = useState([])
    const [locations, setLocations] = useState([])
    const create_driver = ()=>{
        console.log(driver);
        // axios.post('http://localhost:8080/create/driver',driver)
    }
    const edit_driver = ()=>{

    }
    const upload_image =(e)=>{
        console.log(e);
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
        setDriver({...driver,service:serviceArray})
    }
    useEffect(() => {
        console.log('page is',router.query);
        const getLocation =async()=>{
            const response = await axios.get(`http://localhost:8080/get/driverLocation`)
            console.log('response is',response);
            setLocations(response.data.payload)
        }
        getLocation()
       console.log(driver.service);

    }, [id,router.isReady])
    return (
        <div className="container">
            <div className={styles['edit-box']}>
            <h4 className={styles['center-item']}  >{id === "create" ? 'เพิ่มข้อมูลวินมอเตอร์ไซค์' :'แก้ไขข้อมูลวินมอเตอร์ไซค์'}</h4>
            <div className={styles['input-box']} >
            <div className={styles['first-input']}>
                <span>ที่ตั้ง: </span>
                
                <select name="location" onChange={(e)=>setDriver({...driver,location_id:e.target.value})} value={locations.id} >
                    <option  value=""></option>
                    {locations ? locations.map((location)=>(
                        <option key={location.id} value={location.id}>{location.location_name}</option>
                    )):''}
                </select>
            </div>
            <div className={styles['first-input']}>
                <span>ชื่อวิน: </span>
                <input type="text" value={driver ? driver.driver_name :'' } onChange={(e)=>setDriver({...driver,driver_name:e.target.value})}  />
            </div>
            <div className={styles['first-input']}>
                <span>เบอร์ติดต่อ: </span>
                <InputMask mask="999 999 9999" maskChar={null}  value={driver ? driver.contact:''}  onChange={(e)=>setDriver({...driver,contact:e.target.value})} />
            </div>
            <div className={styles['first-input']}>
                <span>บริการ: </span>
                <div className={styles['select-box']}>
                {serviceOption.map((value)=>(
                    <label key={value} className={styles['add-checkbox']} >
                        <input type="checkbox" name="" value={value} onChange={(e)=> setService(e)}  />
                        <span>{value}</span>
                    </label>
                ))}
                </div>
            </div>
            <div className={styles['first-input']} >
                <span>รูปภาพ</span>
                <input type="file" name="" onChange={(e)=>upload_image(e.target.files)}  id="" />
            </div>

            <div className={styles['button-group']}>
            <Button onClick={id === 'create' ? create_driver : edit_driver } className={styles['button-size']} color="info" variant="contained"   >บันทึกข้อมูล</Button>
            <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
            </div>
            </div>
            </div>
        </div>
    )
}
export default driver