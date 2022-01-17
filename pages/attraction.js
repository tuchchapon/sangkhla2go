import { React, useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/attraction.module.scss'
import Head from 'next/head'
import Popup from 'reactjs-popup'
import Slider from 'react-slick';
import AttractionPopup from '../components/attractionPopup'
import SagePopup from '../components/sagePopup'
import LeaderPopup from '../components/leaderPopup'
import SubHeader from '../layouts/subHeader'
import Footer from '../layouts/footer'

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

export default function attraction() {
    const [activeTab, setActiveTab] = useState('nature')
    const [nature_attraction, setNature_attraction] = useState([])
    const [tradition_attraction, setTradition_attraction] = useState([])
    const [agri_attraction, setAgri_attraction] = useState([])
    const [remainNature, setRemainNature] = useState([])
    const [remainTradition, setRemainTradition] = useState([])
    const [remainAgri, setRemainAgri] = useState([])
    const [check_data, setCheck_data] = useState(false)

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

    const [showAttraction, setShowAttraction] = useState(false)
    const [showLeader, setShowLeader] = useState(false)
    const [showSage, setShowSage] = useState(false)
    const [Sc_width, setSc_width] = useState([])
    const [activeAttraction, setActiveAttraction] = useState({
        id: '', type: '', name: '', detail: '', images: []
    })
    const changeTab = (e, type) => {
        if (e) e.preventDefault()
        setActiveTab(type)
    }

    const ShowPopup = (e, attraction) => {
        if (e) e.preventDefault()
        console.log(attraction);
        setActiveAttraction(attraction)
        setShowAttraction(true)
    }
    const openLeaderPopup = (e, name) => {
        if (name === "หลวงพ่ออุตมะ") {
            console.log('name is', name);
            setShowSage(true)
        }
        if (name === "เจ้าศรีสุวรรณคีรี") {
            console.log(name);
            setShowLeader(true)
        }

    }
    const setNewAttraction = (new_show_attraction) => {
        if (activeTab === 'nature') {
            setNature_attraction([...nature_attraction, ...new_show_attraction])
        }
        if (activeTab === 'tradition') {
            setTradition_attraction([...tradition_attraction, ...new_show_attraction])
        }
        if (activeTab === 'agri') {
            setAgri_attraction([...agri_attraction, ...new_show_attraction])
        }

    }
    const showMoreAttraction = (e) => {
        if (activeTab === "nature") {
            let new_show_nature = []
            let new_remain_nature = []
            if (remainNature.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (remainNature[i]) new_show_nature.push(remainNature[i])
                    }
                    new_remain_nature = remainNature.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let i = 0; i < 12; i++) {
                        if (remainNature[i]) new_show_nature.push(remainNature[i])
                    }
                    new_remain_nature = remainNature.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (remainNature[i]) new_show_nature.push(remainNature[i])
                    }
                    new_remain_nature = remainNature.splice(0, 6)
                }
                setNewAttraction(new_show_nature)
            }
        }
        if (activeTab === "tradition") {
            let new_show_tradition = []
            let new_remain_tradition = []
            if (remainTradition.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (remainTradition[i]) new_show_tradition.push(remainTradition[i])
                    }
                    new_remain_tradition = remainTradition.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let i = 0; i < 12; i++) {
                        if (remainTradition[i]) new_show_tradition.push(remainTradition[i])
                    }
                    new_remain_tradition = remainTradition.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (remainTradition[i]) new_show_tradition.push(remainTradition[i])
                    }
                    new_remain_tradition = remainTradition.splice(0, 6)
                }
                setNewAttraction(new_show_tradition)
            }
        }
        if (activeTab === "agri") {
            let new_show_agri = []
            let new_remain_agri = []
            if (remainAgri.length !== 0) {
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (remainAgri[i]) new_show_agri.push(remainAgri[i])
                    }
                    new_remain_agri = remainAgri.splice(0, 9)
                }
                else if (screen.availWidth >= 768) {
                    for (let i = 0; i < 12; i++) {
                        if (remainAgri[i]) new_show_agri.push(remainAgri[i])
                    }
                    new_remain_agri = remainAgri.splice(0, 12)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (remainAgri[i]) new_show_agri.push(remainAgri[i])
                    }
                    new_remain_agri = remainAgri.splice(0, 6)
                }
                setNewAttraction(new_show_agri)
            }
        }
    }
    const closePopup = (e) => {
        setShowAttraction(false)
        setShowLeader(false)
        setShowSage(false)
    }
    useEffect(() => {
        let width = screen.availWidth
        setSc_width(width)
        const getAttraction = async () => {
            const response = await axios.get(`${process.env.SERVER_API}/get/attractions`)
            if (response.status === 200) {
                let data = response.data.payload
                let nature_data = data.nature_attraction
                let tradition_data = data.tradition_attraction
                let agri_data = data.agri_attraction
                let init_nature = []
                let init_tradition = []
                let init_agri = []
                console.log(data.nature_attraction)
                console.log(data.tradition_attraction)
                console.log(data.agri_attraction)
                if (screen.availWidth > 1400) {
                    for (let i = 0; i < 9; i++) {
                        if (nature_data[i] === 0 || nature_data[i]) init_nature.push(nature_data[i])
                    }
                    for (let j = 0; j < 9; j++) {
                        if (tradition_data[j] === 0 || tradition_data[j]) init_tradition.push(tradition_data[j])
                    }
                    for (let k = 0; k < 9; k++) {
                        if (agri_data[k] === 0 || agri_data[k]) init_agri.push(agri_data[k])
                    }
                    nature_data.splice(0, 9)
                    tradition_data.splice(0, 9)
                    agri_data.splice(0, 9)
                    setRemainNature(nature_data)
                    setRemainTradition(tradition_data)
                    setRemainAgri(agri_data)
                    setNature_attraction(init_nature)
                    setTradition_attraction(init_tradition)
                    setAgri_attraction(init_agri)
                }
                else if (screen.availWidth >= 768) {
                    console.log('768')
                    for (let i = 0; i < 12; i++) {
                        if (nature_data[i] === 0 || nature_data[i]) init_nature.push(nature_data[i])
                    }
                    for (let j = 0; j < 12; j++) {
                        if (tradition_data[j] === 0 || tradition_data[j]) init_tradition.push(tradition_data[j])
                    }
                    for (let k = 0; k < 12; k++) {
                        if (agri_data[k] === 0 || agri_data[k]) init_agri.push(agri_data[k])
                    }
                    nature_data.splice(0, 12)
                    tradition_data.splice(0, 12)
                    agri_data.splice(0, 12)
                    setRemainNature(nature_data)
                    setRemainTradition(tradition_data)
                    setRemainAgri(agri_data)
                    setNature_attraction(init_nature)
                    setTradition_attraction(init_tradition)
                    setAgri_attraction(init_agri)
                }
                else if (screen.availWidth < 768) {
                    for (let i = 0; i < 6; i++) {
                        if (nature_data[i] === 0 || nature_data[i]) init_nature.push(nature_data[i])
                    }
                    for (let j = 0; j < 6; j++) {
                        if (tradition_data[j] === 0 || tradition_data[j]) init_tradition.push(tradition_data[j])
                    }
                    for (let k = 0; k < 6; k++) {
                        if (agri_data[k] === 0 || agri_data[k]) init_agri.push(agri_data[k])
                    }
                    nature_data.splice(0, 6)
                    tradition_data.splice(0, 6)
                    agri_data.splice(0, 6)
                    setRemainNature(nature_data)
                    setRemainTradition(tradition_data)
                    setRemainAgri(agri_data)
                    setNature_attraction(init_nature)
                    setTradition_attraction(init_tradition)
                    setAgri_attraction(init_agri)
                }

                // console.log(response.data.payload);
                // setNature_attraction(data.nature_attraction)
                // setTradition_attraction(data.tradition_attraction)
                // setAgri_attraction(data.agri_attraction)
                // setCheck_data(true)

            }
        }
        if (check_data === false) getAttraction()
    }, [])
    return (
        <div className={styles['attraction-page']}>
            <Head>
                <title>สถานที่ท่องเที่ยว</title>
            </Head>
            <SubHeader first={'สถานที่ท่องเที่ยว'} />
            <div className={styles['header-box']}>
                <div className={styles['header-line']}></div>
                <span>สถานที่ท่องเที่ยว</span>
            </div>
            <div className={styles['tab-block']}>
                <div className={styles['tab-item']} onClick={(e) => changeTab(e, "nature")}>
                    <div className={activeTab === "nature" ? styles['tab-box-active'] : styles['tab-box']}>
                        <img src="/img/attraction/nature.png" alt="" />
                        <a href="#">ธรรมชาติ</a>
                    </div>
                </div>
                <div className={styles['tab-line']}></div>
                <div className={styles['tab-item']} onClick={(e) => changeTab(e, "tradition")}>
                    <div className={activeTab === "tradition" ? styles['tab-box-active'] : styles['tab-box']}>
                        <img src="/img/attraction/tradition.png" alt="" />
                        <a href="#">วัฒนธรรม</a>
                    </div>
                </div>
                <div className={styles['tab-line']}></div>
                <div className={styles['tab-item']} onClick={(e) => changeTab(e, "agri")}>
                    <div className={activeTab === "agri" ? styles['tab-box-active'] : styles['tab-box']}>
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
                                    nature_attraction.map((nature) => (
                                        <div onClick={(e) => ShowPopup(e, nature)} key={nature.id} className={styles['attraction-item']} >
                                            <img src={nature.images.length > 0 ? `${nature.images[0]}` : '/no-imge.png'} alt="" />
                                            <div className={styles['attraction-namebox']}>
                                                <div className={styles['glass']}></div>
                                                <span>{nature.name}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : activeTab === "tradition" ? (
                                    tradition_attraction.map((tradition) => (
                                        <div onClick={(e) => ShowPopup(e, tradition)} className={styles['attraction-item']} key={tradition.id}>
                                            <img src={tradition.images.length > 0 ? `${tradition.images[0]}` : '/no-imge.png'} alt="" />
                                            <div className={styles['attraction-namebox']}>
                                                <div className={styles['glass']}></div>
                                                <span>{tradition.name}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : activeTab === "agri" ? (
                                    agri_attraction.map((agri) => (
                                        <div onClick={(e) => ShowPopup(e, agri)} key={agri.id} className={styles['attraction-item']}>
                                            <img src={agri.images.length > 0 ? `${agri.images[0]}` : '/no-imge.png'} alt="" />
                                            <div className={styles['attraction-namebox']}>
                                                <div className={styles['glass']}></div>
                                                <span>{agri.name}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : ''}

                            </div>
                            {activeTab === "nature" && remainNature.length > 0 ? <span onClick={(e) => showMoreAttraction(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> :
                                activeTab === "tradition" && remainTradition.length > 0 ? <span onClick={(e) => showMoreAttraction(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> :
                                    activeTab === "agri" && remainAgri.length > 0 ? <span onClick={(e) => showMoreAttraction(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> : null}
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
                                <div onClick={(e) => openLeaderPopup(e, 'หลวงพ่ออุตมะ')} className={styles['leader-item']}>
                                    <div className={styles['leader-image-box']} style={{ backgroundImage: '/frame.png' }}>
                                        <div className={styles['leader-img']} style={{ backgroundImage: `url('/Uttamarambho.png')` }} ></div>
                                    </div>
                                    <span>หลวงพ่ออุตมะ</span>
                                </div>
                            </div>
                            <div className={styles['leader-right-box']}>
                                <div className={styles['leader-tag']}>ผู้นำชุมชน</div>
                                <div onClick={(e) => openLeaderPopup(e, 'เจ้าศรีสุวรรณคีรี')} className={styles['leader-item']}>
                                    <div className={styles['leader-image-box']}>
                                        <div className={styles['leader-img']} style={{ backgroundImage: `url('/srisuwankeeree.jpeg')` }}></div>
                                    </div>
                                    <span>เจ้าศรีสุวรรณคีรี</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <AttractionPopup open={showAttraction} onClose={() => setShowAttraction(false)} activeAttraction={activeAttraction} />
            <SagePopup open={showSage} onClose={() => setShowSage(false)} />
            <LeaderPopup open={showLeader} onClose={() => setShowLeader(false)} />

        </div>
    )
}
