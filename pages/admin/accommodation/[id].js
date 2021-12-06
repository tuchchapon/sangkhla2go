import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Image from 'next/image'
import Swal from 'sweetalert2'
import InputMask from 'react-input-mask'
import Header from '../Header'
import Button from '@mui/material/Button';
export default function officer() {
    const router = useRouter()
    const id = router.query.id || []
    const [galleryImages, setGalleryImages] = useState([])
    const accommodation_options = ["โรงแรม","โฮมสเตย์","รีสอร์ท","เกสต์เฮ้าส์","เรือนรับรอง","โฮสเทล","แพพัก"]
    const accommodation_service_options =["อาหารเช้า","ลานจอดรถ","สระว่ายน้ำ","WI-FI","ห้องน้ำส่วนตัว","ร้านอาหาร","ห้องประชุม","เช่ารายเดือน","ลานกลางเต็นท์"]
    const boat_house_option = ["อาหารเช้า","WI-FI","บริการลากแพ","คาราโอเกะ"]
    const [serviceArray, setServiceArray] = useState([])
    const [accommodation, setAccommodation] = useState({
        id:'',
        type:'โรงแรม',
        name:'',
        min_price:'',
        max_price:'',
        information:'',
        fb_page:'',
        tel:'',
        services:[],
        images:[]
    })
    const setService =(e,name)=>{
        if (e.target.checked) {
            serviceArray.push(e.target.value)
        }
        else{
            const removeService = serviceArray.indexOf(e.target.value)
            if (removeService > -1) {
                console.log('remove')
                serviceArray.splice(removeService,1)
            }
        }
        console.log('after arr',serviceArray);
        setAccommodation({...accommodation,services:serviceArray})
    }

    const changeType=(e)=>{
        e.preventDefault()
        
        setAccommodation({...accommodation,type:e.target.value})
        let breakfast = document.getElementById("อาหารเช้า")
        let wifi = document.getElementById("WI-FI")
        if (accommodation.type === "แพพัก" && e.target.value !== "แพพัก") {
            for (let i = 0; i < 10; i++) {
               
                breakfast.checked = false 
                wifi.checked = false
                serviceArray.pop()
                
            }
        }
        if (accommodation.type !== "แพพัก" && e.target.value === "แพพัก") {
            for (let j = 0; j < 10; j++) {
                breakfast.checked = false 
                wifi.checked = false
                serviceArray.pop()
            }
        }
    }
    const createAccommodation=()=>{
        console.log('create');
        console.log(accommodation)
            console.log('service is',accommodation.services);
        axios.post('http://localhost:8080/create/accommodation',accommodation)
        .then((res)=>{
            if (res.status === 201) {
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
        })

        


    }

    const editAccommodation = ()=>{
        console.log('edit');
        console.log(accommodation)
        // let uniq = [...new Set(accommodation.services)]
        // console.log('unq service is',uniq);
        
        axios.post('http://localhost:8080/edit/accommodation',accommodation)
        .then((res)=>{
            if (res.status === 200) {
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
        })
        


    }
    const uploadImage =async(e)=>{
        e.preventDefault();
        const files = e.target.files
        console.log('files is',files)
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                let imageData = new FormData()
                imageData.append('accommodation',files[i])
                imageData.append('id',`accommodation${id}`)
                await axios({
                    method:'post',
                    url:'http://localhost:8080/upload/accommodation-images',
                    headers:{ 'Content-Type': 'multipart/form-data' },
                    data:imageData
                })
                  .then((res) => {
                      if (res.data.status === 200) {
                            galleryImages.push(res.data.image_name)
                      }
                  }).catch((err)=>{
                      console.log(err)
                  })
            }   
                    setAccommodation({...accommodation,images:galleryImages})
        }
    }
    const deleteImage=(index)=>{
        let new_image = accommodation.images
        new_image.splice(index,1)
        setAccommodation({...accommodation,images:new_image})
    }
    useEffect(() => {
        const getAccommodation =async()=>{
            console.log('get one accommodation');
            const response = await axios.post(`http://localhost:8080/get/accommodation/:${id}`,{id:id})
            if (response.status === 200) {
                console.log('payload is',response.data.payload);
                let imageResponse = response.data.payload.images
               setAccommodation(response.data.payload)
               setGalleryImages(imageResponse)
               let serviceAPI = response.data.payload.services
                    for (let i = 0; i < serviceAPI.length; i++) {
                        let setHotelService = document.getElementById(`${serviceAPI[i]}`)
                        serviceArray.push(serviceAPI[i])
                        console.log('set service is',setHotelService);
                        if (setHotelService !==null) {
                            setHotelService.checked = true
                        }
                    }
            }
        }
        if(id !== "create" && router.isReady)getAccommodation()
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
                             <select value={accommodation ? accommodation.type:'โรงแรม'} onChange={(e)=>changeType(e)}>
                                {accommodation_options.map((type)=>(
                                <option value={type} key={type} >{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles['first-input']} >
                            <span>ชื่อที่พัก</span>
                            <input type="text" value={accommodation ? accommodation.name:''} onChange={(e)=>setAccommodation({...accommodation,name:e.target.value})} />
                        </div>
                        <div className={styles['first-input']} >
                            <span>ช่วงราคา</span>
                            <InputMask mask="9999" maskChar={null} value={accommodation ? accommodation.min_price:''} onChange={(e)=>setAccommodation({...accommodation,min_price:e.target.value})} />
                            -
                            <InputMask mask="99999" maskChar={null} value={accommodation ? accommodation.max_price:''} onChange={(e)=>setAccommodation({...accommodation,max_price:e.target.value})} />
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
                            <InputMask mask="999-999-9999" maskChar={null} value={accommodation ? accommodation.tel:''} onChange={(e)=>setAccommodation({...accommodation,tel:e.target.value})}  />
                        </div>
                        <div className={styles['first-input']}>
                            <span>บริการ: </span>
                        <div className={styles['select-box']} >
                            {accommodation && accommodation.type !== "แพพัก" ?(
                                    accommodation_service_options.map((hotel_service)=>(
                                        <label key={hotel_service} className={styles['add-checkbox']} >
                                        <input type="checkbox" name="" id={hotel_service} value={hotel_service} onChange={(e)=>setService(e)}  />
                                        <span>{hotel_service}</span>
                                        </label>
                                        ))
                            ) :(
                                     boat_house_option.map((boat_service)=>(
                                    <label key={boat_service} className={styles['add-checkbox']} >
                                    <input type="checkbox" name={boat_service} id={boat_service} value={boat_service}  onChange={(e)=>setService(e)}  />
                                    <span>{boat_service}</span>
                                    </label>
                                    ))
                            )}
                        </div>
                       </div>
                       {accommodation && accommodation.images ? (
                                       <div className={styles['photo-box']}  >
                                    {accommodation.images.map((image,index)=>(                 
                                           <div key={index} className={styles['photo-item']} >
                                            <div className={styles['img-button-box']} >
                                             <Image  src={`/uploadImage/accommodation/${image}`} alt="" width={200} height={250} />
                                            <button className={styles['delete-button']} onClick={()=>deleteImage(index)} >ลบ</button>
                                            </div>
                                           </div>
                                    ))}
                                    </div>
                            )
                            :''}
                       <div className={styles['first-input']} >
                            <span>รูปภาพที่พัก</span>
                            <input type="file" name="" multiple={true} accept="image/png, image/jpeg, image/jpg" onChange={(e)=>uploadImage(e)} id="" />
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
