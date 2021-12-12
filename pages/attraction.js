import {React,useState,useEffect} from 'react'
import axios from 'axios'
import styles from '../styles/attraction.module.scss'
import Head from 'next/head'
import Popup from 'reactjs-popup'
import Slider from 'react-slick';

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

export default function attraction() {
    const [activeTab, setActiveTab] = useState('nature')
    const [nature_attraction, setNature_attraction] = useState([])
    const [tradition_attraction, setTradition_attraction] = useState([])
    const [agri_attraction, setAgri_attraction] = useState([])

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

    const [showAttraction, setShowAttraction] = useState(false)
    const [showLeader, setShowLeader] = useState(false)
    const [showSage, setShowSage] = useState(false)
    const [activeAttraction, setActiveAttraction] = useState({
        id:'',type:'',name:'',detail:'',images:[]
    })
    const changeTab =(e,type)=>{
        if(e) e.preventDefault()
        setActiveTab(type)
    }

    const ShowPopup = (e,attraction)=>{
        if(e) e.preventDefault()
        console.log(attraction);
        setActiveAttraction(attraction)
        setShowAttraction(true)
    }
    const openLeaderPopup =(e,name)=>{
        if (name === "หลวงพ่ออุตมะ") {
            console.log('name is',name);
            setShowSage(true)
        }
        if (name === "เจ้าศรีสุวรรณคีรี") {
            console.log(name);
            setShowLeader(true)
        }
        
    }
    const closePopup =(e)=>{
        setShowAttraction(false)
        setShowLeader(false)
        setShowSage(false)
    }
    useEffect(() => {
        
        const getAttraction = async()=>{
            const response = await axios.get('http://localhost:8080/get/attractions')
            if (response.status === 200) {
                let data = response.data.payload
                console.log(response.data.payload);
                setNature_attraction(data.nature_attraction)
                setTradition_attraction(data.tradition_attraction)
                setAgri_attraction(data.agri_attraction)
                setCheck_data(true)
            }
        }
        if(check_data === false) getAttraction()
    }, [])
    return (
        <div className={styles['attraction-page']}>
            <Head>
                <title>สถานที่ท่องเที่ยว</title>
            </Head>
            <div className={styles['header-box']}>
                        <div className={styles['header-line']}></div>
                        <span>สถานที่ท่องเที่ยว</span>
                    </div>
                     <div className={styles['tab-block']}>
                            <div className={styles['tab-item']} onClick={(e)=>changeTab(e,"nature")}>
                                <div className={activeTab === "nature" ? styles['tab-box-active'] :styles['tab-box']}>
                                    <img src="/img/attraction/nature.png" alt="" />
                                    <a href="#">ธรรมชาติ</a>
                                </div>
                            </div>
                            <div className={styles['tab-line']}></div>
                            <div className={styles['tab-item']} onClick={(e)=>changeTab(e,"tradition")}>
                                <div className={activeTab === "tradition" ? styles['tab-box-active'] :styles['tab-box']}>
                                    <img src="/img/attraction/tradition.png" alt="" />
                                    <a href="#">วัฒนธรรม</a>
                                </div>
                            </div>
                            <div className={styles['tab-line']}></div>
                            <div className={styles['tab-item']} onClick={(e)=>changeTab(e,"agri")}>
                                <div className={activeTab === "agri" ? styles['tab-box-active'] :styles['tab-box']}>
                                    <img src="/img/attraction/agri.png" alt="" />
                                    <a href="#">เกษตรกรรมและชุมชน</a>
                                </div>
                            </div>
                        </div>
            <div className="container">
                <div className="col-12">

                    <div className={styles['attraction-block']}>
                        <div className={styles['attraction-box']}>
                            <div className={styles['attraction-list']}>
                            {activeTab === "nature" ? (
                               nature_attraction.map((nature)=>(
                                   <div onClick={(e)=>ShowPopup(e,nature)} key={nature.id} className={styles['attraction-item']} >
                                       <img src={nature.images.length > 0 ? `/uploadImage/attraction/${nature.images[0]}`:'/no-imge.png'} alt="" />
                                       <div className={styles['attraction-namebox']}>
                                        <div className={styles['glass']}></div>
                                       <span>{nature.name}</span>
                                       </div>
                                   </div>
                               ))
                            ):activeTab === "tradition" ?(
                                tradition_attraction.map((tradition)=>(
                                    <div onClick={(e)=>ShowPopup(e,tradition)} className={styles['attraction-item']} key={tradition.id}>
                                        <img src={tradition.images.length > 0 ? `/uploadImage/attraction/${tradition.images[0]}` :'/no-imge.png'}  alt="" />
                                        <div className={styles['attraction-namebox']}>
                                        <div className={styles['glass']}></div>
                                        <span>{tradition.name}</span>
                                        </div>
                                    </div>
                                ))
                            ):activeTab === "agri" ?(
                                agri_attraction.map((agri)=>(
                                    <div onClick={(e)=>ShowPopup(e,agri)} key={agri.id} className={styles['attraction-item']}>
                                    <img src={agri.images.length > 0 ? `/uploadImage/attraction/${agri.images[0]}`:'/no-imge.png'} alt="" />
                                    <div className={styles['attraction-namebox']}>
                                    <div className={styles['glass']}></div>    
                                    <span>{agri.name}</span>
                                    </div>
                                </div>
                                ))
                            ):''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['leader-box']}>
                <div className="container">
                    <div className="col-12">
                        <div className={styles['leader-row-box']}>
                        <div className={styles['leader-left-box']}>
                            <div className={styles['leader-tag']}>ปราชญ์ชุมชนและผู้มีความโดดเด่น</div>
                            <div onClick={(e)=>openLeaderPopup(e,'หลวงพ่ออุตมะ')} className={styles['leader-item']}>
                                <div className={styles['leader-image-box']} style={{backgroundImage:'/frame.png'}}>
                                <div className={styles['leader-img']} style={{backgroundImage:`url('/Uttamarambho.png')`}} ></div>
                                </div>
                                <span>หลวงพ่ออุตมะ</span>
                            </div>
                        </div>
                        <div className={styles['leader-right-box']}>
                            <div className={styles['leader-tag']}>ผู้นำชุมชน</div>
                            <div onClick={(e)=>openLeaderPopup(e,'เจ้าศรีสุวรรณคีรี')} className={styles['leader-item']}>
                                <div className={styles['leader-image-box']}>
                                <div className={styles['leader-img']} style={{backgroundImage:`url('/srisuwankeeree.jpeg')`}}></div>
                                </div>
                                <span>เจ้าศรีสุวรรณคีรี</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popup
                open={showAttraction}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
                >
                    <div className={styles['backdrop']} ></div>
                    <div className="col-12">
                        <div className={styles['attraction-popup']}>
                        <img className={styles['popup-close-icon']} src='/Quit.png' onClick={(e)=>closePopup(e)}  alt="" />
                        <div className={styles['attraction-popup-namebox']} >
                        <img src="/glass.png" alt="" />
                        <span>{activeAttraction.name}</span>
                        </div>
                                        <div className={styles['slider']}>
                                        <Slider {...settings} >
                                                {activeAttraction.images.length >0 ? activeAttraction.images.map((image)=>(
                                                <div key={image} className={styles['slider-box']}  ><div className={styles['slider-image']} style={{backgroundImage:`url(${image ? `/uploadImage/attraction/${image}`:'' })`}}></div></div>
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
                <Popup
                open={showSage}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
                >
                    <div className={styles['sage-backdrop']} ></div>
                    <div className="col-12">
                        <div className={styles['sage-popup']}>
                        <img className={styles['sage-popup-close-icon']} src='/Quit.png' onClick={(e)=>closePopup(e)}  alt="" />
                        <div className={styles['sage-flexbox']}>
                            <div className={styles['sage-pa1']}>
                                    <img src="/img/attraction/uttama1.jpg" alt="" />
                                    <span>พระราชอุดมมงคล</span>
                                    <span> หรือที่รู้จักกันทั่วไปในนามของ ‘หลวงพ่ออุตตมะ’ พระเกจิอาจารย์ชื่อดังของจังหวัดกาญจนบุรี ทั้งยังเป็นพระภิกษุสงฆ์ชาวมอญ ผู้มีบทบาทผู้นำคนสำคัญของชาวมอญพลัดถิ่นของสังขละบุรี</span>
                            </div>
                            <div className={styles['sage-pa2']}>
                                    <span>ประวัติหลวงพ่ออุตตมะ</span>
                                    <span>
                                    หลวงพ่ออุตตมะเกิดเมื่อวันอาทิตย์ขึ้น 6ค่ำ เดือน 4 ปีจอ จุลศักราช 1272 (พ.ศ.2453) ที่หมู่บ้านโมกกะเนียง ตำบล เกลาสะ อำเภอเยจังหวัดมะละแหม่ง เป็นบุตรของนางโงและนางทองสุข อาชีพทำนา มีพี่น้องรวม 12 คนเนื่องจากเป็นทารกเพศชายเกิดในวันอาทิตย์จึงมีชื่อว่า ‘เอหม่อง’
ปี พ.ศ.2462 ขณะเด็กชายเอหม่องมีอายุได้ 9 ขวบ เกิดอหิวาตกโรคระบาดขึ้นในหมู่บ้าน บิดามารดาจึงพาเด็กชายเอหม่องไปฝากกับอาจารย์นันสาโรแห่งวัดโมกกะเนียงผู้เป็นลุงเพื่อให้ปรนนิบัติรับใช้และการศึกษาพระธรรมเป็นเครื่องคุ้มครองจากโรคภัย เด็กชายอหม่องเป็นผู้ใฝ่ใจในการศึกษาอย่างยิ่ง จนสามารถสอบได้ชนะเด็กในวัยเดียวกันเป็นประจำทุกๆ ปี
ปี พ.ศ.2467 เด็กชายเอหม่องอายุได้ 14 ปี เกิดอหิวาตกโรคระบาดครั้งใหญ่อีกครั้งหนึ่ง ส่งผลให้ต้องสูญเสียน้องชายถึง 5 คน เด็กชายเอหม่องจึงขอออกจากวัดโนกกะเนียงเพื่อมาช่วยเหลือทางบ้านด้วยความขยันขันแข็ง จนกระทั่งอายุ 18 ปี เจ้าอาวาสวัดเกลาสะได้ไปขอกับบิดามารดาให้ด็กชายอหม่องไปบรรพชาเป็นสามเณร
หลวงพ่ออุตตมะบรรพชาเป็นสามเณร ณ วัดเกลาสะ ตำบลเกลาสะ อำเภอเย จังหวัดมะละแหม่ง เมื่อจุลศักราช 1291 (พ.ศ.2472) โดยมีพระเกตุมาลาเป็นพระอุปัชฌาย์ ปีนั้นเองหลวงพ่อศึกษาภาษาบาลีและพระปริยัติธรรมจนสอบได้นักธรรมตรี อีกปีหนึ่งต่อมาสอบได้นักธรรมโท แต่ไม่นานหลวงพ่อก็ตัดสินใจสึกออกมาเพราะเห็นว่าไม่มีใครช่วยบิดามารดาทำนา จนกระทั่งหม่องเอ ซึ่งเป็นลูกของพี่สาวของบิดาได้มาอาศัยอยู่ด้วย หลังจากที่บิดามารดาของหม่องเอเสียชีวิตจนหมดสิ้นซึ่งเท่ากับว่ามีคนมาช่วยแบ่งเบาภาระในการทำนา และมีญาติซึ่งไว้วางใจได้มาคอยดูแลบิดามารดา หลวงพ่ออุตตมะจึงตัดสินใจอุปสมบทเป็นพระภิกษุที่วัดเกลาสะ โดยมีพระเกตุมาลา วัดเกลาสะ เป็นพระอุปัชฌาย์ พระนันทสาโร วัดโมกกะเนียง เป็นพระกรรมวาจารย์ พระวิสารทะวัดเจ้าคะเล เป็นพระอนุสาวนาจารย์ เมื่อวันพฤหัสบดีที่ 23 เมษายน พ.ศ.2476 ไดรับฉายาว่า “อุตตมรัมโภ” แปลว่า ผู้มีความพากเพียรอันสูงสุด โดยหลวงพ่ออุตตมะได้ตั้งเจตจำนงที่จะบวชไม่สึกจนตลอดชีวิต ด้วยความพากเพียรและใส่ใจในการศึกษาพระธรรม ในปี พ.ศ.2474 หลวพ่ออุตตมะสามารถสอบได้ นักธรรมชั้นเอก ณ สำนักเรียนวัดปราสาททอง อำเภอเย จังหวัดมะละแหม่ง ต่อมาในปี พ.ศ.2484 สอบได้เปรียญธรรม 8 ประโยค ที่สำนักเรียนวัดสุขการี อำเภอสะเทิม จังหวัดสะเทิม ซึ่งเป็นชั้นสูงสุดของคณะสงฆ์ในประเทศพม่าขณะนั้นบ้านเมืองกำลังเกิดสงครามโลกครั้งที่ 2 หลวงพ่อจึงเดินทางกลับวัดเกลาสะ และได้รับมอบหมายให้เป็นอาจารย์สอนภาษาบาลีแก่ภิกษุสามเณร ต่อมาท่านก็ลาพระอุปัชฌาย์เดินทางไปศึกษาวิปัสสนากรรมฐานที่วัดตองจอย จังหวัดมะละแหม่ง และวัดป่าเลไลย์ จังหวัดมัณฑะเลย์ จนมีความรู้ความสามารถในเรื่องวิปัสสนากรรมฐานตลอดจนวิชาไสยศาสตร์และพุทธคมเป็นอย่างดี ปี พ.ศ.2486 หลวงพ่อจึงเริ่มออกธุดงค์ไปตามที่ต่างๆ ในประเทศพม่าและเข้ามาประเทศไทยครั้งแรกทางจังหวัดเชียงใหม่ ต่อมาทราบข่าวว่าพระเกตุมาลาพระอุปัชฌาย์กำลังอาพาธ จึงรีบเดินทางกลับพม่า จนกระทั่งพระเกตุมาลามรณภาพท่านก็ได้เดินทางเข้ามาประเทศไทยอีกครั้งหนึ่ง โดยครั้งนี้ หลวงพ่อเดินทางเข้ามาทางตำบลปิล็อก อำเภอทองผาภูมิ จังหวัดกาญจนบุรี ประมาณปี พ.ศ.2492
ปี พ.ศ.2492 อันเป็นพรรษาที่ 16 ของพระมหาอุตตมะรัมโภ พายุไต้ฝุ่นพัดจากทะเลอันดามัน สร้างความเสียหายให้กับชาวบ้านอย่างใหญ่หลวง โดยเฉพาะบ้านโมกกะเนียง และเกลาสะ มีผู้เสียชีวิตมากกว่าร้อยคน บ้านเรือนเหลือเพียงไม่กี่หลังคาเรือนชาวบ้านลำบากยากแค้นแสนสาหัส ข้าวของอาหารการกินขาดแคลนกันทั่วหน้า นอกจากภัยธรรมชาติแล้ว ชาวบ้านยังต้องประสบเคราะห์กรรมจากปัญหาความขัดแย้งในทางการเมืองอีกด้วย เนื่องจากการปะทะและต่อสู้ระหว่างกองกำลังทหารของรัฐบาลพม่า กับกองกำลังติดอาวุธกู้ชาติ อีกทั้งกองกำลังกู้ชาติบางส่วนแปรตัวเองไปเป็นโจรปล้นสะดมชาวบ้าน ด้วยความเบื่อหน่ายเรื่องการรบราฆ่าฟันกัน ระหว่างชนเผ่า หลวงพ่ออุตตมะจึงตัดสินใจจากบ้านเกิด มุ่งหน้าสู่ดินแดนประเทศไทย เป้าหมายที่แท้จริงของท่านในเวลานั้น คือเขาพระวิหาร ปรากฏว่าเมื่อชาวบ้านรู้ข่าวต่างเสียใจ ไม่อยากให้ท่านจากไปพากันร้องไห้ระงมด้วยความอาลัย ซึ่งท่านได้ชี้แจงการออกเดินทางของท่านว่า “การไปของเราจะเป็น ปรหิต เป็นประโยคแก่ผู้อื่น”
หลวงพ่อเดินทางเข้าเมืองไทยในช่วงระหว่างปี พ.ศ.2492-2493 ทางหมู่บ้านอีต่อง ตำบลปิล็อก ชายแดนเขตจังหวัดกาญจนบุรี โดยได้รับความช่วยเหลือจากคนไทยสองคน ซึ่งมีเชื้อสายมอญพระประแดงที่มาทำเหมืองแร่ที่บ้านอีต่อง ทั้งคู่ได้จัดทำบ้านพักหลังหนึ่งให้เป็นกุฏิชั่วคราวของหลวงพ่อ เนื่องจากพื้นที่บริเวณนั้นไม่มีวัดและพระสงฆ์เลย เดิมทีนั้น คนไทยเชื้อสายมอญพระประแดงทั้งสอง ต้องการสร้างกุฏิถวายหลวงพ่ออุตตมะให้จำพรรษาอยู่ที่บ้านอีต่อง แต่หลวงพ่อไม่รับ เนื่องจากเกรงว่าจะกลายเป็นพระเถื่อนเข้าเมืองไทย ท่านจึงต้องการไปขออนุญาตจากพระผู้ใหญ่ที่ปกครองเขตปิล็อกเสียก่อน ทั้งสองจึงพาหลวงพ่ออุตตมะ มาจำพรรษาที่วัดท่าขนุน อำเภอทองผาภูมิ จังหวัดกาญจนบุรี กับหลวงพ่อไตแนม ซึ่งเป็นชาวกะเหรี่ยงและอุปสมบทที่วัดเกลาสะเช่นเดียวกับหลวงพ่ออุตตมะ
ปี พ.ศ.2494 ขณะจำพรรษาที่วัดท่าขนุน อำเภอทองผาภูมิ จังหวัดกาญจนบุรี หลวงพ่ออุตตมะมีโอกาสไปสักการะพระปฐมเจดีย์ จังหวัดนครปฐม ทำให้หลวงพ่อได้พบชาวไทยเชื้อสายมอญ ที่มาจากเมืองต่างๆ เช่น แม่กลอง สมุทรสาคร มีชาวบ้านกลุ่มหนึ่งได้นิมนต์หลวงพ่อ ไปจำพรรษาที่วัดบางปลา ตำบลบ้านเกาะ อำเภอเมือง จังหวัดสมุทรสาคร
หลังจากเดินทางกลับจากวัดบางปลามาจำพรรษาที่วัดท่าขนุน หลวงพ่อไตแนมขอให้หลวงพ่ออุตตมะ ไปจำพรรษาที่วัดปรังกาสีซึ่งเป็นวัดร้าง บริเวณวัดปรังกาสีมีชาวกระเหรี่ยงอาศัยอยู่เป็นจำนวนมาก และบริเวณนั้นไม่มีพระหรือวัดอื่นเลย หลวงพ่อร่วมกับกำนันชาวกะเหรี่ยงนิมนต์พระกะเหรี่ยง จากตลอดแม่น้ำแควใหญ่และแควน้อยได้ 42 รูป มาอยู่ปริวาสที่วัดปรังกาสี 9 วัน 9 คืน หลังจากนั้นก็สร้างกุฏิและเจดีย์ขึ้น หลวงพ่อนิมนต์พระกะเหรี่ยงมาจำพรรษาที่วัด 3 รูปนี้ เพื่อเป็นพื้นฐานในการสอนธรรมะต่อไป หลวงพ่ออุตตมะจำพรรษาอยู่วัดปรังกาสีหนึ่งพรรษา ต่อมาผู้ใหญ่ทุม จากท่าขนุนมานิมนต์หลวงพ่อไปเยี่ยมหลวงปู่แสงที่วัดเกาะ อำเภอโพธาราม จังหวัดราชบุรี ซึ่งเคยไปจำพรรษาที่วัดโมกกะเนียง เกลาสะและมะละแหม่งมาก่อน และในพรรษานั้นหลวงพ่ออุตตมะได้จำพรรษาที่วัดเกาะตามคำนิมนต์ของหลวงปู่แสง
ปี พ.ศ.2494 ขณะที่หลวงพ่อจำพรรษาอยู่ที่วัดเกาะ มีคนมาแจ้งข่าวกับหลวงพ่อว่า ที่กิ่งอำเภอสังขละบุรีมีชาวมอญจากบ้านเดิมของหลวงพ่ออพยพเข้าเมืองไทยทางบีคลี่เป็นจำนวนมาก และต้องการนิมนต์หลวงพ่อไปเยี่ยม เมื่อหลวงพ่ออุตตมะออกจากจำพรรษา แล้วเดินทางกลับไปยังอำเภอทองผาภูมิ และไปยังอำเภอสังขละบุรี และพบกับคนมอญทั้งหมดที่มาจากโมกกะเนียงเจ้าคะเล และมะละแหม่ง บ้านเกิดของท่านหลวงพ่อจึงพาชาวมอญเหล่านี้ไปอาศัยอยู่ที่บ้านวังกะล่าง นับเป็นจุดกำเนิดแรกเริ่มของชุมชนชาวมอญในสังขละบุรี
                                    </span>
                            </div>
                            <div className={styles['sage-pa3']}>
                                <div className={styles['sage-image-box']}>
                                    <img src="/img/attraction/uttama2.jpg" alt="" />
                                    <img src="/img/attraction/uttama3.jpg" alt="" />
                                </div>
                                <span>กำเนิดวัดหลวงพ่ออุตตมะ</span>
                                <span>
ในปี พ.ศ.2499 หลวงพ่ออุตตมะ ร่วมกับชาวบ้านชาวกะเหรี่ยงและชาวมอญได้พร้อมใจกันสร้างศาลาวัดขึ้น และสร้างเสร็จในเดือน 6 ของปีนั้นเอง แต่เนื่องจากยังมิได้มีการขออนุญาตจากกรมการศาสนา วัดที่สร้างเสร็จจึงมีฐานะเป็นสำนักสงฆ์ แต่ชาวบ้านโดยทั่วไปเรียกว่า ‘วัดหลวงพ่ออุตตมะ’ ตั้งอยู่บนเนินสูงในบริเวณที่เรียกว่า ‘สามประสบ’ เพราะมีแม่น้ำ 3 สายไหลมาบรรจบกัน คือแม่น้ำซองกาเรีย แม่น้ำบีคลี่ และแม่น้ำรันตี
ในปี พ.ศ.2505 เมื่อได้รับอนุญาตจากรมการศาสนาเป็นที่เรียบร้อย หลวงพ่ออุตตมะจึงได้ตั้งชื่อสำนักสงฆ์ตามชื่ออำเภอเก่า (อำเภอวังกะ) ว่า ‘วัดวังก์วิเวการาม’
ในปี พ.ศ.2513 หลวงพ่อเริ่มสร้างพระอุโบสถวัดวังก์วิเวการาม โดยปั้นอิฐเอง
ในปี พ.ศ.2518 หลวงพ่อได้เริ่มสร้างเจดีย์จำลองแบบจากเจดีย์พุทธคยาที่ประเทศอินเดีย และสร้างเสร็จในปี พ.ศ.2529
                                </span>
                            </div>
                        </div>
                        </div>

                    </div>
                </Popup>
                <Popup
                open={showLeader}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
                >
                    <div className={styles['leader-backdrop']} ></div>
                    <div className="col-12">
                        <div className={styles['leader-popup']}>
                        <img className={styles['leader-popup-close-icon']} src='/Quit.png' onClick={(e)=>closePopup(e)}  alt="" />
                        <div className={styles['leader-flexbox']}>
                            <div className={styles['leader-pa1']}>
                                    <img src="/img/attraction/srisuwan1.jpg" alt="" />
                                    <span>พระศรีสุวรรณ เจ้าเมืองสังขละบุรีคนแรก </span>
                                    <span> บันทึกประวัติศาสตร์เมืองหน้าด่านทางชายแดนตะวันตกของไทย 
                                        ตั้งอยู่ในบริเวณช่องเขาของเทือกเขาตะนาวศรี ดินแดนที่มีพื้นที่ป่าทุ่งใหญ่ฯเป็นอาณาบริเวณกว้างไกลไพศาล 
                                        เป็นชัยภูมิแห่งการเดินทัพของพม่า และไทยมาตั้งแต่สมัยกรุงศรีอยุธยา 
                                        ธนบุรี และตอนต้นกรุงรัตนโกสินทร์</span>
                            </div>
                            <div className={styles['leader-pa2']}>
                                    <span>
                                    ในตอนปลายกรุงศรีอยุธยามีสาเหตุอันเนื่องมาจากพม่าได้ทำสงครามกับมอญทำให้ชาวกะเหรี่ยงได้ถูกกวาดต้อนเข้าสู่สมรภูมิรบไปด้วย 
                                    ชนชาวกะเหรี่ยงกลุ่มหนึ่งได้เดินทางเข้ามาที่เมืองสังขละบุรี และได้ส่งตัวแทนไปเจรจาขอพึ่งพระโพธิ์สมภารกษัตริย์กรุงศรีอยุธยา 
                                    กับเจ้าเมืองกาญจนบุรี และได้อาสาตั้งกองกำลังสอดแนมขึ้นช่วยฝ่ายกรุงศรีอยุธยาในการรบกับพม่า ซึ่งในช่วงสมัยกรุงศรีอยุธยา 
                                    กรุงธนบุรี และต้นรัตนโกสินทร์ ด่านเจดีย์สามองค์ เมืองสังขละบุรี ได้กลายเป็นสมรภูมิรบที่สำคัญต่อเนื่องมาอย่างยาวนานและหนักหน่วง 
                                    จนล่วงสู่ยุคสมัยกรุงรัตนโกสินทร์ตอนต้น ราวพ.ศ. 2369 ในแผ่นดินของพระบาทสมเด็จพระนั่งเกล้าเจ้าอยู่หัว (รัชกาลที่ 3) ได้ยกฐานะเมืองสังขละบุรีขึ้นเป็นเมืองตามระเบียบการปกครองใหม่ 
                                    และแต่งตั้ง ภูวะโพ่ เจ้านายกะเหรี่ยงที่เคยเป็นหัวหน้ากองกำลังสอดแนมป้องกันการรุกรานจากพม่าขึ้นเป็นเจ้าเมือง พระราชทานนามว่า “พระศรีสุวรรณคีรี” ทำการปกครองเมืองสังขละบุรีสืบมาและมีทายาทสืบทอดตำแหน่งต่อมาอีก 
                                    4 คน คือ <br/><b>1.พระศรีสุวรรณคีรี (ขุนสุวรรณ) ภูวะโพ่</b> <br/><b>2.พระศรีสุวรรณคีรี (กรมเมจะ) ลูกของ ภูวะโพ่</b>
                                     <br/><b>3.พระศรีสุวรรณคีรี (ยังมะตุ) ลูกของ ภูวะโพ่</b> <b>4.พระศรีสุวรรณคีรี ( ปวยดองภู) ลูกของ กรมเมจะ</b> 
                                     <br/> <b>5.พระศรีสุวรรณคีรี (ทะเจียงโปรย เสตะพันธ์) ลูกของกรมเมจะ </b>
                                     <br/> เลื่อนขึ้นมาจาก หลวงวิเศษสงคราม เป็นเจ้าเมืองคนสุดท้าย อันเป็นต้นตระกูลเสตะพันธุ์จนถึงปัจจุบัน และเป็นนายอำเภอคนแรกแห่งสังขละบุรี เมื่อ ปีพ.ศ. 2445-2467

                                    </span>
                            </div>
                            <div className={styles['leader-pa3']}>
                                <div className={styles['leader-image-box']}>
                                    <img src="/img/attraction/srisuwan-coin-front.jpg" alt="" />
                                    <img src="/img/attraction/srisuwan-coin-back.jpg" alt="" />
                                </div>
                                <span>
                                อธิบายภาพ
ด้านหน้าเหรียญพระพุทธรัตนสังขละบุรีศรีสุวรรณ ร.3  (พระแก้วขาว)
ด้านหลังพระศรีสุวรรณคีรี 
วัดสะเนพ่อง อำเภอสังขละบุรี จังหวัดกาญจนบุรี สร้างปี 2551 
                                </span>
                            </div>
                        </div>
                        </div>

                    </div>
                </Popup>
        </div>
    )
}
