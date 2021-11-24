import React from 'react'
import Link from 'next/link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import RoomIcon from '@mui/icons-material/Room';
import Divider from '@mui/material/Divider';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import ParkIcon from '@mui/icons-material/Park';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RateReviewIcon from '@mui/icons-material/RateReview';




export const  listMenu = (
    
    <div>
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
    </div>
);