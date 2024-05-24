import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const ReportWithoutDownload = ({ children, title, displayClose }) => {

    const history = useHistory();

    const toRedirectToHome = () => {
        history.push(`/Home/Reports`)
    }

    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
            <Paper sx={{ flex: 1, }} >
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                        <Paper square sx={{
                            display: "flex", flex: 1, height: 30,
                            alignItems: 'center', backgroundColor: '#f0f3f5'
                        }} >
                            <Box sx={{ display: "flex", flex: 1 }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography sx={{ display: 'flex', fontWeight: 500 }} >
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

export default memo(ReportWithoutDownload) 