import {React,useState,useEffect} from 'react'
import Popup from 'reactjs-popup'
import axios from 'axios'
import Slider from 'react-slick'
import styles from '../styles/product.module.scss'
import Head from 'next/head'
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


export default function product() {
    const [activeTab, setActiveTab] = useState('karen')
    const [kerenFabric, setKerenFabric] = useState({
        id:'',name:'',fb_page:'',tel:'',link:'',images:[],detail:''
    })
    const [check_data, setCheck_data] = useState(false)

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
    
    useEffect(() => {
        const getProduct=async()=>{
            let data =  []
            const response = await axios.get('http://localhost:8080/get/products')
            if (response.status === 200) {
                // console.log(response.data.payload);
                
                data = response.data.payload
                console.log('data is',data);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name === "ผ้าทอมือกะเหรี่ยง") {
                        console.log('i is',i);
                        console.log("ผ้าทอมือกะเหรี่ยง");
                        // let karen_fabric = data[i]
                      let karen_fabric =  data.splice(i,1)
                      console.log('karen is',karen_fabric);
                    }
                    // console.log(data[i]);
                    
                }
                
                setCheck_data(true)
                // console.log('karen is',karen_fabric);
            }
        }
        if(!check_data) getProduct()

    }, [])
    return (
        <div className={styles['product-page']}>
            <Head>
                <title>
                ผลิตภัณฑ์ชุมชน
                </title>
            </Head>
            <div className={styles['header-box']}>
                <span>
                ผลิตภัณฑ์ชุมชน
                </span>
            </div>
            <div className="container">
                <div className="col-12">
                <div className={styles['tab-box']}>
                <div className={styles['product-tab']}>
                    <a href='#'>ผ้าทอมือกะเหรี่ยง</a>
                </div>
                <div className={styles['product-tab']}>
                    <a href='#'>ผลิตภัณฑ์ชุมชน</a>
                </div>
                <div className={styles['product-tab']}>
                    <a href='#'>หนังสือประวัติหลวงพ่ออุตมะ</a>
                </div>
                <div className={styles['product-tab']}>
                    <a href='#'>หนังสือภาพถ่ายสังขละ</a>
                </div>
            </div>
                </div>
            </div>
            <div className={styles['content-section']}>
                <div className="container">
                    <div className="col-12">
                        <div className={styles['content-box']}>
                            {activeTab === "karen"?(
                                <div className={styles['karen']}>
                                    <span className={styles['content-title']}>ผ้าทอมือกระเหรี่ยง</span>
                                    <span>
                                    ผ้าทอพื้นบ้านของชาวกะเหรี่ยงของตำบลหนองลู อำเภอสังขละบุรี ส่วนใหญ่จะอยู่ที่บ้านเวียคะดี้และบ้านโมรข่า 
                                    มีการทอผ้าใช้กันเองมาตั้งแต่สมัยโบราณ เป็นการผลิตที่ครบวงจร คือเริ่มตั้งแต่ปลูกฝ้าย นำปุยฝ้ายมาปั่นเป็นเส้นด้ายย้อมสี 
                                    และทอเป็นเครื่องนุ่งห่ม เครื่องใช้ต่างๆ ในชีวิตประจำวัน เช่น ผ้าห่ม ผ้าถุง เสื้อ ผ้าโพกศีรษะ ย่าม ผ้าเช็ดหน้า ผ้าเช็ดปาก 
                                    เป็นต้น ลักษณะและลวดลายผ้าเป็นลายโบราณที่ทอกันมาตั้งแต่ดั้งเดิม เป็นเอกลักษณ์เฉพาะของชาวกะเหรี่ยงที่นี่ ทั่งลวดลายและสี 
                                    โดยเฉพาะสีจะเน้นสีแดงเป็นหลักแทรกด้วยสีอื่นๆ บ้าง เช่น สีดำ สีเขียว และสีแดง ผ้าทอของชาวกะเหรี่ยงเวียคะดี้ 
                                    นับเป็นภูมิปัญญาท้องถิ่นที่สวยงามทั้งสีสันและลวดลาย ปัจจุบันชาวกระเหรี่ยงจะนำผ้าทอออกมาขายในตลาดสังขละบุรี 
                                    ผู้ที่ไปท่องเที่ยวที่ชอบผ้าทอจะซื้อมาใช้และเป็นของฝาก เพราะลวดลายแปลกตา สวยงาม
                                    ติดต่อ ป้ามะติ่งเยง (บ้านโมรข่า) โทร. 0855791907  
                                    </span>
                                    <div className={styles['slider']}>
                                        <Slider {...settings}>
                                            <div className={styles['slider-box']}>
                                                <div className={styles['slider-image']}>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                </div>
                            ):activeTab === "product" ? (
                                <div className={styles['product-list']}>

                                </div>
                            ):activeTab === "uttama" ? (
                             <div className={styles['uttama-book']}>

                             </div>   
                            ):activeTab === "photo-book"?(
                                <div className={styles['photo-book']}>

                                </div>
                            ):''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
