import React, { Fragment, memo } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Grid, Stack } from '@mui/material';
import DigitalCLock from './DigitalCLock';
import Alert from './Alert';
import Notification from './Notification';
import Message from './Message';
import { Chip, CssVarsProvider, Typography } from '@mui/joy';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined';

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
                        <Box sx={{
                            display: "flex",
                            flexGrow: 10,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }} >
                            <CssVarsProvider>
                                <Box sx={{ display: "flex", flexGrow: 0 }} >
                                    <Typography level="body2">
                                        <DigitalCLock />
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexGrow: 10, px: 2, flexDirection: "row-reverse", }} >
                                    <Box sx={{ display: "flex", px: 0.5 }} >
                                        <Chip
                                            variant="outlined"
                                            size="md"
                                            sx={{ "--Chip-radius": "8px", color: "#808066", }}
                                            startDecorator={<GroupRemoveOutlinedIcon />}
                                            endDecorator={0}
                                        ></Chip>
                                    </Box>
                                    <Box sx={{ display: "flex", px: 0.5 }} >
                                        <Chip
                                            variant="outlined"
                                            size="md"
                                            sx={{ "--Chip-radius": "8px", color: "#808066", }}
                                            startDecorator={<GroupAddOutlinedIcon />}
                                            endDecorator={0}
                                        ></Chip>
                                    </Box>
                                    <Box sx={{ display: "flex", px: 0.5 }} >
                                        <Chip
                                            variant="outlined"
                                            size="md"
                                            sx={{ "--Chip-radius": "8px", color: "#808066", }}
                                            startDecorator={<GroupOutlinedIcon />}
                                            endDecorator={0}
                                        ></Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", flexGrow: 15 }}></Box>
                            </CssVarsProvider>

                        </Box>
                    </Box>
                </Container>
            </AppBar>
        </Fragment>
    )
}

export default memo(AppMenuBar)