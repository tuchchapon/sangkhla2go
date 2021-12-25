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


export default function traditionPopup({ open, onClose, activeKarenTradition }) {


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

    }, [activeKarenTradition])

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
                                <span>{activeKarenTradition.month === "เดือนมกราคม" ? `1.เดือนมกราคม`
                                    : activeKarenTradition.month === 'เดือนกุมภาพันธ์' ? `2.เดือนกุมภาพันธ์`
                                        : activeKarenTradition.month === 'เดือนมีนาคม' ? `3.เดือนมีนาคม`
                                            : activeKarenTradition.month === 'เดือนเมษายน' ? `4.เดือนเมษายน`
                                                : activeKarenTradition.month === 'เดือนพฤษภาคม' ? `5.เดือนพฤษภาคม`
                                                    : activeKarenTradition.month === 'เดือนมิถุนายน' ? `6.เดือนมิถุนายน`
                                                        : activeKarenTradition.month === 'เดือนกรกฎาคม' ? `7.เดือนกรกฎาคม`
                                                            : activeKarenTradition.month === 'เดือนสิงหาคม' ? '8.เดือนสิงหาคม'
                                                                : activeKarenTradition.month === 'เดือนกันยายน' ? '9.เดือนกันยายน'
                                                                    : activeKarenTradition.month === 'เดือนตุลาคม' ? '10.เดือนตุลาคม'
                                                                        : activeKarenTradition.month === 'เดือนพฤศจิกายน' ? '11.เดือนพฤศจิกายน'
                                                                            : activeKarenTradition.month === 'เดือนธันวาคม' ? '12.เดือนธันวาคม' : ''
                                }<br /></span>
                                <span>{activeKarenTradition.name}<br /></span>
                                <span className={styles['popup-local-name']} >{activeKarenTradition.local_name ? `(${activeKarenTradition.local_name})` : ''}</span>
                            </div>

                        </div>
                        {activeKarenTradition.images.length > 0 ? (
                            <div className={styles['popup-slider-box']} >
                                <div className={styles['slider']}>
                                    <Slider {...settings} >
                                        {activeKarenTradition.images ? activeKarenTradition.images.map((image) => (
                                            <div key={image} className={styles['slider-box']}  ><div className={styles['slider-image']} style={{ backgroundImage: `url(${image ? `${image}` : ''})` }}></div></div>
                                        )) : ''}
                                    </Slider>
                                </div>
                            </div>
                        ) : ''}
                        <div className={styles['popup-detail-box']} >
                            {activeKarenTradition.detail ? activeKarenTradition.detail : ''}
                        </div>
                        <div className={styles['popup-credit-box']} >
                            <span><b>ข้อมูลจากเอกสาร</b><br /> ‘เล่าเรื่องประวัติศาสตร์ท้องถิ่นและวิถีวัฒนธรรมสังขละบุรี’ <br /> <b>จัดทำโดย</b> ศูนย์วัฒนธรรมอำเภอสังขละบุรี</span>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
