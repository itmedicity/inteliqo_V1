import { Box, CssVarsProvider, Typography, IconButton } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { memo, lazy } from 'react'
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const Manpowersearch = lazy(() => import('./Manpowersearch'))

const Manpowermain = () => {
    const history = useHistory();
    const toRedirectToHome = () => {
        history.push('/Home/Settings');
    }
    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: window.innerHeight - 85, }} >
            <Paper sx={{ flex: 1, }} >
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                        <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                            <Box sx={{ display: "flex" }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        {/* {title} */}ManPower Planning
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <CssVarsProvider>
                                    {
                                        // displayClose &&
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
                    {/* {children} */}<Manpowersearch />
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(Manpowermain) 