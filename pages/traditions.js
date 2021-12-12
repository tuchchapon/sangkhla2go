import {React,useState,useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'
import Popup from 'reactjs-popup';
import Slider from 'react-slick';
import styles from '../styles/Tradition.module.scss'

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

export default function traditions() { 
    const [karenTraditions, setKarenTraditions] = useState([])
    const [monTraditions, setMonTraditions] = useState([])
    const [showMonTradition, setShowMonTradition] = useState(false)
    const [showKarenTradition, setShowKarenTradition] = useState(false)
    const [activeKarenTradition, setActiveKarenTradition] = useState({
        id:'',type:'',name:'',local_name:'',month:'',detail:'',images:[]
    })
    const [activeMonTradition, setActiveMonTradition] = useState({
        id:'',type:'',name:'',local_name:'',month:'',detail:'',images:[]
    })
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
    const showPopup =(tradition,type)=>{
        console.log('tradition is',tradition);
        console.log('type is',type);
        if (type === "karen") {
            console.log('karen popup open');
            setActiveKarenTradition(tradition)
            setShowKarenTradition(true)
        }
        if (type === "mon") {
            console.log('mon pop up open');
            setActiveMonTradition(tradition)
            setShowMonTradition(true)
        }
    }
    const closePopup =(e)=>{
        if(e) e.preventDefault()
        setShowKarenTradition(false)
        setShowMonTradition(false)
        
    }
    useEffect(() => {
        let componentMounted = true;
        const getTraditions =async()=>{
            let response = await axios.get('http://localhost:8080/get/traditions')
            console.log(response.data.payload);
            if(componentMounted) {
                setKarenTraditions(response.data.payload.karen_tradition)
                setMonTraditions(response.data.payload.mon_tradition)
              }
        }
        getTraditions()
        return () => {
            componentMounted = false;
           }
    }, [])
    return (
        <div className={styles['tradition-page']} >
            <Head>
                <title>
                    ประเพณี
                </title>
            </Head>
            <img className={styles['header-background']} src="/img/tradition/tradition-background.png" alt="" />
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <div  className={styles['tradition-title-box']} >
                            <img src="/img/tradition/tradition-title-box.png" alt="" />
                            <span className={styles['tradition-title-name']} >ประเพณีชาวกระเหรี่ยง</span>
                        </div>
                    </div>
                    <div className="col-7">
                    <div className={styles['header-title-box']} >
            <div className={styles['title-page']}   >
            <img src="/img/tradition/title-background.png" alt="" />
            <span className={styles['title-page-name']} >ประเพณี</span>
            </div>
           </div>
            </div>
            </div>
            </div>
            <div className="container">
                
                    <div className="col-12">
                        <div className={styles['traditions-list']}>
                            <div className={styles['tradition-box']}>
                                {karenTraditions.length > 0 ? karenTraditions.map((karenTradition)=>(
                                    <div key={karenTradition.id} className={styles['tradition-item']} onClick={(e)=>showPopup(karenTradition,"karen")} >
                                        <div className={styles['image-box-size']}>
                                        <div  className={styles['tradition-image-box']} style={{backgroundImage:`url('/img/tradition/tradition-frame.png')`}}>
                                            <div  style={{backgroundImage:`url(${karenTradition.images.length >0 ? `/uploadImage/tradition/${karenTradition.images[0]}`:'/img/tradition/traditionPlaceholder.png'})`}} className={styles['tradition-image']}></div>
                                            {/* <img className={styles['tradition-image']} src={karenTradition.images.length > 0? `/uploadImage/tradition/${karenTradition.images[0]}`:'/img/tradition/traditionPlaceholder.png'} alt="" /> */}
                                            {/* <img className={styles['tradition-image-frame']} src="/img/tradition/tradition-frame.png" alt="" /> */}
                                            {/* <img className={styles['tradition-image']} src={karenTradition.images.length > 0 ? `/uploadImage/tradition/${karenTradition.images[0]}`:'/img/tradition/traditionPlaceholder.png'} alt="" /> */}
                                        </div>
                                        </div>
                                        <div className={styles['month-name-box']} onClick={()=>console.log(karenTradition)} ><span>{karenTradition.month}</span></div>
                                        <span className={styles['tradition-name']} >{karenTradition.name}</span>
                                        <span className={styles['tradition-local-name']} >{karenTradition.local_name ? `(${karenTradition.local_name})` :''}</span>
                                        {/* <div>()</div> */}
                                    </div>
                                )):''}
                            </div>
                            <div className={styles['tradition-grid-box']}>
                                <div className={styles['black-line']} ></div>
                                <div className={styles['mon-tradition-title']} >
                                   <span>ประเพณีชาวมอญ</span>
                                </div>
                            </div>
                            <div className={styles['tradition-box']}>
                            {monTraditions.length > 0 ? monTraditions.map((montradition)=>(
                                    <div key={montradition.id} className={styles['tradition-item']} onClick={(e)=>showPopup(montradition,"mon")} >
                                        <div className={styles['image-box-size']}>
                                        <div  className={styles['tradition-image-box']} style={{backgroundImage:`url('/img/tradition/tradition-frame.png')`}}>
                                            <div  style={{backgroundImage:`url(${montradition.images.length >0 ? `/uploadImage/tradition/${montradition.images[0]}`:'/img/tradition/traditionPlaceholder.png'})`}} className={styles['tradition-image']}></div>
                                        </div>
                                        </div>
                                        <div className={styles['month-name-box']} onClick={()=>console.log(montradition)} ><span>{montradition.month}</span></div>
                                        <span className={styles['tradition-name']} >{montradition.name}</span>
                                        {/* <span className={styles['tradition-local-name']} >{montradition.local_name ? `(${montradition.local_name})` :''}</span> */}
                                        {/* <div>(ข้อมูลจากเอกสาร ‘เล่าเรื่องประวัติศาสตร์ท้องถิ่นและวิถีวัฒนธรรมสังขละบุรี’ จัดทำโดย ศูนย์วัฒนธรรมอำเภอสังขละบุรี)</div> */}
                                    </div>
                                )):''}
                            </div>
                        </div>
                    </div>
                </div>
                <Popup
                open={showKarenTradition}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
                >
                    <div className={styles['backdrop']} ></div>
                    <div className="col-12">
                        <div className={styles['tradition-popup']}>
                        <img className={styles['popup-close-icon']} src='/Quit.png' onClick={(e)=>closePopup(e)}  alt="" />
                        <div className={styles['tradition-flexbox']} >
                            <div className={styles['popup-name-box']} >
                                <span>{activeKarenTradition.month === "เดือนมกราคม" ? `1.เดือนมกราคม`
                                :activeKarenTradition.month === 'เดือนกุมภาพันธ์' ? `2.เดือนกุมภาพันธ์`
                                :activeKarenTradition.month === 'เดือนมีนาคม'? `3.เดือนมีนาคม`
                                :activeKarenTradition.month === 'เดือนเมษายน' ? `4.เดือนเมษายน`
                                :activeKarenTradition.month === 'เดือนพฤษภาคม'? `5.เดือนพฤษภาคม`
                                :activeKarenTradition.month === 'เดือนมิถุนายน' ? `6.เดือนมิถุนายน`
                                :activeKarenTradition.month === 'เดือนกรกฎาคม' ? `7.เดือนกรกฎาคม`
                                :activeKarenTradition.month === 'เดือนสิงหาคม' ? '8.เดือนสิงหาคม'
                                :activeKarenTradition.month === 'เดือนกันยายน' ? '9.เดือนกันยายน'
                                :activeKarenTradition.month === 'เดือนตุลาคม' ? '10.เดือนตุลาคม'
                                :activeKarenTradition.month === 'เดือนพฤศจิกายน' ? '11.เดือนพฤศจิกายน'
                                :activeKarenTradition.month === 'เดือนธันวาคม' ? '12.เดือนธันวาคม':''
                             }<br/></span>
                             <span>{activeKarenTradition.name}<br/></span>
                             <span className={styles['popup-local-name']} >{activeKarenTradition.local_name ? `(${activeKarenTradition.local_name})`:''}</span>
                            </div>
                            
                        </div>
                        {activeKarenTradition.images.length > 0 ?(
                                        <div className={styles['popup-slider-box']} >
                                        <div className={styles['slider']}>
                                        <Slider {...settings} >
                                                {activeKarenTradition.images ? activeKarenTradition.images.map((image)=>(
                                                <div key={image} className={styles['slider-box']}  ><div className={styles['slider-image']} style={{backgroundImage:`url(${image ? `/uploadImage/tradition/${image}`:'' })`}}></div></div>
                                                )):''}        
                                        </Slider>
                                    </div>
                                </div>
                                ):''}
                        <div className={styles['popup-detail-box']} >
                            {activeKarenTradition.detail ? activeKarenTradition.detail:''}
                        </div>
                        <div className={styles['popup-credit-box']} >
                            <span><b>ข้อมูลจากเอกสาร</b><br/> ‘เล่าเรื่องประวัติศาสตร์ท้องถิ่นและวิถีวัฒนธรรมสังขละบุรี’ <br/> <b>จัดทำโดย</b> ศูนย์วัฒนธรรมอำเภอสังขละบุรี</span>
                        </div>
                        </div>
                    </div>
                </Popup>
                <Popup
                open={showMonTradition}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
                >
                    <div className={styles['backdrop']} ></div>
                    <div className="col-12">
                        <div className={styles['tradition-popup']}>
                        <img className={styles['popup-close-icon']} src='/Quit.png' onClick={(e)=>closePopup(e)}  alt="" />
                        <div className={styles['tradition-flexbox']} >
                            <div className={styles['popup-name-box']} >
                                <span>{activeMonTradition.month === "เดือนมกราคม" ? `1.เดือนมกราคม`
                                :activeMonTradition.month === 'เดือนกุมภาพันธ์' ? `2.เดือนกุมภาพันธ์`
                                :activeMonTradition.month === 'เดือนมีนาคม'? `3.เดือนมีนาคม`
                                :activeMonTradition.month === 'เดือนเมษายน' ? `4.เดือนเมษายน`
                                :activeMonTradition.month === 'เดือนพฤษภาคม'? `5.เดือนพฤษภาคม`
                                :activeMonTradition.month === 'เดือนมิถุนายน' ? `6.เดือนมิถุนายน`
                                :activeMonTradition.month === 'เดือนกรกฎาคม' ? `7.เดือนกรกฎาคม`
                                :activeMonTradition.month === 'เดือนสิงหาคม' ? '8.เดือนสิงหาคม'
                                :activeMonTradition.month === 'เดือนกันยายน' ? '9.เดือนกันยายน'
                                :activeMonTradition.month === 'เดือนตุลาคม' ? '10.เดือนตุลาคม'
                                :activeMonTradition.month === 'เดือนพฤศจิกายน' ? '11.เดือนพฤศจิกายน'
                                :activeMonTradition.month === 'เดือนธันวาคม' ? '12.เดือนธันวาคม':''
                             }<br/></span>
                             <span>{activeMonTradition.name}<br/></span>
                             <span className={styles['popup-local-name']} >{activeMonTradition.local_name ? `(${activeMonTradition.local_name})`:''}</span>
                            </div>
                            
                        </div>
                        {activeMonTradition.images.length > 0 ?(
                                        <div className={styles['popup-slider-box']} >
                                        <div className={styles['slider']}>
                                        <Slider {...settings} >
                                                {activeMonTradition.images ? activeMonTradition.images.map((image)=>(
                                                <div key={image} className={styles['slider-box']}  ><div className={styles['mon-slider-image']} style={{backgroundImage:`url(${image ? `/uploadImage/tradition/${image}`:'/no-imge.png' })`}}></div></div>
                                                )):''}        
                                        </Slider>
                                    </div>
                                </div>
                                ):''}
                        <div className={styles['popup-detail-box']} >
                            {activeMonTradition.detail ? activeMonTradition.detail:''}
                        </div>
                        <div className={styles['popup-credit-box']} >
                            <span><b>ภาพและข้อมูลจากเอกสาร</b><br/> ‘เล่าเรื่องประวัติศาสตร์ท้องถิ่นและวิถีวัฒนธรรมสังขละบุรี’ <br/> <b>จัดทำโดย</b> ศูนย์วัฒนธรรมอำเภอสังขละบุรี</span>
                        </div>
                        </div>
                    </div>
                </Popup>
        </div>
    )
}
