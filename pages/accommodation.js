import {React,useState,useEffect} from 'react'
import Head from 'next/head'
import styles from "../styles/accommodation.module.scss";
import Popup from 'reactjs-popup';
import axios from 'axios';
export default function accommodation() {
    const [showAccommodation, setShowAccommodation] = useState([])
    const [resAccommodation, setResAccommodation] = useState([])
    const [activeAcommodation, setActiveAcommodation] = useState({
        id:'',name:'',type:'',information:'',min_price:'',max_price:'',
        fb_page:'',images:[],services:[],tel:''
    })
    const [openPopup, setOpenPopup] = useState(false)
    const [bigPhoto, setBigPhoto] = useState('')

    const showPopup =(e,accommodation)=>{
        if (e) e.preventDefault()
        console.log('accommodation is',accommodation);
        setActiveAcommodation(accommodation)
        setBigPhoto(accommodation.images[0])
        setOpenPopup(true)
    }
    const next=(photo,images)=>{
        let index = images.indexOf(photo)
        if (index <= images.length) {
            index = index +1 
            setBigPhoto(images[index])
            console.log('1 index',index);
        }
        if (index === images.length) {
            setBigPhoto(images[0])
        }
    }
    const prev=(photo,images)=>{
        let index = images.indexOf(photo)
        if (index === 0) {
            console.log(index);
            console.log(images.length);
            setBigPhoto(images[images.length-1])
        }
        if (index >= 1) {
            index = index -1 
            setBigPhoto(images[index])
            console.log('2 index',index);
        }

    }
    const closePopup =(e)=>{
        if(e) e.preventDefault()
        setOpenPopup(false)
    }
    const changeImage=(image)=>{
        setBigPhoto(image)
    }
    const setNewAccommodation=(new_show_arr)=>{
        setShowAccommodation([...showAccommodation,...new_show_arr])
    }
    const showMore=()=>{
        let new_show_arr =[]
        let new_res_arr = []
        if (res_arr.length !== 0) {
            for (let i = 0; i < 9; i++) {
           if(res_arr[i])new_show_arr.push(res_arr[i])     
        }
    }
        new_res_arr = res_arr.splice(0,9)
        console.log('new show arr is',new_show_arr);
        setNewAccommodation(new_show_arr)
    }
    useEffect(() => {
        const getAccommodation =async()=>{
          const response = await axios.get('http://localhost:8080/get/accommodation')
          if (response.status === 200) {
            console.log(response.data.payload);
            let data = response.data.payload 
            let setarr = []
                for (let j = 0; j < 9; j++) {
                    if(data[j] === 0 || data[j])setarr.push(data[j])
               }
               data.splice(0,9)
               setResAccommodation(data)
               setShowAccommodation(setarr)
            }
        } 
       if (showAccommodation.length === 0) {
           getAccommodation()
       }
    }, [])
    return (
        <div className={styles['accommodation-page']} >
            <Head>
                <title>โรงแรม/แพพัก</title>
            </Head>
            <div className={styles['header-line']} ></div>
                <div className="container">
                    <div className="col-12">
                        <div className={styles['page-title-box']}>
                            <img  className={styles['bg-title']} src="/img/accommodation/title-bg-imag.png" alt="" />
                            <div className={styles['title-textbox']} >
                                <span>ที่พัก</span>
                            </div>
                        </div>
                        <div className={styles['accommodation-column']} >
                            <div className={styles['accommodation-list']} >
                                {showAccommodation.length >0 ? showAccommodation.map((accommodation)=>(
                                    <div onClick={(e)=>showPopup(e,accommodation)} key={accommodation.id} className={styles['accommodation-item']} >
                                        <img src={accommodation.images.length >0 ? `/uploadImage/accommodation/${accommodation.images[0]}`:'/no-imge.png'} alt="" />
                                        {accommodation.type === "แพพัก" ? (
                                            <div className={styles['boat-house-tag']} >แพพัก</div>
                                        ) :''}
                                        <span className={styles['accommodation-name']} >{accommodation.name}<br/></span>
                                        <div className={styles['price-box']} >
                                            <img className={styles['icon-b']} src="/img/accommodation/icon-B.png" alt="" />
                                            <span>{`${accommodation.min_price} - ${accommodation.max_price} บาท`}</span>
                                        </div>
                                    </div>
                                )):''}
                            </div>
                            {resAccommodation.length > 0 ? ( <div onClick={(e)=>showMore(e)} className={styles['load-content-text']} ><span   >โหลดเพิ่ม</span></div>):''}
                        </div>
                    </div>
                </div>                
              <Popup
              open={openPopup}
              closeOnDocumentClick={false}
              closeOnEscape={false}
              lockScroll
              >
                  <div className={styles['backdrop']} ></div>
                  <div className="col-12">
                      <div className={styles['accommodation-popup']} >
                          <img draggable={false} className={styles['popup-close-icon']} onClick={(e)=>closePopup(e)} src="/Quit.png" alt="" />
                          <div className={styles['accommodation-flexbox']} >
                            <div className={styles['popup-name-box']} >
                                <span>{activeAcommodation.name}</span>
                                <span>{activeAcommodation.type}</span>
                            </div>
                            <div className={styles['row-box']} >
                                <div className={styles['image-box']} >
                                {activeAcommodation.images.length > 1 ? (<a  className={styles['prev']} onClick={(e)=>prev(bigPhoto,activeAcommodation.images)} >❮ </a>):''}
                                {activeAcommodation.images.length > 1 ?(<a className={styles['next']} onClick={(e)=>next(bigPhoto,activeAcommodation.images)} >❯ </a>):''}
                                    {activeAcommodation.images.length > 0 ?<img className={styles['big-image']} src={activeAcommodation.images.length > 0 ? `/uploadImage/accommodation/${bigPhoto}` :'/no-image-big.png'} alt="" />
                                    :<img className={styles['no-image']} src={ '/no-image-big.png'} alt="" />}
                                    <div className={styles['image-list']} >
                                        {activeAcommodation.images.length > 0 ? activeAcommodation.images.map((image)=>(
                                            <img onClick={()=>changeImage(image)} key={image} src={`/uploadImage/accommodation/${image}`} alt="" />
                                        )):''}
                                    </div>
                                </div>
                                <div className={styles['detail-box']} >
                                    <div className={styles['information-box']} >
                                            <span>
                                                {activeAcommodation.information}
                                            </span>
                                    </div>
                                {activeAcommodation.min_price && activeAcommodation.max_price ? (
                                <div className={styles['popup-price-box']}>
                                            <img src="/img/accommodation/icon-b-big.png" alt="" />
                                            <span>{`${activeAcommodation.min_price} - ${activeAcommodation.max_price} บาท`}</span>
                                </div>
                                ) :''}
                                <div className={styles['breakfast-box']}>
                                            {activeAcommodation.services.includes("อาหารเช้า") ? (
                                                <div className={styles['breakfast']} >
                                                <img src="/img/accommodation/with-breakfast.png" alt="" />
                                                <span style={{color:'#383838',marginLeft:'8px'}}>อาหารเช้า</span>
                                                </div>
                                            ):(
                                               <div className={styles['breakfast']}>
                                                    <img src="/img/accommodation/no-breakfast.png" alt="" />
                                                    <span style={{color:'#E1D3B6',marginLeft:'8px'}} >อาหารเช้า</span>
                                               </div>
                                            )}
                                           
                                </div>
                                <div className={styles['service-box']}>
                                    {activeAcommodation.services.map((service)=>(
                                         service === "ลานจอดรถ" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/parking-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "สระว่ายน้ำ" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/pool-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "Wi-Fi" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/wifi-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "ห้องน้ำส่วนตัว" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/bath-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "ร้านอาหาร" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/restaurant-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "ห้องประชุม" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/meetting-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "เช่ารายเดือน" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/monthly.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "ลานกางเต็นท์" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/tent-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "บริการลากแพ" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/raft-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :service === "คาราโอเกะ" ? (
                                            <div key={service} className={styles['icon-box']}>
                                                <img src="/img/accommodation/karaoke-icon.png" alt="" />
                                                <span>{service}</span>
                                            </div>
                                        ) :''
                                    ))}
                                </div>
                                </div>
                            </div>
                            <div className={styles['contact-box']}>
                                <div className={styles['contact-item']}>
                                    <img src="/img/restaurant/fb-icon.png" alt="" />
                                    <span>{activeAcommodation.fb_page}</span>
                                </div>
                                <div className={styles['contact-item']}>
                                    <img src="/img/restaurant/tel-icon.png" alt="" />
                                    <span>{activeAcommodation.tel} </span>
                                </div>
                            </div>
                      </div>
                      </div>
                  </div>
              </Popup>
        </div>
    )
}

