import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/admin/create_edit.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Header from '../Header'
import { storage } from '../../../configs/firebaseConfig'


export default function attraction() {


    const router = useRouter()
    const id = router.query.id || []
    const [galleryImages, setGalleryImages] = useState([])
    let attraction_type = ['ธรรมชาติ', 'วัฒนธรรม', 'เกษตรกรรมและชุมชน']
    const [attraction, setAttraction] = useState({
        id: '',
        name: '',
        type: 'ธรรมชาติ',
        detail: '',
        images: []
    })
    const createAttraction = () => {
        console.log('create');
        console.log(attraction)
        axios.post(`${process.env.SERVER_API}/create/attraction`, attraction)
            .then((res) => {
                if (res.status === 201) {
                    Swal.fire({
                        title: 'บันทึก',
                        text: 'เพิ่มข้อมูลสำเร็จแล้ว',
                        icon: 'success'
                    }).then((result => {
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_attractions')
                        }
                    }))
                }
            })

    }
    const editAttraction = () => {
        console.log('edit');
        console.log(attraction)
        axios.post(`${process.env.SERVER_API}/edit/attraction`, attraction)
            .then((res) => {
                console.log(res)
                if (res.data.status === 200) {
                    Swal.fire({
                        title: 'บันทึก',
                        text: 'แก้ไขข้อมูลสำเร็จแล้ว',
                        icon: 'success'
                    }).then((result => {
                        if (result.isConfirmed) {
                            router.replace('/admin/manage_attractions')
                        }
                    }))
                }
            })
    }
    const uploadImage = async (e) => {
        e.preventDefault();
        const files = e.target.files
        console.log('files is', files)

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                console.log(files[i].name);
                uploadImageAsPromise(files[i], i)
            }
        }
    }
    function uploadImageAsPromise(imageFile, i) {
        return new Promise(function (resolve, reject) {
            let imageName = Date.now() + i + '.jpg'
            var storageRef = storage.ref("attraction-image/" + imageName);
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
                        setAttraction({ ...attraction, images: galleryImages })
                    });
                }
            );
        });
    }
    const deleteImg = (index) => {
        let new_image = attraction.images
        new_image.splice(index, 1)
        setAttraction({ ...attraction, images: new_image })

    }
    useEffect(() => {
        const getAttraction = async () => {
            console.log('get one attraction')
            const response = await axios.post(`${process.env.SERVER_API}/get/attraction/:${id}`, { id: id })
            console.log('attraction is ', response.data.payload)
            if (response.status === 200) {
                let imageResponse = response.data.payload.images
                setAttraction(response.data.payload)
                setGalleryImages(imageResponse)
            }

        }
        if (id !== "create" && router.isReady) {
            getAttraction()
        }
        console.log('attraction id is', attraction.id)
    }, [id, router.isReady])
    return (
        <div className={styles['dis-f']} >
            <Header />
            <div className={styles['box-component']}>
                <div className="container">
                    <div className={styles['edit-box']} >
                        <h4 className={styles['center-item']}>{id === "create" ? 'เพิ่มข้อมูลสถานที่ท่องเที่ยว' : 'แก้ไขข้อมูลสถานที่ท่องเที่ยว'}</h4>
                        <div className={styles['input-box']} >
                            <div className={styles['first-input']} >
                                <span>ประเภท</span>
                                <select name="" id="" value={attraction ? attraction.type : 'ธรรมชาติ'} onChange={(e) => setAttraction({ ...attraction, type: e.target.value })}>
                                    {attraction_type.map((type) => (
                                        <option key={type} value={type}  >{type} </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles['first-input']} >
                                <span>ชื่อสถานที่</span>
                                <input type="text" value={attraction ? attraction.name : ''} onChange={(e) => setAttraction({ ...attraction, name: e.target.value })} />
                            </div>
                            <div className={styles['first-input']} >
                                <span>รายละเอียด</span>
                                <textarea name="" id="" cols="30" rows="10" value={attraction ? attraction.detail : ''} onChange={(e) => setAttraction({ ...attraction, detail: e.target.value })} ></textarea>
                            </div>
                            {attraction && attraction.images ? (
                                <div className={styles['photo-box']}  >
                                    {attraction.images.map((image, index) => (
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
                            <div className={styles['first-input']} >
                                <span>รูปสถานที่</span>
                                <input type="file" name="" id="" multiple={true} accept="image/png, image/jpeg, image/jpg" onChange={(e) => uploadImage(e)} />
                            </div>
                            <div className={styles['button-group']} >
                                <Button onClick={id === 'create' ? createAttraction : editAttraction} className={styles['button-size']} color="info" variant="contained">บันทึกข้อมูล</Button>
                                <Button onClick={router.back} className={styles['button-size']} color="warning" variant="contained"   >ย้อนกลับ</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
