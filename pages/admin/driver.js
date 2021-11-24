import React from 'react'
import axios from 'axios';

import Header from './Header';
import  Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import styles from '../../styles/admin/admin.module.scss'
export default function driver() {
    
    return (
        <div >
            <div className={styles['dis-f']}>
                <Header/>
                <div className={styles['box-component']}>
                    <div className={styles['data-container']} >
                        <div className="container">
                            <div className="col-12">
                                <div className={styles['add-button']}>
                                    <p>วินมอเตอร์ไซต์</p>
                                    <Button color="success" variant="contained"  >เพิ่มวินมอเตอร์ไซค์</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
