import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Header from './Header';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import FindInPageIcon from '@mui/icons-material/FindInPage';
import styles from '../../styles/admin/admin.module.scss'
export default function manage_comment() {
    const router = useRouter()
    const [pending_comments, setpending_comments] = useState([])
    const [approveComments, setApproveComments] = useState([]);
    const [rejectComments, setRejectComments] = useState([]);

    const showComment = (comment) => {
        console.log('comment is', comment);
        Swal.fire({
            title: 'จัดการคอมเมนต์รีวิว',
            icon: 'info',
            html: `<span><strong>ชื่อผู้รีวิว: </strong></span><span>${comment.commentator_name ? comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
            <p><strong>E-mail: </strong>${comment.commentator_email}</p>
            <span><strong>ข้อความ</strong></span>
            <p>${comment.comment_text}</p>`,
            confirmButtonText: 'อนุมัติ',
            confirmButtonColor: 'green',
            showDenyButton: true,
            denyButtonText: 'ไม่อนุมัติ',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก'
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({
                    title: 'อนุมัติคอมเมนต์นี้ใช่หรือไม่',
                    html: `<span>หากคอมเมนต์ผ่านการอนุมัติแล้วระบบจะส่ง email แจ้งเตือนไปยังผู้คอมเมนต์</span>
                    และคอมเมนต์จะถูกนำไปแสดงที่หน้ารีวิว`,
                    confirmButtonText: 'ยืนยัน',
                    confirmButtonColor: 'green',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonColor: 'red',
                    cancelButtonText: 'ยกเลิก'
                }).then((approve) => {
                    if (approve.isConfirmed) {
                        comment.comment_status = 'approve'
                        axios.post(`${process.env.SERVER_API}/edit/comment-status`, comment).then((response) => {
                            if (response.data.status === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'ระบบได้ปรับสถานะคอมเมนต์รีวิวเรียบร้อยแล้ว'
                                }).then((res) => {
                                    if (res.isConfirmed) {
                                        router.reload()
                                    }
                                })
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'เกิดข้อผิดพลาด'
                                })
                            }
                        })
                    }
                })
            }
            if (res.isDenied) {
                Swal.fire({
                    title: 'ไม่อนุมัติคอมเมนต์นี้ใช่หรือไม่',
                    html: `<span>หากคอมเมนต์ไม่ผ่านการอนุมัติระบบจะส่ง email แจ้งเตือนไปยังผู้คอมเมนต์</span>`,
                    confirmButtonText: 'ยืนยัน',
                    confirmButtonColor: 'green',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonColor: 'red',
                    cancelButtonText: 'ยกเลิก'
                }).then((reject) => {
                    if (reject.isConfirmed) {
                        comment.comment_status = 'reject'
                        axios.post(`${process.env.SERVER_API}/edit/comment-status`, comment).then((response) => {
                            console.log(response.data.payload);
                            if (response.data.status === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'ระบบได้ปรับสถานะคอมเมนต์รีวิวเรียบร้อยแล้ว'
                                }).then((res) => {
                                    if (res.isConfirmed) {
                                        router.reload()
                                    }
                                })
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'เกิดข้อผิดพลาด'
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    const changeStatusFromApprove = (comment) => {
        console.log('comment is', comment);
        Swal.fire({
            title: 'จัดการคอมเมนต์รีวิว',
            icon: 'info',
            html: `<span><strong>ชื่อผู้รีวิว: </strong></span><span>${comment.commentator_name ? comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
            <p><strong>E-mail: </strong>${comment.commentator_email}</p>
            <span><strong>ข้อความ</strong></span>
            <p>${comment.comment_text}</p>`,
            confirmButtonText: 'ไม่อนุมัติ',
            confirmButtonColor: 'red',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก'
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({
                    title: 'ไม่อนุมัติคอมเมนต์นี้ใช่หรือไม่',
                    html: `<span>หากคอมเมนต์ไม่ผ่านการอนุมัติระบบจะส่ง email แจ้งเตือนไปยังผู้คอมเมนต์</span>`,
                    confirmButtonText: 'ยืนยัน',
                    confirmButtonColor: 'green',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonColor: 'red',
                    cancelButtonText: 'ยกเลิก'
                }).then((reject) => {
                    if (reject.isConfirmed) {
                        comment.comment_status = 'reject'
                        axios.post(`${process.env.SERVER_API}/edit/comment-status`, comment).then((response) => {
                            console.log(response.data.payload);
                            if (response.data.status === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'ระบบได้ปรับสถานะคอมเมนต์รีวิวเรียบร้อยแล้ว'
                                }).then((res) => {
                                    if (res.isConfirmed) {
                                        router.reload()
                                    }
                                })
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'เกิดข้อผิดพลาด'
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    const changeStatusFromReject = (comment) => {
        console.log('comment is', comment);
        Swal.fire({
            title: 'จัดการคอมเมนต์รีวิว',
            icon: 'info',
            html: `<span><strong>ชื่อผู้รีวิว: </strong></span><span>${comment.commentator_name ? comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
            <p><strong>E-mail: </strong>${comment.commentator_email}</p>
            <span><strong>ข้อความ</strong></span>
            <p>${comment.comment_text}</p>`,
            confirmButtonText: 'อนุมัติ',
            confirmButtonColor: 'green',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก'
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({
                    title: 'อนุมัติคอมเมนต์นี้ใช่หรือไม่',
                    html: `<span>หากคอมเมนต์ผ่านการอนุมัติแล้วระบบจะส่ง email แจ้งเตือนไปยังผู้คอมเมนต์</span>
                    และคอมเมนต์จะถูกนำไปแสดงที่หน้ารีวิว`,
                    confirmButtonText: 'ยืนยัน',
                    confirmButtonColor: 'green',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonColor: 'red',
                    cancelButtonText: 'ยกเลิก'
                }).then((approve) => {
                    if (approve.isConfirmed) {
                        comment.comment_status = 'approve'
                        axios.post(`${process.env.SERVER_API}/edit/comment-status`, comment).then((response) => {
                            if (response.data.status === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'ระบบได้ปรับสถานะคอมเมนต์รีวิวเรียบร้อยแล้ว'
                                }).then((res) => {
                                    if (res.isConfirmed) {
                                        router.reload()
                                    }
                                })
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'เกิดข้อผิดพลาด'
                                })
                            }
                        })
                    }
                })
            }
        })

    }
    const deleteComment = (comment) => {
        console.log('deleteComment', comment);
        Swal.fire({
            title: `ต้องการลบข้อมูลหรือไม่`,
            icon: 'warning',
            html: `ต้องการรีวิวจากคุณ ${comment.commentator_name} หรือไม่`,
            showCancelButton: true,
            confirmButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await axios.delete(`${process.env.SERVER_API}/delete/comment`, { data: comment })
                    if (response.data.status === 200) {
                        Swal.fire({
                            title: 'ลบข้อมูลเรียบร้อยแล้ว',
                            text: `ลบรีวิวจากคุณ ${comment.commentator_name}แล้ว`,
                            icon: 'success'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                router.reload()
                            }
                        })
                    }
                } catch (error) {
                    if (error) {
                        Swal.fire(
                            'เกิดข้อผิดพลาด',
                            `${error}`,
                            'error'
                        )
                    }
                }

            }
        })
    }
    useEffect(() => {
        const getUserComment = async () => {
            let response = await axios.get(`${process.env.SERVER_API}/get/comment`)
            console.log(response);
            setpending_comments(response.data.payload.pending)
            setApproveComments(response.data.payload.approve)
            setRejectComments(response.data.payload.reject)
            console.log(response.data.payload);
        }
        getUserComment()
    }, [])
    return (
        <div className={styles['dis-f']}>
            <Header />
            <div className={styles['box-component']}>
                <div className={styles['data-container']} >
                    <div className="container">
                        <div className="col-12">
                            <div className={styles['add-button']}>
                                <p>คอมเมนต์จากผู้ใช้งาน</p>
                                {/* <Button onClick={(e) => router.push('/admin/driver/create')} color="success" variant="contained"  >เพิ่มวินมอเตอร์ไซค์</Button> */}
                            </div>
                            {pending_comments.length > 0 ? <Paper className={styles['comment-paper']} sx={{ p: 3, display: 'flex', flexDirection: 'column' }} >
                                <p className={styles['comment-head-text']} >คอมเมนต์ที่รอการดำเนินการ</p>
                                <div className={styles['comment-wrap-item']}>
                                    {pending_comments.length > 0 ? pending_comments.map((pending_comment) => (
                                        <div className={styles['comment-box-item']} key={pending_comment.id}>
                                            <div className={styles['comment-textbox']}>
                                                <b>ชื่อ: </b><span>{pending_comment.commentator_name ? pending_comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
                                            </div>
                                            <div className={styles['comment-textbox']}>
                                                <b>E-mail: </b><span> {pending_comment.commentator_email}</span>
                                            </div>
                                            <div className={styles['comment-textbox']}>
                                                <b>ข้อความ: </b><span>{pending_comment.comment_text}</span>
                                            </div>
                                            <div className={styles['comment-button-group']}>
                                                <Button color="primary" variant='outlined' onClick={((e) => showComment(pending_comment))} >
                                                    {/* <span>จัดการ</span> */}
                                                    <FindInPageIcon />
                                                </Button>
                                                <Button color="error" variant='outlined' onClick={((e) => deleteComment(pending_comment))} >
                                                    {/* <span>ลบ</span> */}
                                                    <DeleteIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    )) : ''}
                                </div>
                            </Paper> : null}
                            {approveComments.length > 0 ? <Paper className={styles['comment-paper']} sx={{ p: 3, display: 'flex', flexDirection: 'column', marginTop: '20px', marginBottom: '20px' }} >
                                <p className={styles['comment-head-text']} >คอมเมนต์ที่ผ่านการอนุมัติ</p>
                                <div className={styles['comment-wrap-item']}>
                                    {approveComments.length > 0 ? approveComments.map((approve_comment) => (
                                        <div className={styles['comment-box-item']} key={approve_comment.id}>
                                            <div className={styles['comment-textbox']}>
                                                <b>ชื่อ: </b><span>{approve_comment.commentator_name ? approve_comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
                                            </div>
                                            <div className={styles['comment-textbox']}>
                                                <b>E-mail: </b><span> {approve_comment.commentator_email}</span>
                                            </div>
                                            <div className={styles['comment-textbox']}>
                                                <b>ข้อความ: </b><span>{approve_comment.comment_text}</span>
                                            </div>
                                            <div className={styles['comment-button-group']}>
                                                <Button color="primary" variant='outlined' onClick={((e) => changeStatusFromApprove(approve_comment))} >
                                                    {/* <span>จัดการ</span> */}
                                                    <FindInPageIcon />
                                                </Button>
                                                <Button color="error" variant='outlined' onClick={((e) => deleteComment(approve_comment))} >
                                                    {/* <span>ลบ</span> */}
                                                    <DeleteIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    )) : ''}
                                </div>
                            </Paper> : null}
                            {rejectComments.length > 0 ? <Paper className={styles['comment-paper']} sx={{ p: 3, display: 'flex', flexDirection: 'column', marginTop: '20px' }} >
                                <p className={styles['comment-head-text']} >คอมเมนต์ที่ไม่ผ่านการอนุมัติ</p>
                                <div className={styles['comment-wrap-item']}>
                                    {rejectComments.length > 0 ? rejectComments.map((reject_comment) => (
                                        <div className={styles['comment-box-item']} key={reject_comment.id}>
                                            <div className={styles['comment-textbox']}>
                                                <b>ชื่อ: </b><span>{reject_comment.commentator_name ? reject_comment.commentator_name : 'ไม่ระบุชื่อ'}</span>
                                            </div>
                                            <div className={styles['comment-textbox']}>
                                                <b>E-mail: </b><span> {reject_comment.commentator_email}</span>
                                            </div>
                                            <div className={styles['comment-textbox']}>
                                                <b>ข้อความ: </b><span>{reject_comment.comment_text}</span>
                                            </div>
                                            <div className={styles['comment-button-group']}>
                                                <Button color="primary" variant='outlined' onClick={((e) => changeStatusFromReject(reject_comment))} >
                                                    {/* <span>จัดการ</span> */}
                                                    <FindInPageIcon />
                                                </Button>
                                                <Button color="error" variant='outlined' onClick={((e) => deleteComment(reject_comment))} >
                                                    {/* <span>ลบ</span> */}
                                                    <DeleteIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    )) : ''}
                                </div>
                            </Paper> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
