import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React from 'react'
import IconButton from '@mui/joy/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { memo } from 'react';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const QualificationItem = ({ val }) => {
    return (
        <Box sx={{ display: "flex", width: "100%", alignItems: "center", px: 0.1 }} >
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: "flex-start" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CssVarsProvider>
                            <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                        </CssVarsProvider>
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', width: '80%', textTransform: 'capitalize', }}>
                    {val.cour_desc.toLowerCase()}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ display: 'flex', width: '80%', textTransform: 'capitalize', }}>
                    {val.spec_desc.toLowerCase()}
                </Box>
            </Box>

            {/* <Box sx={{ flex: 3, px: 0.2 }} >
                <Paper square variant="outlined" sx={{ display: "flex", justifyContent: "center" }} >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            {val.cour_desc}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box> */}
            {/* <Box sx={{ flex: 3, px: 0.2 }} >
                <Paper square variant="outlined" sx={{ display: "flex", justifyContent: "center" }} >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            {val.spec_desc}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box> */}
        </Box>
    )
}

export default memo(QualificationItem) 