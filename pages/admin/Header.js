import {React,useState} from 'react'
import Typography from '@mui/material/Typography';
import { styled} from '@mui/material/styles';
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
import RoomIcon from '@mui/icons-material/Room';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import ParkIcon from '@mui/icons-material/Park';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
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

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
    setOpen(!open);
    };
  
    return (
        <Box sx={{display:'flex'}}>
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
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              จัดการข้อมูล
            </Typography>
            <Button color="inherit" variant="outlined">ออกจากระบบ</Button>
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
                    <ListItem button >
            <ListItemIcon>
                <RestaurantIcon/>
            </ListItemIcon>
            <ListItemText primary="ร้านอาหาร" />
            </ListItem>
            <ListItem button >
            <ListItemIcon>
                <HotelIcon/>
            </ListItemIcon>
            <ListItemText primary="โรงแรม" />
            </ListItem>
            <ListItem button >
            <ListItemIcon>
                <HouseboatIcon/>
            </ListItemIcon>
            <ListItemText primary="แพพัก" />
            </ListItem>
            <Divider/>
         
        <Link href="/admin/driverlocation">
        <ListItem button   >
            <ListItemIcon>
             <RoomIcon/>
            </ListItemIcon>
            <ListItemText primary="จุดตั้งวินมอเตอร์ไซต์" />
            </ListItem>
        </Link>
          
            <ListItem button >
            <ListItemIcon>
                <TwoWheelerIcon/>
            </ListItemIcon>
            <ListItemText primary="วินมอเตอร์ไซต์" />
            </ListItem>
            <ListItem button >
            <ListItemIcon>
                <DirectionsBoatFilledIcon/>
            </ListItemIcon>
            <ListItemText primary="เรือนำเที่ยว" />
            </ListItem>
            <Divider/>
            <ListItem button >
            <ListItemIcon>
                <ParkIcon/>
            </ListItemIcon>
            <ListItemText primary="สถานที่ท่องเที่ยว" />
            </ListItem>
            <ListItem button >
            <ListItemIcon>
                <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="ผลิตภัณฑ์" />
            </ListItem>
            <ListItem button >
            <ListItemIcon>
                <RateReviewIcon/>
            </ListItemIcon>
            <ListItemText primary="รีวิว" />
            </ListItem>
                  </Drawer>
                  </Box>
    )
}
