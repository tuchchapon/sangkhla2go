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

function resetPassword({ }) {
    const router = useRouter()
    const theme = createTheme();
    const { token } = router.query
    const [new_password, setNew_password] = useState({
        token: '', password: ''
    })

    useEffect(() => {
        setNew_password({ ...new_password, token: token })
        console.log('token is', new_password.token);

    }, [token])

    const setNewPassword = () => {
        console.log('reset password');
        console.log('new password is', new_password);
        console.log('new token is ', token);
        try {
            axios.post(`${process.env.SERVER_API}/reset-password`, new_password).then((res) => {
                console.log(res);
                if (res.status) {
                    Swal.fire({
                        title: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว',
                        icon: 'success',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            router.replace('./login')
                        }
                    })
                }
                else {

                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div>

            <ThemeProvider theme={theme} >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <Avatar>
                            S2
                        </Avatar>
                        <Typography sx={{ marginTop: 2 }} component="form" variant="h5">
                            ตั้งค่ารหัสผ่านใหม่
                        </Typography>
                        <Box component="form" >
                            <TextField
                                margin="normal"
                                fullWidth
                                id="password"
                                label="รหัสผ่านใหม่"
                                name="password"
                                autoFocus
                                onChange={(e) => setNew_password({ ...new_password, password: e.target.value })} />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={setNewPassword}
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
export default resetPassword