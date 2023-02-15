import React from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import IconButton from '@mui/joy/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';

const CustomHeaderCmpOnly = ({ title, displayClose }) => {
    const history = useHistory();

    const toRedirectToHome = () => {
        history.push(`/Home`)
    }

    return (
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
    )
}

export default CustomHeaderCmpOnly