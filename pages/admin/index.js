import { react, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Header from './Header'
import axios from 'axios';
import styles from "../../styles/admin/admin.module.scss";
const mdTheme = createTheme();

export default function Index() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [accom, setAccom] = useState(0)
  const [rest, setRest] = useState(0)
  const [driver, setDriver] = useState(0)
  const [boat, setBoat] = useState(0)
  const [attraction, setAttraction] = useState(0)
  const [product, setProduct] = useState(0)
  const [tradition, setTradition] = useState(0)
  const [review, setReview] = useState(0)
  const [checkData, setCheckData] = useState(false)

  const getAlldata = async () => {
    const length_api = await axios.get(`${process.env.SERVER_API}/get/data-length`)
    setRest(length_api.data.payload.restaurant)
    setAccom(length_api.data.payload.accom)
    setDriver(length_api.data.payload.driver)
    setBoat(length_api.data.payload.boat)
    setAttraction(length_api.data.payload.attraction)
    setTradition(length_api.data.payload.tradition)
    setProduct(length_api.data.payload.product)
    setReview(length_api.data.payload.review)
    setCheckData(true)
  }
  useEffect(() => {

    let local = localStorage.getItem("token")
    setToken(local)
    checkData === false ? getAlldata() : ''
  }, [router.isReady, token])

  return (
    <ThemeProvider theme={mdTheme}>

      <Box sx={{ display: 'flex' }}>
        <Header />
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
              <Grid item xs={3}>
                <Paper onClick={(e) => router.push('/admin/manage_restaurants')} className={styles['admin-card']} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span >ร้านอาหารทั้งหมด</span>
                  <span>{rest}</span>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper onClick={(e) => router.push('/admin/manage_accommodations')} className={styles['admin-card']} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span>ที่พักทั้งหมด</span>
                  <span>{accom}</span>
                </Paper>
              </Grid>

              <Grid item xs={3}>
                <Paper onClick={(e) => router.push('/admin/manage_attractions')} className={styles['admin-card']} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span>สถานที่ท่องเที่ยวทั้งหมด</span>
                  <span>{attraction}</span>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper onClick={(e) => router.push('/admin/manage_products')} className={styles['admin-card']} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span>ผลิตภัณฑ์ทั้งหมด</span>
                  <span>{product}</span>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper onClick={(e) => router.push('/admin/manage_drivers')} className={styles['admin-card']} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span>วินมอเตอร์ไซต์ทั้งหมด</span>
                  <span>{driver}</span>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper onClick={(e) => router.push('/admin/manage_boats')} className={styles['admin-card']} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span>เรือนำเที่ยวทั้งหมด</span>
                  <span>{boat}</span>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper onClick={(e) => router.push('/admin/manage_traditions')} className={styles['admin-card']} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span>ประเพณีทั้งหมด</span>
                  <span>{tradition}</span>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper onClick={(e) => router.push('/admin/manage_reviews')} className={styles['admin-card']} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <span>รีวิวทั้งหมด</span>
                  <span>{review}</span>
                </Paper>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  )
}

