import React from 'react';
import Popup from 'reactjs-popup';
import styles from '../styles/comment.module.scss'
import { useRouter } from 'next/router';
export default function commentPopup({ open, onClose }) {
    const router = useRouter()
    const closeAndReload = async (e) => {
        if (e) e.preventDefault()
        await onClose()
        router.push('/')
    }
    return <>
        <Popup
            open={open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            lockScroll
        >
            <div className={styles['backdrop']}></div>
            <div className={styles['popup-fixed-box']}>
                <div className={styles['comment-popup']}>
                    <div className={styles['popup-close-icon']} onClick={(e) => closeAndReload(e)}></div>
                    <div className={styles['comment-popup-flexbox']}>
                        <span>ขอบคุณสำหรับการรีวิว</span>
                        <span>
                            แอดมินกำลังตรวจสอบข้อความ<br />
                            ท่านจะได้รับการแจ้งเตือนผ่าน E-mail และเผยแพร่บนเว็บไซต์ภายใน 24 ช.ม.
                        </span>
                    </div>
                </div>
            </div>
        </Popup>
    </>;
}
