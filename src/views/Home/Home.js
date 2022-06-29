import React, { Fragment } from 'react'
import Box from '@mui/material/Box';
import ProfileComponent from './Components/ProfileComponent';
import AppMenuBar from './Components/AppMenuBar';
import { Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';
import Announcement from './Components/Announcement';
import DashAlertCmp from './Components/DashAlertCmp';
import HolidayList from './Components/HolidayList';
import LeavesDashbod from './Components/LeavesDashbod';

// const item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Home = () => {


    return (
        <Fragment>
            <AppMenuBar />
            <Box
                sx={{
                    width: '100%',
                    paddingY: 0.5
                }}
            >
                <Grid container spacing={1} >
                    <Grid item xs={8} md={8}>
                        <Grid container columnSpacing={1} item xs={12} md={12}>
                            <Grid item md={12} xs={6}  >
                                <DashAlertCmp />
                            </Grid>
                            {/* <Grid item md={6} > */}
                            <HolidayList />
                            {/* </Grid> */}
                            {/* <Grid item md={6}> */}
                            {/* <HolidayList /> */}
                            <LeavesDashbod />
                            {/* </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <ProfileComponent />
                        <Announcement />
                    </Grid>
                </Grid>
                {/* <ProfileComponent /> */}
            </Box>
        </Fragment>
    )
}

export default Home
