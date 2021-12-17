import {React,useState,useEffect} from 'react'
import axios from 'axios'
import styles from '../styles/attraction.module.scss'
import Head from 'next/head'
import Popup from 'reactjs-popup'
import Slider from 'react-slick';
import AttractionPopup from '../components/attractionPopup'
import SagePopup from '../components/sagePopup'
import LeaderPopup from '../components/leaderPopup'
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
            const response = await axios.get(`${process.env.LOCAL_API}/get/attractions`)
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
                                       <img src={nature.images.length > 0 ? `${process.env.LOCAL_IMAGE_PATH}/attraction/${nature.images[0]}`:'/no-imge.png'} alt="" />
                                       <div className={styles['attraction-namebox']}>
                                        <div className={styles['glass']}></div>
                                       <span>{nature.name}</span>
                                       </div>
                                   </div>
                               ))
                            ):activeTab === "tradition" ?(
                                tradition_attraction.map((tradition)=>(
                                    <div onClick={(e)=>ShowPopup(e,tradition)} className={styles['attraction-item']} key={tradition.id}>
                                        <img src={tradition.images.length > 0 ? `${process.env.LOCAL_IMAGE_PATH}/attraction/${tradition.images[0]}` :'/no-imge.png'}  alt="" />
                                        <div className={styles['attraction-namebox']}>
                                        <div className={styles['glass']}></div>
                                        <span>{tradition.name}</span>
                                        </div>
                                    </div>
                                ))
                            ):activeTab === "agri" ?(
                                agri_attraction.map((agri)=>(
                                    <div onClick={(e)=>ShowPopup(e,agri)} key={agri.id} className={styles['attraction-item']}>
                                    <img src={agri.images.length > 0 ? `${process.env.LOCAL_IMAGE_PATH}/attraction/${agri.images[0]}`:'/no-imge.png'} alt="" />
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
                <AttractionPopup open={showAttraction} onClose={()=>setShowAttraction(false)} activeAttraction={activeAttraction} />
               <SagePopup open={showSage} onClose={()=>setShowSage(false)} />
               <LeaderPopup open={showLeader} onClose={()=>setShowLeader(false)} />
        </div>
    )
}
