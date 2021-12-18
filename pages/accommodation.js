import {React,useState,useEffect} from 'react'
import Head from 'next/head'
import styles from "../styles/accommodation.module.scss";
import axios from 'axios';
import AccommodationPopup from '../components/accommodationPopup';
export default function accommodation() {
    const [showAccommodation, setShowAccommodation] = useState([])
    const [resAccommodation, setResAccommodation] = useState([])
    const [activeAcommodation, setActiveAcommodation] = useState({
        id:'',name:'',type:'',information:'',min_price:'',max_price:'',
        fb_page:'',images:[],services:[],tel:''
    })
    const [openPopup, setOpenPopup] = useState(false)

    const showPopup =(e,accommodation)=>{
        if (e) e.preventDefault()
        console.log('accommodation is',accommodation);
        setActiveAcommodation(accommodation)
        setOpenPopup(true)
    }

    const setNewAccommodation=(new_show_arr)=>{
        setShowAccommodation([...showAccommodation,...new_show_arr])
    }
    const showMore=()=>{
        let new_show_arr =[]
        let new_res_arr = []
        if (resAccommodation.length !== 0) {
            for (let i = 0; i < 9; i++) {
           if(resAccommodation[i])new_show_arr.push(resAccommodation[i])     
        }
    }
        new_res_arr = resAccommodation.splice(0,9)
        console.log('new show arr is',new_show_arr);
        setNewAccommodation(new_show_arr)
    }
    useEffect(() => {
        const getAccommodation =async()=>{
          const response = await axios.get(`${process.env.SERVER_API}/get/accommodation`)
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
                                           {accommodation.min_price !=='' && accommodation.max_price !== '' ?  <img className={styles['icon-b']} src="/img/accommodation/icon-B.png" alt="" />:''}
                                           {accommodation.min_price === "" && accommodation.max_price ===''  ?'':  accommodation.min_price && accommodation.max_price ? <span>{`${accommodation.min_price} - ${accommodation.max_price} บาท`}</span>:
                                            accommodation.min_price >= accommodation.max_price === '' && accommodation.min_price === '' ? ( <span>{`${accommodation.min_price} บาท`}</span>):
                                            accommodation.min_price === accommodation.max_price ?  <span>{`${accommodation.min_price}  บาท`}</span>:''}
                                        </div>
                                    </div>
                                )):''}
                            </div>
                            {resAccommodation.length > 0 ? ( <div onClick={(e)=>showMore(e)} className={styles['load-content-text']} ><span   >โหลดเพิ่ม</span></div>):''}
                        </div>
                    </div>
                </div>                
                <AccommodationPopup open={openPopup} onClose={()=>setOpenPopup(false)} activeAcommodation={activeAcommodation}  />
        </div>
    )
}

