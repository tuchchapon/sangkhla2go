import React from 'react'
import { createTheme, ThemeProvider, Toolbar } from '@mui/material'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
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
