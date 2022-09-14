import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React from 'react'
import IconButton from '@mui/joy/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { memo } from 'react';

const QualificationItem = ({ val }) => {
    return (
        <Box sx={{ display: "flex", width: "100%", alignItems: "center", px: 0.1 }} >
            <Box sx={{ flex: 3, px: 0.2 }} >
                <Paper square variant="outlined" sx={{ display: "flex", justifyContent: "center" }} >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            {val.cour_desc}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 3, px: 0.2 }} >
                <Paper square variant="outlined" sx={{ display: "flex", justifyContent: "center" }} >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            {val.spec_desc}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
        </Box>
    )
}

export default memo(QualificationItem) 