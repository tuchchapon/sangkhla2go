import {react,useState,useEffect}  from 'react';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Header from './Header'
const mdTheme = createTheme();

export default  function Index() {
  const router = useRouter()
  const [token, setToken] = useState('')
  useEffect(() => {
    let local =localStorage.getItem("token")
    setToken(local) 
  }, [router.isReady,token])

  return (
   <ThemeProvider theme={mdTheme}>

        <Box sx={{ display: 'flex' }}>
        <Header  />
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
            <Grid container spacing={3}>


              {/* write here  */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                </Paper>
              </Grid>
            </Grid>
          
          </Container>
        </Box>
      </Box>
    </ThemeProvider> 
  )
}

