import React from 'react'
import styles from '../styles/Home.module.scss'
import useRouter from 'next/router'
export default function subHeader({first,second}) {

    const toHome =(e)=>{
        if (e) e.preventDefault()
        useRouter.push('/')
    }
    return (
        <>
            <div className={styles['subheader']}>
                <div className={styles['sub-header-box']} >
                    <span onClick={(e)=>toHome(e)}>หน้าแรก </span>
                    <span className={styles['arrow']} >{">"}</span>
                    <span style={{color:`${first && !second ?'#757575':''}`}} >{first ? first :''}</span>
                    {second ? <span className={styles['arrow']} >{">"}</span>:''}
                    {second ? ( <span style={{color:' #757575;'}} >{second}</span>):''}
                </div>
            </div>
        </>
    )
}
