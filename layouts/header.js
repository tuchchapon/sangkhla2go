import React from 'react'
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
export default function header() {
    const router = useRouter()
    return (
        <>
            <div className={styles['header-box']}>
                <div className={styles['row-box']}>
                <div className={styles['head-leftbox']}>
                        <div onClick={()=>router.push('/accommodation')}  className={styles['head-textbox']}><span>ที่พัก</span> </div>
                        <div onClick={()=>router.push('/attraction')}  className={styles['head-textbox']}>
                        <span>ที่เที่ยว</span> 
                        </div>
                        <div onClick={()=>router.push('/restaurant')}  className={styles['head-textbox']}>
                        <span>ร้านอาหาร/กาแฟ</span> 
                        </div>
                        <div onClick={()=>router.push('/publicTransportation')}  className={styles['head-textbox']}>

                        <span>ขนส่งสาธารณะ</span> 
                        </div>
                        <div onClick={()=>router.push('/traditions')}  className={styles['head-textbox']}>
                        <span>ประเพณี</span> 
                        </div>
                        <div onClick={()=>router.push('/product')}  className={styles['head-textbox']}>
                        <span>ผลิตภัณฑ์ชุมชน</span> 
                        </div>
                        <div  onClick={(e)=> document.getElementById("review-section").scrollIntoView({behavior:'smooth'})} className={styles['head-textbox']}>
                        <span>รีวิว</span> 
                        </div>
                        </div>

                       <div className={styles['head-rightbox']}>
                        <div onClick={()=>router.push('/officer')}  className={styles['head-textbox']}>
                        <span>ผู้จัดทำ</span>
                        </div>
                       </div>
                </div>

            </div>
        </>
    )
}
