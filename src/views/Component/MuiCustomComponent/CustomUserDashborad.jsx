
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';
const CustomUserDashborad = ({ children, title, displayClose }) => {

    const history = useHistory();

    const toRedirectToHome = () => {
        history.push(`/Home/EmpDashboardPage`)
    }

    return (
        <Box sx={{ flex: 1 }} >
            <Paper sx={{ flex: 1, }} >
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                        <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                            <Box sx={{ display: "flex" }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        {title}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <CssVarsProvider>
                                    {
                                        displayClose &&
                                        <IconButton
                                            variant="outlined"
                                            size='xs'
                                            color="danger"
                                            onClick={toRedirectToHome}
                                            sx={{ color: '#ef5350' }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Paper>
                <Box sx={{ display: 'flex', flex: 1, py: 0.5 }} >
                    {children}
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(CustomUserDashborad)