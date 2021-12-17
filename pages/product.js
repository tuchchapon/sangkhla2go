import {React,useState,useEffect} from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import styles from '../styles/product.module.scss'
import Head from 'next/head'
import ProductPopup from '../components/productPopup'

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
    const [karenFabric, setKarenFabric] = useState({
        id:'',name:'',fb_page:'',tel:'',link:'',images:[],detail:''
    })
    const [check_data, setCheck_data] = useState(false)
    const [products, setProducts] = useState([])
    // const [showPopup, setShowPopup] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [activeProduct, setActiveProduct] = useState({
        id:'',name:'',fb_page:'',tel:'',link:'',images:[],detail:''
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
    const openPopup=(e,product)=>{
        if(e) e.preventDefault()
        console.log(product);
        setActiveProduct(product)
        setShowProduct(true)
    }
    const closePopup =(e)=>{
        if(e) e.preventDefault()
        setShowProduct(false)
    }
    const changeTab=(e,type)=>{
        if(e) e.preventDefault()
        setActiveTab(type)
        console.log(karenFabric);
    }
    useEffect(() => {
        const getProduct=async()=>{
            let data =  []
            let karen_fabric ={ id:'',name:'',fb_page:'',tel:'',link:'',images:[],detail:''}
            const response = await axios.get(`${process.env.SERVER_API}/get/products`)
            if (response.status === 200) {
                // console.log(response.data.payload);
                data = response.data.payload
                console.log('data is',data);

                for (let i = 0; i < data.length; i++) {
                    if (data[i].name === "ผ้าทอมือกะเหรี่ยง") {
                      karen_fabric = data[i]
                      data.splice(i,1)
                       
                    }            
                }
                setProducts(data)
                setKarenFabric(karen_fabric)
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
                <div onClick={(e)=>changeTab(e,"karen")} className={activeTab === "karen"? styles['product-tab-active'] :styles['product-tab']}>
                    <a href='#'>ผ้าทอมือกะเหรี่ยง</a>
                </div>
                <div onClick={(e)=>changeTab(e,"product")} className={activeTab === "product" ? styles['product-tab-active'] :styles['product-tab']}>
                    <a href='#'>ผลิตภัณฑ์ชุมชน</a>
                </div>
                <div onClick={(e)=>changeTab(e,"uttama")} className={activeTab === "uttama" ? styles['product-tab-active'] :styles['product-tab']}>
                    <a href='#'>หนังสือประวัติหลวงพ่ออุตมะ</a>
                </div>
                <div onClick={(e)=>changeTab(e,"photo-book")} className={activeTab === "photo-book" ? styles['product-tab-active'] :styles['product-tab']}>
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
                                    <span className={styles['content-title']}>{karenFabric.name}</span>
                                    <span className={styles['content-text']}>{karenFabric ? karenFabric.detail:''}</span>
                                    <div className={styles['slider']}>
                                    <Slider {...settings} >
                                                {karenFabric.images.length >0 ? karenFabric.images.map((image)=>(
                                                <div key={image} className={styles['slider-box']}  ><div className={styles['slider-image']} style={{backgroundImage:`url(${image ? `/uploadImage/product/${image}`:'' })`}}></div></div>
                                                )):(
                                                    <div className={styles['slider-box']}  ><div className={styles['slider-image']} style={{backgroundImage:`url('/no-image-big.png')`}}></div></div>
                                                )}        
                                        </Slider>
                                    </div>
                                    <span className={styles['contact-text']}>
                                    ติดต่อ ป้ามะติ่งเยง (บ้านโมรข่า)
                                    </span>
                                   <div className={styles['icon-row-box']}>
                                   <div className={styles['tel-box']}>
                                        <img src="/tel-icon.png" alt="" />
                                        <span>085-579-1907 </span>
                                    </div>
                                    <div className={styles['link-box']}> 
                                        <span><a  target="_blank" href={`${karenFabric.link}`}>ชมภาพและเรื่องราวเพิ่มเติม</a></span>
                                    </div>
                                   </div>
                                </div>
                            ):activeTab === "product" ? (
                                <div className={styles['product-list']}>
                                    {products.length > 0 ? products.map((product)=>(
                                        <div onClick={(e)=>openPopup(e,product)} key={product.id} className={styles['product-item']}>
                                            <div className={styles['product-image-box']}>
                                            <div style={{backgroundImage:`url(${product.images.length > 0 ? `/uploadImage/product/${product.images[0]}`:'/no-imge.png'})`}}></div>
                                            </div>
                                            <div className={styles['product-name-box']}>
                                                <span>{product.name}</span>
                                            </div>
                                        </div>
                                    )):''}
                                </div>
                            ):activeTab === "uttama" ? (
                             <div className={styles['uttama-book']}>
                                 <span className={styles['content-title']}>
                                     หลวงพ่ออุตมะ 84 ปี
                                 </span>
                                 <span className={styles['content-text']}>
                                 หนังสือเล่มหนาขนาดใหญ่ จัดพิมพ์เป็นที่ระลึกในงานฉลองชนมายุ 84 ปี หลวงพ่ออุตตมะหรือพระราชอุดมมงคล 
                                 พหลนราทร มหาคณิสสร บวรสังฆาราม คามวาสี แห่งวัดวังก์ วิเวการาม อำเภอสังขละบุรี จังหวัดกาญจนบุรี 
                                 ในรูปเล่มปกแข็ง-แข็งแรง จัดพิมพ์เมื่อ พ.ศ.2537 ภายในเล่มประกอบไปด้วย 4 ภาค คือ
                                 </span>
                                 <div className={styles['row-box']}>
                                    <div className={styles['left-box']}>
                                        <div className={styles['book-frame']}>
                                            <img src="/img/product/uttama-book1.png" alt="" />
                                        </div>
                                        <span>(ปกอ่อน)</span>
                                        <div className={styles['book-frame']}>
                                        <img src="/img/product/uttama-book2.png" alt="" />
                                        </div>
                                        <span>(ปกแข็ง)</span>
                                    </div>
                                    <div className={styles['right-box']}>
                                        <div className={styles['text-pa1']}>
                                            <span>
                                            ภาค 1 มุฑิตา-สักการะ <br/> จากสมเด็จพระญาณสังวร 
                                            สมเด็จพระสังฆราช สกลมหาสังฆปรินายก และพระชั้นผู้ใหญ่ทั่วประเทศ 
                                            </span>
                                        </div>
                                        <div className={styles['text-pa2']}>
                                            <span>
                                            ภาค 2 ชีวประวัติ <br/>  แบ่งเป็นประวัติสังเขปกับประวัติโดยละเอียด ส่วนแรกคือประวัติสังเขป 
                                        เล่าเส้นทางชีวิตอย่างย่อตั้งแต่ชาติภูมิ บรรพชา อุปสมบท วิทยฐานะการศึกษาเล่าเรียน 
                                        การทำงานด้านต่างๆ ทั้งด้านปกครอง ด้านการศึกษา ด้านการเผยแผ่ ด้านสาธารณูปการ 
                                        รวมถึงเกียรติคุณที่ได้รับการยกย่องและสมณศักดิ์ โดยแต่ละหัวข้อเรียงลำดับตามวันเวลา 
                                        อีกส่วนในภาคนี้คือประวัติโดยละเอียด ส่วนนี้ถือเป็นความโดดเด่นของเล่ม เพราะพรรณาชีวิตหลวงพ่ออุตตมะแต่ละช่วงไว้อย่างละเอียด 
                                        ตั้งแต่เกิดในหมู่บ้านชาวมอญ บ้านโมกคะเนียง อำเภอเย จังหวัดมะละแหม่ง ประเทศพม่า 
                                        รวมถึงประวัติครอบครัว การเริ่มบวชเณร การตัดสินใจบวชไม่สึก นิสัยในวัยเยาว์และความพากเพียรของหลวงพ่อ 
                                        ทั้งประวัติศาสตร์สงครามโลกครั้ง 2 ตอนญี่ปุ่นบุกพม่า หลวงพ่ออุตตมะก็มีส่วนช่วยเจรจากับกลุ่มโจร จนท่านเดินทางเข้าสู่ประเทศไทย 
                                        ก่อสร้างวัดและอื่นๆ จนกลายเป็นศูนย์รวมศรัทธาของชาวสังขละบุรี ในแต่ละช่วงละฉากมีความน่าสนใจในวิธีการเล่า มีทั้งเรื่องเล่า ตำนานพื้นถิ่น ความเชื่อ ความศรัทธาของชาวบ้าน ผสมผสานชวนตื่นตะลึงกับเรื่องราวชีวิตของหลวงพ่ออุตตมะ 
                                            </span>
                                        </div>
                                        <div className={styles['text-pa3']}>
                                        <span>
                                        ภาค 3 ปกิณณกธรรม <br/>  เป็นการรวบรวมคาถาบทสวดมนต์ที่หลวงพ่ออุตตมะใช้เป็นประจำอย่างละเอียด ทั้งการสวดแบบไทยและแบบมอญ รวมทั้งสูตรตำรายาโบราณในการรักษาโรคภัยต่างๆ
                                        </span>
                                        </div>
                                        <div className={styles['text-pa4']}>
                                            <span>
                                            ภาค 4 แนวธรรมปฏิบัติของหลวงพ่ออุตตมะ <br/>  ผู้เป็นศูนย์รวมศรัทธา ทำนุบำรุงพุทธศาสนามาต่อเนื่องยาวนาน  
                                            </span>
                                        </div>
                                    </div>
                                 </div>
                                 <span className={styles['contact-text']}>
                                    ติดต่อ สำนักพิมพ์บ้านแม่น้ำ
                                    </span>
                                   <div className={styles['icon-row-box']}>
                                   <div className={styles['fb-box']}>
                                        <img src="/fb-icon.png" alt="" />
                                        <span>บ้านแม่น้ำ</span>
                                    </div>
                                    <div className={styles['tel-box']}>
                                        <img src="/tel-icon.png" alt="" />
                                        <span>087-519-9150</span>
                                    </div>
                                   </div>
                             </div>   
                            ):activeTab === "photo-book"?(
                                <div className={styles['photo-book']}>
                                    <div className={styles['book-frame']}>
                                        <img src="/img/product/photo-book.jpg" alt="" />
                                    </div>
                                    <span className={styles['content-title']}>
                                        สังขละบุรี เสน่ห์แห่งวัฒนธรรม พลังแห่งศรัทธา
                                    </span>
                                    <span className={styles['content-text']}>
                                    เป็นหนังสือประวัติศาสตร์ร่วมสมัยของชาวสังขละบุรี โดยบันทึกผ่านภาพถ่าย จากช่างภาพมากฝีมือ ทั้งช่างภาพกิตติมศักดิ์สองศิลปินแห่งชาติ 
                                    ’ยรรยง โอฬาระชิน’ ‘วรนันท์ ชัชวาลทิพากร’ และช่างภาพทั่วประเทศที่เคยมาบันทึกฉากมุมของสังขละบุรีไว้
                                     ตลอดเล่มกว่า 1,000 ภาพ สอดแทรกคำบรรยายเกร็ดความรู้ต่างๆ ไว้บ้าง ทั้งประวัติศาสตร์ของสถานที่สำคัญๆ 
                                     วิถีวัฒนธรรมอันเป็นเอกลักษณ์เฉพาะของสังขละบุรี การใช้ชีวิตของคนในชุมชน การปรับตัวกับความเปลี่ยนแปลงเมื่อกลายเป็นเมืองท่องเที่ยวเต็มตัว 
                                     ประเพณีต่างๆ ในรอบปี เช่นตักบาตรดอกไม้ ขนทรายเข้าวัดก่อเจดีย์ทราย ลอยเรือสะเดาะห์เคราะห์บุญเดือนสิบ 
                                     สรงน้ำพระภิกษุวันสงกรานต์ผ่านรางกระบอกไม้ไผ่ ผู้คนบนสะพาน เด็กๆ บนสะพาน วิถีชีวิตชาวบ้านกับการหาปลา ฯลฯ 
                                     การบอกเล่าเรื่องราวผ่านภาพถ่ายอันมีความหมาย เปี่ยมเสน่ห์ นับว่าเป็นหนังสือทรงคุณค่าอย่างยิ่ง
                                    </span>
                                    <span className={styles['contact-text']}>
                                    ติดต่อ สำนักพิมพ์บ้านแม่น้ำ
                                    </span>
                                   <div className={styles['icon-row-box']}>
                                   <div className={styles['fb-box']}>
                                        <img src="/fb-icon.png" alt="" />
                                        <span>บ้านแม่น้ำ</span>
                                    </div>
                                    <div className={styles['tel-box']}>
                                        <img src="/tel-icon.png" alt="" />
                                        <span>087-519-9150</span>
                                    </div>
                                   </div>
                                </div>
                            ):''}
                        </div>
                    </div>
                </div>
            </div>
            <ProductPopup open={showProduct} onClose={()=>setShowProduct(false)} activeProduct={activeProduct} />
        </div>
    )
}
