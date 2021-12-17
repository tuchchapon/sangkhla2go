import {React,useState,useEffect} from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
import axios from 'axios';
export default function manage_product() {
    const router = useRouter()
    const [products, setProducts] = useState([])
    const editProduct =(product)=>{
        console.log('edit');
        console.log(product.product);
        router.push(`/admin/product/${product.id}`)
    }
    const deleteProduct =(product)=>{
        console.log('delete');
        console.log(product.id);
        Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${product.name} หรือไม่`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete(`${process.env.SERVER_API}/delete/product`,{data:product})
                    if (response.data.status === 200) {
                       Swal.fire({
                       title: 'ลบข้อมูลเรียบร้อยแล้ว',
                        text:`ลบข้อมูล ${product.name}แล้ว`,
                        icon:'success'
                       }).then((result)=>{
                           if (result.isConfirmed) {
                               router.reload()
                           }
                       })
                    }
                } catch (error) {
                    if(error){
                        Swal.fire(
                            'เกิดข้อผิดพลาด',
                            `${error}`,
                            'error'
                        )
                    }
                }

            }
        })
        
    }
    useEffect(() => {
        const getProducts = async()=>{
            let response = await axios.get(`${process.env.SERVER_API}/get/products`)
            console.log(response.data)
            setProducts(response.data.payload)
        }
        getProducts()
    }, [])
    return (
        <div>
            <div className={styles['dis-f']} >
                <Header/>
                <div className={styles['box-component']} >
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']}>
                                    <p>ผลิตภัณฑ์</p>
                                    <Button color="success" variant="contained" onClick={(e)=>router.push('/admin/product/create')} >เพิ่มผลิตภัณฑ์</Button>
                                </div>
                                <Paper sx={{p:2,display:'flex',flexDirection:'column'}} >
                                    {products.length > 0 ? products.map((product)=>(
                                       <div key={product.id} className={styles['box-item']} >
                                           <span>{product.name}</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editProduct(product))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteProduct(product))} >
                                            <DeleteIcon/>
                                        </IconButton>
                                        </div>
                                       </div> 

                                    )):''}
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
