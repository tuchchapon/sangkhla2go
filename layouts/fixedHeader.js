import { React, useState } from 'react'
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';
import styles from '../styles/Home.module.scss'
export default function fixedHeader() {
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)
    const openMenu = (e) => {
        if (e) e.preventDefault()
        console.log('open');
        setShowMenu(true)
    }
    const toReview = (e) => {
        if (e) e.preventDefault()
        document.getElementById("review-section").scrollIntoView({ behavior: 'smooth' })
        setShowMenu(false)
    }
    const closePopup = (e) => {
        if (e) e.preventDefault()
        setShowMenu(false)
    }
    return (
        <>
            <div>
                <div className={styles['fixed-header-box']}>
                    <div onClick={(e) => openMenu()} className={styles['menu-box']}>
                        <img src="/menu.png" alt="" />
                        <span className={styles['menu-text']} >เมนู</span>
                    </div>
                    <Popup
                        open={(e) => e.preventDefault(), showMenu}
                        closeOnEscape={true}
                        closeOnDocumentClick={true}
                        onClose={(e) => closePopup(e)}
                        lockScroll
                    >
                        <div onClick={(e) => closePopup(e)} className={styles['menu-backdrop']}></div>
                        <div className={styles['menu-fixed-box']}>

                            <div className={styles['dropdown-menu-box']}>
                                <div onClick={(e) => closePopup(e)} className={styles['in-menu-box']}>
                                    <img src="/menu.png" alt="" />
                                    <span className={styles['in-menu-text']} >เมนู</span>
                                </div>
                                <div className={styles['dropdown-menu']} >
                                    <div className={styles['menu-list']}>
                                        <div onClick={() => router.push('/accommodation')} className={styles['menu-item']}>
                                            <div className={styles['accom-menu']}>
                                                <div></div>
                                                <span>ที่พัก</span>
                                            </div>
                                        </div>
                                        <div onClick={() => router.push('/attraction')} className={styles['menu-item']}>
                                            <div className={styles['attraction-menu']}>
                                                <div></div>
                                                <span>ที่เที่ยว</span>
                                            </div>
                                        </div>
                                        <div onClick={() => router.push('/restaurant')} className={styles['menu-item']}>
                                            <div className={styles['restaurant-menu']}>
                                                <div></div>
                                                <span>ร้านอาหาร/กาแฟ</span>
                                            </div>
                                        </div>
                                        <div onClick={() => router.push('/publicTransportation')} className={styles['menu-item']}>
                                            <div className={styles['pt-menu']}>
                                                <div></div>
                                                <span>ขนส่งสาธารณะ</span>
                                            </div>
                                        </div>
                                        <div onClick={() => router.push('/traditions')} className={styles['menu-item']}>
                                            <div className={styles['tradition-menu']}>
                                                <div></div>
                                                <span>วัฒนธรรม</span>
                                            </div>
                                        </div>
                                        <div className={styles['menu-item']}>
                                            <div onClick={() => router.push('/product')} className={styles['product-menu']}>
                                                <div></div>
                                                <span>ผลิตภัณฑ์ชุมชน</span>
                                            </div>
                                        </div>
                                        <div className={styles['menu-item']}>
                                            <div onClick={() => router.push('/comment')} className={styles['review-menu']}>
                                                <div></div>
                                                <span>รีวิว</span>
                                            </div>
                                        </div>
                                        <div onClick={() => router.push('/officer')} className={styles['menu-item']}>
                                            <div></div>
                                            <span>ผู้จัดทำ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Popup>
                </div>
            </div>
        </>
    )
}
