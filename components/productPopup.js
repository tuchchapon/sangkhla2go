import { React, useState } from 'react'
import styles from '../styles/product.module.scss'
import Popup from 'reactjs-popup'
import Slider from 'react-slick'
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


export default function productPopup({ open, onClose, activeProduct }) {
    const [nowDots, setNowDots] = useState(0)
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
                    infinite: true,
                    dots: false,
                    arrows: true,
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    autoplay: false,
                    dots: true,
                    arrows: false,
                    dotsClass: styles['slick'],
                    beforeChange: (prev, next) => {
                        // this.setState({ currentSlide: next });
                        setNowDots(next)
                    },
                    customPaging: (i) => (
                        <div
                            className={styles['slider-dots']}
                            style={{
                                backgroundColor: `${i === nowDots ? '#383838' : '#757575'}`,
                            }}

                        >
                        </div>
                    ),
                }
            },
        ]

    }
    const toLink = (e, link) => {
        if (e) e.preventDefault()
        window.open(`${link}`)
    }
    return (
        <>
            <Popup
                open={open}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
            >
                <div className={styles['backdrop']}></div>
                <div className={styles['popup-fixed-box']}>
                    <div className={styles['product-popup']}>
                        <img onClick={() => onClose()} className={styles['close-popup-icon']} src="/Quit.png" alt="" />
                        <div className={styles['product-flexbox']}>
                            <div className={styles['popup-name-box']}>
                                <span>{activeProduct.name}</span>
                            </div>
                            <div className={styles['popup-slider']}>
                                <Slider {...settings} >
                                    {activeProduct.images ? activeProduct.images.map((image) => (
                                        <div key={image} className={styles['popup-slider-box']}  ><div className={styles['popup-slider-image']} style={{ backgroundImage: `url(${image ? `${image}` : ''})` }}></div></div>
                                    )) : (
                                        <div className={styles['slider-box']}  ><div className={styles['popup-slider-image']} style={{ backgroundImage: `url('/no-image-big.png')` }}></div></div>
                                    )}
                                </Slider>
                            </div>
                            <div className={styles['popup-detail-box']}>
                                <span>{activeProduct.detail}</span>
                            </div>
                            <div className={styles['icon-row-box']}>
                                {activeProduct.fb_page ? (
                                    <div className={styles['fb-box']}>
                                        <img src="/fb-icon.png" alt="" />
                                        <span>{activeProduct.fb_page}</span>
                                    </div>
                                ) : ''}
                                {activeProduct.tel ? (
                                    <div className={activeProduct.fb_page ? styles['tel-box'] : styles['tel-box-no-border']}>
                                        <img src="/tel-icon-2.png" alt="" />
                                        <span>{activeProduct.tel}</span>
                                    </div>
                                ) : ''}
                                {activeProduct.link ? (
                                    <div className={activeProduct.fb_page || activeProduct.tel ? styles['link-box'] : styles['link-box-no-border']}>
                                        <span onClick={(e) => toLink(e, activeProduct.link)} >ข้อมูลเพิ่มเติม</span>
                                    </div>
                                ) : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
