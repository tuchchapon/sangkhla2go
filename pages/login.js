import axios from 'axios'
import {React,useState} from 'react';
import { useRouter } from "next/router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
// import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function login() {
    const router = useRouter()
    const theme = createTheme();
    const signIn = ()=>{
        console.log('login');

        axios.post(`${process.env.SERVER_API}/login`,admin).then((res)=>{
            console.log(res.data.token);
            console.log('data is',res.data);
            localStorage.setItem("token", `${res.data.token}`);
            if (res.data.token) {
                router.push('/admin')
            }
        })
        // console.log('admin is',admin);
    }
    const register = ()=>{
        console.log('register');
        axios.post(`${process.env.SERVER_API}/createAdmin`,admin).then((res)=>{
            console.log(res);
        })
    }
    const changePassword =()=>{
        console.log('change password');
        axios.post(`${process.env.SERVER_API}/change-password`,newPassword) 
    }

    const [admin, setAdmin] = useState({
        email:'',
        password: ''
      })
   
      const [newPassword, setNewPassword] = useState('')
    
    const testPOST =()=>{
        console.log('test POST API');
          axios.post(`${process.env.SERVER_API}/createAdmin'`,admin)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            //router.replace("/");
          })
        } 

        return(
            <div>
                <ThemeProvider theme={theme} >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                            <Box  sx={{ marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                                <Avatar>
                                    S2
                                </Avatar>
                                <Typography component="form" variant="h5">
                                    Sign in
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
                                    onChange={((e)=>setAdmin({...admin,email:e.target.value}))}
                                    />
                                    <TextField 
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    label="password"
                                    name="password"
                                    autoComplete="password"
                                    autoFocus
                                    onChange={((e)=>setAdmin({...admin,password:e.target.value}))}
                                    />
                                   <Button
                                   fullWidth
                                   variant="contained"
                                   sx={{mt:3,mb:2}}
                                   onClick={signIn}
                                   >
                                       Sign In
                                    </Button> 
                                    <Grid container >
                                        <Grid item xs style={{textAlign:'center'}} >
                                         <Link href="/forgotPassword">
                                         ลืมรหัสผ่าน
                                         </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                    </Container>
                </ThemeProvider>
            </div>
        )

    // return (
    //     <div>
    //         <span >email</span>
    //         <input onChange={(e)=>{setAdmin({...admin,email:e.target.value})}} type="text" />
    //         <span>password</span>
    //         <input onChange={(e)=>{setAdmin({...admin,password:e.target.value}),console.log(e.target.value);}} type="text" />
    //         <button onClick={signIn}>login</button>
    //         <Button>Test </Button>
    //         <button onClick={register}>register</button>

    //     </div>
    // )
}


