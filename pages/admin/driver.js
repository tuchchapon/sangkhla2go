import { createTheme, ThemeProvider, Toolbar } from '@mui/material'
import React from 'react'
import { Box,Grid,Container } from '@mui/system';
import Header from './Header';
export default function driver() {
    mdTheme = createTheme()
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display:'flex'}}>
                <Header/>
                <Box component="main"  >
                <Toolbar/>
                <Container maxWidth="lg" >

                </Container>
                </Box>
            </Box>
        </ThemeProvider >
    )
}
