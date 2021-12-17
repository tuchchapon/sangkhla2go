import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Header from '../Header'
import Swal from 'sweetalert2'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';




export default function boat() {
    const router = useRouter()
    const id = router.query.id || []
    let boat_club =["-","ท่าเรือสะพานฝั่งไม้ไทย","สะพานไม้ฝั่งไทย","สะพานไม้ฝั่งไทยและฝั่งมอญ","ท่าวัด"]
    const [galleryImages, setGalleryImages] = useState([])
    const [boatProvider, setBoatProvider] = useState({
        id:'',
        club_name:'-',
        provider_name:'',
        owner_name:'',
        driver_name:'',
        boat_quantity:'',
        max_passenger :'',
        contact:'',
        provider_image:'',
        boat_images :[]
    })
    const createBoat =()=>{
        console.log('create boat');
        console.log(boatProvider)
        axios.post(`${process.env.SERVER_API}/create/boat-provider`,boatProvider)
        .then((res)=>{
            console.log(res)
            if (res.status === 201) {
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
        })
    }
    const editBoat =()=>{
        console.log('edit boat');
        console.log(boatProvider)
        axios.post(`${process.env.SERVER_API}/edit/boat-provider`,boatProvider)
        .then((res)=>{
            console.log(res)
            if (res.status === 200) {
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
            else Swal.fire({
                title:`ผิดพลาด`,
                text:`${res.data.payload}`,
                icon:'error'
            })
        })

    }

    const uploadBoatProviderImage =async(e)=>{
        e.preventDefault();
        const files = e.target.files
        console.log('files is',files[0])
        let imageData = new FormData()
        imageData.append('provider',files[0])
        imageData.append('id',`provider${id}`)
        console.log('data is',imageData)
         await axios({
            method:'post',
            url:`${process.env.SERVER_API}/upload/boatprovider-image`,
            headers:{ 'Content-Type': 'multipart/form-data' },
            data:imageData
        })
          .then((res) => {
              if (res.data.status === 200) {
                setBoatProvider({...boatProvider,provider_image:res.data.image_name})
              }
            console.log(res);
            console.log(res.data);
          }).catch((err)=>{
              console.log(err)
          })

    }
    const uploadBoatImage =async(e)=>{
        e.preventDefault();
        const files = e.target.files
        console.log('files is',files)
        
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                console.log('axios')
                console.log(files[i])
                let formData = new FormData()
                formData.append('boat',files[i])
                formData.append('id',`boat${id}`)
                // let xhr = new XMLHttpRequest()
                await axios({
                    method:'post',
                    url:`${process.env.SERVER_API}/upload/boat-images`,
                    headers:{ 'Content-Type': 'multipart/form-data' },
                    data:formData
                })
                  .then((res) => {
                      console.log(res.data)
                      if (res.data.status === 200) {
                        galleryImages.push(res.data.image_name)
                      }
                  }).catch((err)=>{
                      console.log(err)
                  })

            }
            setBoatProvider({...boatProvider,boat_images:galleryImages})
            
        }
    }
    const deleteProviderImg =(image)=>{
        console.log(image);
        let del_imge = null
        setBoatProvider({...boatProvider,provider_image:del_imge})
    }
    const deleteBoatImg = (index)=>{
        let new_image = boatProvider.boat_images
        new_image.splice(index,1)
        setBoatProvider({...boatProvider,boat_images:new_image})
    }
    useEffect(() => {
        const getBoat = async()=>{
            const response = await axios.post(`${process.env.SERVER_API}/get/boat/:${id}`,{id:id})
            console.log('response boat is',response.data)
            if (response.status === 200) {
                setBoatProvider(response.data.payload)
                let imageResponse  = response.data.payload.boat_images
                setGalleryImages(imageResponse)
            }
        }
        if (id !== "create" && router.isReady) {
            getBoat()
        }
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
                        <select  value={boatProvider ? boatProvider.club_name:'-'} onChange={(e)=>setBoatProvider({...boatProvider,club_name:e.target.value})}>
                            {boat_club.map((club)=>(
                                <option value={club} key={club} >{club}</option>
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
                        <InputMask maskChar={null}  value={boatProvider ? boatProvider.boat_quantity:''} mask="99" onChange={(e)=>setBoatProvider({...boatProvider,boat_quantity:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>ผู้โดยสารสูงสุด</span>
                        <InputMask mask="999" maskChar={null} value={boatProvider ? boatProvider.max_passenger:''} onChange={(e)=>setBoatProvider({...boatProvider,max_passenger:e.target.value})} />
                    </div>
                    <div className={styles['first-input']}>
                        <span>เบอร์ติดต่อ</span>
                        <InputMask mask="999-999-9999" value={boatProvider ?boatProvider.contact:''} maskChar={null} onChange={(e)=>setBoatProvider({...boatProvider,contact:e.target.value})} />
                    </div>
                    {boatProvider && boatProvider.provider_image ?(
                <div className={styles['photo-box']}>
                    <div className={styles['photo-item']}>
                    <Image  src={`/uploadImage/boatProvider/${boatProvider.provider_image}`} alt="" width={200} height={250} />
                    <button className={styles['delete-button']} onClick={()=>deleteProviderImg(boatProvider.provider_image)}>ลบ</button>
                    </div>
                </div>
            ):''}
                    <div className={styles['first-input']}>
                        <span>รูปเจ้าของเรือ</span>
                        <input type="file" name="" accept="image/png, image/jpeg, image/jpg" onChange={(e)=>uploadBoatProviderImage(e)} id="" />
                    </div>
                    {boatProvider && boatProvider.boat_images ? (
                                       <div className={styles['photo-box']}  >
                                    {boatProvider.boat_images.map((image,index)=>(                 
                                           <div key={index} className={styles['photo-item']} >
                                            <div className={styles['img-button-box']} >
                                             <Image  src={`/uploadImage/boatProvider/${image}`} alt="" width={200} height={250} />
                                            <button className={styles['delete-button']} onClick={()=>deleteBoatImg(index)}>ลบ</button>
                                            </div>
                                           </div>
                                    ))}
                                    </div>
                            )
                            :''}
                    <div className={styles['first-input']}>
                        <span>รูปเรือนำเที่ยว</span>
                        <input type="file" name="" accept="image/png, image/jpeg, image/jpg" multiple={true} onChange={(e)=>uploadBoatImage(e)} id="" />
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
