import { React, useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import Slider from 'react-slick';
import styles from '../styles/Tradition.module.scss'

function RightArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img src="/right-arrow.png" style={{ ...style, width: '32px', height: '64px', right: '-57px', top: '50%' }} className={className} onClick={onClick} alt="" />
    );
}
function LeftArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img src="/left-arrow.png" alt="" style={{ ...style, width: '32px', height: '64px', left: '-57px', top: '50%' }} className={className} onClick={onClick} />
    )
}


export default function monTraditionPopup({ open, onClose, activeMonTradition }) {

    const settings = {
        infinite: true,
        speed: 200,
        fade: true,
        dot: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <RightArrow />,
        prevArrow: <LeftArrow />

    }
    useEffect(() => {

    }, [activeMonTradition])
    return (
        <>
            <Popup
                open={open}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
            >
                <div className={styles['backdrop']} ></div>
                <div className="col-12">
                    <div className={styles['tradition-popup']}>
                        <img className={styles['popup-close-icon']} src='/Quit.png' onClick={() => onClose()} alt="" />
                        <div className={styles['tradition-flexbox']} >
                            <div className={styles['popup-name-box']} >
                                <span>{activeMonTradition.month === "เดือนมกราคม" ? `1.เดือนมกราคม`
                                    : activeMonTradition.month === 'เดือนกุมภาพันธ์' ? `2.เดือนกุมภาพันธ์`
                                        : activeMonTradition.month === 'เดือนมีนาคม' ? `3.เดือนมีนาคม`
                                            : activeMonTradition.month === 'เดือนเมษายน' ? `4.เดือนเมษายน`
                                                : activeMonTradition.month === 'เดือนพฤษภาคม' ? `5.เดือนพฤษภาคม`
                                                    : activeMonTradition.month === 'เดือนมิถุนายน' ? `6.เดือนมิถุนายน`
                                                        : activeMonTradition.month === 'เดือนกรกฎาคม' ? `7.เดือนกรกฎาคม`
                                                            : activeMonTradition.month === 'เดือนสิงหาคม' ? '8.เดือนสิงหาคม'
                                                                : activeMonTradition.month === 'เดือนกันยายน' ? '9.เดือนกันยายน'
                                                                    : activeMonTradition.month === 'เดือนตุลาคม' ? '10.เดือนตุลาคม'
                                                                        : activeMonTradition.month === 'เดือนพฤศจิกายน' ? '11.เดือนพฤศจิกายน'
                                                                            : activeMonTradition.month === 'เดือนธันวาคม' ? '12.เดือนธันวาคม' : ''
                                }<br /></span>
                                <span>{activeMonTradition.name}<br /></span>
                                <span className={styles['popup-local-name']} >{activeMonTradition.local_name ? `(${activeMonTradition.local_name})` : ''}</span>
                            </div>
                        </div>
                        {activeMonTradition.images.length > 0 ? (
                            <div className={styles['popup-slider-box']} >
                                <div className={styles['slider']}>
                                    <Slider {...settings} >
                                        {activeMonTradition.images ? activeMonTradition.images.map((image) => (
                                            <div key={image} className={styles['slider-box']}  ><div className={styles['mon-slider-image']} style={{ backgroundImage: `url(${image ? `${image}` : '/no-imge.png'})` }}></div></div>
                                        )) : ''}
                                    </Slider>
                                </div>
                            </div>
                        ) : ''}
                        <div className={styles['popup-detail-box']} >
                            {activeMonTradition.detail ? activeMonTradition.detail : ''}
                        </div>
                        <div className={styles['popup-credit-box']} >
                            <span><b>ภาพและข้อมูลจากเอกสาร</b><br /> ‘เล่าเรื่องประวัติศาสตร์ท้องถิ่นและวิถีวัฒนธรรมสังขละบุรี’ <br /> <b>จัดทำโดย</b> ศูนย์วัฒนธรรมอำเภอสังขละบุรี</span>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
