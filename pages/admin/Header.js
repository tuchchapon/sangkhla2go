import { React, useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from 'next/link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import RoomIcon from '@mui/icons-material/Room';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import ParkIcon from '@mui/icons-material/Park';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../../styles/admin/admin.module.scss'
import MessageIcon from '@mui/icons-material/Message';
import Swal from 'sweetalert2'
// import {listMenu} from './list_menu'


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const AppBar = styled(MuiAppBar, {

  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const drawerWidth = 240;




export default function header() {


  const router = useRouter()
  const id = router.pathname || []
  const [open, setOpen] = useState(true);
  const toggleDrawer = ({ }) => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.clear()
    Swal.fire('ออกจากระบบ', 'ออกจากระบบแล้ว', 'success')
    router.push('/login')
  }

  useEffect(() => {
    console.log('header id is', id)



    if (!localStorage.getItem("token")) {
      router.push('/login')
    }
    // console.log(router.route);
  }, [id])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{

              marginRight: '36px',
              ...(open && { display: 'none', }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography

            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, }}

          >
            <span onClick={(e) => router.push('/admin/')} className={styles['admin-title-text']} >จัดการข้อมูล</span>
          </Typography>
          <Button color="inherit" variant="outlined" onClick={() => logout()} >ออกจากระบบ</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Link href="/admin/manage_restaurants" >
          <ListItem button >
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="ร้านอาหาร" />
          </ListItem>
        </Link>
        <Link href="/admin/manage_accommodations">
          <ListItem button >
            <ListItemIcon>
              <HotelIcon />
            </ListItemIcon>
            <ListItemText primary="โรงแรม/แพพัก" />
          </ListItem>
        </Link>
        <Divider />

        <Link href="/admin/manage_locations">
          <ListItem button   >
            <ListItemIcon>
              <RoomIcon />
            </ListItemIcon>
            <ListItemText primary="จุดตั้งวินมอเตอร์ไซต์" />
          </ListItem>
        </Link>
        <Link href="/admin/manage_drivers">
          <ListItem button >
            <ListItemIcon>
              <TwoWheelerIcon />
            </ListItemIcon>
            <ListItemText primary="วินมอเตอร์ไซต์" />
          </ListItem>
        </Link>
        <Link href="/admin/manage_boats">
          <ListItem button >
            <ListItemIcon>
              <DirectionsBoatFilledIcon />
            </ListItemIcon>
            <ListItemText primary="เรือนำเที่ยว" />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/admin/manage_attractions">
          <ListItem button >
            <ListItemIcon>
              <ParkIcon />
            </ListItemIcon>
            <ListItemText primary="สถานที่ท่องเที่ยว" />
          </ListItem>
        </Link>
        <Link href="/admin/manage_products" >
          <ListItem button >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="ผลิตภัณฑ์" />
          </ListItem>
        </Link>
        <Link href="/admin/manage_traditions" >
          <ListItem button >
            <ListItemIcon>
              <LocalActivityIcon />
            </ListItemIcon>
            <ListItemText primary="ประเพณี" />
          </ListItem>
        </Link>
        <Link href="/admin/manage_reviews">
          <ListItem button >
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary="รีวิว" />
          </ListItem>
        </Link>
        <Link href="/admin/manage_comment">
          <ListItem button >
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="คอมเมนต์" />
          </ListItem>
        </Link>
        <Divider />
        <Link href="/admin/manage_officers">
          <ListItem button >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="คณะผู้จัดทำ" />
          </ListItem>
        </Link>
      </Drawer>

    </Box>
  )
}
