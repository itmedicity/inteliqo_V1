import React, { Fragment, memo } from 'react'
import Box from '@mui/material/Box';
import ProfileComponent from './Components/ProfileComponent';
import AppMenuBar from './Components/AppMenuBar';
import Announcement from './Components/Announcement';
import DashAlertCmp from './Components/DashAlertCmp';
import HolidayList from './Components/HolidayList';
import LeavesDashbod from './Components/LeavesDashbod';
import { Paper } from '@mui/material';

const Home = () => {
    console.log('home')
    return (
        <Fragment>
            {/* Top Time Display and Notification Icon Bar */}
            <AppMenuBar />
            <Box
                sx={{
                    width: '100%',
                    paddingY: 0.5
                }}
            >
                <Paper elevation={5} square   >
                    {/* Outer Main Box */}
                    <Box sx={{
                        display: 'flex',
                        width: "100%",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: "column", xs: "column" },
                    }} >
                        {/* Left Side Box */}
                        <Box sx={{
                            display: "flex",
                            width: { xl: "75%", lg: "70%", md: "60%", sm: "100%", xs: "100%" },
                            flexDirection: "column",
                        }} >
                            {/* Dash Board Box */}
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                padding: 0.5
                                // height: 300
                            }} >
                                <DashAlertCmp />
                            </Box>
                            {/* Dash Board Box End */}
                            {/* Table List Box */}
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                flexDirection: { xl: "row", lg: "row", md: "column", sm: "column", xs: "column" },
                            }} >
                                <Box sx={{
                                    display: "flex",
                                    width: { xl: "50%", lg: "50%", md: "100%", sm: "100%" },
                                    padding: 0.5
                                }} >
                                    <HolidayList />
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    width: { xl: "50%", lg: "50%", md: "100%", sm: "100%" },
                                    padding: 0.5
                                }}>
                                    <LeavesDashbod />
                                </Box>
                            </Box>
                            {/* Table List Box End */}
                        </Box>
                        {/* Left Side Box End */}
                        {/* Right Side Box */}
                        <Box sx={{
                            display: "flex",
                            width: { xl: "25%", lg: "30%", md: "60%", sm: "100%" },
                            flexDirection: { xl: "column", lg: "column", md: "column", sm: "row" },
                            padding: 0.5,
                        }} >
                            {/* <ProfileComponent /> */}
                            <Announcement />
                        </Box>
                        {/* Right Side Box End */}
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(Home)
