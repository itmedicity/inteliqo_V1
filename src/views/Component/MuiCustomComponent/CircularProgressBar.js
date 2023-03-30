import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const CircularProgressBar = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <CircularProgress sx={{ display: 'flex' }} />
        </Box>
    )
}

export default CircularProgressBar