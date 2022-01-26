import { React, useState, useEffect } from 'react';
import styles from '../styles/comment.module.scss'
import Head from 'next/head';
import axios from 'axios';
import Footer from '../layouts/footer';
import SubHeader from '../layouts/subHeader';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';
export default function comment() {

    const [comments, setComments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [checkData, setCheckData] = useState(false);
    // const [loadding, setLoadding] = useState(false);
    const [newComment, setNewComment] = useState({
        commentator_name: '', commentator_email: '', comment_text: ''
    });
    const submitComment = (e) => {
        if (e) e.preventDefault()
        if (!newComment.comment_text || !newComment.commentator_email) {
            Swal.fire({
                title: 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน',
                icon: 'warning',
                confirmButtonColor: '#D7886F',
                confirmButtonText: 'ตกลง'

            })
            return false
        }
        axios.post(`${process.env.SERVER_API}/create/comment`, newComment).then((res) => {
            // console.log('response is ', res.data.payload);
            if (res.data.status === 200) {
                console.log('res data is', res.data);
                setShowPopup(true)
            }
        })
        console.log(newComment);
    }

    useEffect(() => {

        const getCommnet = async () => {
            const response = await axios.get(`${process.env.SERVER_API}/get/comment`)
            console.log(response.data);
            setCheckData(true)
            setComments(response.data.payload.approve)
            // setComments(response.data.payload.pending)
        }
        // const resizing = async () => {
        //     window.onload = ResizeAllItem()
        //     window.addEventListener("resize", ResizeAllItem)
        //     let allItems = document.getElementsByClassName("comment-item")
        //     console.log('resize', allItems);
        //     for (let i = 0; i < allItems.length; i++) {
        //         imagesLoaded(allItems[i], ResizeInstance)
        //     }
        //     setLoadding(true)
        // }
        !checkData ? getCommnet() : null


    }, [comments]);

    return <div className={styles['comment-page']}>
        <Head>
            <title>รีวิว</title>
        </Head>
        <SubHeader first={'รีวิว'} />
        <div className={styles['comment-top-box']}>
            <div className={styles['comment-form-box']}>
                <div className={styles['form-left-box']}>
                    <div className={styles['comment-input']}>
                        <label >ข้อความประทับใจ<span>*</span></label>
                        <textarea onChange={(e) => setNewComment({ ...newComment, comment_text: e.target.value })} name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div className={styles['form-right-box']}>
                    <div className={styles['comment-input']}>
                        <label>ชื่อ</label>
                        <input type="text" onChange={(e) => setNewComment({ ...newComment, commentator_name: e.target.value })} />
                    </div>
                    <div className={styles['comment-input']}>
                        <label >E-mail<span>*</span></label>
                        <input type="text" onChange={(e) => setNewComment({ ...newComment, commentator_email: e.target.value })} />
                    </div>
                    <button onClick={(e) => submitComment(e)} className={styles['submit-button']}>
                        <span>ส่ง</span>
                    </button>
                </div>

            </div>
        </div>
        <div className={styles['comment-bottom-box']}>
            <div className={styles['comment-list-box']}>
                <div onClick={(e) => setShowPopup(true)} className={styles['comment-title']}>
                    <span>รีวิว</span>
                </div>
                <div className={styles['comment-list']}>
                    {comments && comments.length > 0 ? comments.map((comment) => (
                        <div key={comment.id} className={styles['comment-item']}>
                            <span className={styles['commentator-name']}>{comment.commentator_name ? comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
                            <span className={styles['comment-text']}>{comment.comment_text}</span>
                        </div>
                    )) : null}
                </div>
            </div>
            <Popup
                open={showPopup}
                closeOnDocumentClick={false}
                closeOnEscape={false}
                lockScroll
            >
                <div className={styles['backdrop']}></div>
                <div className={styles['popup-fixed-box']}>
                    <div className={styles['comment-popup']}>
                        <div className={styles['popup-close-icon']} onClick={(e) => setShowPopup(false)}></div>
                        <div className={styles['comment-popup-flexbox']}>
                            <span>ขอบคุณสำหรับการรีวิว</span>
                            <span>
                                แอดมินกำลังตรวจสอบข้อความ<br />
                                ท่านจะได้รับการแจ้งเตือนผ่าน E-mail และเผยแพร่บนเว็บไซต์ภายใน 24 ช.ม.
                            </span>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
        <Footer />
    </div>;
}
