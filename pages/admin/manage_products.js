import React from 'react'
import Header from './Header';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
export default function manage_product() {
    const router = useRouter()
    const editProduct =(product)=>{
        console.log('edit');
        console.log(product.product);
        router.push(`/admin/product/${product.product}`)
    }
    const deleteProduct =(product)=>{
        console.log('delete');
        console.log(product.product);
    }
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
                                    {[1,2,3,4,5].map((product)=>(
                                       <div key={product} className={styles['box-item']} >
                                           <span>ชื่อ</span>
                                           <div>
                                        <IconButton  onClick={((e)=>editProduct({product}))} >
                                            <ModeEditIcon/>
                                        </IconButton>
                                        <IconButton  onClick={((e)=>deleteProduct({product}))} >
                                            <DeleteIcon/>
                                        </IconButton>
                                        </div>
                                       </div> 

                                    ))}
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
