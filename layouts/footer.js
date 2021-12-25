import React from 'react'
import styles from '../styles/Home.module.scss'
export default function footer() {

    const toLink = (e) => {
        if (e) e.preventDefault()
        window.open('https://www.facebook.com/%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%A5%E0%B8%B9society-102380202237843')
    }
    return (
        <>
            <div className={styles['footer-box']}>
                <div className={styles['footer-row-box']}>
                    <div className={styles['footer-left-box']}>
                        <span>© 2021 ศูนย์ประสานงานโครงการยกระดับเศรษฐกิจและสังคมรายตำบลแบบบูรณาการ
                            มหาวิทยาลัยสู่ตำบล สร้างรากแก้วให้ประเทศ (U2T) ประจำตำบลหนองลู</span>
                    </div>
                    <div className={styles['footer-right-box']}>
                        <div className={styles['contact-box']}>
                            <img src="/white-fb-icon.png" alt="" />
                            <span onClick={(e) => toLink(e)}>หนองลู society</span>
                            <img src="/tel-icon.png" alt="" />
                            <span>087-519-9150</span>


                        </div>
                        <span>ที่อยู่ 86/1 ตำบลหนองลู อ.สังขละบุรี จ.กาญจนบุรี 71240</span>
                    </div>
                </div>
            </div>
        </>
    )
}
