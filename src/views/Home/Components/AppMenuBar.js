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
                <Container maxWidth="false">
                    <Toolbar disableGutters>
                        <Grid container  >
                            <Grid item md={10} xs={8} >
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{ display: { xs: 'inline-grid', md: 'flex' } }}
                                >
                                    <Grid container  >
                                        {/* <Grid item md={2} xs={6} sm={2} >
                                            <Overtime />
                                        </Grid>
                                        <Grid item md={2} xs={6} sm={2} >
                                            <Resignation />
                                        </Grid> */}
                                        <Grid item md={2} xs={6} sm={2} >
                                            <Alert />
                                        </Grid>
                                        <Grid item md={2} xs={6} sm={2}>
                                            <Notification />
                                        </Grid>
                                        <Grid item md={2} xs={6} sm={2}  >
                                            <Message />
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item md={2} xs={4} sx={{ display: 'flex', flexDirection: 'row-reverse' }} >
                                <Box >
                                    <DigitalCLock />
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </Fragment>
    )
}

export default AppMenuBar