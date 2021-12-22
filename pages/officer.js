import {React,useState,useEffect} from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup';
import styles from '../styles/officer.module.scss'
import SubHeader from '../layouts/subHeader';
export default function officer() {
    const [check_data, setCheck_data] = useState(false)
    const [leader, setLeader] = useState({})
    const [consultants, setConsultants] = useState([])
    const [coordinators, setCoordinators] = useState([])
    const [newGraduates, setNewGraduates] = useState([])
    const [citizens, setCitizens] = useState([])
    const [interns, setInterns] = useState([])

    const [showSmallPopup, setShowSmallPopup] = useState(false)
    const [showBigPopup, setShowBigPopup] = useState(false)
    const [activOfficer, setActivOfficer] = useState({})
    const [activeLeader, setActiveLeader] = useState({})

    const toLink = (e,officer)=>{
        if(e) e.preventDefault()
        console.log(officer);
       if (officer.position !== 'หัวหน้าโครงการ') {
        window.open(`${officer.youtube}`)
       }
       else{
        window.open("https://www.arts.chula.ac.th/AlumWeb/100years/DetailArts.php?id=232&group=58",'_blank')
       }
        
    }
    const openPopup =(e,position,officer)=>{
        if(e) e.preventDefault()
        console.log('position is',position);
        console.log('officer is',officer);
        if (officer.position !== "หัวหน้าโครงการ") {
            setActivOfficer(officer)
            setShowSmallPopup(true)
        }
        else{
            setShowBigPopup(true)
            // setActivOfficer
            // document.getElementById('leader-popup').scrollIntoView
        }
    }
    const closePopup =(e)=>{
        if(e) e.preventDefault()
        setShowBigPopup(false)
        setShowSmallPopup(false)
    }
    useEffect(() => {
        const getOfficer=async()=>{
            const response = await axios.get(`${process.env.SERVER_API}/get/officers`)
            if (response.status === 200) {
                console.log(response.data.payload);
                let data = response.data.payload
                setLeader(data.leader)
                setConsultants(data.consultant)
                setCoordinators(data.coordinator)
                setNewGraduates(data.new_graduate)
                setCitizens(data.citizen)
                setInterns(data.intern)
                setCheck_data(true)
            }
        }
        if (check_data === false)getOfficer()
    }, [])
    return (
        <div className={styles['officer-page']}>
            <SubHeader first={'ผู้จัดทำ'} />
            <div className="container">
                <div className="col-12">
                    <div className={styles['logo-box']}>
                    <img src="/LOGO.png" alt="" />
                    </div>
                    <div className={styles['detail-pa1']}>
                        <span>การจัดทำ Web Application ของตำบลหนองลู อำเภอสังขละบุรี จังหวัดกาญจนบุรี นี้ เป็นส่วนหนึ่งของ<br/> 
                        <b style={{color:'#7A2328' ,fontWeight:'200'}}>“โครงการยกระดับเศรษฐกิจและสังคมรายตำบลแบบบูรณาการ มหาวิทยาลัยสู่ตำบล สร้างรากแก้วให้ประเทศ (U2T)” </b>
                          บริหารจัดการโดย <b style={{color:'#7A2328'}}>ผศ.ดร. อรองค์ ชาคร</b> ซึ่งเป็น Tambon System Integrator (TSI)<br/>
                          สังกัด<b>สถาบันบัณฑิตพัฒนบริหารศาสตร์ (นิด้า)</b> ภายใต้การกำกับดูแลของกระทรวงการอุดมศึกษา <br/>
                          วิทยาศาสตร์ วิจัยและนวัตกรรม</span>
                        
                    </div>
                    <div className={styles['detail-pa2']}>
                        <span>
                        <b>หมายเหตุ:</b> U2T เป็นโครงการภายใต้ “พ.ร.ก. ให้อำนาจกระทรวงการคลังกู้เงินเพื่อแก้ไขปัญหา เยียวยา<br/> 
                        และฟื้นฟูเศรษฐกิจและสังคม ที่ได้รับผลกระทบจากสถานการณ์การระบาดของโรคติดเชื้อไวรัสโคโรนา 2019” <br/>
                        โดยมีวัตถุประสงค์เพื่อให้เกิดการจ้างงาน<b>ประชาชนทั่วไป บัณฑิตจบใหม่ และนักศึกษา</b> ที่ได้รับผลกระทบจาก<br/>
                        สถานการณ์ดังกล่าว โดยมีสถาบันอุดมศึกษาเป็นหน่วยบูรณาการการทำงานแบบบูรณาการในพื้นที่ตำบล “System Integrator”
                        ครอบคลุมพื้นที่ในระยะแรก 3,000 ตำบล ทั่วประเทศ โดยส่งเสริมให้เกิดการพัฒนาตามปัญหาและความต้องการของชุมชน
                        โดยประสานงานและทำงานร่วมกับองค์กรในพื้นที่ เพื่อลดปัญหาความยากจนแบบมี<br/>เป้าหมายชัดเจน (Targeted Poverty Alleviation)  <a target={'_blank'} href="https://u2tambon.com/">รายละเอียดของโครงการ คลิก https://u2tambon.com/</a> 
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles['logo-group']}>
                <div className="container">
                    <div className="col-12">
                       <div className={styles['wrap-logo']}>
                       <div className={styles['logo-left-box']}>
                            <div className={styles['logo-rowbox-left']}>
                                <img src="/img/officer/u2t-logo.png" alt="" />
                                <img src="/img/officer/ms-logo.png" alt="" />
                                <img src="/img/officer/nida-logo.png" alt="" />
                            </div>
                            <span>หน่วยราชการผู้จัดทำโครงการ</span>
                        </div>
                        <div className={styles['logo-right-box']}>
                            <div className={styles['logo-rowbox-right']}>
                                <img src="/img/officer/sangkhla-logo.png" alt="" />
                                <img src="/img/officer/wangka-logo.png" alt="" />
                                <img src="/img/officer/nong-roo-logo.png" alt="" />
                                <img src="/img/officer/abc-logo.png" alt="" />
                            </div>
                            <span>องค์กรท้องถิ่น</span>
                        </div>
                       </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="col-12">
                    <div className={styles['officer-box']}>
                    <div className={styles['banner-box']} style={{backgroundImage:`url('/img/officer/officer-banner.png')`}}>
                    <span>คณะผู้จัดทำ</span>
                    </div>
                    <div className={styles['officer-row-box']}>
                        <div className={styles['position-box']}>
                            <div className={styles['position-name-box']}>
                                <span>ที่ปรึกษา</span>
                            </div>
                            {consultants.length > 0 ? consultants.map((consultant)=>(
                                <div onClick={(e)=>openPopup(e,"ที่ปรึกษา",consultant)} className={styles['officer-name-box']} key={consultant.id}>
                                        <span>{consultant.name}</span>
                                </div>
                            )):''}
                        </div>
                        <div className={styles['position-box']}>
                                <div  className={styles['position-leader-box']}>
                                    <span  >หัวหน้าโครงการ</span>
                                </div>
                                <div className={styles['leader-name']}>
                                {leader ? (
                                    <span onClick={(e)=>openPopup(e,"หัวหน้าโครงการ",leader)} >{leader.name}</span>
                                ):''}
                                </div>
                                <div className={styles['vertical-line']}></div>
                                <div className={styles['worker-white-box']}>
                                    <span>ผู้ปฏิบัติงาน</span>
                                </div>
                                <div className={styles['vertical-short-line']}></div>
                        </div>
                        <div className={styles['position-box']}>
                                <div  className={styles['position-name-box']}>
                                    <span>ผู้ประสานงาน</span>
                                </div>
                                {coordinators.length > 0 ? coordinators.map((coordinator)=>(
                                    <div onClick={(e)=>openPopup(e,"ผู้ประสานงาน",coordinator)} className={styles['officer-name-box']} key={coordinator.id}>
                                        <span>{coordinator.name}</span>
                                    </div>
                                )) :''}
                        </div>
                    </div>
                    <div className={styles['officer-row-box']}>
                    <div className={styles['position-box']}>
                            <div  style={{marginTop:'0'}} className={styles['position-name-box']}>
                                <span>บัณฑิตจบใหม่</span>
                            </div>
                            {newGraduates.length > 0 ? newGraduates.map((newGraduate)=>(
                                <div onClick={(e)=>openPopup(e,"บัณฑิตจบใหม่",newGraduate)} className={styles['officer-name-box']} key={newGraduate.id}>
                                        <span>{newGraduate.name}</span>
                                </div>
                            )):''}
                        </div>
                        <div className={styles['position-box']}>
                                <div  style={{marginTop:'0'}} className={styles['position-leader-box']}>
                                    <span>ประชาชน</span>
                                </div>
                                {citizens.length > 0 ? citizens.map((citizen)=>(
                                <div style={{textAlign:'start'}} onClick={(e)=>openPopup(e,"ประชาชน",citizen)}  className={styles['leader-name']} key={citizen.id}>
                                        <span>{citizen.name}</span>
                                </div>
                            )):''}
                        </div>
                        <div className={styles['position-box']}>
                                <div style={{marginTop:'0'}} className={styles['position-name-box']}>
                                    <span>นักศึกษาฝึกงาน</span>
                                </div>
                                {interns.length > 0 ? interns.map((intern)=>(
                                    <div onClick={(e)=>openPopup(e,"นักศึกษาฝึกงาน",intern)} className={styles['officer-name-box']} key={intern.id}>
                                        <span>{intern.name}</span>
                                    </div>
                                )) :''}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Popup
            open={(e)=>e.preventDefault(),showSmallPopup}
            closeOnEscape={false}
            closeOnDocumentClick={false}
            lockScroll
            >
                <div className={styles['officer-backdrop']}></div>
                <div className="col-12">
                    <div style={{backgroundImage:`url('/img/officer/small-popup-frame.png')`}} className={styles['officer-popup']}>
                    <div  className={styles['officer-close-icon-box']}  onClick={(e)=>closePopup(e)}>
                    <img className={styles['officer-close-icon']} src='/Quit.png'   alt="" />
                    </div>
                        <div className={styles['officer-flexbox']}>
                                    <div  className={styles['popup-image-box']} >
                                        <div className={styles['officer-image']} style={{backgroundImage:`url('${activOfficer.image ? `/uploadImage/officer/${activOfficer.image}`:'/img/officer/officer-placeholder.png'}')`}} ></div>
                                    </div>
                                    <div className={styles['popup-officer-name']}>
                                        <span>{activOfficer.name}</span>
                                    </div>
                                    <div className={styles['officer-detail']}>
                                        <span style={{textAlign:activOfficer.position === "ที่ปรึกษา" ? 'center':'start'}}>{activOfficer.position === "ที่ปรึกษา" ?"ตำแหน่ง"
                                        :activOfficer.position === "ผู้ประสานงาน"  ? "ประวัติ"
                                        :"สะท้อนความรู้สึกจากการปฏิบัติโครงการ"}</span>
                                        <span>{activOfficer.detail}</span>
                                    </div>
                                    <div className={styles['contact-box']}>
                                <div className={styles['row-box']}>
                                {activOfficer.youtube ? (
                                        <div className={styles['youtube']} onClick={(e)=>toLink(e,activOfficer)} ></div>
                                        ):(
                                            <div className={styles['no-youtube']} ></div>
                                        )}
                                    <div className={styles['social-col-box']}>
                                            <div className={styles['fb-box']}>
                                                <img src={activOfficer.fb ? "/fb-icon-32.png":'/no-fb-32.png'} alt="" />
                                                <span style={{color:`${activOfficer.fb ? '#383838':'#E1D3B6'}`}}>
                                                    {activOfficer.fb ? activOfficer.fb:'-'}
                                                </span>
                                            </div>
                                            <div className={styles['ig-box']}>
                                                    <img src={activOfficer.ig ? "/ig-icon.png":'/no-ig.png'} alt="" />
                                                    <span style={{color:`${activOfficer.ig ? '#383838':'#E1D3B6'}`}}>
                                                    {activOfficer.ig ? activOfficer.ig :'-'}
                                                    </span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
            <Popup
                open={(e)=>e.preventDefault(),showBigPopup}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                lockScroll
                >
                    <div  className={styles['leader-backdrop']} ></div>
                    <div className="col-12">
                        <div id='leader-popup' className={styles['leader-popup']}>
                        <img className={styles['popup-close-icon']} src='/Quit.png' onClick={(e)=>closePopup(e)}  alt="" />
                        <div className={styles['leader-flexbox']}>
                            <div className={styles['leader-popup-image']}>
                            <div className={styles['officer-image']} style={{backgroundImage:`url('${leader.image ? `/uploadImage/officer/${leader.image}`:'/img/officer/officer-placeholder.png'}')`}} ></div>
                            </div>
                            <div className={styles['leader-pa1']}>
                                    <span>{leader.name}</span>
                                    <span>หัวหน้าโครงการ U2T ตําบลหนองลู อําเภอสังขละบุรี จังหวัดกาญจนบุรี</span>
                            </div>
                            <div className={styles['leader-pa2']}>
                                    <span>{leader.detail}</span>
                            </div>
                            <div className={styles['contact-box']}>
                                <div className={styles['row-box']}>
                                    {leader.youtube ? (
                                        <div className={styles['youtube']} onClick={(e)=>toLink(e,leader)} ></div>
                                        ):(
                                            <div className={styles['no-youtube']} ></div>
                                        )}
                                    <div className={styles['social-col-box']}>
                                            <div className={styles['fb-box']}>
                                                <img src={leader.fb ? "/fb-icon-32.png":'/no-fb-32.png'} alt="" />
                                                <span style={{color:`${activOfficer.fb ? '#383838':'#E1D3B6'}`}}>
                                                    {leader.fb ? leader.fb:'-'}
                                                </span>
                                            </div>
                                            <div className={styles['ig-box']}>
                                                    <img src={leader.ig ? "/ig-icon.png":'/no-ig.png'} alt="" />
                                                    <span style={{color:`${activOfficer.ig ? '#383838':'#E1D3B6'}`}}>
                                                    {leader.ig ? leader.ig :'-'}
                                                    </span>
                                            </div>
                                    </div>
                                </div>
                                <div className={styles['link-box']}>
                                <span  onClick={(e)=>toLink(e,leader)}>
                                ประวัติเพิ่มเติม
                                </span>
                                </div>
                            </div>
                        </div>
                        </div>

                    </div>
                </Popup>
        </div>
    )
}
