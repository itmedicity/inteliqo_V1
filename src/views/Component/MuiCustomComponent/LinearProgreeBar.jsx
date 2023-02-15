import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import { memo } from 'react'

const LinearProgreeBar = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}

export default memo(LinearProgreeBar)