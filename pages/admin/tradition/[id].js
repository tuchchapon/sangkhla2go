import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from '../Header'
import Image from 'next/image'
import Button from '@mui/material/Button';
import { storage } from '../../../configs/firebaseConfig'
export default function tradition() {
    const router = useRouter()
    const id = router.query.id || []
    const [galleryImages, setGalleryImages] = useState([])
    let tradition_type = ["ประเพณีชาวกระเหรี่ยง", "ประเพณีชาวมอญ"]
    let months = ["เดือนมกราคม", "เดือนกุมภาพันธ์", "เดือนมีนาคม", "เดือนเมษายน", "เดือนพฤษภาคม", "เดือนมิถุนายน", "เดือนกรกฎาคม",
        "เดือนสิงหาคม", "เดือนกันยายน", "เดือนตุลาคม", "เดือนพฤศจิกายน", "เดือนธันวาคม"]
    const [tradition, setTradition] = useState({
        id: '',
        type: 'ประเพณีชาวกระเหรี่ยง',
        month: 'เดือนมกราคม',
        name: '',
        local_name: '',
        detail: '',
        images: []
    })
    const createTradition = () => {
        console.log('create')
        console.log(tradition)
        axios.post(`${process.env.SERVER_API}/create/tradition`, tradition)
            .then((res) => {
                if (res.status === 201) {
                    Swal.fire({
                        title: 'บันทึก',
                        text: 'เพิ่มข้อมูลสำเร็จแล้ว',
                        icon: 'success'
                    }).then((result => {
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_traditions')
                        }
                    }))
                }
            })
    }
    const editTradition = () => {
        console.log('edit')
        console.log(tradition)
        axios.post(`${process.env.SERVER_API}/edit/tradition`, tradition)
            .then((res) => {
                console.log(res)
                if (res.data.status === 200) {
                    Swal.fire({
                        title: 'บันทึก',
                        text: 'แก้ไขข้อมูลสำเร็จแล้ว',
                        icon: 'success'
                    }).then((result => {
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_traditions')
                        }
                    }))
                }
            })

    }
    const deleteImg = (index) => {
        let new_image = tradition.images
        new_image.splice(index, 1)
        setTradition({ ...tradition, images: new_image })

    }
    const uploadImage = async (e) => {
        e.preventDefault();
        const files = e.target.files
        console.log('files is', files)
        if (files.length > 0) {
            // let  gallery  =[]
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                uploadImageAsPromise(files[i], i)
            }


        }
    }
    function uploadImageAsPromise(imageFile, i) {
        return new Promise(function (resolve, reject) {
            let imageName = Date.now() + i + '.jpg'
            var storageRef = storage.ref("tradition-image/" + imageName);
            //Upload file
            var task = storageRef.put(imageFile);

            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                },
                function error(err) {
                },
                async function complete(url) {
                    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        galleryImages.push(downloadURL)
                        setTradition({ ...tradition, images: galleryImages })
                    });
                }
            );
        });
    }

    useEffect(() => {
        const getTradition = async () => {
            console.log('get one tradition')
            const response = await axios.post(`${process.env.SERVER_API}/get/tradition/:${id}`, { id: id })
            console.log('response driver is ', response.data)
            if (response.status === 200) {
                setTradition(response.data.payload)
                let imageResponse = response.data.payload.images
                setGalleryImages(imageResponse)
            }
        }
        if (id !== 'create' && router.isReady) {
            getTradition()
        }
    }, [id, router.isReady])
    return (
        <div className={styles['dis-f']}>
            <Header />
            <div className={styles['box-component']} >
                <div className="container">
                    <div className={styles['edit-box']}>
                        <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลประเพณี' : 'แก้ไขข้อมูลประเพณี'}</h4>
                        <div className={styles['input-box']} >
                            <div className={styles['first-input']} >
                                <span>ชนเผ่า</span>
                                <select name="" id="" value={tradition ? tradition.type : ''} onChange={(e) => setTradition({ ...tradition, type: e.target.value })} >
                                    {tradition_type.map((type_name) => (
                                        <option key={type_name} >{type_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles['first-input']} >
                                <span>เดือน</span>
                                <select name="" id="" value={tradition ? tradition.month : ''} onChange={(e) => setTradition({ ...tradition, month: e.target.value })}>
                                    {months.map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles['first-input']} >
                                <span>ชื่อประเพณี</span>
                                <input type="text" value={tradition ? tradition.name : ''} onChange={(e) => setTradition({ ...tradition, name: e.target.value })} />
                            </div>
                            {tradition.type === "ประเพณีชาวกระเหรี่ยง" ? (
                                <div className={styles['first-input']} >
                                    <span>ชื่อท่องถิ่น</span>
                                    <input type="text" value={tradition ? tradition.local_name : ''} onChange={(e) => setTradition({ ...tradition, local_name: e.target.value })} />
                                </div>
                            ) : tradition.type === "ประเพณีชาวมอญ"}
                            <div className={styles['first-input']} >
                                <span>รายละเอียด</span>
                                <textarea name="" id="" cols="30" rows="5" value={tradition ? tradition.detail : ''} onChange={(e) => setTradition({ ...tradition, detail: e.target.value })} ></textarea>
                            </div>
                            {tradition && tradition.images ? (
                                <div className={styles['photo-box']}  >
                                    {tradition.images.map((image, index) => (
                                        <div key={index} className={styles['photo-item']} >
                                            <div className={styles['img-button-box']} >
                                                <img src={`${image}`} alt="" width={200} height={250} />
                                                <button className={styles['delete-button']} onClick={() => deleteImg(index)}>ลบ</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                                : ''}
                            <div className={styles['first-input']}>
                                <span>รูปประเพณี</span>
                                <input type="file" multiple={true} name="" accept="image/png, image/jpeg, image/jpg" onChange={(e) => uploadImage(e)} id="" />
                            </div>
                            <div className={styles['button-group']} >
                                <Button onClick={id === 'create' ? createTradition : editTradition} className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                                <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}