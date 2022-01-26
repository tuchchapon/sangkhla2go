import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Header from '../Header'

function clubname() {
    const router = useRouter()
    const id = router.query.id || []
    const [clubName, setClubName] = useState({
        id: '',
        club_name: '',
    })
    const createClubName = () => {
        console.log('club name is', clubName);
        console.log('create location');
        axios.post(`${process.env.SERVER_API}/create/boatClub`, clubName)
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    Swal.fire({
                        title: 'บันทึก',
                        text: 'เพิ่มข้อมูลสำเร็จแล้ว',
                        icon: 'success'
                    }).then((result => {
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_boatClub')
                        }
                    }))
                }
            })
    }
    const editClubName = () => {
        console.log('save location');
        try {
            axios.post(`${process.env.SERVER_API}/edit/boatClubName`, clubName)
                .then((res) => {
                    console.log(res);
                    if (res.data.status === 200) {
                        Swal.fire({
                            title: 'บันทึก',
                            text: 'แก้ไข้อมูลสำเร็จแล้ว',
                            icon: 'success',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                router.replace('/admin/manage_boatClub')
                            }
                        })
                    }
                })
        } catch (error) {
            console.log('error is', error);
        }
    }
    useEffect(() => {
        console.log('page is ', router.query);
        const getLocation = async () => {
            const response = await axios.post(`${process.env.SERVER_API}/get/clubName/:${id}`, { id: id })
            console.log('response is', response);
            setClubName(response.data.payload)
        }
        if (id !== "create") {
            getLocation()
        }
    }, [id, router.isReady])
    return (
        <div className={styles['dis-f']} >
            <Header />
            <div className={styles['box-component']} >
                <div className="container">
                    <div className={styles['edit-box']}>
                        <h4 className={styles['center-item']}  >{id === "create" ? 'เพิ่มข้อมูลชมรมเรือนำเที่ยว' : 'แก้ไขข้อมูลชมรมเรือนำเที่ยว'}</h4>
                        <div className={styles['input-box']} >
                            <div className={styles['first-input']}>
                                <span>ชื่อชมรม: </span>
                                <input type="text" value={clubName ? clubName.club_name : ''} onChange={(e) => setClubName({ ...clubName, club_name: e.target.value })} />
                            </div>
                            <div className={styles['button-group']}>
                                <Button onClick={id === 'create' ? createClubName : editClubName} className={styles['button-size']} color="info" variant="contained"   >บันทึกข้อมูล</Button>
                                <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default clubname