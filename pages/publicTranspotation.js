import {React,useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/PublicTranspotation.module.scss'
import axios from 'axios'
import Popup from 'reactjs-popup'
export default function publicTranspotation() {
    const [showWinPopup, setShowWinPopup] = useState(false)
    const [driverLocation, setDriverLocation] = useState([])
    const [activeWin, setActiveWin] = useState({})
    const OpenWinPopup = (e,location)=>{
        if (e) e.preventDefault()
        setActiveWin(location)
        setShowWinPopup(true)
    }
    const closeWinPopup =(e)=>{
        if(e) e.preventDefault()
        setShowWinPopup(false)
    }

    useEffect(() => {
        const getLocation = async()=>{
          let  response = await axios.get('http://localhost:8080/get/driverLocation')
            console.log(response);
            setDriverLocation(response.data.payload)
        }
        getLocation()
        console.log(driverLocation);

    }, [])
    return (
        <div className={styles['transpotation-page']}>
            <div className="container">
            <h1>publicTranspotation</h1>
            <h1>วินมอเตอร์ไซต์</h1>
            <div className={styles['win-box']}>
            {!driverLocation ? null: driverLocation.map((location)=>(
                <div key={location.id} className={styles['win-items']} >
                    <div  className={styles['location-image-box']} >
                        <div onClick={(e)=>OpenWinPopup(e,location)}>
                            <Image src={'/img/publictranspotation/win_frame.png'} width={270} height={240} />
                            <span className={styles['win-name']} >{location.location_name}</span>
                        </div>
                       
                    </div>
                    </div>
                    
            ))}
            </div>
            <h1>เรือนำเที่ยว</h1>
            <div className={styles['boat-box']} >
                {[1,2,3,4,5,6,7,8,9,10].map((i)=>(
                    <div key={i} >
                        <div  className={styles['boat-items']} ><Image src="/img/publictranspotation/boat_frame.png" width={370} height={384} /></div>

                        </div>
                ))}
            </div>
            </div>
                <Popup 
                open={showWinPopup}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                >
                    <div>
                        <div className="col-12" style={{backgroundColor:'white'}} >
                           <div className={styles['win-popup']} >
                           <img className={styles['popup-close-icon']} onClick={(e)=> closeWinPopup(e)} src='/Quit.png' alt="" />
                            <span className={styles['location-name']}>{activeWin ? activeWin.location_name :''}</span>
                            <p>{activeWin ? activeWin.location_detail:''}</p>
                            <div className={styles['popup-win-box']}>
                                {[1,2,3,4,5,6,7,8].map((i)=>(
                                    <div className={styles['popup-win-item']} key={i}>
                                        <Image src="/img/publictranspotation/winCoverPlaceholder.png" width={136} height={136} />
                                        <span>ชื่อ</span>
                                        <span>เบอร์</span>
                                    </div>
                                ))}
                            </div>
                           </div>
                        </div>
                    </div>
                </Popup>
        </div>
    )
}
