import { CssVarsProvider, Typography } from '@mui/joy';
import { Box, Paper } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import { InfoOutlined } from '@material-ui/icons';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const ProfileMenus = () => {

    const state = useSelector((state) => {
        return state.getMenuRenderCompRights.slno;
    })


    const Address = 'POURNAMI POURNAMI KANAYANKAVAYAL B.O';

    return (
        <Box sx={{ p: 0.5, width: '100%' }} >
            {/* Box 1  */}
            <Paper variant="outlined" sx={{
                px: 1
            }} >
                <CssVarsProvider>
                    <Box sx={{ display: "flex", py: 0.3 }} >
                        {/* <PersonOutlinedIcon /> */}
                        <Typography
                            fontSize="xl2"
                            lineHeight={0}
                            // startDecorator={}
                            endDecorator={<PersonOutlinedIcon color='primary' />}
                        >
                            Ajith Arjunan
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }} >
                        <Typography textColor="text.secondary"
                            startDecorator={
                                <ManageAccountsOutlinedIcon fontSize='md' color='primary' />
                            }
                            endDecorator={
                                <Typography>
                                    |
                                </Typography>
                            }
                        >
                            Assistant Manager
                        </Typography>
                        <Typography textColor="text.secondary"
                            startDecorator={
                                <LanOutlinedIcon fontSize='md' color='primary' />
                            }
                            px={1}
                        >
                            Information Technology
                        </Typography>
                        <Typography textColor="text.secondary"
                            startDecorator={<NumbersOutlinedIcon fontSize='md' color='primary' />}
                        >
                            4516
                        </Typography>
                    </Box>
                </CssVarsProvider>
            </Paper>
            {/* Box Two */}
            <Box>
                <CssVarsProvider>
                    <Typography textColor="text.secondary" sx={{ fontStyle: "oblique" }} startDecorator={<ArrowRightOutlinedIcon />} >
                        Contact Information
                    </Typography>
                </CssVarsProvider>
                <Paper variant="outlined" sx={{
                    px: 1, mt: 0.3
                }}>
                    <CssVarsProvider>
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }} >
                            <Box sx={{ display: 'flex', width: '20%' }}>
                                <Typography textColor="text.secondary">
                                    Permanent Address
                                </Typography>
                            </Box>
                            <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                            <Box sx={{ display: 'flex', width: '80%', textTransform: "capitalize" }}>
                                {Address.toLowerCase()}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }} >
                            <Box sx={{ display: 'flex', width: '20%' }}></Box>
                            <Typography endDecorator={<ArrowRightOutlinedIcon />}  ></Typography>
                            <Box sx={{ display: 'flex', width: '40%', textTransform: "capitalize" }}>
                                <Typography variant="soft" color="success" level='body3' > Pin Code</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', width: '40%', textTransform: "capitalize" }}>
                                {Address.toLowerCase()}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }} >
                            <Box sx={{ display: 'flex', width: '20%' }}>
                                <Typography textColor="text.secondary">
                                    Present Address
                                </Typography>
                            </Box>
                            <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                            <Box sx={{ display: 'flex', width: '80%' }}>
                                asdasdasd
                            </Box>
                        </Box>
                    </CssVarsProvider>
                </Paper>
            </Box>
        </Box>
    )
}

export default ProfileMenus