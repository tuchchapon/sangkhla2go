import {React, useState,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from './Header'
import link from 'next/link'
import { useRouter,withRouter } from 'next/router'
import { createTheme,Icon,ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../../styles/admin/admin.module.scss'
const mdTheme = createTheme();
export default function driverlocation() {
    const router = useRouter()
    // const [driverlocation, setDriverlocation] = useState({
    //     location_name:'',location_detail:''
    // })
    const [selectedLocation, setSelectedLocation] = useState([])
    const [driverLocation, setDriverLocation] = useState([])
    const submitLocation = async ()=>{
        console.log(driverlocation);
       await axios.post('http://localhost:8080/create/driverLocation',driverlocation).then((res)=>{
            console.log(res);
        })
    }
    const setPopupData =(location)=>{
        
        setOpen(true)
        console.log(location);
        setSelectedLocation(location)

    }
    const editWinLocation =({location})=>{
        
        console.log('location is',location.id);
        router.push(`/admin/location/${location.id}`)

    }
    const deleteWinLocation =  ({location})=>{
        console.log('location id is',location.id);
        
        if(location)
         Swal.fire({
            title:`ต้องการลบข้อมูลหรือไม่`,
            icon:'warning',
            html:`ต้องการลบข้อมูล${location.location_name} หรือไม่
            <br/>การลบข้อมูลสถานที่ตั้งวินจะทำให้วินที่อยู่ในจุดนั้นไม่แสดงผลด้วย`,
            showCancelButton:true,
            confirmButtonColor:'#d33',
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    let response = await axios.delete('http://localhost:8080/delete/driver-location',{data:location})
                    if (response.data.status === 200) {
                       Swal.fire(
                           'ลบข้อมูลเรียบร้อยแล้ว',
                           `ลบข้อมูล ${location.location_name}แล้ว`,
                           'success'
                       )
                    }
                } catch (error) {
                    if(error){
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
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const getDriverlocation = async()=>{
            let response = await axios.get('http://localhost:8080/get/driverLocation')
            console.log(response);
            setDriverLocation(response.data.payload)
        }
        getDriverlocation()
    }, [])
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display:'flex'}} >
            <Header/>
            <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
         <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}  >
              <Grid item xs={12}>
              <div className={styles['add-button']} >
                  <p>สถานที่ตั้งวินมอเตอร์ไซต์</p>
                  <Button  style={{justifyContent:'flex-end',marginBottom:'8px'}} onClick={(e)=>router.push('/admin/location/create')} color="success" variant="contained">เพิ่มสถานที่</Button></div>
                <Paper  sx={{ p: 2, display: 'flex', flexDirection: 'column'  }}>
                    {driverLocation.length === 0 ? '': driverLocation.map((location)=>(
                        <div className={styles['box-item']} key={location.id}>
                            <span onClick={()=>setPopupData(location)} >{location.location_name}</span>
                            <div>
                            <IconButton  onClick={((e)=>editWinLocation({location}))} >
                                <ModeEditIcon/>
                            </IconButton>
                            <IconButton  onClick={((e)=>deleteWinLocation({location}))} >
                                <DeleteIcon/>
                            </IconButton>
                            </div>
                        </div>
                    ))}
                </Paper>
                
              </Grid>
            </Grid>
                   
             </Container>
            </Box>
            </Box>
                        {/* <LocationPopup open={open} location={selectedLocation}  /> */}
            {/* <input type="text" onChange={((e)=>{setDriverlocation({...driverlocation,location_name:e.target.value})})} />
            <button onClick={submitLocation} >submit</button> */}
        </ThemeProvider>
    )
}
