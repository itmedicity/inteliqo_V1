import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import ProfileComponent from './Components/ProfileComponent';
import AppMenuBar from './Components/AppMenuBar';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Home = () => {

    const login = useSelector((state) => {
        // console.log(state)
    })

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
                    <Grid item xs={12} md={8} xl={9} >
                        <Item>xs=8</Item>
                    </Grid>
                    <Grid item xs={12} md={4} xl={3} >
                        <ProfileComponent />
                    </Grid>
                </Grid>
                {/* <ProfileComponent /> */}
            </Box>
        </Fragment>
    )
}

export default Home
