import {React,useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Image from 'next/image'
import styles from '../../../styles/admin/create_edit.module.scss'
import Header from '../Header'

export default function product() {
    const router = useRouter()
    const id = router.query.id || []
    const [galleryImages, setGalleryImages] = useState([])
    const [product, setProduct] = useState({
        id:'',
        name:'',
        detail:'',
        images :[],
        fb_page :'',
        tel:'',
        link :''
    })
    const createProduct=()=>{
        console.log('create');
        console.log(product)
        try {
            axios.post(`${process.env.SERVER_API}/create/product`,product)
            .then((res)=>{
                if (res.status === 201) {
            Swal.fire({
                title:'บันทึก',
                text:'เพิ่มข้อมูลสำเร็จแล้ว',
                icon :'success'
            }).then((result=>{
                if (result.isConfirmed) {
                router.replace('/admin/manage_products')
            }
            }))}
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    const editProduct=()=>{
        console.log('edit');
        console.log(product)
        axios.post(`${process.env.SERVER_API}/edit/product`,product)
        .then((res)=>{
            console.log(res)
            if (res.data.status === 200) {
                Swal.fire({
                    title:'บันทึก',
                    text:'แก้ไขข้อมูลสำเร็จแล้ว',
                    icon :'success'
                }).then((result=>{
                    if (result.isConfirmed) {
                        router.replace('/admin/manage_products')
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
            // let  gallery  =[]
            for (let i = 0; i < files.length; i++) {
                // galleryImages.push(files[i])
                console.log(files[i])
                let imageData = new FormData()
                imageData.append('product',files[i])
                imageData.append('id',`product${id}`)
                await axios({
                    method:'post',
                    url:`${process.env.SERVER_API}/upload/product-images`,
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
            setProduct({...product,images:galleryImages})
            
        }
    }
    const deleteImg =(index)=>{
        let new_image = product.images
        new_image.splice(index,1)      
        setProduct({...product,images:new_image})

    }
    useEffect(() => {
        console.log(id);
        const getProduct = async()=>{
            console.log('get one product')
            const response = await axios.post(`${process.env.SERVER_API}/get/product/:${id}`,{id:id})
            console.log(response.data.payload)
            if (response.status === 200) {
                setProduct(response.data.payload)
                let imageResponse = response.data.payload.images
                setGalleryImages(imageResponse)
            }
        }
        if (id !== "create" && router.isReady) {
            getProduct()
        }
    }, [id,router.isReady])
    return (
        <div className={styles['dis-f']} >
            <Header/>
           {router.isReady ? (
                <div className={styles['box-component']} >
                <div className="container">
                <div className={styles['edit-box']}>
                    <h4 className={styles['center-item']} >{id === "create" ? 'เพิ่มข้อมูลผลิตภัณฑ์':'แก้ไขข้อมูลผลิตภัณฑ์'}</h4>
                    <div className={styles['input-box']}>
                        <div className={styles['first-input']} >
                            <span>ชื่อผลิตภัณฑ์</span>
                            <input type="text" value={product ? product.name:''} onChange={(e)=>setProduct({...product,name:e.target.value})} />    
                        </div>
                        <div className={styles['first-input']} >
                            <span>รายละเอียด<br/>ผลิตภัณฑ์</span>
                            <textarea name="" id="" value={product ? product.detail:''} cols="30" rows="10" onChange={(e)=>setProduct({...product,detail:e.target.value})} ></textarea>
                        </div>
                        <div className={styles['first-input']} >
                            <span>เพจเฟสบุ๊ค</span>
                            <input type="text" value={product ? product.fb_page:''} onChange={(e)=>setProduct({...product,fb_page:e.target.value})} />
                        </div>
                        <div className={styles['first-input']} >
                            <span>เบอร์ติดต่อ</span>
                            <InputMask mask="999-999-9999" maskChar={null} value={product? product.tel:''} onChange={(e)=>setProduct({...product,tel:e.target.value})} />
                        </div>
                        <div className={styles['first-input']} >
                            <span>ลิ้งค์ข้อมูลเพิ่ม</span>
                            <input type="text" value={product ? product.link:''} onChange={(e)=>setProduct({...product,link:e.target.value})} />
                        </div>
                        {product && product.images ? (
                                       <div className={styles['photo-box']}  >
                                    {product.images.map((image,index)=>(                 
                                           <div key={index} className={styles['photo-item']} >
                                            <div className={styles['img-button-box']} >
                                             <Image  src={`/uploadImage/product/${image}`} alt="" width={200} height={250} />
                                            <button className={styles['delete-button']} onClick={()=>deleteImg(index)}>ลบ</button>
                                            </div>
                                           </div>
                                    ))}
                                    </div>
                            )
                            :''}
                        <div className={styles['first-input']}>
                            <span>รูปภาพ</span>
                            <input type="file" name="" multiple={true} accept="image/png, image/jpeg, image/jpg" onChange={(e)=>uploadImage(e)} id="" />
                        </div>
                        <div className={styles['button-group']}>
                             <Button onClick={id === 'create' ? createProduct : editProduct } className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                             <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained" >ย้อนกลับ</Button>
                        </div>
                    </div>
                </div>
            </div>
                </div>
           ):''}
        </div>
    )
}
