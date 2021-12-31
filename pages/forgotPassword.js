import axios from 'axios'
import { React, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
// import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
const forgotPassword = () => {
    const router = useRouter()
    const theme = createTheme();
    const forgotPassword = () => {

        console.log('forgot password')
        console.log(userEmail);
        try {
            axios.post(`${process.env.SERVER_API}/forgot-password`, userEmail).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire({
                        title: `${res.data.payload}`,
                        text: 'กรุณาตรวจสอบอีเมลของท่าน',
                        icon: 'success'

                    }).then((res) => {
                        if (res.isConfirmed) {
                            router.push('/login')
                        }
                    })
                }
                else {
                    Swal.fire({
                        title: `เกิดข้อผิดพลาด`,
                        text: 'ไม่พบอีเมลในระบบ',
                        icon: 'warning'

                    })
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
    const [userEmail, setUserEmail] = useState({ email: '', token: '' })
    return (
        <div className="body">
            <ThemeProvider theme={theme} >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <Avatar>
                            S2
                        </Avatar>
                        <Typography sx={{ marginTop: 2 }} component="form" variant="h5">
                            กรอกอีเมลที่ลืมรหัสผ่าน
                        </Typography>
                        <Box component="form" >
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => { setUserEmail({ ...userEmail, email: e.target.value }) }} />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={forgotPassword}
                            >
                                เปลี่ยนรหัสผ่าน
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}
export default forgotPassword
