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
    const [showComment, setShowComment] = useState([]);
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
    const setNewshowComment = (new_show_arr) => {
        setShowComment([...showComment, ...new_show_arr])
    }
    const showMore = (e) => {
        if (e) e.preventDefault()
        let new_show_arr = []
        let new_res_comments = []
        if (comments.length !== 0) {
            if (screen.availWidth > 1400) {
                for (let i = 0; i < 6; i++) {
                    if (comments[i]) new_show_arr.push(comments[i])
                }
                new_res_comments = comments.splice(0, 6)
            }
            else if (screen.availWidth >= 768) {
                for (let i = 0; i < 4; i++) {
                    if (comments[i]) new_show_arr.push(comments[i])
                }
                new_res_comments = comments.splice(0, 4)
            }
            else if (screen.availWidth < 768) {
                for (let i = 0; i < 3; i++) {
                    if (comments[i]) new_show_arr.push(comments[i])
                }
                new_res_comments = comments.splice(0, 3)
            }
        }
        setNewshowComment(new_show_arr)
        console.log('new show arr is', new_show_arr);
    }
    useEffect(() => {

        const getCommnet = async () => {
            const response = await axios.get(`${process.env.SERVER_API}/get/comment`)
            if (response.status === 200) {
                console.log(response.data.payload.approve);
                let data = response.data.payload.approve
                // data
                let setarr = []
                if (screen.availWidth > 1400) {
                    for (let j = 0; j < 6; j++) {
                        if (data[j] === 0 || data[j]) setarr.push(data[j])
                    }
                    data.splice(0, 6)
                }
                else if (screen.availWidth >= 768) {
                    for (let j = 0; j < 4; j++) {
                        if (data[j] === 0 || data[j]) setarr.push(data[j])
                        console.log('768');
                    }
                    data.splice(0, 4)
                }
                else if (screen.availWidth < 768) {
                    for (let j = 0; j < 3; j++) {
                        if (data[j] === 0 || data[j]) setarr.push(data[j])
                    }
                    data.splice(0, 3)
                }
                console.log('data is ', data);
                console.log('setarr is', setarr);
                setComments(data)
                setShowComment(setarr)

            }
            setCheckData(true)
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
                    {showComment && showComment.length > 0 ? showComment.map((comment) => (
                        <div key={comment.id} className={styles['comment-item']}>
                            <span className={styles['commentator-name']}>{comment.commentator_name ? comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
                            <span className={styles['comment-text']}>{comment.comment_text}</span>
                        </div>
                    )) : null}
                </div>
                {comments.length > 0 ? <span onClick={(e) => showMore(e)} className={styles['load-content-text']}>แสดงเพิ่ม</span> : null}
            </div>
            <CommentPopup open={showPopup} onClose={() => setShowPopup(false)} />
        </div>
        <Footer />
    </div>;
}
