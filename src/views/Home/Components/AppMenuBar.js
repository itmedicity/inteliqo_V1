import React, { Fragment } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Grid, Stack } from '@mui/material';
import DigitalCLock from './DigitalCLock';
import Alert from './Alert';
import Notification from './Notification';
import Message from './Message';

const AppMenuBar = () => {
    return (
        <Fragment>
            <AppBar position="static" color="inherit" >
                <Container maxWidth="false" sx={{
                    height: { lg: 50, xl: 50, md: 50 }
                }} >
                    <Box sx={{ display: "flex", p: 1 }} >
                        <Box sx={{ display: "flex", flexGrow: 0 }} ><Alert /></Box>
                        <Box sx={{ display: "flex", flexGrow: 0 }} ><Notification /></Box>
                        <Box sx={{ display: "flex", flexGrow: 0 }} ><Message /></Box>
                        <Box sx={{ display: "flex", flexGrow: 10, flexDirection: "row-reverse" }} ><DigitalCLock /></Box>
                    </Box>
                </Container>
            </AppBar>
        </Fragment>
    )
}

export default AppMenuBar