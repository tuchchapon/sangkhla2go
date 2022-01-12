import React from 'react'
import Slider from 'react-slick'
import Popup from 'reactjs-popup'
import styles from '../styles/PublicTranspotation.module.scss'

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


export default function boatPopup({ open, onClose, activeBoat }) {

    const settings = {
        infinite: true,
        speed: 200,
        fade: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <RightArrow />,
        prevArrow: <LeftArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    // slidesToShow: 3,
                    // slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,
                    // slidesToShow: 2,
                    // slidesToScroll: 2,
                    // initialSlide: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    dots: true,
                    arrows: false,
                    // slidesToShow: 2,
                    // slidesToScroll: 2,
                    // initialSlide: 2
                }
            },
        ]
    }


    return (
        <>
            <Popup
                open={open}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll>
                <div>
                    <div className={styles['backdrop']} ></div>
                    <div className={styles['popup-fixed-box']}>
                        <div className={styles['boat-popup']}>
                            <img className={styles['popup-close-icon']} src='/Quit.png' onClick={() => onClose()} alt="" />
                            <div className={styles['boat-column-box']}>
                                <span className={styles['popup-club-name']} >ชมรม : {activeBoat.club_name}</span>
                                <span className={styles['popup-boat-name']}>เรือ {activeBoat.provider_name}</span>
                                <div className={styles['boat-d-flex']} >
                                    <div className={styles['provider-detail-box']} >
                                        <img className={styles['boat-provider-image']} style={{ backgroundImage: `url(${activeBoat.provider_image ? `${activeBoat.provider_image}` : '/img/publictranspotation/provider-img-frame.png'})` }} src={activeBoat.provider_image ? '/img/publictranspotation/provider-img-frame.png' : '/img/publictranspotation/boatProviderPlaceholder.png'} alt="" />
                                        <div className={styles['provider-name-box']} >
                                            <p >เจ้าของเรือ</p>
                                            <span>{activeBoat.provider_name}</span>
                                        </div>
                                    </div>
                                    <div className={styles['boat-detail-box']} >
                                        <div className={styles['boat-driver-box']}>
                                            <span style={{ fontWeight: 'bold' }} >ผู้ขับเรือ : </span>
                                            <span>{activeBoat.driver_name}</span>
                                        </div>
                                        <div className={styles['text-column-box']}>
                                            <span className={styles['boat-left-text']}>จำนวนเรือ : </span>
                                            <span className={styles['boat-right-text']} >{activeBoat.boat_quantity} ลำ</span>
                                        </div>
                                        <div className={styles['text-column-box']}>
                                            <span className={styles['boat-left-text']} >จำนวนผู้โดยสารสูงสุด : </span>
                                            <span className={styles['boat-right-text']} >{activeBoat.max_passenger} คน</span>
                                        </div>
                                        <div className={styles['text-column-box']}>
                                            <span className={styles['boat-left-text']}>อุปกรณ์ความปลอดภัย : </span>
                                            <span className={styles['boat-right-text']} >มี</span>
                                        </div>
                                        <div className={styles['text-column-box']}>
                                            <span className={styles['boat-left-text']} >โทร :</span>
                                            <span className={styles['boat-right-text']} >{activeBoat.contact}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className={styles['boat-image-box']} >
                                    <div className={styles['slider']}>
                                        <Slider {...settings} >
                                            {activeBoat.boat_images.length > 0 ? activeBoat.boat_images.map((image) => (
                                                <div key={image} className={styles['slider-box']}  ><div className={styles['slider-image']} style={{ backgroundImage: `url(${image ? `${image}` : '/boat-placeholder.png'})` }}></div></div>
                                            )) : (<div className={styles['slider-box']}  ><div className={styles['slider-image']} style={{ backgroundImage: `url('/boat-placeholder.png')` }}></div></div>)}
                                        </Slider>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
