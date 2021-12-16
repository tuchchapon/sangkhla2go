import React from 'react'
import styles from '../styles/attraction.module.scss'
import Popup from 'reactjs-popup'
import Slider from 'react-slick';
export default function attractionPopup({activeAttraction,open,onClose}) {

    function RightArrow(props) {
        const { className, style, onClick } = props;
        return (
            <img src="/right-arrow.png" style={{...style,width:'32px',height:'64px',right:'-57px',top:'50%'}} className={className} onClick={onClick} alt="" />
        );
    }
    function LeftArrow(props){
        const {className , style , onClick} = props;
        return(
            <img src="/left-arrow.png" alt=""  style={{...style,width:'32px',height:'64px',left:'-57px',top:'50%'}} className={className}  onClick={onClick} />
        )
    }
    const settings = {
        infinite: true,
        speed: 200,
        fade:true,
        dot:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow:<RightArrow/>,
        prevArrow: <LeftArrow/>
        
    }
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
                        <div className={styles['attraction-popup']}>
                        <img className={styles['popup-close-icon']} src='/Quit.png' onClick={()=>onClose()}  alt="" />
                        <div className={styles['attraction-popup-namebox']} >
                        <img src="/glass.png" alt="" />
                        <span>{activeAttraction.name}</span>
                        </div>
                                        <div className={styles['slider']}>
                                        <Slider {...settings} >
                                                {activeAttraction.images.length >0 ? activeAttraction.images.map((image)=>(
                                                <div key={image} className={styles['slider-box']}  ><div className={styles['slider-image']} style={{backgroundImage:`url(${image ? `${process.env.IMAGE_PATH}/attraction/${image}`:'' })`}}></div></div>
                                                )):(
                                                    <div className={styles['slider-box']}  ><div className={styles['slider-image']} style={{backgroundImage:`url('/no-image-big.png')`}}></div></div>
                                                )}        
                                        </Slider>
                                    </div>
                        <div className={styles['popup-detail-box']} >
                          <span><b>คำบรรยาย : </b> {activeAttraction.detail ? activeAttraction.detail :''}</span>
                        </div>
                        </div>
                    </div>
                </Popup>
        </>
    )
}
