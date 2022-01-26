import { React, useState, useEffect } from 'react';
import styles from '../styles/comment.module.scss'
import Head from 'next/head';
import axios from 'axios';
import Footer from '../layouts/footer';
import SubHeader from '../layouts/subHeader';
import Swal from 'sweetalert2';
import CommentPopup from '../components/commentPopup';

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export default function comment() {

    const [comments, setComments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [checkData, setCheckData] = useState(false);
    // let email = ''
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
        if (validateEmail(newComment.commentator_email)) {
            axios.post(`${process.env.SERVER_API}/create/comment`, newComment).then((res) => {
                // console.log('response is ', res.data.payload);
                if (res.data.status === 200) {
                    console.log('res data is', res.data);
                    setShowPopup(true)
                }
            })
        }
        else if (!validateEmail(newComment.commentator_email)) {
            Swal.fire({
                title: 'กรุณากรอกอีเมลล์ให้ถูกต้อง',
                icon: 'warning',
                confirmButtonColor: '#D7886F',
                confirmButtonText: 'ตกลง'

            })
            return false
        }

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
                <div className={styles['comment-title']}>
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
            <CommentPopup open={showPopup} onClose={() => setShowPopup(false)} />
        </div>
        <Footer />
    </div>;
}
