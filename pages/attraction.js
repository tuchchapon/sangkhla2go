import {React,useState,useEffect} from 'react'
import axios from 'axios'
import styles from '../styles/attraction.module.scss'
import Head from 'next/head'
import Popup from 'reactjs-popup'
export default function attraction() {
    const [activeTab, setActiveTab] = useState('nature')
    const [nature_attraction, setNature_attraction] = useState([])
    const [tradition_attraction, setTradition_attraction] = useState([])
    const [agri_attraction, setAgri_attraction] = useState([])
    const [check_data, setCheck_data] = useState(false)
    const changeTab =(e,type)=>{
        if(e) e.preventDefault()
        setActiveTab(type)
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
                                   <div onClick={(e)=>console.log(nature.images)} key={nature.id} className={styles['attraction-item']} >
                                       <img src={nature.images.length > 0 ? `/uploadImage/attraction/${nature.images[0]}`:'/no-imge.png'} alt="" />
                                       <div className={styles['attraction-namebox']}>
                                        <div className={styles['glass']}></div>
                                       <span>{nature.name}</span>
                                       </div>
                                   </div>
                               ))
                            ):activeTab === "tradition" ?(
                                tradition_attraction.map((tradition)=>(
                                    <div className={styles['attraction-item']} key={tradition.id}>
                                        <img src={tradition.images.length > 0 ? `/uploadImage/attraction/${tradition.images[0]}` :'/no-imge.png'}  alt="" />
                                        <div className={styles['attraction-namebox']}>
                                        <div className={styles['glass']}></div>
                                        <span>{tradition.name}</span>
                                        </div>
                                    </div>
                                ))
                            ):activeTab === "agri" ?(
                                agri_attraction.map((agri)=>(
                                    <div key={agri.id} className={styles['attraction-item']}>
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
        </div>
    )
}
