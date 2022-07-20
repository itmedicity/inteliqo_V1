import React, { memo } from 'react'
import { Box, CircularProgress } from '@mui/material';

const BackDrop = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                justifyItems: "baseline",
                padding: '25%'
            }}
        >
            <CircularProgress sx={{
                color: "success",
                animationDuration: '700ms',
            }} />

        </Box>
    )
}

export default memo(BackDrop)