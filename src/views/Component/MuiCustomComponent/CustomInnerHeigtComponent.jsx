import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';

const CustomInnerHeigtComponent = ({ children, title, toClose }) => {
    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%" }} >
            <Paper sx={{ display: 'flex', flex: 1, height: window.innerHeight - 85, flexDirection: 'column', }}>
                <Box>
                    <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    {title}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ pl: 0.5, mt: 0.5 }}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='xs' color="danger" onClick={toClose}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Box sx={{ display: 'flex', flex: 1, py: 0.5 }} >
                        {children}
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(CustomInnerHeigtComponent) 