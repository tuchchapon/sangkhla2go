import {React,useState,useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'
import styles from '../styles/Tradition.module.scss'
import KarenTraditionPopup from '../components/karenTraditionPopup'
import MonTraditionPopup from '../components/monTraditionPopup'

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
            let response = await axios.get(`${process.env.SERVER_API}/get/traditions`)
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
                <KarenTraditionPopup open={showKarenTradition} onClose={()=>setShowKarenTradition(false)} activeKarenTradition={activeKarenTradition} />
                <MonTraditionPopup open={showMonTradition} onClose={()=>setShowMonTradition(false)} activeMonTradition={activeMonTradition} />
        </div>
    )
}
