import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from './Header'
import link from 'next/link'
import { useRouter, } from 'next/router'
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from '../../styles/admin/admin.module.scss'

export default function boatClub() {

    const router = useRouter()
    const [club_name, setClub_name] = useState([])

    const editClubName = ({ name }) => {

        console.log('location is', name.id);
        router.push(`/admin/clubname/${name.id}`)

    }
    const deleteClubName = ({ name }) => {
        console.log('location id is', name.id);
        if (name)
            Swal.fire({
                title: `ต้องการลบข้อมูลหรือไม่`,
                icon: 'warning',
                html: `ต้องการลบข้อมูล${name.club_name} หรือไม่`,
                showCancelButton: true,
                confirmButtonColor: '#d33',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        let response = await axios.delete(`${process.env.SERVER_API}/delete/boat-clubname`, { data: name })
                        if (response.data.status === 200) {
                            Swal.fire({
                                title: 'ลบข้อมูลเรียบร้อยแล้ว',
                                text: `ลบข้อมูล ${name.club_name}แล้ว`,
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
        const getBoatClubName = async () => {
            let response = await axios.get(`${process.env.SERVER_API}/get/boatClubName`)
            console.log(response);
            setClub_name(response.data.payload)
        }
        getBoatClubName()
    }, [])
    return (
        <div >
            <div className={styles['dis-f']}>
                <Header />
                <div className={styles['box-component']}>
                    <div className={styles['data-container']} >
                        <div className="container" >
                            <div className="col-12"  >
                                <div className={styles['add-button']} >
                                    <p>ชื่อชมรมเรือนำเที่ยว</p>
                                    <Button onClick={(e) => router.push('/admin/clubname/create')} color="success" variant="contained">เพิ่มชมรมเรือนำเที่ยว</Button>
                                </div>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    {club_name.length === 0 ? '' : club_name.map((name) => (
                                        <div className={styles['box-item']} key={name.id}>
                                            <span  >{name.club_name}</span>
                                            <div>
                                                <IconButton onClick={((e) => editClubName({ name }))} >
                                                    <ModeEditIcon />
                                                </IconButton>
                                                <IconButton onClick={((e) => deleteClubName({ name }))} >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    ))}
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
